import apiClient from "./apiClient";

// 예산 설정 (POST) 처음 예산 설정하는 곳에서 사용하면 됨
export const setBudget = async (date, goalAmount) => {
  try {
    const response = await apiClient.post(
      `/api/my/budget/${date}`,
      { budget_amount: goalAmount },
      {
        headers: {
          "Content-Type": "application/json",
          "ACCESS-AUTH-KEY": `BEARER ${localStorage.getItem("token")}`,
          "REFRESH-AUTH-KEY": `BEARER ${localStorage.getItem("refreshToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("예산 설정 실패:", error.response?.data || error.message);
    throw error;
  }
};

// 예산 조회 (GET) 전역 상태관리로 사용하면 될 듯함
export const getBudget = async (date) => {
  try {
    const response = await apiClient.get(`/api/my/budget/${date}`, {
      headers: {
        "Content-Type": "application/json",
        "ACCESS-AUTH-KEY": `BEARER ${localStorage.getItem("token")}`,
        "REFRESH-AUTH-KEY": `BEARER ${localStorage.getItem("refreshToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("예산 조회 실패:", error.response?.data || error.message);
    throw error;
  }
};

// 예산 수정 (PUT) 수정하는 페이지에서 사용 수정하는 페이지나 모달을 새로 만들어야 할 듯..?
export const updateBudget = async (id, userId, goalAmount, date) => {
  try {
    const response = await apiClient.put(
      `/api/my/budget/${id}`,
      { id, user_id: userId, budget_amount: goalAmount, date },
      {
        headers: {
          "Content-Type": "application/json",
          "ACCESS-AUTH-KEY": `BEARER ${localStorage.getItem("token")}`,
          "REFRESH-AUTH-KEY": `BEARER ${localStorage.getItem("refreshToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("예산 수정 실패:", error.response?.data || error.message);
    throw error;
  }
};
