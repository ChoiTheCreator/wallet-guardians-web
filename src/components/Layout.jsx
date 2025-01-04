import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import HamburgerBtn from '../components/HamburgerBtn';
import Navbar from '../components/Navbar';
import '../style/MainPage.scss';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  console.log('Layout 렌더링'); // 확인용 로그

  return (
    <div className="layout-container">
      <HamburgerBtn
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Navbar isSidebarOpen={isSidebarOpen} />

      <div className={`content ${isSidebarOpen ? 'shifted' : ''}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
