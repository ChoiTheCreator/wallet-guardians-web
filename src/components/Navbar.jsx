import { useNavigate } from 'react-router-dom';

import {
  FaHome,
  FaUser,
  FaMoneyBill,
  FaChartPie,
  FaSignOutAlt,
} from 'react-icons/fa'; // 아이콘 import
import '../style/Navbar.scss';

const Navbar = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  return (
    <div>
      {/* Sidebar */}
      <nav className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="nav-logo" onClick={() => navigate('/')}>
          BudgetGuardians
        </div>
        <ul className="nav-menu">
          <li onClick={() => navigate('/main')}>
            <FaHome style={{ marginRight: '10px' }} />
            Home
          </li>
          <li onClick={() => navigate('/profile')}>
            <FaUser style={{ marginRight: '10px' }} />
            내정보
          </li>
          <li onClick={() => navigate('/income')}>
            <FaMoneyBill style={{ marginRight: '10px' }} />
            수입내역
          </li>
          <li onClick={() => navigate('/expenses')}>
            <FaMoneyBill style={{ marginRight: '10px' }} />
            지출내역
          </li>
          <li onClick={() => navigate('/graph')}>
            <FaChartPie style={{ marginRight: '10px' }} />
            용도별 그래프
          </li>
          <li onClick={() => navigate('/')}>
            <FaSignOutAlt style={{ marginRight: '10px' }} />
            로그아웃
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
