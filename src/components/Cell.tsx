import React from 'react';
import './Cell.css';

interface CellProps {
    cell: {
        id: number;
        is_revealed: boolean;
        is_flagged: boolean;
        state: number;
    };
    handleCellClick: (cellId: number) => void;
    handleFlagCell: (cellId: number) => void;
    isDisabled: boolean;
}

const Cell: React.FC<CellProps> = ({ cell, handleCellClick, handleFlagCell, isDisabled }) => {
    const getCellContent = () => {
        if (cell.is_flagged) return '🚩';
        if (!cell.is_revealed) return '';
        if (cell.state === -1) return '💣';
        return cell.state > 0 ? cell.state : '';
    };

    const handleClick = () => {
        if (!isDisabled && !cell.is_revealed) handleCellClick(cell.id);
    };

    const handleRightClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!isDisabled) handleFlagCell(cell.id);
    };

    return (
        <div className={`cell ${cell.is_revealed ? 'revealed' : ''}`} onClick={handleClick} onContextMenu={handleRightClick}>
            {getCellContent()}
        </div>
    );
};

export default Cell;