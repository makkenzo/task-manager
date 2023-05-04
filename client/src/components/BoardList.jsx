const BoardList = ({ boards, selectedBoard, onBoardSelect, onBoardAdd }) => {
    return (
        <div className="h-full bg-gray-100 px-4 py-8 flex flex-col">
            <h3 className="text-lg font-medium mb-4">Boards</h3>
            <ul className="flex-1 overflow-y-auto">
                {boards.map((board) => (
                    <li
                        key={board.id}
                        className={`mb-2 p-2 rounded-md cursor-pointer ${
                            board.id === selectedBoard ? 'bg-blue-200' : ''
                        }`}
                        onClick={() => onBoardSelect(board.id)}
                    >
                        {board.name}
                    </li>
                ))}
            </ul>
            <div className="mt-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={onBoardAdd}
                >
                    Add board
                </button>
            </div>
        </div>
    );
};

export default BoardList;
