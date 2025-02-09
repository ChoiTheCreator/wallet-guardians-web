import React, { useState, useEffect } from 'react';
import { getUserInfo } from '../api/authApi';
import '../style/ProfilePage.scss';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserInfo(); // authApi에서 유저 정보 가져오기
        setProfileData(data);
      } catch (error) {
        console.error('🚨 프로필 불러오기 실패:', error);
      }
    };
    fetchProfile();
  }, []);

  if (!profileData) {
    return <div className="loading">프로필 로딩 중...</div>;
  }

  return (
    <div className="profile-wrapper">
      {/* 좌측 섹션 */}
      <div className="profile-left">
        <div className="profile-card">
          <img className="profile-image" 
               src={profileData.profileImage || "https://via.placeholder.com/100"} 
               alt="Profile" />
          <h2 className="profile-name">{profileData.username}</h2>
          <p className="profile-title">tel.</p> 
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
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
