import apiClient from './apiClient';

/** 목표
 *  영수증 저장 (POST 요청)
 * - 멀티파트 폼데이터로 전송
 * - JSON 데이터를 별도로 포함
 */

//매개변수 하나로 통일. at API 함수 로직
export const uploadReceiptImage = async (receiptData) => {
  try {
    console.log(
      `🟢 [uploadReceiptImage] 요청: ${receiptData.date}, ${receiptData.category}`
    );
  } catch (error) {
    console.error(
      `❌ [uploadReceiptImage] 업로드 실패!`,
      error.response?.data || error.message
    );
    throw error;
  }
};
// export const uploadReceiptImage = async (file, category, description, date) => {
//   try {
//     console.log(
//       `🟢 [uploadReceiptImage] 영수증 업로드 요청: ${date}, ${category}`
//     );

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append(
//       'info',
//       JSON.stringify({
//         date: date,
//         category: category,
//         description: description,
//       })
//     );

//     const response = await apiClient.post('/expense/receipt', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     console.log(`✅ [uploadReceiptImage] 업로드 성공! 응답:`, response.data);
//     return response.data;
//   } catch (error) {
//     console.error(
//       `❌ [uploadReceiptImage] 업로드 실패!`,
//       error.response?.data || error.message
//     );
//     throw error;
//   }
// };

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
