import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Homepage from './pages/Homepage';
import Connections from './pages/Connections';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Homepage />} />
          <Route path='/connections' element={<Connections />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
