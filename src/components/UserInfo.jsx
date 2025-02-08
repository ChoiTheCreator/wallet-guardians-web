import { useEffect, useState } from 'react';
import { getUserInfo } from '../api/authApi';

const UserInfoComponent = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ 유저 정보 가져오는 함수
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
    <div className="user-info-container">
      {loading ? (
        <p>로딩 중...</p>
      ) : error ? (
        <p>❌ 유저 정보를 불러올 수 없습니다.</p>
      ) : (
        <div className="user-info">
          <h3>🙋‍♂️ {userInfo?.username} 님</h3>
          <p>📧 {userInfo?.email}</p>
          <p>🎖️ {userInfo?.role}</p>
        </div>
      )}
    </div>
  );
};

export default UserInfoComponent;
