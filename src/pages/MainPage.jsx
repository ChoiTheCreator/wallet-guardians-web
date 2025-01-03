import React, { useState } from 'react';

import '../style/MainPage.scss';
import Navbar from '../components/Navbar';
const MainPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="main-page">
      {/* 햄버거 버튼 */}
      <button
        className={`hamburger-button ${isSidebarOpen ? 'shifted' : ''}`}
        onClick={toggleSidebar}
      >
        ☰
      </button>
      <Navbar isSidebarOpen={isSidebarOpen}></Navbar>
      {/* Main Content */}
      <div className={`content ${isSidebarOpen ? 'shifted' : ''}`}>
        <h1>Main Content Area</h1>
        <p>여기에 메인 콘텐츠가 표시됩니다.</p>
      </div>
    </div>
  );
};

export default MainPage;
