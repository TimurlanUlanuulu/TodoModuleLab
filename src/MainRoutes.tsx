import React from 'react';
import {Routes, Route} from "react-router-dom";
import BasketList from './components/BasketList';
import ColumnList from './components/ColumnList';
import CompletedList from './components/CompletedList';

const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<ColumnList/>} />
            <Route path="/completed" element={<CompletedList/>} />
            <Route path="/basket" element={<BasketList/>} />
        </Routes>
    );
};

export default MainRoutes;