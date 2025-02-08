/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { getUserInfo } from '../api/authApi';
import { css } from '@emotion/react';

const userInfoStyles = css`
  text-align: center;
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 20px;
  padding: 15px 10px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
`;

const userNameStyles = css`
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 8px;
  color: white;
`;

const userInfoTextStyles = css`
  font-size: 1rem;
  font-weight: bold;
  margin: 3px 0;
  opacity: 0.9;
`;

const UserInfoComponent = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    try {
      const data = await getUserInfo();
      setUserInfo(data);
      console.log('✅ 유저 정보:', data);
    } catch (err) {
      console.error('🚨 유저 정보 가져오기 실패:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div css={userInfoStyles}>
      {loading ? (
        <p>로딩 중...</p>
      ) : error ? (
        <p>❌ 유저 정보를 불러올 수 없습니다.</p>
      ) : (
        <div>
          <h3 css={userNameStyles}>🙋‍♂️ {userInfo?.username} 님</h3>
          <p css={userInfoTextStyles}>📧 {userInfo?.email}</p>
          <p css={userInfoTextStyles}>🎖️ {userInfo?.role}</p>
        </div>
      )}
    </div>
  );
};

export default UserInfoComponent;
