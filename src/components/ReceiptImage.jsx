import { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

const ReceiptImage = ({ imageUrl }) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');

        // 🔹 이미지 데이터를 직접 요청 (401 방지)
        const response = await apiClient.get(imageUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // ✅ 인증 추가
          },
          responseType: 'blob', // ✅ 이미지 데이터를 Blob 형태로 받기
        });

        // 🔹 Blob 데이터를 URL로 변환
        const blobUrl = URL.createObjectURL(response.data);
        setImageSrc(blobUrl);
      } catch (error) {
        console.error('이미지 로드 실패:', error);
      }
    };

    fetchImage();
  }, [imageUrl]);

  return (
    <div>
      {imageSrc ? (
        <img src={imageSrc} alt="영수증 이미지" style={{ width: '100%' }} />
      ) : (
        <p>📌 이미지를 불러오는 중...</p>
      )}
    </div>
  );
};

export default ReceiptImage;
