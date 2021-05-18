// 모달 열림/닫힘
const prototypeModal = {
  toggleModal: function() {
    this.wrapper.classList.toggle('hidden');
    this.wrapper.classList.toggle('modal-active');
  },
  initInputs: function() {
    const loginInputs = this.wrapper.querySelectorAll('.modal-form > input');
    loginInputs.forEach(function(input) {
      input.value = "";
    });
  },
  inactiveButton: function() {
    const loginButton = this.wrapper.querySelector('.login-button');
    loginButton.classList.remove('active');
  },
  open: function() {
    this.toggleModal();
    this.wrapper.querySelector('#user-id').focus();
  },
  close: function() {
    this.toggleModal();
    this.initInputs();
    this.inactiveButton();
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
