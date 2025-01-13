import React, {useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../style/InputEntryPage.scss';
import moment from 'moment';

const InputEntryPage = () => {
  const { date } = useParams(); // URL에서 날짜 받아오기
  const navigate = useNavigate();
  const selectedDate = new Date(date);

  const [category, setCategory] = useState('');  // 선택된 카테고리
  const [customCategory, setCustomCategory] = useState('');  // 기타 입력값
  const [amount, setAmount] = useState('');  // 금액 입력값

  // 날짜 클릭 시 해당 날짜 페이지로 이동
  const handleDateClick = (newDate) => {
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const day = String(newDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    navigate(`/input-entry/${formattedDate}`);
  };

  // 영수증 페이지로 이동
  const handleReceiptPage = () => {
    navigate(`/receipt`);
  };

  const handleBackClick = () => {
    navigate('/main'); // 메인 페이지로 돌아가기
  };

  const handleSave = () => {
    const selectedCategory = category === '기타' ? customCategory : category;
    if (!selectedCategory || !amount) {
      alert('카테고리와 금액을 모두 입력해주세요!');
      return;
    }

    alert(`날짜: ${selectedDate.toLocaleDateString('ko-KR')}\n카테고리: ${selectedCategory}\n금액: ${amount}원`);
    // 이후 실제 저장 로직 추가 가능
  };

  return (
    <div className="input-entry-page">
      <button className="back-button" onClick={handleBackClick}>← 돌아가기</button>
      <h1>{selectedDate.toLocaleDateString('ko-KR')} 가계부 작성</h1>

      <div className="calendar-container">
        <Calendar
          onClickDay={handleDateClick}
          value={selectedDate}
          locale="ko-KR"
          calendarType="gregory"
          formatDay={(locale, date) => moment(date).format("D")} // 1일 할때 일 삭제
          formatYear={(locale, date) => moment(date).format("YYYY")} // 네비게이션 눌렀을때 숫자 년도만 보이게
          formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")} // 네비게이션에서 2023. 12 이렇게 보이도록 설정
          showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
          next2Label={null} // +1년 & +10년 이동 버튼 숨기기
          prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
         minDetail="year" // 10년단위 년도 숨기기
        />
      </div>

        {/* 가계부 입력 폼과 영수증 버튼 */}
        <div className="form-button-wrapper">
          <div className="entry-form">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="category-select"
            >
              <option value="">카테고리를 선택하세요</option>
              <option value="식비">🍽️ 식비</option>
              <option value="교통비">🚗 교통비</option>
              <option value="쇼핑">🛍️ 쇼핑</option>
              <option value="주거비">🏠 주거비</option>
              <option value="취미/여가">🎨 취미/여가</option>
              <option value="기타">✏️ 기타</option>
            </select>

            {category === '기타' && (
              <input
                type="text"
                placeholder="직접 입력하세요"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                className="custom-category-input"
              />
            )}

            <input
              type="number"
              placeholder="금액을 입력하세요 (₩)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="amount-input"
            />

            <button className="save-button" onClick={handleSave}>
              저장하기
            </button>
          </div>

          {/* 영수증 페이지로 이동 버튼 */}
          <button className="receipt-button" onClick={handleReceiptPage}>
            🧾
          </button>
        </div>
      </div>
  );
};

export default InputEntryPage;
