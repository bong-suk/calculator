const buttons = document.querySelectorAll(".button");
const display = document.getElementById("display");

let firstOperand = null;
let operator = null;
let previousOperator = null; // 이전 연산자를 저장할 변수
let shouldResetDisplay = false; // 화면을 초기화해야 하는지 여부를 나타내는 변수

function updateDisplay(value) {
  display.textContent = value;
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonValue = button.textContent;

    if (button.classList.contains("number")) {
      // 숫자 버튼 클릭 시
      if (shouldResetDisplay) {
        updateDisplay(buttonValue);
        shouldResetDisplay = false;
      } else if (operator === null) {
        // 연산자가 없는 경우: 첫 번째 피연산자 입력
        if (firstOperand === null || firstOperand === "0") {
          firstOperand = buttonValue;
        } else {
          firstOperand += buttonValue;
        }
        updateDisplay(firstOperand);
      } else {
        // 연산자가 있는 경우: 두 번째 피연산자 입력
        if (
          display.textContent === "0" ||
          display.textContent === firstOperand
        ) {
          updateDisplay(buttonValue);
        } else {
          updateDisplay(display.textContent + buttonValue);
        }
      }
    } else if (buttonValue === "C") {
      // C 버튼 클릭 시: 초기화
      firstOperand = null;
      operator = null;
      previousOperator = null;
      shouldResetDisplay = false;
      updateDisplay("0");
    } else if (buttonValue === ".") {
      // . 버튼 클릭 시: 소수점 처리
      if (!display.textContent.includes(".")) {
        updateDisplay(display.textContent + ".");
      }
    } else if (buttonValue === "%") {
      // % 버튼 클릭 시: 백분율 계산
      const currentValue = parseFloat(display.textContent);
      if (!isNaN(currentValue)) {
        const result = currentValue * 0.01;
        updateDisplay(result);
        if (operator === null) {
          firstOperand = result;
        }
      }
    } else if (buttonValue === "±") {
      // ± 버튼 클릭 시: 부호 변경
      const currentValue = parseFloat(display.textContent);
      if (!isNaN(currentValue)) {
        const result = currentValue * -1;
        updateDisplay(result);
        if (operator === null) {
          firstOperand = result;
        }
      }
    } else if (["+", "-", "*", "/"].includes(buttonValue)) {
      // 연산자 버튼 클릭 시
      operator = buttonValue;
      previousOperator = buttonValue;
      shouldResetDisplay = true;
    } else if (buttonValue === "=") {
      // = 버튼 클릭 시: 계산 수행
      if (operator !== null) {
        const secondOperand = display.textContent;
        const result = calculate(firstOperand, operator, secondOperand);
        updateDisplay(result);
        firstOperand = result;
        operator = null;
        shouldResetDisplay = true;
      }
      previousOperator = buttonValue;
    }

    console.log(buttonValue);
  });
});

// 계산 함수
function calculate(firstOperand, operator, secondOperand) {
  const num1 = parseFloat(firstOperand);
  const num2 = parseFloat(secondOperand);

  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 / num2;
    default:
      return "Error";
  }
}
