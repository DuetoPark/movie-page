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
