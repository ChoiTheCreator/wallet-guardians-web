import React, { useState } from "react";
import { deleteUserAccount } from "../api/userDeleteApi";
import "../style/ProfileDeleteModal.scss";
import GlobalModalMessage from "./GlobalModalMesaage"; // ✅ 글로벌 모달 추가

const ProfileDeleteModal = ({ isOpen, onClose }) => {
  const [modalMessage, setModalMessage] = useState(null); // ✅ 글로벌 모달 메시지 상태 추가

  if (!isOpen) return null;

  const handleDeleteAccount = async () => {
    try {
      const response = await deleteUserAccount();

      if (response.success) {
        setModalMessage({ type: "delete", message: "회원 탈퇴가 완료되었습니다." });

        setTimeout(() => {
          localStorage.clear(); // ✅ 저장된 토큰 삭제
          window.location.href = "/"; // ✅ 홈으로 이동
        }, 2000);
      }
    } catch (error) {
      setModalMessage({ type: "error", message: "회원 탈퇴 실패. 다시 시도해주세요." });
    }
  };

  return (
    <div className="modal-overlay">
      {/* ✅ 글로벌 모달 메시지 추가 */}
      {modalMessage && <GlobalModalMessage type={modalMessage.type} message={modalMessage.message} />}

      <div className="modal-container">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>회원 탈퇴</h2>
        <p className="warning-message">⚠️ 정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다!</p>

        <div className="modal-buttons">
          <button className="delete-button" onClick={handleDeleteAccount}>탈퇴</button>
          <button className="cancel-button" onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDeleteModal;
