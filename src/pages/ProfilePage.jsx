import React, { useState, useEffect } from 'react';
import { getUserInfo } from '../api/authApi';
import { FaCamera, FaCog } from 'react-icons/fa'; 
import '../style/ProfilePage.scss';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserInfo();
        setProfileData(data);
      } catch (error) {
        console.error('🚨 프로필 불러오기 실패:', error);
      }
    };
    fetchProfile();
  }, []);

  // 📌 프로필 사진 업로드 핸들러 (나중에 실제 업로드 기능 추가 가능)
  const handleProfileUpload = () => {
    alert('📷 프로필 사진을 변경할 수 있는 기능을 추가하세요!');
  };

  // 📌 비밀번호 변경 핸들러
  const handleChangePassword = () => {
    alert('🔑 비밀번호 변경 기능을 추가하세요!');
  };

  if (!profileData) {
    return <div className="loading">프로필 로딩 중...</div>;
  }

  return (
    <div className="profile-wrapper">
      {/* 좌측 섹션 */}
      <div className="profile-left">
        <div className="profile-card">
          <img 
            className="profile-image" 
            src={profileData.profileImage || "https://via.placeholder.com/100"} 
            alt="Profile" 
          />
          <h2 className="profile-name">{profileData.username}</h2>

          {/* 📌 아이콘 버튼 추가 */}
          <div className="profile-actions">
            <button className="icon-button" onClick={handleProfileUpload}>
              <FaCamera />
            </button>
            <button className="icon-button" onClick={handleChangePassword}>
              <FaCog />
            </button>
          </div>
        </div>
      </div>

      {/* 우측 섹션 */}
      <div className="profile-right">
        <h2 className="profile-header">프로필 정보</h2>
        <div className="profile-details">
          <div className="details-item">
            <span className="details-label">이메일:</span>
            <span className="details-value">{profileData.email}</span>
          </div>
          <div className="details-item">
            <span className="details-label">칭호:</span>
            <span className="details-value">{profileData.role}</span>
          </div>
          <div className="details-item">
            <span className="details-label">전화번호:</span>
            <span className="details-value">010-1234-5678</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
