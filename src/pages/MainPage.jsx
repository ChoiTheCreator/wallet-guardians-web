import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import { GoalContext } from '../context/GoalContext';
import { SidebarContext } from '../context/SidebarContext'; // SidebarContext 추가
import '../style/MainPage.scss';
import moment from 'moment';

const MainPage = () => {
  const { goalAmount } = useContext(GoalContext);
  const { isSidebarOpen } = useContext(SidebarContext); // Sidebar 상태 가져오기
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  const handleDateClick = (newDate) => {
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const day = String(newDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    navigate(`/input-entry/${formattedDate}`);
  };

  const handleBoxClick = () => {
    goalAmount ? navigate('/profile') : navigate('/goal-setting');
  };

  // 예시 데이터 (실제 가계부 데이터를 연동하면 여기에 변경 가능)
  const usedAmount = 150000;
  const remainingAmount = goalAmount ? goalAmount - usedAmount : null;

  // Sidebar의 너비를 감안하여 동적으로 width 계산
  const sidebarWidth = isSidebarOpen ? 2000 : 0; // Sidebar 열려 있으면 250px, 닫히면 0px
  const mainWidth = `calc(100vw - ${sidebarWidth}px)`;

  return (
    <div className="main-content" style={{ width: mainWidth }}>
      {/* 목표 금액 & 잔액 (Row 배치) */}
      <div className="goal-balance-container">
        <div onClick={handleBoxClick} className="goal-box">
          <h3 className="goal-title">💰 목표 금액</h3>
          <p className="goal-amount">
            {goalAmount !== null && goalAmount !== undefined
              ? `${goalAmount.toLocaleString()}원`
              : '목표 금액을 설정하세요!'}
          </p>
        </div>

        <div onClick={handleBoxClick} className="balance-box">
          <h3 className="balance-title">💳 잔액</h3>
          <p className="balance-amount">
            {remainingAmount !== null
              ? `${remainingAmount.toLocaleString()}원`
              : '목표 금액을 설정하세요!'}
          </p>
        </div>
      </div>

      {/* 달력 */}
      <div className="calendar-container">
        <Calendar
          onClickDay={handleDateClick}
          value={selectedDate}
          locale="ko-kr"
          calendarType="gregory"
          formatDay={(locale, date) => moment(date).format('D')}
          formatYear={(locale, date) => moment(date).format('YYYY')}
          formatMonthYear={(locale, date) => moment(date).format('YYYY. MM')}
          showNeighboringMonth={false}
          next2Label={null}
          prev2Label={null}
          minDetail="year"
          tileContent={({ date }) => <div className="expensecontent"></div>}
        />
      </div>
    </div>
  );
};

export default MainPage;
