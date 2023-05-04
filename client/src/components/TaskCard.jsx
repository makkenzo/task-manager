const TaskCard = ({title,description,priority,status,onStatusChange}) => {
    return (
        <div className="border rounded-lg shadow-md p-4 mb-4">
            <h3 className="text-lg font-medium mb-2">{title}</h3>
        </div>
    )
}

export default TaskCard