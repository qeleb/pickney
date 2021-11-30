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

app.post('/task/new', async (req, res) => {
    await (await connectDB()).collection(`tasks`).insertOne(req.body.task);
    res.status(200).send();
});

app.post('/task/update', async (req, res) => {
    let { id, group, isComplete, name } = req.body.task;
    let collection_tasks = (await connectDB()).collection(`tasks`);
    if (group) await collection_tasks.updateOne({ id }, { $set: { group } });
    if (name) await collection_tasks.updateOne({ id }, { $set: { name } });
    if (isComplete !== undefined) await collection_tasks.updateOne({ id }, { $set: { isComplete } });
    res.status(200).send();
});

app.post('/comment/new', async (req, res) => {
    await (await connectDB()).collection(`comments`).insertOne(req.body.comment)
    res.status(200).send();
});