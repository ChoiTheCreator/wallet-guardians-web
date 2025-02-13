import Year from 'react-calendar/dist/esm/DecadeView/Year.js';
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

//서버에 있는 영수증을 가지고오는 로직 -> query parameter : year & month params를 url 파라미터 (최신형)
export const fetchReceipt = async (year, month) => {
  try {
    const response = await apiClient.get('/expense/receipt', {
      params: { year, month },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log('영수중을 서버에서 가져오는것에서 오류가 생겼습니다', error);
  }
};
