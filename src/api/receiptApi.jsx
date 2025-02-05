// api/receiptApi.jsx
import apiClient from './apiClient';

// 영수증 이미지 업로드 함수 (토큰은 인터셉터에서 자동 추가)
export const uploadReceiptImage = async (
  image,
  category,
  description,
  date
) => {
  const formData = new FormData();
  formData.append('file', image);

  const info = JSON.stringify({ category, description });
  formData.append('info', new Blob([info], { type: 'application/json' }));

  try {
    const response = await apiClient.post(
      `/expense/receipt/${date}`, // 날짜가 포함된 URL
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          // 토큰은 인터셉터가 자동 추가합니다.
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('📌 이미지 업로드 실패:', error);
    throw error;
  }
};

// 영수증 데이터 조회 함수 (토큰은 인터셉터에서 자동 추가)
export const fetchReceiptResult = async () => {
  try {
    const response = await apiClient.get('/receipt');
    return response.data;
  } catch (error) {
    console.error('📌 결과 조회 실패:', error);
    throw error;
  }
};
