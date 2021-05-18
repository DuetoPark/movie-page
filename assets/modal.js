// 모달 열림/닫힘
const prototypeModal = {
  handleModal: function() {
    // bind로 인해 this 변경 (window --> modalFactory의 변수 'modal')
    this.wrapper.classList.toggle('hidden');
    this.wrapper.classList.toggle('modal-active');

    // 아이디 입력창에 포커스
    if (this.wrapper.classList.contains('modal-active')) {
      this.wrapper.querySelector('#user-id').focus();
    }
  },
  clickEvent: function(openButton, closeButton) {
    // this: modalFactory의 변수 'modal'
    openButton.addEventListener('click', this.handleModal.bind(this));
    closeButton.addEventListener('click', this.handleModal.bind(this));
  },
};

function modalFactory(wrapper, openButton) {
  let modal = Object.create(prototypeModal);
  modal.wrapper = document.querySelector(wrapper);
  modal.closeButton = document.querySelector(wrapper+' .modal-close');
  modal.openButton = document.querySelector(openButton);

  // 클릭 이벤트 실행
  if (modal.wrapper) modal.clickEvent(modal.openButton, modal.closeButton);

  return modal;
}

const login = modalFactory('#login-modal', '.login-button');



// 로그인 모달 - 로그인 버튼 활성화
const loginInputs = document.querySelectorAll("#login-modal input");
let isIdTrue = false;
let isPwTrue = false;

function toggleLoginButton() {
  const loginButton = document.querySelector("#login-modal .login-button");

  if (this.dataset.type === 'id') {
    isIdTrue = this.value ? true : false;
  }

  if (this.dataset.type === 'pw') {
    isPwTrue = this.value ? true : false;
  }

  if (isIdTrue && isPwTrue) {
    loginButton.classList.add('active');
    loginButton.setAttribute('tabindex', 0);
  } else {
    loginButton.classList.remove('active');
    loginButton.setAttribute('tabindex', -1);
  }
}

loginInputs.forEach(function(input) {
  input.addEventListener('keyup', toggleLoginButton);
});
