import apiClient from "./apiClient";

// 📌 프로필 사진 업로드 (POST)
export const uploadProfilePicture = async (imageFile) => {
  try {
    console.log(`🟢 [uploadProfilePicture] 요청: ${imageFile.name}`);

    const formData = new FormData();
    formData.append("file", imageFile);

    console.log("📌 [FormData 디버깅] 전송 데이터:");
    for (let [key, value] of formData.entries()) {
      console.log(`🔹 ${key}:`, value);
    }

    const response = await apiClient.post("/auth/profile", formData);

    console.log(`✅ [uploadProfilePicture] 업로드 성공! 응답:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`❌ [uploadProfilePicture] 업로드 실패!`, error.response?.data || error.message);
    throw error;
  }
};

// 📌 프로필 사진 변경 (PATCH)
export const updateProfilePicture = async (imageFile) => {
  try {
    console.log(`🟡 [updateProfilePicture] 요청: ${imageFile.name}`);

    const formData = new FormData();
    formData.append("file", imageFile);

    console.log("📌 [FormData 디버깅] 전송 데이터:");
    for (let [key, value] of formData.entries()) {
      console.log(`🔹 ${key}:`, value);
    }

    const response = await apiClient.patch("/auth/profile", formData);

    console.log(`✅ [updateProfilePicture] 변경 성공! 응답:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`❌ [updateProfilePicture] 변경 실패!`, error.response?.data || error.message);
    throw error;
  }
};

// 📌 프로필 사진 삭제 (DELETE)
export const deleteProfilePicture = async () => {
  try {
    console.log(`🔴 [deleteProfilePicture] 요청`);

    const response = await apiClient.delete("/auth/profile");

    console.log(`✅ [deleteProfilePicture] 삭제 성공! 응답:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`❌ [deleteProfilePicture] 삭제 실패!`, error.response?.data || error.message);
    throw error;
  }
};
