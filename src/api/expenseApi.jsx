import apiClient from "./apiClient";


export const saveExpense = async (date, expenseData) => {
    try {
      await apiClient.post(`/api/expense/${date}`, expenseData, {
        headers: { 'Content-Type': 'application/json' } // JSON 데이터로 전송
      });
    } catch (error) {
      console.error('📌 지출 저장 실패:', error.response?.data || error.message);
      throw error;
    }
};


export const getExpense = async (date) => {
    try {
        const response = await apiClient.get(`/api/expense/${date}`);
        return response.data;
    } catch (error) {
        console.error('📌 지출 조회 실패:', error.response?.data || error.message);
        throw error;
    }
};

// 지출 수정 함수 설정 json형식!
export const updateExpense = async (expenseId, expenseData) => {
    try {
        await apiClient.put(`/api/expense/${expenseId}`, expenseData, {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('📌 지출 수정 실패:', error.response?.data || error.message);
        throw error;
    }
};
