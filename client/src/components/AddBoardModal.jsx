import { useState } from 'react';

const AddBoardModal = ({ isOpen, onClose, onAddBoard }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleAddBoard = (e) => {
        e.preventDefault();
        onAddBoard({ name, description });
        setName('');
        setDescription('');
    };

    return <div>AddBoardModal</div>;
};

export default AddBoardModal;
