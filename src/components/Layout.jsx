import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HamburgerBtn from '../components/HamburgerBtn';
import FriendIcon from './FriendBtn';
import AuthenticatedComponent from '../auth/AuthenticatedComponent'; // 인증 컴포넌트 import

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  //일단 목표설정되었다고 가정. (아직 관련 코드를 안짜서)
  const isGoalSet = true; // 여기에 실제 설정 여부 확인 로직 추가

  return (
    <AuthenticatedComponent isGoalSet={isGoalSet}>
      <div className="layout-container">
        <HamburgerBtn
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Navbar isSidebarOpen={isSidebarOpen} />
        <FriendIcon />
        <div className={`content ${isSidebarOpen ? 'shifted' : ''}`}>
          <Outlet />
        </div>
      </div>
    </AuthenticatedComponent>
  );
};

export default Layout;
