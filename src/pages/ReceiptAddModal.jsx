import { useState } from 'react';
import '../style/InputEntryModal.scss'; // 스타일 재사용
import { uploadReceiptImage } from '../api/receiptApi';
import { useParams, useNavigate } from 'react-router-dom';

const ReceiptModal = ({ isOpen, onClose }) => {
  const { date } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // ✅ receiptData 상태를 하나로 통합하여 관리
  const [receiptData, setReceiptData] = useState({
    image: null,
    category: '',
    description: '',
    date: date,
  });

  // ✅ 이미지 선택 핸들러 (receiptData 상태 업데이트)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setReceiptData((prev) => ({ ...prev, image: file }));
    } else {
      alert('JPG 또는 PNG 형식의 이미지를 업로드해 주세요.');
    }
  };

  // ✅ 카테고리 선택 핸들러
  const handleCategoryChange = (e) => {
    setReceiptData((prev) => ({ ...prev, category: e.target.value }));
  };

  // ✅ 메모 입력 핸들러
  const handleDescriptionChange = (e) => {
    setReceiptData((prev) => ({ ...prev, description: e.target.value }));
  };

  // 영수증 업로드 핸들러
  const handleUpload = async () => {
    if (!receiptData.image) {
      alert('이미지를 먼저 선택하세요.');
      return;
    }
    if (!receiptData.category) {
      alert('카테고리를 선택하세요.');
      return;
    }

    setLoading(true);
    try {
      await uploadReceiptImage(receiptData); // ✅ receiptData 객체 하나로 전달
      alert('영수증이 성공적으로 업로드되었습니다!');
      navigate('/main');
    } catch (error) {
      console.error('영수증 업로드 실패:', error);
      alert('업로드 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2>{date} 영수증 추가</h2>
            <div className="entry-form">
              {/* 이미지 업로드 */}
              <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleImageChange}
              />
              {receiptData.image && (
                <div className="preview-section">
                  <img
                    src={URL.createObjectURL(receiptData.image)}
                    alt="영수증 미리보기"
                  />
                </div>
              )}

              {/* 카테고리 선택 */}
              <select
                value={receiptData.category}
                style={{ marginBottom: '20px' }}
                onChange={handleCategoryChange}
              >
                <option value="">카테고리를 선택하세요</option>
                <option value="식비">🍽️ 식비</option>
                <option value="교통비">🚗 교통비</option>
                <option value="쇼핑">🛍️ 쇼핑</option>
                <option value="주거비">🏠 주거비</option>
                <option value="취미/여가">🎨 취미/여가</option>
                <option value="기타">✏️ 기타</option>
              </select>

              {/* 메모 입력 */}
              <input
                type="text"
                placeholder="메모를 추가하세요"
                value={receiptData.description}
                onChange={handleDescriptionChange}
              />

              {/* 버튼 */}
              <button
                className="save-button"
                onClick={handleUpload}
                disabled={loading}
              >
                <span>{loading ? '업로드 중...' : '영수증 업로드 하기'}</span>
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

export default ReceiptModal;
