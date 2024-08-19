// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../styles/commonStyle';

const Home = ({ setCutCount, setQuantity, quantity }) => {
  const navigate = useNavigate();

  const Plus = () => {
    if (quantity < 9) {
      setQuantity(quantity + 1)
    }
  }

  const Minus = () => {
    if (quantity >1 ) {
    setQuantity(quantity - 1)
    }
  }


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
      <S.CenterRowBox> 
      <button onClick={Minus}> - </button>
      <h3> {quantity} </h3>
      <button onClick={Plus}> + </button>
      </S.CenterRowBox>
      {/* <input type="number" min="1" max="9" onChange={(e) => setQuantity(e.target.value)} /> */}
      <button onClick={handleStart}>다음</button>
    </div>
  );
};

export default Home;
