import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SignupPage from './pages/SignUpPage';
import MainPage from './pages/MainPage';
import Layout from './components/Layout'; // Layout import
import './style/MainPage.scss';
const App = () => {
  return (
    <Routes>
      {/* 공통 레이아웃 적용 */}
      <Route element={<Layout />}>
        <Route path="/main" element={<MainPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* 개별 페이지 */}
      <Route path="/" element={<StartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
};

export default App;
