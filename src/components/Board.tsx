import React from 'react';
import Cell from './Cell';
import './Board.css';

interface BoardProps {
  board: {
    size: number;
    cells: {
      id: number;
      is_revealed: boolean;
      is_flagged: boolean;
      state: number;
    }[];
    is_completed: boolean;
  };
  handleCellClick: (cellId: number) => void;
  handleFlagCell: (cellId: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, handleCellClick, handleFlagCell }) => {
  const renderCells = () => {
    return board.cells.map(cell => (
      <Cell
        key={cell.id}
        cell={cell}
        handleCellClick={handleCellClick}
        handleFlagCell={handleFlagCell}
        isDisabled={board.is_completed}
      />
    ));
  };

  return (
    <div className="board" style={{ gridTemplateColumns: `repeat(${board.size}, 1fr)` }}>
      {renderCells()}
    </div>
  );
};

export default Board;