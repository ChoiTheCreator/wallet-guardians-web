import apiClient from "./apiClient";

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

