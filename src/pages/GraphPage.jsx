import { useContext, useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  Cell,
} from 'recharts';
import { GoalContext } from '../context/GoalContext';
import '../style/GraphPage.scss';
import { SidebarContext } from '../context/SidebarContext';

const GraphPage = () => {
  const { goalAmount } = useContext(GoalContext);
  const { isSidebarOpen } = useContext(SidebarContext);

  const expenseItems = [
    { category: '카페 & 음료', item: '스타벅스 라떼', amount: 5_000 },
    { category: '식사', item: '점심 식사 (김치찌개)', amount: 12_000 },
    { category: '생활용품', item: '세제 구입', amount: 8_000 },
    { category: '여가 활동', item: '넷플릭스 구독', amount: 14_000 },
    { category: '기타', item: '책 구입', amount: 20_000 },
  ];

  const totalSpending = expenseItems.reduce((acc, cur) => acc + cur.amount, 0);

  // ✅ 초기값이 0인 애니메이션 데이터
  const [animatedData, setAnimatedData] = useState([
    { label: '총 지출', value: 0 },
    { label: '총 수입', value: 0 },
    { label: '목표 금액', value: 0 },
  ]);

  // ✅ 원래의 데이터 (최종적으로 표시될 값)
  const originalData = [
    { label: '총 지출', value: totalSpending },
    { label: '총 수입', value: 40_000 },
    { label: '목표 금액', value: goalAmount || 0 },
  ];

  // ✅ `useEffect`를 사용해 애니메이션 적용
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedData(originalData); // 0에서 실제 값으로 변경
    }, 300); // 0.3초 후 실행 (부드러운 시작 효과)

    return () => clearTimeout(timeout); // 정리 함수로 불필요한 실행 방지
  }, [goalAmount]);

  return (
    <div className={`graph-wrapper ${isSidebarOpen ? 'sidebar-active' : ''}`}>
      {/* 좌측 섹션: 그래프 */}
      <div className="graph-left">
        <div className="expense-graph-card">
          <h3>지출, 수입, 목표 금액 비교 그래프</h3>
          <ResponsiveContainer width="100%" height={300}>
            {/* ✅ 여기서 data를 animatedData로 변경 */}
            <BarChart data={animatedData} barGap={10}>
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
              <Bar dataKey="value" fill="#001f5c" radius={[10, 10, 0, 0]}>
                {/* ✅ 막대에 애니메이션 적용 */}
                {animatedData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    style={{
                      transition:
                        'height 1s ease-in-out, opacity 0.8s ease-in-out',
                      opacity: entry.value === 0 ? 0 : 1, // 애니메이션 자연스럽게
                    }}
                  />
                ))}
              </Bar>
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
