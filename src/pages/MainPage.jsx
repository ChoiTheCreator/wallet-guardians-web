import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import { GoalContext } from '../context/GoalContext';
import '../style/MainPage.scss';
import moment from 'moment'; // 모먼트 설치

const MainPage = () => {
  const { goalAmount } = useContext(GoalContext); //내가 설정한 Context에서 가져옴 (전역 상태관리)
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate('/receipt');

  const handleMovementClick = () => {
    navigate('/receipt')
  }; // 영수증 페이지로 이동

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
          locale='ko-kr' // 한국어 적용
          calendarType='gregory' // 일요일부터 시작하기!
          formatDay={(locale, date) => moment(date).format("D")} // 1일 할때 일 삭제
          formatYear={(locale, date) => moment(date).format("YYYY")} // 네비게이션 눌렀을때 숫자 년도만 보이게
          formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")} // 네비게이션에서 2023. 12 이렇게 보이도록 설정
          showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
          next2Label={null} // +1년 & +10년 이동 버튼 숨기기
          prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
          minDetail="year" // 10년단위 년도 숨기기
          tileContent={({date}) => (
            <div className='expensecontent'>
              <span className='expense'>'지출'</span>
            </div>  
          )}
        />
      </div>

      {/* 지출 작성 모달 */}
      {isModalOpen && (
        <div className="expense-modal">
          <h3>{`${selectedDate.toLocaleDateString()} 지출 내역 작성`}</h3>
          <textarea placeholder="지출 내용을 입력하세요"></textarea>
          <button>저장</button>
          <button onClick={handleCloseModal}>모달 닫기</button>
          <button onClick={handleMovementClick}>지출 입력하러 가기!</button>
        </div>
      )}
    </div>
  );
};

export default MainPage;
