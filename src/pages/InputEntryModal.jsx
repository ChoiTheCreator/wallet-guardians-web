import React, { useState } from 'react';
import '../style/InputEntryModal.scss';

const InputEntryModal = ({ isOpen, onClose }) => {
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [storeName, setStoreName] = useState(''); // 명세서 대로 추가
  const [description, setDescription] = useState(''); // 명세서 대로 추가 22

  const handleSave = async () => {
    const selectedCategory = category === '기타' ? customCategory : category;
    if (!selectedCategory || !amount) {
      alert('카테고리와 금액을 모두 입력해주세요!');
      return;
    }

    const expenseData = {
      expenseCategory: selectedCategory,
      amount: parseInt(amount, 10),
      storeName: storeName, // 가게 상호명
      description: description, // 메모
    };

    try {
      const response = await axios.post(
        `http://백엔드서버주소/expense/${date}`,
        expenseData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        alert('지출이 성공적으로 저장되었습니다!');
        navigate('/main'); // 저장 후 메인 페이지로 이동
      } else {
        alert('지출 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('지출 저장 오류:', error);
      alert('서버와 통신 중 문제가 발생했습니다.');
    }
  }; // 백엔드로 보내는 수동 지출 입력 로직

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>지출 추가</h2>
        <div className="entry-form">
          <select
            value={category}
            style={{ marginBottom: '20px' }}
            onChange={(e) => setCategory(e.target.value)}
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
              placeholder="카테고리 입력"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
            />
          )}

          <input
            type="number"
            placeholder="금액을 입력하세요 (₩)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <input
            type="text"
            placeholder="상호명을 입력하세요"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />

          <input
            type="text"
            placeholder="메모를 추가하세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            className="save-button"
            onClick={handleSave}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%', // 버튼 높이에 맞춰 정렬
            }}
          >
            <span style={{ boxSizing: 'border-box' }}>저장하기</span>
          </button>
          <button className="close-button" onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputEntryModal;