import apiClient from './apiClient';

/** 목표
 *  영수증 저장 (POST 요청)
 * - 멀티파트 폼데이터로 전송
 * - JSON 데이터를 별도로 포함
 *
 */

//매개변수 하나로 통일. at API 함수 로직 -> 여기 구현해야함
export const uploadReceiptImage = async (receiptData) => {
  try {
    console.log(
      `🟢 [uploadReceiptImage] 요청: ${receiptData.date}, ${receiptData.category}`
    );

    const formData = new FormData();
    //서버에서 제공해준 request body는 file 속성 : IMG파일 + info 속성 " 내부의 JSON 객체임"
    formData.append('file', receiptData.image);
    formData.append(
      'info',
      //프론트 측에서 서버에 값을 보낼때는 stringify에서
      JSON.stringify({
        date: receiptData.date,
        category: receiptData.category,
        description: receiptData.description,
      })
    );

    const response = await apiClient.post('/expense/receipt', formData);
    //Response 디버깅용 코드
    console.log(`✅ [uploadReceiptImage] 업로드 성공! 응답:`, response.data);
    return response.data;
  } catch (error) {
    console.error(
      `❌ [uploadReceiptImage] 업로드 실패!`,
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * ✅ 영수증 전체 조회 (GET 요청)
 */
export const getAllReceipts = async () => {
  try {
    console.log(`🟢 [getAllReceipts] 영수증 전체 조회 요청`);
    const response = await apiClient.get('/receipt');
    console.log(`✅ [getAllReceipts] 조회 성공! 응답:`, response.data);
    return response.data;
  } catch (error) {
    console.error(
      `❌ [getAllReceipts] 조회 실패!`,
      error.response?.data || error.message
    );
    throw error;
  }
};
