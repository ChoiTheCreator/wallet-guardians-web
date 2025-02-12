import apiClient from "./apiClient";

// 비밀번호 변경 API PATCH 사용
export const changePassword = async (password, newPassword) => {
  try {
    const response = await apiClient.patch(
      "/auth/password",
      { password, newPassword }, // 바디값 사용 patch는 빈 바디값이라도 사용해야해
    );

    console.log("✅ 비밀번호 변경 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("🚨 비밀번호 변경 실패:", error.response?.data || error.message);
    throw error;
  }
};
