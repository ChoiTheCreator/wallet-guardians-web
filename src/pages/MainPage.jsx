import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import { GoalContext } from '../context/GoalContext';
import { SidebarContext } from '../context/SidebarContext';
import CountUp from 'react-countup'; // 숫자 애니메이션 라이브러리 추가
import '../style/MainPage.scss';
import moment from 'moment';

const MainPage = () => {
  const { goalAmount } = useContext(GoalContext);
  const { isSidebarOpen } = useContext(SidebarContext);
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

  // Sidebar 크기에 따른 동적 너비 조정
  const sidebarWidth = isSidebarOpen ? 250 : 0;
  const mainWidth = `calc(100vw - ${sidebarWidth}px)`;
  const mainMarginLeft = `${sidebarWidth / 2}px`;

  // 예제: 사용된 금액
  const usedAmount = 150000;
  const remainingAmount = goalAmount ? goalAmount - usedAmount : null;

  return (
    <div className="main-wrapper">
      <div
        className="main-content"
        style={{ width: mainWidth, marginLeft: mainMarginLeft }}
      >
        {/* 목표 금액 & 잔액 (Row 배치) */}
        <div className="goal-balance-container">
          <div onClick={handleBoxClick} className="goal-box">
            <h3 className="goal-title">💰 이 달의 목표 금액</h3>
            <p className="goal-amount">
              {goalAmount !== null && goalAmount !== undefined ? (
                <CountUp
                  start={0}
                  end={goalAmount}
                  duration={1.5}
                  separator=","
                  suffix="원"
                />
              ) : (
                '목표 금액을 설정하세요!'
              )}
            </p>
          </div>

          <div onClick={handleBoxClick} className="balance-box">
            <h3 className="balance-title">💳 잔액</h3>
            <p className="balance-amount">
              {remainingAmount !== null ? (
                <CountUp
                  start={0}
                  end={remainingAmount}
                  duration={1.5}
                  separator=","
                  suffix="원"
                />
              ) : (
                '목표 금액을 설정하세요!'
              )}
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
    </div>
  );
};

export default MainPage;
