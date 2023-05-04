import { useEffect, useState } from 'react';
import axios from 'axios';
import BoardList from './components/BoardList';
import KanbanBoard from './components/KanbanBoard';

const App = () => {
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
    }, []);

    const onBoardSelect = (boardId) => {
        setSelectedBoard(boardId);
    };

    const onBoardAdd = () => {};

    const onTaskStatusChange = (taskId, newStatus) => {};

    const selectedBoards = boards.find((board) => board._id === selectedBoard);
    const selectedTasks = tasks.filter((task) => task.boardId === selectedBoard);

    return (
        <div className="flex h-screen">
            <div className="w-1/4 border-r">
                <BoardList
                    boards={boards}
                    selectedBoard={selectedBoard}
                    onBoardSelect={onBoardSelect}
                    onBoardAdd={onBoardAdd}
                />
            </div>
            <div className="flex-1 p-4">
                <h1 className="text-2xl font-bold mb-4">{selectedBoards?.name}</h1>
                <KanbanBoard tasks={selectedTasks} onTaskStatusChange={onTaskStatusChange} />
            </div>
        </div>
    );
};

export default App;
