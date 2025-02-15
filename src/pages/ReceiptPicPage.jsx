/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { fetchReceipt } from '../api/receiptApi';

// 📌 스타일 정의
const pageStyle = css`
  max-width: 1000px;
  margin: 20px auto;
  padding: 10px 20px;
  text-align: center;
`;

const titleStyle = css`
  font-size: 26px;
  color: navy;
  font-weight: bold;
  margin-bottom: 15px;
`;

const filterContainer = css`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 15px;
`;

const selectBox = css`
  padding: 10px 14px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
  &:hover {
    border-color: #555;
  }
`;

const tableWrapper = css`
  max-height: 500px;
  overflow-y: auto;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-top: 15px;
`;

const tableStyle = css`
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  th,
  td {
    border-bottom: 1px solid #ddd;
    padding: 14px;
  }

  th {
    background-color: #f1f5ff;
    font-weight: bold;
    text-align: center;
    font-size: 16px;
  }

  td {
    text-align: center;
    font-size: 15px;
  }

  img {
    width: 100px;
    height: auto;
    border-radius: 6px;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
    &:hover {
      transform: scale(1.05);
    }
  }
`;

const noReceiptMessage = css`
  font-size: 16px;
  font-weight: 500;
  color: #777;
  text-align: center;
  margin-top: 15px;
`;

// ✅ 모달 스타일 정의
const modalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const modalContent = css`
  background: white;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  text-align: center;
  max-width: 600px;
  max-height: 90%;
  overflow: hidden;
`;

const closeButton = css`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  color: navy;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 30px;
  cursor: pointer;
  &:hover {
    background: white;
  }
`;

const enlargedImage = css`
  max-width: 100%;
  max-height: 80vh;
  border-radius: 8px;
`;

const ReceiptPicPage = () => {
  const [selectedYear, setSelectedYear] = useState('2025');
  //현재 월로 유지
  const [selectedMonth, setSelectedMonth] = useState('02');
  const [receipts, setReceipts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // ✅ 모달에 띄울 이미지 상태 추가

  const baseURL = 'https://storage.googleapis.com/wallet_guardians_bucket/';

  const years = ['2023', '2024', '2025', '2026'];
  const months = [
    { value: '01', label: '1월' },
    { value: '02', label: '2월' },
    { value: '03', label: '3월' },
    { value: '04', label: '4월' },
    { value: '05', label: '5월' },
    { value: '06', label: '6월' },
    { value: '07', label: '7월' },
    { value: '08', label: '8월' },
    { value: '09', label: '9월' },
    { value: '10', label: '10월' },
    { value: '11', label: '11월' },
    { value: '12', label: '12월' },
  ];

  useEffect(() => {
    const loadReceipts = async () => {
      try {
        console.log(
          `🔄 Fetching receipts for ${selectedYear}-${selectedMonth}`
        );
        const data = await fetchReceipt(selectedYear, selectedMonth);
        console.log('✅ 서버 응답:', data);

        // ✅ 날짜 기준 정렬 (가장 최신 날짜가 위로 가도록)
        const sortedReceipts = [...data.data].sort((a, b) => b.id - a.id);
        setReceipts(sortedReceipts);
      } catch (error) {
        console.error('❌ 영수증 데이터를 불러오는 중 오류 발생:', error);
        setReceipts([]);
      }
    };

    loadReceipts();
  }, [selectedYear, selectedMonth]);

  return (
    <div css={pageStyle}>
      <h1 css={titleStyle}>영수증 사진 모음</h1>

      {/* 필터 (연도 & 월 선택) */}
      <div css={filterContainer}>
        <select
          css={selectBox}
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}년
            </option>
          ))}
        </select>

        <select
          css={selectBox}
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
      </div>

      {/* 영수증 테이블 */}
      {receipts.length > 0 ? (
        <div css={tableWrapper}>
          <table css={tableStyle}>
            <thead>
              <tr>
                <th>업로드된 날짜</th>
                <th>해당 월</th>
                <th>영수증</th>
              </tr>
            </thead>
            <tbody>
              {receipts.map((receipt) => (
                <tr key={receipt.id}>
                  <td>{receipt.date}</td>
                  <td>
                    {selectedYear}-{selectedMonth}
                  </td>
                  <td>
                    <img
                      src={baseURL + receipt.imageUrl}
                      alt={`영수증-${receipt.id}`}
                      onClick={() =>
                        setSelectedImage(baseURL + receipt.imageUrl)
                      } // ✅ 클릭 시 모달 띄우기
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p css={noReceiptMessage}>😢 해당 월에 업로드된 영수증이 없습니다.</p>
      )}

      {/* ✅ 모달 창 */}
      {selectedImage && (
        <div css={modalOverlay} onClick={() => setSelectedImage(null)}>
          <div css={modalContent} onClick={(e) => e.stopPropagation()}>
            <button css={closeButton} onClick={() => setSelectedImage(null)}>
              x
            </button>
            <img css={enlargedImage} src={selectedImage} alt="확대된 영수증" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceiptPicPage;
