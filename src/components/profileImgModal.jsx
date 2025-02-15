import React, { useState } from "react";
import "../style/ProfileImgModal.scss";
import { uploadProfilePicture, updateProfilePicture, deleteProfilePicture } from "../api/userImgApi";
import GlobalModalMessage from "./GlobalModalMesaage";

const ProfileImgModal = ({ isOpen, onClose, onProfileUpdate, hasProfileImage }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);

  if (!isOpen) return null;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setModalMessage({ type: "error", message: "파일을 선택하세요!" });
      return;
    }
    setLoading(true);

    try {
      let response;
      if (hasProfileImage) {
        response = await updateProfilePicture(selectedFile); // ✅ 기존 이미지 변경(PATCH)
      } else {
        response = await uploadProfilePicture(selectedFile); // ✅ 새 이미지 업로드(POST)
      }

      setModalMessage({ type: "success", message: "프로필 사진이 업데이트되었습니다!" });

      // 프로필 사진 변경 후 UI 업데이트
      if (response.data) {
        onProfileUpdate(response.data);
      }

      setTimeout(() => {
        setModalMessage(null);
        onClose();
      }, 2000);
    } catch (error) {
      setModalMessage({ type: "error", message: "업로드에 실패했습니다. 다시 시도해주세요." });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProfilePicture = async () => {
    setLoading(true);
    try {
      await deleteProfilePicture();
      setModalMessage({ type: "success", message: "기본 이미지로 변경되었습니다!" });

      // 프로필 이미지 초기화
      onProfileUpdate(null);

      setTimeout(() => {
        setModalMessage(null);
        onClose();
      }, 2000);
    } catch (error) {
      setModalMessage({ type: "error", message: "이미지 삭제 실패!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      {/* 글로벌 모달 메시지 추가 */}
      {modalMessage && <GlobalModalMessage type={modalMessage.type} message={modalMessage.message} />}

      <div className="modal-container">
        <button className="modal-close-btn" onClick={onClose}>×</button>
        <h2 className="modal-title">프로필 사진 변경</h2>

        <div className="file-upload-box">
          <label className="custom-file-upload">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            파일 선택
          </label>
          <span className="file-name">
            {selectedFile ? selectedFile.name : "선택된 파일 없음"}
          </span>
          {preview && (
            <div className="image-preview">
              <img src={preview} alt="미리보기" className="preview-image" />
            </div>
          )}
        </div>

        {/* ✅ 사진 용량 제한 문구 추가 */}
        <p className="file-size-info">사진 용량은 5MB 이내로 제한합니다.</p>

        {/* 버튼 영역 */}
        <div className="modal-buttons">
          <button className="modal-btn upload-btn" onClick={handleUpload} disabled={loading}>
            {loading ? "업로드 중..." : "업로드"}
          </button>
          
          <button className="modal-btn default-btn" onClick={handleDeleteProfilePicture} disabled={loading}>
            {loading ? "변경 중..." : "기본 이미지로 변경"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileImgModal;
