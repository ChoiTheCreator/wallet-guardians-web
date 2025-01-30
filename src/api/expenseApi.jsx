import apiClient from "./apiClient";
// apiClient에서 가져오기 

export const saveExpense = async (date, expenseData) => {
    try {
      const response = await apiClient.post(`/expense/${date}`, expenseData, {});
      return response.data;
    } catch (error) {
      console.error('지출 저장 실패:', error.response?.data || error.message);
      throw error;
    }
  };
  
export const getExpense = async (date) => {
    try{
        const response = await apiClient.get(`/expense/${date}`, {})
        return response.data;    
    } catch (error) {
        console.error('지출 저장 실패:', error.response?.data || error.message);
        throw error;
      }
  };