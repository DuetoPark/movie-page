// 입력창 포커스 이벤트
const signInInputs = document.querySelectorAll('#input input');

function toggleLabel() {
  if (this.value) return; // 입력값이 있으면 toggle 안 함
  const label = this.previousElementSibling;
  label.classList.toggle('focus-in');
}

signInInputs.forEach(input => {
  input.addEventListener('focusin', toggleLabel);
  input.addEventListener('focusout', toggleLabel);
});





// 회원가입 버튼 활성화
const checkboxForAgreePP = document.querySelector("#agree-pp");

function toggleSignInButton() {
  const signInButton = document.querySelector('#submit button');
  signInButton.classList[this.checked ? 'add' : 'remove']('active');
  signInButton.setAttribute('tabindex', this.checked ? 0 : -1);
}

checkboxForAgreePP.addEventListener('change', toggleSignInButton);




// 비밀번호 확인
const password = document.querySelector('#user-pw');
const check = document.querySelector('#check-pw');

function showAndHide(show, hide) {
  show.classList.remove('hidden');
  hide.classList.add('hidden');
}

function setAlert(set, remove) {
  set.setAttribute('role', 'alert');
  remove.removeAttribute('role');
}

function populateMessage(state) {
  const errorMessage = document.querySelector(".error");
  const okMessage = document.querySelector(".ok");

  if (state === 'ok') {
    showAndHide(okMessage, errorMessage);
    setAlert(okMessage, errorMessage);
  } else if (state === 'error') {
    showAndHide(errorMessage, okMessage);
    setAlert(errorMessage, okMessage);
  }
}

function hideAllMessages() {
  const messages = document.querySelectorAll('#check-pw ~ p');
  messages.forEach(message => message.classList.add('hidden'));
}

function checkPassword() {
  if (!check.value) { // 비밀번호 확인 입력값 없으면
    hideAllMessages();
    return;
  }

  populateMessage(check.value === password.value ? 'ok' : 'error');
}

password.addEventListener('keyup', checkPassword);
check.addEventListener('keyup', checkPassword);
