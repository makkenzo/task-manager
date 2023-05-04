import TaskCard from './TaskCard';

const KanbanBoard = ({ tasks, onTaskStatusChange }) => {
    const toDoTasks = tasks.filter((task) => task.status == 'toDo');
    const inProgressTasks = tasks.filter((task) => task.status === 'inProgress');
    const doneTasks = tasks.filter((task) => task.status === 'done');

    return (
        <div className="flex flex-1">
            <div className="flex-1">
                <h2 className="text-xl font-medium mb-4">To Do</h2>
                {toDoTasks.map((task) => (
                    <TaskCard
                        key={task._id}
                        title={task.title}
                        description={task.description}
                        priority={task.priority}
                        status={task.status}
                        onTaskStatusChange={(newStatus) => onTaskStatusChange(task._id, newStatus)}
                    />
                ))}
            </div>
            <div className="flex-1">
                <h2 className="text-xl font-medium mb-4">In Progress</h2>
                {inProgressTasks.map((task) => (
                    <TaskCard
                        key={task._id}
                        title={task.title}
                        description={task.description}
                        priority={task.priority}
                        status={task.status}
                        onTaskStatusChange={(newStatus) => onTaskStatusChange(task._id, newStatus)}
                    />
                ))}
            </div>
            <div className="flex-1">
                <h2 className="text-xl font-medium mb-4">Done</h2>
                {doneTasks.map((task) => (
                    <TaskCard
                        key={task._id}
                        id={task._id}
                        title={task.title}
                        description={task.description}
                        priority={task.priority}
                        status={task.status}
                        onTaskStatusChange={(newStatus) => onTaskStatusChange(task._id, newStatus)}
                    />
                ))}
            </div>
        </div>
    );
};

export default KanbanBoard;
