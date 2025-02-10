import { useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaUser,
  FaMoneyBill,
  FaChartPie,
  FaSignOutAlt,
  FaFileImage,
  FaShieldAlt,
} from 'react-icons/fa'; // FaWallet 대체 가능
import { SidebarContext } from '../context/SidebarContext';
import '../style/Navbar.scss';
import { useContext } from 'react';
import { logout } from '../api/authApi';

//유저 정보 navbar에 표기하기 위한 컴포넌트 (use getuserInfo API)
import UserInfoComponent from './UserInfo.jsx';

const Navbar = () => {
  const { isSidebarOpen } = useContext(SidebarContext);
  const navigate = useNavigate();

  //로그아웃 하는 로직은 navbar에 존재.
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* Sidebar */}
      <nav className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="nav-logo" onClick={() => navigate('/main')}>
          <span className="logo-text">
            <FaShieldAlt
              style={{
                height: '120px',
                marginBottom: '10px',
                fontSize: '90px',
                color: '#fff',
              }} // 크기 및 색상 조정
              className="logo-img"
            />
            WalletGuardians
          </span>
        </div>
        <UserInfoComponent></UserInfoComponent>
        <ul className="nav-menu">
          <li onClick={() => navigate('/main')}>
            <FaHome className="nav-icon" />
            Home
          </li>
          <li onClick={() => navigate('/profile')}>
            <FaUser className="nav-icon" />
            내정보
          </li>
          <li onClick={() => navigate('/income')}>
            <FaMoneyBill className="nav-icon" />
            수입내역
          </li>
          <li onClick={() => navigate('/expenses')}>
            <FaMoneyBill className="nav-icon" />
            지출내역
          </li>
          <li onClick={() => navigate('/graph')}>
            <FaChartPie className="nav-icon" />
            용도별 그래프
          </li>
          <li onClick={() => navigate('/receipt-picture')}>
            <FaFileImage className="nav-icon" />
            영수증 사진 모음
          </li>
          <li onClick={handleLogout}>
            <FaSignOutAlt className="nav-icon" />
            로그아웃
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
