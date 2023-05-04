import React, { useState } from 'react';
import BoardList from './components/BoardList';
import KanbanBoard from './components/KanbanBoard';

const boardData = [{ id: 1, name: 'Board 1' }];

const tasksData = [
    {
        id: 1,
        boardId: 1,
        title: 'Task 1',
        description: 'Description for Task 1',
        priority: 'High',
        status: 'toDo',
    },
    {
        id: 2,
        boardId: 1,
        title: 'Task 3',
        description: 'Description for Task 3',
        priority: 'Low',
        status: 'inProgress',
    },
    {
        id: 3,
        boardId: 1,
        title: 'Task 5',
        description: 'Description for Task 5',
        priority: 'Low',
        status: 'done',
    },
    {
        id: 4,
        boardId: 1,
        title: 'Task 5',
        description: 'Description for Task 5',
        priority: 'Low',
        status: 'done',
    },
];

const App = () => {
    const [selectedBoard, setSelectedBoard] = useState(1);

    const onBoardSelect = (boardId) => {
        setSelectedBoard(boardId);
    };

    const onBoardAdd = () => {};

    const onTaskStatusChange = (taskId, newStatus) => {};

    const selectedBoardData = boardData.find((board) => board.id === selectedBoard);
    const selectedTasksData = tasksData.filter((task) => task.boardId === selectedBoard);

    return (
        <div className="flex h-screen">
            <div className="w-1/4 border-r">
                <BoardList
                    boards={boardData}
                    selectedBoard={selectedBoard}
                    onBoardSelect={onBoardSelect}
                    onBoardAdd={onBoardAdd}
                />
            </div>
            <div className="flex-1 p-4">
                <h1 className="text-2xl font-bold mb-4">{selectedBoardData.name}</h1>
                <KanbanBoard tasks={selectedTasksData} onTaskStatusChange={onTaskStatusChange} />
            </div>
        </div>
    );
};

export default App;
