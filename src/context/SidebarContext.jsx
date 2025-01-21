// src/context/SidebarContext.jsx
import { createContext, useState, useContext } from 'react';

// SidebarContext 생성
export const SidebarContext = createContext();

// SidebarProvider 컴포넌트 생성
export const SidebarProvider = ({ children }) => {
  //이 상태 이름 그대로 가져와야함
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
