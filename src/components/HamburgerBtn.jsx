import React from 'react';
import '../style/HamburgerBtn.scss';
const HamburgerBtn = ({ setIsSidebarOpen, isSidebarOpen }) => {
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* 햄버거 버튼 */}
      <button
        className={`hamburger-button ${isSidebarOpen ? 'shifted' : ''}`}
        onClick={toggleSidebar}
      >
        ☰
      </button>
    </div>
  );
};

export default HamburgerBtn;
