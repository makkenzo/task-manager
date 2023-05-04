const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;
const dbName = 'TaskManagerDB';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/boards', async (req, res) => {
    try {
        const collection = client.db(dbName).collection('Boards');
        const boards = await collection.find({}).toArray();

        res.status(200).json(boards);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: `Server error: ${err}` });
    }
});

app.post('/boards', async (req, res) => {
    try {
        const { name, description } = req.body;

        const collection = client.db(dbName).collection('Boards');
        const board = { name, description, created_at: new Date(), updated_at: new Date(), tasks: [] };
        const result = await collection.insertOne(board);

        res.status(201).json({ msg: `Board '${name}' created successfully` });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: `Server error: ${err}` });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
