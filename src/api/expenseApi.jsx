import { TbWashDryP } from 'react-icons/tb';
import apiClient from './apiClient';

// 지출 수동으로 입력했을 때 포스트 하는 함수 지출 추가 모달에서 사용

//POST /api/expense/day: 사용 금액 기록
export const saveExpense = async (
  date,
  expenseData,
  accessToken,
  refreshToken
) => {
  try {
    //api 명세서에는 endPoint가 day로 바뀜
    await apiClient.post(`/expense/receipt/${date}`, expenseData, {
      headers: {
        'Content-Type': 'application/json', // JSON 데이터 전송
        'ACCESS-AUTH-KEY': `BEARER ${accessToken}`,
        'REFRESH-AUTH-KEY': `BEARER ${refreshToken}`,
      },
    });
  } catch (error) {
    console.error('📌 지출 저장 실패:', error.response?.data || error.message);
    throw error;
  }
};

//DELETE /api/expense/{expense_Id}: 지출 삭제 - 완

//GET /api/expense/month: 해당 월의 지출 내역 조회 - 완
// export const getMonthlyExpense = async(year,month) =>{
//   try{
//     await apiClient.get('')
//   }
// }

//지출 페이지에서 사용할 함수로 지출페이지에 로직 추가 예정
export const getExpense = async (date, accessToken, refreshToken) => {
  try {
    const response = await apiClient.get(`/api/expense/${date}`, {
      headers: {
        'ACCESS-AUTH-KEY': `BEARER ${accessToken}`,
        'REFRESH-AUTH-KEY': `BEARER ${refreshToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('📌 지출 조회 실패:', error.response?.data || error.message);
    throw error;
  }
};

// 마찬가지로 지출페이지에서 사용할 함수로 수정할 수 있는 함수
export const updateExpense = async (
  expenseId,
  expenseData,
  accessToken,
  refreshToken
) => {
  try {
    await apiClient.put(`/api/expense/${expenseId}`, expenseData, {
      headers: {
        'Content-Type': 'application/json',
        'ACCESS-AUTH-KEY': `BEARER ${accessToken}`,
        'REFRESH-AUTH-KEY': `BEARER ${refreshToken}`,
      },
    });
  } catch (error) {
    console.error('📌 지출 수정 실패:', error.response?.data || error.message);
    throw error;
  }
};
