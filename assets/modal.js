// 모달 열림/닫힘
const prototypeModal = {
  toggleModal: function() {
    this.wrapper.classList.toggle('hidden');
    this.wrapper.classList.toggle('modal-active');
  },
  initForm: function() {
    const form = this.wrapper.querySelector('.modal-form');
    form.reset();
  },
  open: function() {
    this.toggleModal();
    this.wrapper.querySelector('input[type=text]:first-child').focus();
  },
  close: function() {
    this.toggleModal();
    this.initForm();
  },
  clickEvent: function(openButton, closeButton) {
    openButton.addEventListener('click', this.open.bind(this));
    closeButton.addEventListener('click', this.close.bind(this));
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
  if (this.tagName === 'BUTTON') { // 로그인 버튼 눌렀을 때
    isIdTrue = false;
    isPwTrue = false;
  }

  if (this.tagName === 'INPUT') { // 인풋 입력할 때
    if (this.dataset.loginInput === 'id') {
      isIdTrue = this.value ? true : false;
    }

    if (this.dataset.loginInput === 'pw') {
      isPwTrue = this.value ? true : false;
    }
  }

  loginButton.classList[isIdTrue && isPwTrue ? 'add' : 'remove']('active');
  loginButton.setAttribute('tabindex', isIdTrue && isPwTrue ? 0 : -1);
}

login.openButton.addEventListener('click', toggleLoginButton);
loginInputs.forEach(input => input.addEventListener('keyup', toggleLoginButton));
