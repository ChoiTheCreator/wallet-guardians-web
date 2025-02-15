import React, { useState, useEffect } from 'react';
import { getUserInfo } from '../api/authApi';
import { FaCamera, FaCog, FaUserTimes, FaUserCircle } from 'react-icons/fa';
import ProfileImgModal from '../components/profileImgModal';
import ProfilePwModal from '../components/ProfilePwModal';
import ProfileDeleteModal from '../components/ProfileDeleteModal';
import '../style/ProfilePage.scss';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
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

  if (!profileData) {
    return <div className="loading">프로필 로딩 중...</div>;
  }

  return (
    <div className="profile-wrapper">
      {/* 좌측 섹션 */}
      <div className="profile-left">
        <div className="profile-card">
          {/* ✅ 프로필 이미지 없을 경우 기본 아이콘 표시 */}
          {profileData.profileImageUrl ? (
            <img 
              className="profile-image" 
              src={profileData.profileImageUrl}  
              alt="Profile" 
            />
          ) : (
            <FaUserCircle className="profile-image-icon" />
          )}

          <h2 className="profile-name">{profileData.username}</h2>

          <div className="profile-actions">
            <button className="icon-button" onClick={() => setIsProfileModalOpen(true)}>
              <FaCamera />
            </button>
            <button className="icon-button" onClick={() => setIsPasswordModalOpen(true)}>
              <FaCog />
            </button>
            <button className="icon-button" onClick={() => setIsDeleteModalOpen(true)}>
              <FaUserTimes />
            </button>
          </div>
        </div>
      </div>

      {/* 우측 섹션 */}
      <div className="profile-right">
        <h2 className="profile-header">프로필 정보</h2>
        <div className="profile-details">
          <div className="details-item">
            <span className="details-label">이름:</span>
            <span className="details-value">{profileData.username}</span>
          </div>
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

      {/* 📌 프로필 사진 변경 모달 - ✅ 프로필 변경 후 UI 업데이트 기능 추가 */}
      <ProfileImgModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
        onProfileUpdate={(newImageUrl) => 
          setProfileData(prev => ({ ...prev, profileImageUrl: newImageUrl }))
        }
      />

      {/* 📌 비밀번호 변경 모달 */}
      <ProfilePwModal isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} />
      
      {/* 📌 회원 탈퇴 모달 */}
      <ProfileDeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} />
    </div>
  );
};

export default ProfilePage;
