import React from 'react';
import '../style/IncomePage.scss';

const IncomePage = () => {
  return (
    <div className="income-wrapper">
      {/* 좌측 섹션 */}
      <div className="income-left">
        <div className="income-summary-card">수입 카테고리 및 차트</div>
        <div className="budget-explanation-card">한달 예산 설정 설명</div>
      </div>

      {/* 우측 섹션 */}
      <div className="income-right">
        <h2 className="income-title">목표금액</h2>
        <div className="goal-amount-card">설정된 목표 금액</div>
        <button className="set-goal-btn">설정</button>
      </div>
    </div>
  );
};

export default IncomePage;
