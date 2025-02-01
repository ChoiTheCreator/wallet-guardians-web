import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SignupPage from './pages/SignupPage';
import NotFoundPage from './pages/NotFoundPage';
import IncomePage from './pages/IncomePage';
import MainPage from './pages/MainPage';
import ExpensePage from './pages/ExpensePage';
import InitialPage from './pages/InitialPage';
import GoalSettingPage from './pages/GoalSettingPage';
import GraphPage from './pages/GraphPage';
import { GoalProvider } from './context/GoalContext'; // GoalContext import
import Layout from './components/Layout'; // Layout import
import './style/MainPage.scss';
import InputEntryPage from './pages/InputEntryPage'; // inputentry 페이지 추가
import ReceiptPicPage from './pages/ReceiptPicPage';
import { SidebarProvider } from './context/SidebarContext';
import { FriendProvider } from './context/FriendContext';
import FriendModal from './components/FriendModal';

const App = () => {
  return (
    <SidebarProvider>
      <GoalProvider>
        <FriendProvider>
          {' '}
          {/* GoalProvide, r로 전체 라우트 감싸기 */}
          <Routes>
            {/* 공통 레이아웃 적용되는 페이지 */}
            <Route element={<Layout />}>
              <Route path="/main" element={<MainPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/income" element={<IncomePage />} />
              <Route path="/expenses" element={<ExpensePage />} />
              <Route path="/graph" element={<GraphPage />} />
              <Route path="/goal-setting" element={<GoalSettingPage />} />
              {/* 달력 선택하면 크게 보이는 페이지 추가*/}
              <Route path="/input-entry/:date" element={<InputEntryPage />} />
              <Route path="/receipt-picture" element={<ReceiptPicPage />} />
            </Route>
            {/* 개별 페이지 */}
            <Route path="/initial" element={<InitialPage />} />
            <Route path="/" element={<StartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="*" element={<NotFoundPage />} /> {/* 404 페이지 */}
          </Routes>
          <FriendModal />
        </FriendProvider>
      </GoalProvider>
    </SidebarProvider>
  );
};

export default App; //
