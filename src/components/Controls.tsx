import React from 'react';
import './Controls.css';

interface ControlsProps {
    level: number;
    setLevel: (level: number) => void;
    createBoard: (level: number) => void;
}

const Controls: React.FC<ControlsProps> = ({ level, setLevel, createBoard }) => {
    const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLevel = parseInt(e.target.value, 10);
        setLevel(newLevel);
        createBoard(newLevel); // Pass the new level directly
    };

    return (
        <div className="controls">
            <label>
                Difficulty:
                <select onChange={handleLevelChange} value={level}>
                    <option value="9">Easy</option>
                    <option value="16">Medium</option>
                    <option value="24">Hard</option>
                </select>
            </label>
            <button onClick={() => createBoard(level)}>New Game</button>
        </div>
    );
};

export default Controls;
