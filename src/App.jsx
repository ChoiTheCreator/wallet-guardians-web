import React from 'react';
import { Routes, Route } from 'react-router-dom'; // BrowserRouter 제거
import StartPage from './pages/StartPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignUpPage';
import MainPage from './pages/MainPage';
const App = () => {
  return (
    <Routes>
      <Route path="/main" element={<MainPage />} />
      <Route path="/" element={<StartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
};

export default App;
