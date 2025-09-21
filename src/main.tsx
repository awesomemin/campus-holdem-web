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
import GameApply from './pages/GameApply.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import Rankings from './pages/Rankings.tsx';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <BrowserRouter>
      <StrictMode>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="game">
              <Route path=":gameId" element={<GameDetail />} />
              <Route path=":gameId/apply" element={<GameApply />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/user/:userId" element={<User />} />
            <Route path="/rankings" element={<Rankings />} />
          </Route>
        </Routes>
      </StrictMode>
    </BrowserRouter>
  </AuthProvider>
);
