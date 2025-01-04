import React from 'react';
import '../style/GraphPage.scss';

const GraphPage = () => {
  return (
    <div className="graph-wrapper">
      {/* 좌측 섹션: 그래프 */}
      <div className="graph-left">
        <div className="expense-graph-card">
          <p>지출 통계 그래프 (상세)</p>
        </div>
      </div>

      {/* 우측 섹션: 주요 소비 항목 */}
      <div className="graph-right">
        <h2 className="graph-title">주요 소비 항목</h2>
        <div className="top-expense-card">
          <p>가장 많이, 주로 소비한 품목 보여주기</p>
        </div>
        <div className="additional-info-card">
          <p>기타 정보 표시</p>
        </div>
      </div>
    </div>
  );
};

export default GraphPage;
