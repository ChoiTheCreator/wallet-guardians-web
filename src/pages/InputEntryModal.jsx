import { useState } from 'react';
import '../style/InputEntryModal.scss';
import { saveExpense } from '../api/expenseApi';
import { useNavigate, useParams } from 'react-router-dom';

const InputEntryModal = ({ isOpen, onClose }) => {
  const { date } = useParams();
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [storeName, setStoreName] = useState(''); // 명세서 대로 추가
  const [description, setDescription] = useState(''); // 명세서 대로 추가 22
  const navigate = useNavigate();

  const handleSave = async () => {
    const selectedCategory = category === '기타' ? customCategory : category;
  
    if (!selectedCategory || !amount) {
      alert('카테고리와 금액을 모두 입력해주세요!');
      return;
    }
  
    const expenseData = {
      expenseCategory: selectedCategory,
      amount: parseInt(amount, 10),
      storeName: storeName,
      description: description,
    };
  
    try {
      await saveExpense( date,expenseData);
      alert('지출이 성공적으로 저장되었습니다!');
      navigate('/main');
    } catch (error) {
      alert('지출 저장에 실패했습니다.');
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2>{date} 지출 추가</h2>
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

              <button className="save-button" onClick={handleSave}>
                저장하기
              </button>
              <button className="close-button" onClick={onClose}>
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InputEntryModal;