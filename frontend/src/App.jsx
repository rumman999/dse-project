import { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom'

import Navbar from "./components/Navbar";
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import HistoricalData from './pages/HistoricalData'


function App() {


  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/historical" element={<HistoricalData />} />
      </Routes>
    </>
  );
}

export default App;

