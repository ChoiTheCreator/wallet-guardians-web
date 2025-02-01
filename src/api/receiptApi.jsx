// api/receiptApi.jsx
import apiClient from './apiClient'; // axiosInstance를 import

export const uploadReceiptImage = async (image) => {
  const formData = new FormData();
  formData.append('file', image);

  const info = JSON.stringify({ category, description });
  formData.append('info', new Blob([info], { type: 'application/json' })); 
  // blob 형태로 만든 이유는 formdata.append 에는 json 객체를 직접 추가 할 수 없기 때문

  try {
    const response = await apiClient.post(
      `/api/expense/receipt/${date}`, // URL에 날짜 포함
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data', // multipart/form-data 전송
        },
      }
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
    const response = await apiClient.get('/api/receipt');
    return response.data;
  } catch (error) {
    console.error('결과 조회 실패:', error);
    throw error;
  }
};
