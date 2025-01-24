import { useState } from 'react';
import axios from 'axios';
import '../style/ReceiptPage.scss';

const ReceiptPage = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // 이미지 선택 처리
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setImage(file);
    } else {
      alert('JPG 또는 PNG 형식의 이미지를 업로드해 주세요.');
    }
  };

  // 이미지 업로드 및 분석 요청, 주석 수정 요청
  const handleUpload = async () => {
    if (!image) {
      alert('이미지를 먼저 업로드하세요.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('file', image);

    // 백엔드로 이미지 보내기
    try {
      await axios.post('백엔드 서버', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('이미지가 업로드 되었습니다');
      fetchResult(); // OCR 결과 가져오기
    } catch (error) {
      console.error('영수증 분석 실패:', error);
      alert('서버 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // OCR 결과 가져오기
  const fetchResult = async () => {
    try {
      const response = await axios.get('개설된 백엔드 서버');
      setResult(response.data);
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
        <input
          type="file"
          accept="image/jpeg, image/png"
          onChange={handleImageChange}
        />
        <button onClick={handleUpload} disabled={loading}>
          {loading ? '처리 중...' : '업로드 및 분석'}
        </button>
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
