import React, { useState } from 'react';
import '../style/FriendAddModal.scss';

const FriendAddModal = ({ isOpen, onClose }) => {
  const [friendId, setFriendId] = useState('');

  const handleInputChange = (e) => setFriendId(e.target.value);

  const handleSubmit = () => {
    if (friendId.trim()) {
      alert(`친구 아이디 "${friendId}"가 추가되었습니다!`);
      setFriendId(''); // 입력 필드 초기화
      onClose(); // 모달 닫기
    } else {
      alert('아이디를 입력해 주세요!');
    }
  };

  if (!isOpen) return null; // 모달이 닫힌 경우 렌더링하지 않음

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>친구 추가하기</h3>
        <input
          type="text"
          value={friendId}
          onChange={handleInputChange}
          placeholder="친구 아이디를 입력하세요"
        />
        <div className="modal-buttons">
          <button className="confirm-button" onClick={handleSubmit}>
            추가
          </button>
          <button className="cancel-button" onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendAddModal;
