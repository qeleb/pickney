import path from 'path';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { v4 as uuid } from 'uuid';
import md5 from 'md5';
import { MongoClient } from 'mongodb';

// Server Configuration
const PORT = process.env.PORT || 7777;
const DB_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/pickney';
const PASSWORD_REQUIREMENTS = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,32}$/;

const authenticationTokens = [];    // User Authentication Tokens
let db = null;                      // MongoDB Connection

// Initialize Express & Middleware
let app = express();
app.use(cors(), bodyParser.urlencoded({ extended: true }), bodyParser.json());
app.listen(PORT, console.info("Server running, listening on port ", PORT));

// Serve Dist Bundle if in Production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, '../../dist')));
    app.get('/*', (req, res) => res.sendFile(path.resolve('index.html')));
}

// Connect to MongoDB
const connectDB = async () => {
    if (db) return db; // Return Existing Connection if Available
    db = (await MongoClient.connect(DB_URL, { useNewUrlParser: true })).db();
    return db;
}

// Assemble User State
const assembleUserState = async (user) => {
    let items = await db.collection('items').find({ isDeleted: false }).toArray();
    return {
        session: { authenticated: 'AUTHENTICATED', id: user.id },
        user: await db.collection('users').findOne({ id: user.id }),
        items,
        groups: await db.collection('groups').find({ owner: user.id }).toArray(),
        comments: await db.collection('comments').find({ item: { $in: items.map(item => item.id) } }).toArray()
    };
}

/**
 * Database Routes
 */

// Route: Login User
app.post('/authenticate', async (req, res) => {
    let { username, password } = req.body;      // The Credentials Submitted

    // Search for User in DB
    let user = await (await connectDB()).collection('users').findOne({ name: username });

    // Deny Login if User is Not Found or Password is Incorrect
    if (!user) return res.status(500).send('user not found');
    if (md5(password) !== user.passwordHash) return res.status(500).send('password incorrect');

    // Generate an Authentication Token for Successfully Logged-In User
    let token = uuid();
    authenticationTokens.push({ token, userID: user.id });

    // Log in the User
    let state = await assembleUserState(user);
    res.send({ token, state });
});

// Route: Create New User
app.post('/user/create', async (req, res) => {
    let { username, password } = req.body;      // The Credentials Submitted
    let db = await connectDB();                 // Connection to DB
    let collection = db.collection('users');    // Users Collection in DB

    // Check if the Username is Valid
    if (username.length < 3 || username.length > 32) {
        res.status(500).send({ message: "username is invalid" });
        return;
    };

    // Check if the Password is Valid
    if (!password.match(PASSWORD_REQUIREMENTS)) {
        res.status(500).send({ message: "password is invalid" });
        return;
    };

    // Check if the Username is Already Taken
    if (await collection.findOne({ name: username })) {
        res.status(500).send({ message: "a user by that name already exists" });
        return;
    };

    // Create a User ID & Add to DB
    let userID = uuid();
    await collection.insertOne({
        id: userID,
        name: username,
        passwordHash: md5(password),
        isAdmin: false
    });

    // Create Groups for the User
    await db.collection('groups').insertMany([
    {
        id: uuid(),
        owner: userID,
        name: 'cart'
    },
    {
        id: uuid(),
        owner: userID,
        name: 'favorites'
    },
    {
        id: uuid(),
        owner: userID,
        name: 'purchased'
    }]);

    // Return Status 200 & State
    let state = await assembleUserState({ id: userID, name: username });
    res.status(200).send({ userID, state });
});

// Route: Create New Item (ADMIN)
app.post('/item/new', async (req, res) => {
    await (await connectDB()).collection('items').insertOne(req.body.item);
    res.status(200).send();
});

// Route: Update an Item (ADMIN)
app.post('/item/update', async (req, res) => {
    let { id, name, desc, group, inventory, img, isHidden, isDeleted } = req.body.item;
    let collection_items = (await connectDB()).collection('items');
    if (name) await collection_items.updateOne({ id }, { $set: { name } });
    if (desc) await collection_items.updateOne({ id }, { $set: { desc } });
    //TODO: Allow removing groups
    if (group) await collection_items.updateOne({ id }, { $addToSet: { group } });
    if (inventory !== undefined) await collection_items.updateOne({ id }, { $set: { inventory } });
    //TODO: Upload Image to Public Folder Here
    if (img) await collection_items.updateOne({ id }, { $set: { img } }); //TODO: Fix Image name upload
    if (isHidden !== undefined) await collection_items.updateOne({ id }, { $set: { isHidden } });
    if (isDeleted !== undefined) await collection_items.updateOne({ id }, { $set: { isDeleted } });
    res.status(200).send();
});

// Route: Comment on an Item
app.post('/comment/new', async (req, res) => {
    await (await connectDB()).collection('comments').insertOne(req.body.comment)
    res.status(200).send();
});