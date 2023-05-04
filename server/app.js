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

// GET endpoint for the '/boards' route.
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

// GET endpoint for the '/boards/:id' route.
app.get('/boards/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const collection = client.db(dbName).collection('Boards');
        const board = await collection.findOne({ _id: new ObjectId(id) });

        if (!board) {
            res.status(404).json({ msg: 'Board not found.' });
        } else {
            res.status(200).json(board);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: `Server error: ${err}` });
    }
});

// POST endpoint for the '/boards' route.
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

// PUT endpoint for the '/boards/:id' route.
app.put('/boards/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const collection = client.db(dbName).collection('Boards');
        const board = await collection.findOne({ _id: new ObjectId(id) });

        if (!board) {
            res.status(404).json({ msg: 'Board not found.' });
        } else {
            board.name = name || board.name;
            board.description = description || board.description;
            board.updated_at = new Date();

            await collection.updateOne({ _id: new ObjectId(id) }, { $set: board });

            res.status(200).json(board);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: `Server error: ${err}` });
    }
});

// DELETE endpoint for the '/boards/:id' route.
app.delete('/boards/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const collection = client.db(dbName).collection('Boards');
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            res.status(404).json({ msg: 'Board not found.' });
        } else {
            res.status(200).json({ msg: `Board '${id}' deleted successfully.` });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: `Server error: ${err}` });
    }
});

// GET endpoint for the '/boards/:boardId/tasks' route.
app.get('/boards/:boardId/tasks', async (req, res) => {
    try {
        const { boardId } = req.params;

        const collection = client.db(dbName).collection('Boards');
        const board = await collection.findOne({ _id: new ObjectId(boardId) });

        res.status(200).json(board.tasks);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: `Server error: ${err}` });
    }
});

// GET endpoint for the '/boards/:boardId/tasks/:id' route.
app.get('/boards/:boardId/tasks/:id', async (req, res) => {
    try {
        const { boardId, id } = req.params;

        const collection = client.db(dbName).collection('Boards');
        const board = await collection.findOne({ _id: new ObjectId(boardId) });
        const task = board.tasks.find((task) => task._id.toString() === id);

        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: `Server error: ${err}` });
    }
});

app.post('/boards/:boardId/tasks', async (req, res) => {
    try {
        const { boardId } = req.params;
        const { title, description, status, priority } = req.body;

        const collection = client.db(dbName).collection('Boards');

        const newTask = {
            _id: new ObjectId(),
            title,
            description,
            status,
            priority,
            created_at: new Date(),
            updated_at: new Date(),
        };

        const result = collection.updateOne(
            { _id: new ObjectId(boardId) },
            { $push: { tasks: newTask }, $set: { updated_at: new Date() } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ msg: 'Board not found' });
        }

        res.status(200).json(newTask);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: `Server error: ${err}` });
    }
});

app.put('/boards/:boardId/tasks/:id', async (req, res) => {
    try {
        const { boardId, id } = req.params;
        const { title, description, status, priority } = req.body;

        const collection = client.db(dbName).collection('Boards');
        const board = await collection.findOne({ _id: new ObjectId(boardId) });
        const task = board.tasks.find((task) => task._id.toString() === id);

        if (!task) {
            res.status(404).json({ msg: 'Task not found.' });
        } else {
            task.title = title || task.title;
            task.description = description || task.description;
            task.status = status || task.status;
            task.priority = priority || task.priority;
            task.updated_at = new Date();

            await collection.updateOne({ _id: new ObjectId(boardId) }, { $set: { tasks: board.tasks } });

            res.status(200).json(task);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: `Server error: ${err}` });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
