import '../style/ExpensePage.scss';

const ExpensePage = () => {
  return (
    <div className="expense-wrapper">
      {/* 좌측 섹션 */}
      <div className="expense-left">
        <div className="expense-summary-card">지출 현황을 보여주는 페이지</div>
      </div>

      {/* 우측 섹션 */}
      <div className="expense-right">
        <h2 className="expense-title">지출 리스트</h2>
        <div className="expense-list-card">
          <ul>
            <li>지출 항목 1</li>
            <li>지출 항목 2</li>
            <li>지출 항목 3</li>
            <li>지출 항목 4</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExpensePage;
