import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import { GoalContext } from '../context/GoalContext';
import '../style/MainPage.scss';
import moment from 'moment'; // 모먼트 설치

const MainPage = () => {
  const { goalAmount } = useContext(GoalContext); //내가 설정한 Context에서 가져옴 (전역 상태관리)
  const [selectedDate, setSelectedDate] = useState(new Date());
// 모달 삭제 후 피그마 바탕으로 새로운페이지 추가 확인 요망
  const navigate = useNavigate();

  const handleDateClick = (newDate) => {
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const day = String(newDate.getDate()).padStart(2, '0');
    
    const formattedDate = `${year}-${month}-${day}`;
    navigate(`/input-entry/${formattedDate}`);
  }; // 선택하면 지정한 날짜의 페이지로 이동함
  

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
    </div>
  );
};

export default MainPage;
