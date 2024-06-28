import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Controls from './components/Controls';
import './App.css';

const App: React.FC = () => {
  const [level, setLevel] = useState<number>(9);  // Default to 9 (Easy)
  const navigate = useNavigate();

  const createBoard = async (newLevel: number) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/boards/create_board/', { level: newLevel });
      const boardId = response.data.id;
      navigate(`/board/${boardId}`);
    } catch (error) {
      console.error("There was an error creating the board!", error);
    }
  };

  return (
    <div className="app">
      <Controls setLevel={setLevel} createBoard={createBoard} level={level} />
    </div>
  );
};

export default App;
