import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import { GoalContext } from '../context/GoalContext';
import { SidebarContext } from '../context/SidebarContext';
import CountUp from 'react-countup';
import moment from 'moment';
import BudgetEditModal from './BudgetEditModal';

import '../style/MainPage.scss';

const MainPage = () => {
  const { goalAmount, fetchBudget, error } = useContext(GoalContext);
  const { isSidebarOpen } = useContext(SidebarContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleDateClick = (newDate) => {
    const formattedDate = moment(newDate).format('YYYY-MM-DD');
    navigate(`/input-entry/${formattedDate}`);
  };

  const handleBoxClick = (type) => {
    if (goalAmount === null || goalAmount === undefined) {
      navigate('/goal-setting'); // 목표 금액이 설정되지 않은 경우 목표 설정 페이지로 이동
      return;
    }

    if (type === 'goal') {
      setIsModalOpen(true); // 목표 금액 수정 모달 열기
    } else if (type === 'balance') {
      navigate('/graph'); // 잔액 클릭 시 그래프 페이지로 이동
    }
  };

  // 모달 닫기 함수
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Sidebar 크기에 따른 동적 너비 조정
  const sidebarWidth = isSidebarOpen ? 250 : 0;
  const mainWidth = `calc(100vw - ${sidebarWidth}px)`;
  const mainMarginLeft = `${sidebarWidth / 2}px`;

  //goalContext (예산설정여부 관리하는 컨텍스트) 사용자가 갖고왔는지 안왔는지를 확인하는 useEffect
  useEffect(() => {
    fetchBudget();
  }, []);

  return (
    <div className="main-wrapper">
      <div
        className="main-content"
        style={{ width: mainWidth, marginLeft: mainMarginLeft }}
      >
        {/* 목표 금액 & 잔액 (Row 배치) */}
        <div className="goal-balance-container">
          <div onClick={() => handleBoxClick('goal')} className="goal-box">
            <h3 className="goal-title" style={{ color: 'white' }}>
              💰 이 달의 목표 금액
            </h3>
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
                <>
                  <p>목표 금액을 설정하세요!</p>
                </>
              )}
            </p>
          </div>

          <div
            onClick={() => handleBoxClick('balance')}
            className="balance-box"
          >
            <h3 className="balance-title" style={{ color: 'white' }}>
              💳 잔액
            </h3>
            <p className="balance-amount">
              {goalAmount !== null ? (
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
        </div>

        {/* 예산 조회 에러 메시지 */}
        {error && (
          <p className="error-message">❌ 오류 발생: {error.message}</p>
        )}

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

      {/* 목표 금액 수정 모달 */}
      <BudgetEditModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        budgetData={{
          id: 1, // 예제 ID (실제 API 호출 시 변경 필요)
          goalAmount: goalAmount || 0, // 목표 금액이 없으면 0으로 설정
          date: moment().format('YYYY-MM'), // 현재 연월로 설정
        }}
      />
    </div>
  );
};

export default MainPage;
