import { useNavigate } from 'react-router-dom';

import {
  FaHome,
  FaUser,
  FaMoneyBill,
  FaChartPie,
  FaSignOutAlt,
  FaFileImage,
} from 'react-icons/fa'; // 아이콘 import
import { SidebarContext } from '../context/SidebarContext';
import '../style/Navbar.scss';
import { useContext } from 'react';

const Navbar = () => {
  const { isSidebarOpen } = useContext(SidebarContext);
  const navigate = useNavigate();
  return (
    <div>
      {/* Sidebar */}
      <nav className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="nav-logo" onClick={() => navigate('/')}>
          BudgetGuardians
        </div>
        <ul className="nav-menu">
          {/* 스타일 컴포넌트로 쪼갤것인가? const navBarBtn  -> 바꿀만함  리액트 아이콘 이름도 바꿔버려서
          블로그에 써야징 ㅋㅋ ㅅㄱㅇ ㅋㅋ
          성능개선 할수있어용 코드차원에서 좋아짐 */}
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
          <li onClick={() => navigate('/receipt-picture')}>
            <FaFileImage style={{ marginRight: '10px' }} />
            영수증 사진 모음
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
