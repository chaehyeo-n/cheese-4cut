import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './Router';
import './App.css'

function App() {
  const [cutCount, setCutCount] = useState(2);    // 컷수: 2컷 or 4컷
  const [quantity, setQuantity] = useState(1);    // 매수: 1~9매
  const [capturedPhotos, setCapturedPhotos] = useState([]); // 촬영된 사진
  const [finalPhoto, setFinalPhoto] = useState(null); // 최종 선택된 사진

  return (
    <Router>
      <AppRouter
        setCutCount={setCutCount}
        setQuantity={setQuantity}
        capturedPhotos={capturedPhotos}
      />
    </Router>
  )
}

export default App
