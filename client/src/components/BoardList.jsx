const BoardList = ({ boards, selectedBoard, onBoardSelect }) => {
    return (
        <div className="h-full bg-gray-100 px-4 py-8 flex flex-col">
            <h3 className="text-lg font-medium mb-4">Boards</h3>
            <ul className="flex-1 overflow-y-auto">
                {boards.map((board) => (
                    <li
                        key={board._id}
                        className={`mb-2 p-2 rounded-md cursor-pointer ${
                            board._id === selectedBoard ? 'bg-blue-200' : ''
                        }`}
                        onClick={() => onBoardSelect(board._id)}
                    >
                        {board.name}
                    </li>
                ))}
            </ul>
            <div className="mt-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add board
                </button>
            </div>
        </div>
    );
};

export default BoardList;
