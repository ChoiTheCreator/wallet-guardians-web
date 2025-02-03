import apiClient from "./apiClient";

// 지출 수동으로 입력했을 때 포스트 하는 함수 지출 추가 모달에서 사용
export const saveExpense = async (date, expenseData, accessToken, refreshToken) => {
    try {
      await apiClient.post(`/api/expense/${date}`, expenseData, {
        headers: { 
          'Content-Type': 'application/json', // JSON 데이터 전송
          'ACCESS-AUTH-KEY': `BEARER ${accessToken}`, 
          'REFRESH-AUTH-KEY': `BEARER ${refreshToken}` 
        }
      });
    } catch (error) {
      console.error('📌 지출 저장 실패:', error.response?.data || error.message);
      throw error;
    }
};

//지출 페이지에서 사용할 함수로 지출페이지에 로직 추가 예정
export const getExpense = async (date, accessToken, refreshToken) => {
    try {
        const response = await apiClient.get(`/api/expense/${date}`, {
          headers: {
            'ACCESS-AUTH-KEY': `BEARER ${accessToken}`, 
            'REFRESH-AUTH-KEY': `BEARER ${refreshToken}` 
          }
        });
        return response.data;
    } catch (error) {
        console.error('📌 지출 조회 실패:', error.response?.data || error.message);
        throw error;
    }
};

// 마찬가지로 지출페이지에서 사용할 함수로 수정할 수 있는 함수
export const updateExpense = async (expenseId, expenseData, accessToken, refreshToken) => {
    try {
        await apiClient.put(`/api/expense/${expenseId}`, expenseData, {
            headers: { 
              'Content-Type': 'application/json',
              'ACCESS-AUTH-KEY': `BEARER ${accessToken}`, 
              'REFRESH-AUTH-KEY': `BEARER ${refreshToken}` 
            }
        });
    } catch (error) {
        console.error('📌 지출 수정 실패:', error.response?.data || error.message);
        throw error;
    }
};

