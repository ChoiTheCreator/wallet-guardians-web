import React, { useCallback, useContext } from 'react';
import '../style/HamburgerBtn.scss';
import { SidebarContext } from '../context/SidebarContext';
const HamburgerBtn = () => {
  const { isSidebarOpen, toggleSidebar } = useContext(SidebarContext);
  console.log(isSidebarOpen);

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
