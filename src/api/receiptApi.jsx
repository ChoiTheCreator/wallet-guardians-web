// api/receiptApi.jsx
import apiClient from './apiClient'; // axiosInstance를 import

export const uploadReceiptImage = async (image, category, description, date, accessToken, refreshToken) => {
  const formData = new FormData();
  formData.append('file', image);

  // JSON 데이터는 Blob 형태로 변환 후 추가
  const info = JSON.stringify({ category, description });
  formData.append('info', new Blob([info], { type: 'application/json' }));

  try {
    const response = await apiClient.post(
      `/api/expense/receipt/${date}`, // URL에 날짜 포함
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data', // multipart/form-data 전송
          'ACCESS-AUTH-KEY': `BEARER ${accessToken}`, 
          'REFRESH-AUTH-KEY': `BEARER ${refreshToken}` 
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('📌 이미지 업로드 실패:', error);
    throw error;
  }
};

/**
 * 📌 전체 영수증 조회 API (GET /api/receipt)
 * @param {string} accessToken - 로그인 시 받은 accessToken
 * @param {string} refreshToken - 로그인 시 받은 refreshToken
 * @returns {Promise<Object>} 등록된 영수증 목록 반환
 */
export const fetchReceiptResult = async (accessToken, refreshToken) => {
  try {
    const response = await apiClient.get('/api/receipt', {
      headers: {
        'ACCESS-AUTH-KEY': `BEARER ${accessToken}`, 
        'REFRESH-AUTH-KEY': `BEARER ${refreshToken}` 
      },
    });
    return response.data;
  } catch (error) {
    console.error('📌 결과 조회 실패:', error);
    throw error;
  }
};
