import React, { useState } from "react";
import { changePassword } from "../api/passwordChangeApi";
import "../style/ProfilePwModal.scss";
import GlobalModalMessage from "./GlobalModalMesaage"; 

const ProfilePwModal = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState(""); 
  const [modalMessage, setModalMessage] = useState(null); 

  if (!isOpen) return null;

  const handleChangePassword = async () => {
    if (!password || !newPassword || !confirmNewPassword) {
      setModalMessage({ type: "error", message: "모든 필드를 입력해주세요." });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setModalMessage({ type: "error", message: "새 비밀번호가 일치하지 않습니다!" });
      return;
    }

    try {
      const response = await changePassword(password, newPassword);

      if (response.success) {
        setModalMessage({ type: "success", message: "비밀번호가 변경되었습니다!" });

        // ✅ 입력 필드 초기화
        setPassword("");
        setNewPassword("");
        setConfirmNewPassword("");

        setTimeout(() => {
          setModalMessage(null);
          onClose();
        }, 2000);
      }
    } catch (error) {
      if (error.response?.data?.code === 4001) {
        setModalMessage({ type: "error", message: "현재 비밀번호가 틀렸습니다." });
      } else if (error.response?.data?.code === 4004) {
        setModalMessage({ type: "error", message: "새 비밀번호가 기존 비밀번호와 동일합니다." });
      } else {
        setModalMessage({ type: "error", message: "비밀번호 변경 실패. 다시 시도해주세요." });
      }
    }
  };

  return (
    <div className="modal-overlay">
      {/* ✅ 글로벌 모달 메시지 추가 */}
      {modalMessage && <GlobalModalMessage type={modalMessage.type} message={modalMessage.message} />}

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
