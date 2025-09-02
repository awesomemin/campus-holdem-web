import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Home from './pages/Home.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from './pages/Layout.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </StrictMode>
  </BrowserRouter>
);
