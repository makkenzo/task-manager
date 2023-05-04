import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NotFound from './NotFound';

const AddTaskPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('low');
    const [status, setStatus] = useState('toDo');

    const location = useLocation();

    if (!location.state || !location.state.boardId) {
        return <NotFound />;
    }

    const { boardId } = location.state;
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newTask = {
            title,
            description,
            priority,
            status,
        };

        try {
            await axios.post(`http://localhost:5000/boards/${boardId}/tasks`, newTask);
        } catch (err) {
            console.error(err);
        }
        navigate('/');
    };

    return (
        <div className="flex justify-center items-center h-screen bg-slate-400">
            <div className="p-4 bg-slate-500 flex flex-col items-center justify-center shadow-2xl w-2/6 rounded-md">
                <h1 className="text-2xl font-bold mb-4">Add task</h1>
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="mb-4">
                        <label htmlFor="title" className="block font-medium mb-2 ">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            className="w-full border-gray-400 rounded-md py-2 px-3"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block font-medium mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border-gray-400 rounded-md py-2 px-3"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="priority" className="block font-medium mb-2">
                            Priority
                        </label>
                        <select
                            id="priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="w-full border-gray-400 rounded-md py-2 px-3"
                            required
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="status" className="block font-medium mb-2">
                            Status
                        </label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => {
                                setStatus(e.target.value);
                                console.log(status);
                            }}
                            className="w-full border-gray-400 rounded-md py-2 px-3"
                            required
                        >
                            <option value="toDo">To Do</option>
                            <option value="inProgress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                            onClick={handleSubmit}
                        >
                            Add Task
                        </button>
                        <button
                            type="button"
                            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
                            onClick={() => navigate('/')}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTaskPage;
