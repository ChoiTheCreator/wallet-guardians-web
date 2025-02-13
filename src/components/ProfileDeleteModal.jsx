import React, { useState } from 'react';
import { deleteUserAccount } from '../api/userDeleteApi';
import '../style/ProfileDeleteModal.scss';

const ProfileDeleteModal = ({ isOpen, onClose }) => {
  const [errorMessage, setErrorMessage] = useState(null);

  const handleDeleteAccount = async () => {
    try {
      const response = await deleteUserAccount();

      if (response.success) {
        alert('회원 탈퇴가 완료되었습니다.');
        localStorage.clear(); // 저장된 토큰 삭제
        window.location.href = '/'; // 홈으로 이동
      }
    } catch (error) {
      setErrorMessage('회원 탈퇴 실패. 다시 시도해주세요.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>회원 탈퇴</h2>
        <p className="warning-message">⚠️ 정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다!</p>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="modal-buttons">
          <button className="delete-button" onClick={handleDeleteAccount}>탈퇴</button>
          <button className="cancel-button" onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDeleteModal;
