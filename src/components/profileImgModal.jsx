import React, { useState } from 'react';
import '../style/ProfileImgModal.scss';

const ProfileImgModal = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  if (!isOpen) return null;

  // 파일 선택 핸들러
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // Base64 URL로 미리보기 설정
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close-btn" onClick={onClose}>
          ×
        </button>
        <h2 className="modal-title">프로필 사진 변경</h2>

        <div className="file-upload-box">
          {/* 파일 선택 버튼 */}
          <label className="custom-file-upload">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            파일 선택
          </label>

          {/* 파일명 표시 */}
          <span className="file-name">
            {selectedFile ? selectedFile.name : '선택된 파일 없음'}
          </span>

          {/* 파일 미리보기 */}
          <div className="image-preview">
            {preview ? (
              <img src={preview} alt="미리보기" className="preview-image" />
            ) : (
              <div className="placeholder">미리보기 없음</div>
            )}
          </div>
        </div>

        <button className="modal-btn">업로드</button>
      </div>
    </div>
  );
};

export default ProfileImgModal;
