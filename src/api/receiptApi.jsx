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

    // ✅ 이미지 파일 추가
    formData.append('file', receiptData.image);

    // 🚀 **info를 Blob 대신 File 객체로 추가 (Spring 처리 문제 해결)**
    const json = JSON.stringify({
      date: receiptData.date,
      category: receiptData.category,
      description: receiptData.description,
    });

    const jsonFile = new File([json], 'info.json', {
      type: 'application/json',
    }); // ✅ `File` 객체로 변환
    formData.append('info', jsonFile);

    // ✅ FormData 내용 출력 (디버깅)
    console.log('📌 [FormData 디버깅] 전송 데이터:');
    for (let [key, value] of formData.entries()) {
      console.log(`🔹 ${key}:`, value);
    }

    // ✅ API 요청 보내기 (Content-Type 자동 설정)
    const response = await apiClient.post('/expense/receipt', formData);

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
