import { useState } from 'react';
import { uploadReceipt, fetchReceiptResult } from '../api/receiptApi';
import '../style/ReceiptPage.scss';

const ReceiptPage = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setImage(file);
    } else {
      alert('JPG 또는 PNG 형식의 이미지를 업로드해 주세요.');
    }
  };

  const handleUpload = async () => {
    if (!image) {
      alert('이미지를 먼저 업로드하세요.');
      return;
    }

    if (!category) {
      alert('카테고리를 선택하세요.');
      return;
    }

    setLoading(true);

    try {
      await uploadReceipt(image, category, description);
      alert('이미지가 업로드 되었습니다');
      fetchResult();
    } catch (error) {
      console.error('영수증 분석 실패:', error);
      alert('서버 오류가 발생했습니다.');
    } 
  };

  const fetchResult = async () => {
    try {
      const data = await fetchReceiptResult();
      setResult(data);
    } catch (error) {
      console.error('결과 조회 실패:', error);
      alert('결과를 불러올 수 없습니다.');
    }
  };

  return (
    <div className="receipt-page">
      <h1>영수증 인식</h1>
      <p>이제 영수증 사진을 올려 지출을 확인하세요!</p>

      <div className="upload-section">
        <input type="file" accept="image/jpeg, image/png" onChange={handleImageChange} />
        <button onClick={handleUpload} disabled={loading}>
          {loading ? '처리 중...' : '업로드 및 분석'}
        </button>
      </div>

      {/* 카테고리 및 메모 입력 */}
      <div className="category-memo-container">
        <div className="category-section">
          <label htmlFor="category">카테고리</label>
          <select
            id="category"
            className="category-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">선택</option>
            <option value="식비">🍽️ 식비</option>
            <option value="교통비">🚗 교통비</option>
            <option value="쇼핑">🛍️ 쇼핑</option>
            <option value="주거비">🏠 주거비</option>
            <option value="취미/여가">🎨 취미/여가</option>
            <option value="기타">✏️ 기타</option>
          </select>
        </div>

        <div className="memo-section">
          <label htmlFor="description">메모</label>
          <input
            id="description"
            className="memo-input"
            type="text"
            placeholder="메모를 추가하세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      {image && (
        <div className="preview-section">
          <h3>미리보기:</h3>
          <img src={URL.createObjectURL(image)} alt="영수증 미리보기" />
        </div>
      )}

      {result && (
        <div className="result-section">
          <h2>분석 결과</h2>
          <p>
            <strong>가게 상호명:</strong> {result.storeName}
          </p>
          <p>
            <strong>총 금액:</strong> {result.totalPrice}
          </p>
          <p>
            <strong>카테고리:</strong> {result.category}
          </p>
        </div>
      )}
    </div>
  );
};

export default ReceiptPage;


