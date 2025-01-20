// src/context/SidebarContext.jsx
import { createContext, useState, useContext } from 'react';

// SidebarContext 생성
const SidebarContext = createContext();

// SidebarProvider 컴포넌트 생성
export const SidebarProvider = ({ children }) => {
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

// Context 사용을 위한 커스텀 훅
export const useSidebar = () => useContext(SidebarContext);
