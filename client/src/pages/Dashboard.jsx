import { useEffect, useState } from 'react';
import axios from 'axios';
import BoardList from '../components/BoardList';
import KanbanBoard from '../components/KanbanBoard';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [selectedBoard, setSelectedBoard] = useState('645366ab54824ed717562642');
    const [boards, setBoards] = useState([]);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await axios
                .get('http://localhost:5000/boards')
                .then((response) => setBoards(response.data))
                .catch((error) => console.error(error));
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await axios
                .get(`http://localhost:5000/boards/${selectedBoard}/tasks`)
                .then((response) => setTasks(response.data))
                .catch((error) => console.error(error));
        };

        fetchData();
    }, [selectedBoard]);

    const onBoardSelect = (boardId) => {
        setSelectedBoard(boardId);
    };

    const curBoard = boards.find((board) => board._id === selectedBoard);

    return (
        <div className="flex h-screen">
            <div className="w-1/4 border-r">
                <BoardList boards={boards} selectedBoard={selectedBoard} onBoardSelect={onBoardSelect} />
            </div>
            <div className="flex-1 p-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold mb-1">{curBoard?.name}</h1>
                        <p className="text-gray-500 mb-4">{curBoard?.description}</p>
                    </div>
                    <Link to="/add-task" state={{ boardId: curBoard?._id }}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Add Task
                        </button>
                    </Link>
                </div>
                <KanbanBoard tasks={tasks} />
            </div>
        </div>
    );
};

export default Dashboard;
