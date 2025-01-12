import React, { useState } from 'react';
import '../style/ProfilePage.scss';

const ProfilePage = () => {
  const [profileData] = useState({
    name: 'Jeremy Rose',
    email: 'jeremy.rose@email.com',
    title: 'Software Engineer',
    stats: { posts: 42, followers: 108, rating: '4.8' },
    details: {
      location: 'New York, USA',
      birthday: '1990-05-21',
      phone: '(123) 456-7890',
      bio: 'Passionate about building great software products.',
    },
  });

  return (
    <div className="profile-wrapper">
      {/* 좌측 섹션 */}
      <div className="profile-left">
        <div className="profile-card">
          <img
            className="profile-image"
            src="https://via.placeholder.com/100"
            alt="Profile"
          />
          <h2 className="profile-name">{profileData.name}</h2>
          <p className="profile-title">{profileData.title}</p>
          <div className="profile-stats">
            <div className="stats-item">
              <span className="stats-value">{profileData.stats.posts}</span>
              <span className="stats-label">Posts</span>
            </div>
            <div className="stats-item">
              <span className="stats-value">{profileData.stats.followers}</span>
              <span className="stats-label">Followers</span>
            </div>
            <div className="stats-item">
              <span className="stats-value">{profileData.stats.rating}</span>
              <span className="stats-label">Rating</span>
            </div>
          </div>
          <button className="btn-message">Send Message</button>
        </div>
      </div>

      {/* 우측 섹션 */}
      <div className="profile-right">
        <h2 className="profile-header">Profile Details</h2>
        <div className="profile-details">
          <div className="details-item">
            <span className="details-label">Location:</span>
            <span className="details-value">
              {profileData.details.location}
            </span>
          </div>
          <div className="details-item">
            <span className="details-label">Birthday:</span>
            <span className="details-value">
              {profileData.details.birthday}
            </span>
          </div>
          <div className="details-item">
            <span className="details-label">Phone:</span>
            <span className="details-value">{profileData.details.phone}</span>
          </div>
          <div className="details-item">
            <span className="details-label">Bio:</span>
            <span className="details-value">{profileData.details.bio}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
