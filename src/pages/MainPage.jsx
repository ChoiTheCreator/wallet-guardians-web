import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import { GoalContext } from '../context/GoalContext';
import '../style/MainPage.scss';
const MainPage = () => {
  const { goalAmount } = useContext(GoalContext); //내가 설정한 Context에서 가져옴 (전역 상태관리)
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true); // 모달 열기
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); //모달 닫기
  };
  return (
    <div className="main-content">
      <h2>
        기존 선정 예산:{' '}
        {goalAmount
          ? `${goalAmount.toLocaleString()}원`
          : '목표 금액을 설정해 주세요'}
      </h2>
      <div className="calendar-container">
        <Calendar
          onClickDay={handleDateClick} // 날짜 클릭 시 모달 열기
          value={selectedDate}
        />
      </div>

      {/* 지출 작성 모달 */}
      {isModalOpen && (
        <div className="expense-modal">
          <h3>{`${selectedDate.toLocaleDateString()} 지출 내역 작성`}</h3>
          <button onClick={handleCloseModal}>모달 닫기</button>
          <textarea placeholder="지출 내용을 입력하세요"></textarea>
          <button>저장</button>
        </div>
      )}
    </div>
  );
};

export default MainPage;
