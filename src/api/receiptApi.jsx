// api/receiptApi.jsx
import apiClient from './apiClient'; // axiosInstance를 import

export const uploadReceiptImage = async (image) => {
  const formData = new FormData();
  formData.append('file', image);

  try {
    const response = await apiClient.post(
      '/api/expense/receipt/{date}',
      formData
    );
    return response.data;
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    throw error;
  }
};

// OCR 결과 가져오기 함수
export const fetchReceiptResult = async () => {
  try {
    const response = await apiClient.get('/api/receipt/result');
    return response.data;
  } catch (error) {
    console.error('결과 조회 실패:', error);
    throw error;
  }
};
