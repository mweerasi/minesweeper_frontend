import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Board from './Board';
import './BoardDetails.css';
import '../App.css';  // Import App.css for shared styles

interface BoardDetailsType {
    id: number;
    size: number;
    cells: Cell[];
    is_completed: boolean;
    success: boolean;
}

interface Cell {
    id: number;
    is_revealed: boolean;
    is_flagged: boolean;
    state: number;
}

const BoardDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [board, setBoard] = useState<BoardDetailsType | null>(null);

    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/boards/${id}/get_board/`);
                setBoard(response.data);
            } catch (error) {
                console.error('Error fetching the board', error);
            }
        };
        fetchBoard();
    }, [id]);

    const handleCellClick = async (cellId: number) => {
        if (board?.is_completed) return;  // Prevent clicking if game is over
        const cell = board?.cells.find(cell => cell.id === cellId);
        if (cell?.is_flagged) return;  // Prevent revealing if cell is flagged

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/cells/${cellId}/reveal_cell/`);
            const updatedCells = response.data.updated_cells;

            setBoard(prevBoard => {
                if (!prevBoard) return prevBoard;

                const newCells = prevBoard.cells.map(cell => {
                    const updatedCell = updatedCells.find((updated: Cell) => updated.id === cell.id);
                    return updatedCell ? updatedCell : cell;
                });

                return {
                    ...prevBoard,
                    ...response.data.board,
                    cells: newCells
                };
            });
        } catch (error) {
            console.error("There was an error revealing the cell!", error);
        }
    };

    const handleFlagCell = async (cellId: number) => {
        if (board?.is_completed) return;  // Prevent flagging if game is over
        const cell = board?.cells.find(cell => cell.id === cellId);
        if (cell?.is_revealed) return;  // Prevent flagging if cell is revealed

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/cells/${cellId}/flag_cell/`);
            const updatedCells = response.data.updated_cells;

            setBoard(prevBoard => {
                if (!prevBoard) return prevBoard;

                const newCells = prevBoard.cells.map(cell => {
                    const updatedCell = updatedCells.find((updated: Cell) => updated.id === cell.id);
                    return updatedCell ? updatedCell : cell;
                });

                return {
                    ...prevBoard,
                    ...response.data.board,
                    cells: newCells
                };
            });
        } catch (error) {
            console.error("There was an error flagging the cell!", error);
        }
    };

    const handleButtonClick = () => {
        navigate('/');
    };

    return (
        <div className={`board-details app ${board?.is_completed ? 'game-over' : ''}`}>
            <button onClick={handleButtonClick}>
                {board?.is_completed ? 'Start New Game' : 'Back to Home'}
            </button>
            {board && <Board board={board} handleCellClick={handleCellClick} handleFlagCell={handleFlagCell} />}
            {board?.is_completed && (
                <div className={`game-result ${board.success ? 'win' : 'lose'}`}>
                    {board.success ? 'You win!' : 'You lose!'}
                </div>
            )}
        </div>
    );
};

export default BoardDetails;