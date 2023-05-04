const TaskCard = ({ id, title, description, priority, status, onStatusChange }) => {
    return (
        <div className="border rounded-lg shadow-md p-4 mb-4 mx-auto max-w-md">
            <h3 className="text-lg font-medium mb-2">{title}</h3>
            <p className="text-gray-500 mb-2">{description}</p>
            <div className="flex justify-between items-center">
                <span className="text-sm">priority: {priority}</span>
                <select
                    className="px-2 py-1 rounded-md text-sm font-medium focus:outline-none border-2"
                    value={status}
                    onChange={(e) => onStatusChange(id, e.target.value)}
                >
                    <option value="toDo">To Do</option>
                    <option value="inProgress">In Progress</option>
                    <option value="done">Done</option>
                </select>
            </div>
        </div>
    );
};

export default TaskCard;
