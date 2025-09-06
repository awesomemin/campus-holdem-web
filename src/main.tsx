import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import GameDetail from './pages/GameDetail.tsx';
import Layout from './pages/Layout.tsx';
import Signup from './pages/Signup.tsx';
import Login from './pages/Login.tsx';
import Home from './pages/Home.tsx';
import User from './pages/User.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="game">
            <Route path=":gameId" element={<GameDetail />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user/:userId" element={<User />} />
        </Route>
      </Routes>
    </StrictMode>
  </BrowserRouter>
);
