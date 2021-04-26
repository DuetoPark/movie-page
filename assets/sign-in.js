// 입력창 포커스 이벤트
const signInInputs = document.querySelectorAll('#input input');

function toggleLabel() {
  if (this.value) return; // 입력값이 있으면 toggle 안 함
  const label = this.previousElementSibling;
  label.classList.toggle('focus-in');
}

signInInputs.forEach(function(input) {
  input.addEventListener('focusin', toggleLabel);
  input.addEventListener('focusout', toggleLabel);
});





// 회원가입 버튼 활성화
const agreePP = document.querySelector("#agree-pp");

function toggleSignInButton() {
  const signInButton = document.querySelector('#submit button');
  if (this.checked) {
    signInButton.classList.add('active');
  } else {
    signInButton.classList.remove('active');
  }
}

agreePP.addEventListener('change', toggleSignInButton);




// 비밀번호 확인
const password = document.querySelector('#user-pw');
const check = document.querySelector('#check-pw');
let words;

function saveWords() {
  words = this.value;
}

function showMessage(state) {
  const errorMessage = document.querySelector(".error");
  const okMessage = document.querySelector(".ok");

  if (state === 'ok') {
    okMessage.classList.remove('hidden');
    errorMessage.classList.add('hidden');
  } else if (state === 'error') {
    errorMessage.classList.remove('hidden');
    okMessage.classList.add('hidden');
  }
}

function checkPassword() {
  if (this.value === words) { // 일치하면
    showMessage('ok');
  } else { // 불일치하면
    showMessage('error');
  }
}

password.addEventListener('keyup', saveWords);
check.addEventListener('keyup', checkPassword);
