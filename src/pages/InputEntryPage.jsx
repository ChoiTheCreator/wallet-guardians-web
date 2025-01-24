import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../style/InputEntryPage.scss';
import moment from 'moment';
import backbutton from '../IMG/backbutton.png';

const InputEntryPage = () => {
  const { date } = useParams();
  const navigate = useNavigate();
  const selectedDate = new Date(date);

  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [storeName, setStoreName] = useState(''); // 명세서 대로 추가
  const [description, setDescription] = useState(''); // 명세서 대로 추가 22

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

  const handleSave = async () => {
    const selectedCategory = category === '기타' ? customCategory : category;
    if (!selectedCategory || !amount) {
      alert('카테고리와 금액을 모두 입력해주세요!');
      return;
    }
  
    const expenseData = {
      expenseCategory: selectedCategory,
      amount: parseInt(amount, 10),
      storeName: storeName,  // 가게 상호명 
      description: description  // 메모 
    };
  
    try {
      const response = await axios.post(`http://백엔드서버주소/expense/${date}`, expenseData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.data.success) {
        alert('지출이 성공적으로 저장되었습니다!');
        navigate('/main');  // 저장 후 메인 페이지로 이동
      } else {
        alert('지출 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('지출 저장 오류:', error);
      alert('서버와 통신 중 문제가 발생했습니다.');
    }
  }; // 백엔드로 보내는 수동 지출 입력 로직

  return (
    <div className="input-entry-page">
      {/* 제목 가운데 정렬 */}
      <h1>{selectedDate.toLocaleDateString('ko-KR')} 가계부 작성</h1>

      <p>이제 지출을 추가해보세요!</p>

      {/* 뒤로가기 버튼 (달력 오른쪽 상단에 배치) */}
      <button
        className="back-button"
        onClick={handleBackClick}
        title="뒤로가기"
      >
        <img src={backbutton} alt="뒤로가기" />
      </button>
      <div className="content-wrapper">
        <div className="calendar-container">
          <Calendar
            onClickDay={handleDateClick}
            value={selectedDate}
            locale="ko-KR"
            calendarType="gregory"
            formatDay={(locale, date) => moment(date).format('D')}
            formatYear={(locale, date) => moment(date).format('YYYY')}
            formatMonthYear={(locale, date) => moment(date).format('YYYY. MM')}
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

            <input
              type="text"
              placeholder="상호명을 입력하세요 "
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="storename-input"
            />

            <input
              type="text"
              placeholder=" 메모를 추가하세요 "
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="description-input"
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
    </div>
  );
};

export default InputEntryPage;
