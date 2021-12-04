import { MongoClient } from 'mongodb';
import path from 'path';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { connectDB } from './connect-db';
import { authenticationRoute } from './authenticate'

let port = process.env.PORT || 7777;
let app = express();

app.use(cors(), bodyParser.urlencoded({ extended: true }), bodyParser.json());
app.listen(port, console.info("Server running, listening on port ", port));

authenticationRoute(app);

if (process.env.NODE_ENV == `production`) {
    app.use(express.static(path.resolve(__dirname, '../../dist')));
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve('index.html'));
    });
}

app.post('/item/new', async (req, res) => {
    await (await connectDB()).collection(`items`).insertOne(req.body.item);
    res.status(200).send();
});

app.post('/item/update', async (req, res) => {
    let { id, name, group, img, isHidden } = req.body.item;
    let collection_items = (await connectDB()).collection(`items`);
    if (name) await collection_items.updateOne({ id }, { $set: { name } });
    if (group) await collection_items.updateOne({ id }, { $set: { group } });
    //TODO: Upload Image to Public Folder Here
    if (img) await collection_items.updateOne({ id }, { $set: { img } }); //TODO: Fix Image name upload
    if (isHidden !== undefined) await collection_items.updateOne({ id }, { $set: { isHidden } });
    res.status(200).send();
});

app.post('/comment/new', async (req, res) => {
    await (await connectDB()).collection(`comments`).insertOne(req.body.comment)
    res.status(200).send();
});