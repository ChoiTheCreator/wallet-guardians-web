import React, { useState } from 'react';
import '../style/ReceiptPicPage.scss';

const ReceiptPicPage = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedMonth, setSelectedMonth] = useState('01');

  // 가짜 데이터 (서버에서 불러오는 것으로 대체 가능)
  const receiptImages = {
    '2024-01': ['/images/receipt1.jpg', '/images/receipt2.jpg'],
    '2024-02': ['/images/receipt3.jpg'],
    '2024-03': [],
    '2023-12': ['/images/receipt4.jpg'],
  };

  const years = ['2023', '2024', '2025']; // 원하는 연도 추가 가능
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

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const selectedKey = `${selectedYear}-${selectedMonth}`;
  const imagesToShow = receiptImages[selectedKey] || [];

  return (
    <div className="receipt-pic-page">
      <h1>📸 영수증 사진 모음</h1>

      {/* 연도 및 월 선택 */}
      <div className="filter-container">
        <div className="year-selector">
          <label>📆 연도 선택:</label>
          <select value={selectedYear} onChange={handleYearChange}>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}년
              </option>
            ))}
          </select>
        </div>

        <div className="month-selector">
          <label>📅 월 선택:</label>
          <select value={selectedMonth} onChange={handleMonthChange}>
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 영수증 갤러리 */}
      <div className="receipt-gallery">
        {imagesToShow.length > 0 ? (
          imagesToShow.map((image, index) => (
            <div key={index} className="receipt-item">
              <img src={image} alt={`영수증-${index}`} />
            </div>
          ))
        ) : (
          <p className="no-receipt">😢 해당 월에 업로드된 영수증이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default ReceiptPicPage;
