import React, { useState } from 'react';
import '../style/ProfilePwModal.scss';

const ProfilePwModal = ({ isOpen, onClose }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close-btn" onClick={onClose}>×</button>
        <h2 className="modal-title">비밀번호 변경</h2>
        <input 
          type="password" 
          placeholder="새 비밀번호" 
          className="input-field"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="비밀번호 확인" 
          className="input-field"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="modal-btn">변경</button>
      </div>
    </div>
  );
};

export default ProfilePwModal;
