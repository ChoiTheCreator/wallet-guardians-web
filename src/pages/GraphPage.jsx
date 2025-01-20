import { useContext } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from 'recharts';
import { GoalContext } from '../context/GoalContext';
import { useSidebar } from '../context/SidebarContext';
import '../style/GraphPage.scss';

const GraphPage = () => {
  const { goalAmount } = useContext(GoalContext);

  const { isSidebarActive } = useSidebar();

  // **주요 소비 항목 데이터**
  const expenseItems = [
    { category: '카페 & 음료', item: '스타벅스 라떼', amount: 5_000 },
    { category: '식사', item: '점심 식사 (김치찌개)', amount: 12_000 },
    { category: '생활용품', item: '세제 구입', amount: 8_000 },
    { category: '여가 활동', item: '넷플릭스 구독', amount: 14_000 },
    { category: '기타', item: '책 구입', amount: 20_000 },
  ];

  // **그래프 데이터 생성**
  const totalSpending = expenseItems.reduce((acc, cur) => acc + cur.amount, 0);
  const graphData = [
    { label: '총 지출', value: totalSpending },
    { label: '총 소비', value: 40_000 },
    { label: '목표 금액', value: goalAmount || 0 },
  ];

  return (
    <div className={`graph-wrapper ${isSidebarActive ? 'sidebar-active' : ''}`}>
      {/* 좌측 섹션: 그래프 */}
      <div className="graph-left">
        <div className="expense-graph-card">
          <h3>지출, 소비, 목표 금액 비교 그래프</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={graphData} barGap={10}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" tick={{ fontSize: 14 }} />
              <YAxis tick={{ fontSize: 14 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
                }}
                itemStyle={{ color: '#001f5c', fontWeight: 600 }}
              />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="value" fill="#001f5c" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 우측 섹션: 주요 소비 항목 */}
      <div className="graph-right">
        <h2 className="graph-title">주요 소비 항목</h2>
        <div className="top-expense-card">
          <table className="expense-table">
            <thead>
              <tr>
                <th>카테고리</th>
                <th>항목</th>
                <th>금액 (₩)</th>
              </tr>
            </thead>
            <tbody>
              {expenseItems.map((expense, index) => (
                <tr key={index}>
                  <td>{expense.category}</td>
                  <td>{expense.item}</td>
                  <td>{expense.amount.toLocaleString()}원</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GraphPage;
