import { useNavigate } from 'react-router-dom';
import outTeamLogo from '../IMG/walletGuardiansLogoReal.png'; //
import {
  FaHome,
  FaUser,
  FaMoneyBill,
  FaChartPie,
  FaSignOutAlt,
  FaFileImage,
} from 'react-icons/fa';
import { SidebarContext } from '../context/SidebarContext';
import '../style/Navbar.scss';
import { useContext } from 'react';

const Navbar = () => {
  const { isSidebarOpen } = useContext(SidebarContext);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div>
      {/* Sidebar */}
      <nav className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="nav-logo" onClick={() => navigate('/main')}>
          <span className="logo-text">
            {' '}
            <img
              src={outTeamLogo}
              style={{ marginBottom: '10px', height: '130px' }}
              alt="Wallet Guardians Logo"
              className="logo-img"
            />
            WalletGuardians
          </span>
        </div>
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
          <li onClick={() => navigate('/')}>
            <FaSignOutAlt className="nav-icon" />
            로그아웃
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
