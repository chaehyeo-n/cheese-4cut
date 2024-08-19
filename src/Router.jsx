import React from 'react';
import { Routes, Route } from 'react-router-dom';
//여기부터 페이지 로드
import Home from './pages/Home';
import ShootPage from './pages/ShootPage';
import SelectionPage from './pages/SelectionPage';
// import FrameSelectionPage from './pages/FrameSelectionPage';  //삭제 예정
import PrintPage from './pages/PrintPage';
import LoadingPage from './pages/LoadingPage';

const AppRouter = ({setCutCount, quantity, setQuantity, setCapturedPhotos}) => {
    return (
        <Routes>
            <Route path='/' element={<Home setCutCount={setCutCount} setQuantity={setQuantity} quantity={quantity} />} />
            <Route path='/shoot' element={ <ShootPage setCapturedPhotos={setCapturedPhotos} />} />
            <Route path='/loading' element={ <LoadingPage/> } />
            <Route path='/selection' element= { <SelectionPage/> } />
            <Route path='/print' element= { <PrintPage/> } />
        </Routes>
    )
};

export default AppRouter;