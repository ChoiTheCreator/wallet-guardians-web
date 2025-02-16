import { useState } from 'react';
import '../style/InputEntryModal.scss'; // 스타일 재사용
import { uploadReceiptImage } from '../api/receiptApi';
import { useParams, useNavigate } from 'react-router-dom';
import GlobalModalMessage from '../components/GlobalModalMesaage';

const ReceiptModal = ({ isOpen, onClose }) => {
  const { date } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState({ type: '', message: '' });

  const [receiptData, setReceiptData] = useState({
    image: null,
    category: '',
    description: '',
    date: date,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setReceiptData((prev) => ({ ...prev, image: file }));
    } else {
      alert('JPG 또는 PNG 형식의 이미지를 업로드해 주세요.');
    }
  };

  const handleCategoryChange = (e) => {
    setReceiptData((prev) => ({ ...prev, category: e.target.value }));
  };

  const handleDescriptionChange = (e) => {
    setReceiptData((prev) => ({ ...prev, description: e.target.value }));
  };

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
      await uploadReceiptImage(receiptData);
      setModalMessage({
        type: 'success',
        message: '영수증이 성공적으로 업로드되었습니다!',
      });
      setTimeout(() => {
        setModalMessage({ type: '', message: '' });
        navigate('/main');
      }, 2000);
    } catch (error) {
      console.error('영수증 업로드 실패:', error);
      setModalMessage({
        type: 'error',
        message: '업로드 중 오류가 발생했습니다.',
      });
      setTimeout(() => {
        setModalMessage({ type: '', message: '' });
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <GlobalModalMessage
        type={modalMessage.type}
        message={modalMessage.message}
      />
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2>{date} 영수증 추가</h2>
            <div className="entry-form">
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

              <input
                type="text"
                placeholder="메모를 추가하세요"
                value={receiptData.description}
                onChange={handleDescriptionChange}
              />

              <button
                className="save-button"
                onClick={handleUpload}
                disabled={loading}
              >
                {loading ? '업로드 중...' : '영수증 업로드'}
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
