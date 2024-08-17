import React from 'react';
import { Routes, Route } from 'react-router-dom';
//여기부터 페이지 로드
import Home from './pages/Home';
import ShootPage from './pages/ShootPage';

const AppRouter = ({setCutCount, setQuantity, setCapturedPhotos}) => {
    return (
        <Routes>
            <Route path='/' element={<Home setCutCount={setCutCount} setQuantity={setQuantity} />} />
            <Route path='/shoot' element={ <ShootPage setCapturedPhotos={setCapturedPhotos} />} />
        </Routes>
    )
};

export default AppRouter;