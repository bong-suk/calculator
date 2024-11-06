const buttons = document.querySelectorAll(".button");
const display = document.getElementById("display");

let firstOperand = null;
let operator = null;
let previousOperator = null;

function updateDisplay(value) {
  display.textContent = value;
}

const operations = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
};

function calculate(firstOperand, operator, secondOperand) {
  const num1 = parseFloat(firstOperand);
  const num2 = parseFloat(secondOperand);
  const operation = operations[operator];
  return operation ? operation(num1, num2) : "Error";
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonValue = button.textContent;
    const displayValue = display.textContent;
    if (button.classList.contains("number")) {
      if (operator === null) {
        // 첫 번째 피연산자 입력
        firstOperand =
          firstOperand === null || firstOperand === "0"
            ? buttonValue
            : firstOperand + buttonValue;
      } else {
        // 두 번째 피연산자 입력
        displayValue =
          displayValue === "0" || displayValue === firstOperand
            ? buttonValue
            : displayValue + buttonValue;
      }
      updateDisplay(displayValue);
    } else if (buttonValue === "C") {
      // 초기화
      firstOperand = null;
      operator = null;
      previousOperator = null;
      updateDisplay("0");
    } else if (buttonValue === ".") {
      // 소수점 처리
      if (!displayValue.includes(".")) {
        updateDisplay(displayValue + ".");
      }
    } else if (["+", "-", "*", "/"].includes(buttonValue)) {
      // 연산자 버튼 클릭 시
      // ... (previousOperator 활용 로직 추가 가능) ...
      operator = buttonValue;
      previousOperator = buttonValue;
    } else if (buttonValue === "=") {
      // 계산 수행
      if (operator !== null) {
        const secondOperand = displayValue;
        const result = calculate(firstOperand, operator, secondOperand);
        updateDisplay(result);
        firstOperand = result;
        operator = null;
      }
      previousOperator = buttonValue;
    }
  });
});
