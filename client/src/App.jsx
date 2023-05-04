import React, { useState } from 'react'
import BoardList from './components/BoardList'
import KanbanBoard from './components/KanbanBoard';

const boardData = [
    {id:1,name:'Board 1'},
    {id:2,name:'Board 2'},
    {id:3,name:'Board 3'},
]

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
        boardId: 2,
        title: 'Task 2',
        description: 'Description for Task 2',
        priority: 'Medium',
        status: 'toDo',
    },
    {
        id: 3,
        boardId: 3,
        title: 'Task 3',
        description: 'Description for Task 3',
        priority: 'Low',
        status: 'inProgress',
    },
    {
        id: 4,
        boardId: 2,
        title: 'Task 4',
        description: 'Description for Task 4',
        priority: 'High',
        status: 'inProgress',
    },
    {
        id: 5,
        boardId: 1,
        title: 'Task 5',
        description: 'Description for Task 5',
        priority: 'Low',
        status: 'done',
    },
];

const App = () => {
    const [selectedBoard, setSelectedBoard] = useState(1)

    const onBoardSelect=(boardId)=>{
        setSelectedBoard(boardId)
    }

    const onBoardAdd=()=>{
        
    }

    const onTaskStatusChange=(taskId,newStatus)=>{

    }

    const selectedBoardData=boardData.find((board)=>board.id===selectedBoard);
    const selectedTasksData = tasksData.filter((task) => task.boardId === selectedBoard);
    console.log(selectedTasksData);

    return (
        <div className="flex h-screen">
            <div className="w-1/4 border-r">
                <BoardList boards={boardData} selectedBoard={selectedBoard} onBoardSelect={onBoardSelect} onBoardAdd={onBoardAdd} />
            </div>
            <div className="flex-1 p-4">
                <h1 className="text-2xl font-bold mb-4">{selectedBoardData.name}</h1>
                <KanbanBoard tasks={selectedTasksData} onTaskStatusChange={onTaskStatusChange} />
            </div>
        </div>
    )
}

export default App