/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { fetchReceipt } from '../api/receiptApi';

// 📌 스타일 정의
const pageStyle = css`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  text-align: center;
`;

const filterContainer = css`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
`;

const selectBox = css`
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;

  &:hover {
    border-color: #555;
  }
`;

const galleryStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
`;

const receiptItem = css`
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const noReceiptMessage = css`
  font-size: 16px;
  font-weight: 500;
  color: #777;
  text-align: center;
  margin-top: 20px;
`;

const ReceiptPicPage = () => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedMonth, setSelectedMonth] = useState('01');
  const [receipts, setReceipts] = useState([]);

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
        const data = await fetchReceipt(selectedYear, selectedMonth);
        setReceipts(data.receipts || []);
      } catch (error) {
        console.error('영수증 데이터를 불러오는 중 오류 발생:', error);
        setReceipts([]); // 오류 발생 시 빈 배열로 설정
      }
    };

    loadReceipts();
  }, [selectedYear, selectedMonth]);

  return (
    <div css={pageStyle}>
      <h1>📸 영수증 사진 모음</h1>

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

      {/* 영수증 이미지 갤러리 */}
      <div css={galleryStyle}>
        {receipts.length > 0 ? (
          receipts.map((receipt) => (
            <div key={receipt.id} css={receiptItem}>
              <img src={receipt.imageUrl} alt={`영수증-${receipt.id}`} />
            </div>
          ))
        ) : (
          <p css={noReceiptMessage}>😢 해당 월에 업로드된 영수증이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default ReceiptPicPage;
