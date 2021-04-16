// Open Menu
const pageMenu = document.querySelector('.page-menu');
const openMenu = document.querySelector('.menu-button');
const closeMenu = pageMenu.querySelector('.close-button')

function handleMenu(show) {
  if (show) {
    pageMenu.classList.remove('hidden');
    pageMenu.classList.add('active');
  } else {
    pageMenu.classList.add('hidden');
    pageMenu.classList.remove('active');

  }
}

openMenu.addEventListener('click', handleMenu.bind(null, true));
closeMenu.addEventListener('click', handleMenu.bind(null, false));




// 숨김 요소 출력 이벤트
const prototypeHistory = {
  showHistory: function() {
    // bind로 인해 this 변경 (window --> displayFactory의 변수 'history')
    this.button.classList.add('hidden');

    if (this.isMultiple) {
      for (let i=0; i < this.hidden.length; i++) {
        this.hidden[i].classList.remove('hidden');
        this.hidden[i].classList.add('active');
      }
    } else {
      this.hidden.classList.remove('hidden');
      this.hidden.classList.add('active');
    }
  },

  applyEvent: function(button) {
    // this: displayFactory의 변수 'history'
    button.addEventListener('click', this.showHistory.bind(this));
  },
};

function historyFactory(isMultiple, hidden, button) {
  let history = Object.create({});
  history.isMultiple = isMultiple;
  history.hidden = isMultiple ? document.querySelectorAll(hidden) : document.querySelector(hidden);
  history.button = document.querySelector(button);

  history.__proto__ = prototypeHistory;

  history.applyEvent(history.button); // 클릭 이벤트 실행

  return history;
}

const seen = historyFactory(false, '.reservation-confirm-seen', '.seen-confirm-button');
const review = historyFactory(true, '[data-review="hidden"]', '.more-button');






// 프로필 사진 변경 (인터넷에서 긁어옴)
const profileImage = document.querySelector('.profile-image');
const inputFiles = document.querySelector("#files");

function readURL() {
  var reader = new FileReader();

  reader.onload = function (e) {
    profileImage.setAttribute('src', e.target.result);
  }

  reader.readAsDataURL(this.files[0]);
}

inputFiles.addEventListener('change', readURL);
