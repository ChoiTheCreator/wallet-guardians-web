import { useNavigate } from 'react-router-dom';
//Navbar 부분은 메인페이지 scss 스타일에 종속
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
          <li onClick={() => navigate('/main')}>Home</li>
          <li onClick={() => navigate('/profile')}>내정보</li>
          <li onClick={() => navigate('/income')}>수입내역</li>
          <li onClick={() => navigate('/expenses')}>지출내역</li>
          <li onClick={() => navigate('/graph')}>용도별 그래프</li>
          <li onClick={() => navigate('/logout')}>로그아웃</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
