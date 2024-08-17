// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ setCutCount, setQuantity }) => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/shoot');
  };

  return (
    <div>
      <h1>치즈네컷</h1>
      <h2>컷 수 선택</h2>
      <button onClick={() => { setCutCount(2); }}>2컷</button>
      <button onClick={() => { setCutCount(4); }}>4컷</button>
      <h2>매수 선택</h2>
      <input type="number" min="1" max="9" onChange={(e) => setQuantity(e.target.value)} />
      <button onClick={handleStart}>다음</button>
    </div>
  );
};

export default Home;
