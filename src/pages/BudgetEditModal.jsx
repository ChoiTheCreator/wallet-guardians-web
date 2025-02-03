import { useState } from "react";
import { updateBudget } from "../api/budgetApi"; // 예산 수정 API import
import "../style/BudgetEditModal.scss"; 

const BudgetEditModal = ({ isOpen, onClose, budgetData }) => {
  if (!isOpen) return null; // 모달이 열려있지 않으면 렌더링하지 않음

  const [goalAmount, setGoalAmount] = useState(budgetData.goalAmount); 
  const [yearMonth, setYearMonth] = useState(budgetData.date);
  const [errorMessage, setErrorMessage] = useState("");

  // 예산 수정 요청
  const handleUpdateBudget = async () => {
    if (!goalAmount || isNaN(goalAmount) || parseInt(goalAmount, 10) <= 0) {
      setErrorMessage("올바른 숫자 금액을 입력해주세요.");
      return;
    }

    try {
      await updateBudget(
        budgetData.id,
        budgetData.user_id,
        parseInt(goalAmount, 10), // 변경된 goalAmount 전달
        yearMonth
      );
      alert("목표 금액이 성공적으로 수정되었습니다!");
      onClose(); // 모달 닫기
    } catch (error) {
      console.error("목표 금액 수정 오류:", error);
      setErrorMessage("목표 금액 수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="budget-modal-overlay">
      <div className="budget-modal">
        <h2>목표 금액 수정</h2>
        <label>연월 (YYYY-MM)</label>
        <input
          type="text"
          value={yearMonth}
          onChange={(e) => setYearMonth(e.target.value)}
        />

        <label>목표 금액</label>
        <input
          type="text"
          value={goalAmount}
          onChange={(e) => setGoalAmount(e.target.value)}
        />

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="button-group">
          <button className="save-btn" onClick={handleUpdateBudget}>수정</button>
          <button className="cancel-btn" onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default BudgetEditModal;

