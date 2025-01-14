import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../style/InputEntryPage.scss';
import moment from 'moment';
import backbutton from '../buttonIMG/pngwing.com.png';

const InputEntryPage = () => {
  const { date } = useParams();
  const navigate = useNavigate();
  const selectedDate = new Date(date);

  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [amount, setAmount] = useState('');

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

  // 메인 페이지로 돌아가기
  const handleBackClick = () => {
    navigate('/main');
  };

  const handleSave = () => {
    const selectedCategory = category === '기타' ? customCategory : category;
    if (!selectedCategory || !amount) {
      alert('카테고리와 금액을 모두 입력해주세요!');
      return;
    }

    alert(`날짜: ${selectedDate.toLocaleDateString('ko-KR')}\n카테고리: ${selectedCategory}\n금액: ${amount}원`);
  };

  return (
    <div className="input-entry-page">
      {/* 제목 가운데 정렬 */}
      <h1>{selectedDate.toLocaleDateString('ko-KR')} 가계부 작성</h1>

      {/* 뒤로가기 버튼 (달력 오른쪽 상단에 배치) */}
      <button className="back-button" onClick={handleBackClick} title="뒤로가기">
        <img src={backbutton} alt="뒤로가기" />
      </button>

      <div className="calendar-container">
        <Calendar
          onClickDay={handleDateClick}
          value={selectedDate}
          locale="ko-KR"
          calendarType="gregory"
          formatDay={(locale, date) => moment(date).format("D")}
          formatYear={(locale, date) => moment(date).format("YYYY")}
          formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
          showNeighboringMonth={false}
          next2Label={null}
          prev2Label={null}
          minDetail="year"
        />
      </div>

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

        <button className="receipt-button" onClick={handleReceiptPage}>
          🧾
        </button>
      </div>
    </div>
  );
};

export default InputEntryPage;

