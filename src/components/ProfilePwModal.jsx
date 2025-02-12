import React, { useState } from "react";
import { changePassword } from "../api/passwordChangeApi";
import "../style/ProfilePwModal.scss";

const ProfilePwModal = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChangePassword = async () => {
    if (!password || !newPassword || !confirmNewPassword) {
      setErrorMessage("모든 필드를 입력해주세요.");
      setSuccessMessage(""); // ✅ 성공 메시지 초기화
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setErrorMessage("새 비밀번호가 일치하지 않습니다!");
      setSuccessMessage(""); // ✅ 성공 메시지 초기화
      return;
    }

    try {
      const response = await changePassword(password, newPassword);

      if (response.success) {
        setSuccessMessage("비밀번호가 변경되었습니다.");
        setErrorMessage(""); // ✅ 에러 메시지 초기화

        // ✅ 입력 필드 초기화
        setPassword("");
        setNewPassword("");
        setConfirmNewPassword(""); // 🔥 올바른 변수명 사용

        setTimeout(() => {
          setSuccessMessage(null);
          onClose();
        }, 2000);
      }
    } catch (error) {
      setSuccessMessage(""); // ✅ 성공 메시지 초기화
      if (error.response?.data?.code === 4001) {
        setErrorMessage("현재 비밀번호가 틀렸습니다.");
      } else if (error.response?.data?.code === 4004) {
        setErrorMessage("새 비밀번호가 기존 비밀번호와 동일합니다.");
      } else {
        setErrorMessage("비밀번호 변경 실패. 다시 시도해주세요.");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>비밀번호 변경</h2>

        <div className="input-container"> 
          <input
            type="password"
            placeholder="현재 비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="새 비밀번호"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="새 비밀번호 확인" 
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>

        {/* 에러 & 성공 메시지 출력 */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <div className="modal-buttons">
          <button className="confirm-button" onClick={handleChangePassword}>
            변경
          </button>
          <button className="cancel-button" onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePwModal;
