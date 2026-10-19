// 서버/DB 대신 Array를 데이터 저장소로 사용합니다.
let loans = [
  { id: 1, borrower: "김민수", equipment: "노트북", category: "전자기기", dueDate: "2026-10-21", returned: false },
  { id: 2, borrower: "이지원", equipment: "삼각대", category: "촬영기기", dueDate: "2026-10-23", returned: true },
  { id: 3, borrower: "박서연", equipment: "프로젝터", category: "전자기기", dueDate: "2026-10-25", returned: false }
];
let nextId = 4;

const form = document.querySelector("#loanForm");
const rows = document.querySelector("#loanRows");
const summary = document.querySelector("#summary");
const message = document.querySelector("#message");
// 분류 필터 select 요소를 가져옵니다.
const categoryFilter = document.querySelector("#categoryFilter");

function render(list = loans) {
  rows.innerHTML = "";
  list.forEach((loan) => {
    const tr = document.createElement("tr");
    [loan.id, loan.borrower, loan.equipment, loan.category, loan.dueDate].forEach((value) => {
      const td = document.createElement("td");
      td.textContent = value;
      tr.appendChild(td);
    });
    const statusCell = document.createElement("td");
    // TODO Q4-A: loan.returned 값에 따라 상태 문구와 Bootstrap badge 클래스 설정
    // 반납 여부에 따라 배지 색상과 상태 문구를 설정합니다.
    const badge = document.createElement("span");
    badge.className = loan.returned ? "badge text-bg-success" : "badge text-bg-warning";
    badge.textContent = loan.returned ? "완료" : "진행중";
    statusCell.appendChild(badge);
    tr.appendChild(statusCell);

    const actions = document.createElement("td");
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "btn btn-sm btn-outline-primary me-2";
    toggle.textContent = loan.returned ? "대여중으로" : "반납 처리";
    toggle.addEventListener("click", () => toggleReturn(loan.id));
    actions.appendChild(toggle);
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "btn btn-sm btn-outline-danger";
    remove.textContent = "삭제";
    remove.addEventListener("click", () => removeLoan(loan.id));
    actions.appendChild(remove);
    tr.appendChild(actions);
    rows.appendChild(tr);
  });
  // TODO Q4-B: #summary에 전체 건수와 반납완료 건수 출력

  const returnedCount = loans.filter((loan) => loan.returned).length;

  summary.textContent = `전체 ${loans.length}건 / 반납완료 ${returnedCount}건`;
}

function toggleReturn(id) {
  const loan = loans.find((row) => row.id === id);
  if (!loan) return;
  loan.returned = !loan.returned;
  render();
}

function removeLoan(id) {
  if (!confirm("이 대여 기록을 삭제하시겠습니까?")) return;
  loans = loans.filter((row) => row.id !== id);
  render();
}

// TODO Q3-B: submit 이벤트 처리, 유효성 검사, 새로운 객체 추가, reset, 메시지 및 render

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const borrower = form.elements.borrower.value.trim();
  const equipment = form.elements.equipment.value.trim();
  const category = form.elements.category.value;
  const dueDate = form.elements.dueDate.value;

  if (borrower.length < 2 || !equipment || !category || !dueDate) return;

  const loan = {
    id: nextId++,
    borrower: borrower,
    equipment: equipment,
    category: category,
    dueDate: dueDate,
    returned: false
  };

  loans.push(loan);
  form.reset();

  message.textContent = "대여 등록이 완료되었습니다.";
  render();
});


// TODO Q5-B: #categoryFilter의 change 이벤트, 분류별 filter 및 render



render();
