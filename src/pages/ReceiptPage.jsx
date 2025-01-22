import React, { useState } from 'react';
import axios from 'axios';
import '../style/ReceiptPage.scss';

const ReceiptPage = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // 이미지 업로드 처리
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setImage(file);
    } else {
      alert('JPG 또는 PNG 형식의 이미지를 업로드해 주세요.');
    }
  };

  // OCR API 요청
  const handleUpload = async () => {
    if (!image) {
      alert('이미지를 먼저 업로드 해주세요.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await axios.post('http://clovaocr-api-kr.ncloud.com/external/v1/37918/8d26c27c4212d627768bd830b680507a90317c8b58e7c516440c36f734e42705', formData, {
        headers: {
          'X-NCP-APIGW-API-KEY-ID': '',
          'X-NCP-APIGW-API-KEY': '',
          'Content-Type': 'multipart/form-data'
        }
      });

      const extractedData = response.data.images[0].fields.map(field => field.inferText);

      // 추출된 정보를 가공
      setResult({
        storeName: extractedData.find(text => text.includes('상호명')) || '상호명 없음',
        totalPrice: extractedData.find(text => text.match(/\d{1,3}(,\d{3})*원/)) || '금액 없음',
        category: extractedData.find(text => text.includes('카테고리')) || '카테고리 없음',
      });

    } catch (error) {
      console.error('OCR 처리 중 오류 발생:', error);
      alert('영수증을 분석하는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
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

      {image && (
        <div className="preview-section">
          <h3>미리보기:</h3>
          <img src={URL.createObjectURL(image)} alt="영수증 미리보기" />
        </div>
      )}

      {result && (
        <div className="result-section">
          <h2>분석 결과</h2>
          <p><strong>가게 상호명:</strong> {result.storeName}</p>
          <p><strong>총 금액:</strong> {result.totalPrice}</p>
          <p><strong>카테고리:</strong> {result.category}</p>
        </div>
      )}
    </div>
  );
};

export default ReceiptPage;
