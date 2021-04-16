// 메뉴 이벤트
const pageMenu = document.querySelector('.page-menu');
const openMenu = document.querySelector('.menu-button');
const closeMenu = pageMenu.querySelector('.close-button')
const desktop = 768;

function handleMenu(show) {
  if (show) {
    pageMenu.classList.remove('hidden');
    pageMenu.classList.add('active');
  } else {
    pageMenu.classList.add('hidden');
    pageMenu.classList.remove('active');

  }
}

function handleResize() {
  if (this.innerWidth >= desktop) {
    pageMenu.classList.remove('hidden');
    pageMenu.classList.add('active');
  } else {
    pageMenu.classList.add('hidden');
    pageMenu.classList.remove('active');
  }
}

handleResize();

openMenu.addEventListener('click', handleMenu.bind(null, true));
closeMenu.addEventListener('click', handleMenu.bind(null, false));
window.addEventListener('resize', handleResize);

// 스크롤 이동 (인터넷에서 긁어옴)
$(document).on('click', 'a[href^="#"]', function (event) {
  event.preventDefault();

  $('html, body').animate({
    scrollTop: $($.attr(this, 'href')).offset().top
  }, 500);

  if (document.body.clientWidth<768) {
    document.querySelector('.page-menu').style.display = 'none';
  }
});




// 관람 내역, 리뷰
const prototypeHistory = {
  showHistory: function(isMultiple, hidden, button) {
    button.classList.add('hidden');

    if (isMultiple) {
      for (let i=0; i < hidden.length; i++) {
        hidden[i].classList.remove('hidden');
        hidden[i].classList.add('active');
      }
    } else {
      hidden.classList.remove('hidden');
      hidden.classList.add('active');
    }
  },

  applyEvent: function(button) {
    button.addEventListener('click',
      this.showHistory.bind(null, this.isMultiple, this.hidden, this.button));
  },
};

function historyFactory(isMultiple, hidden, button) {
  let history = Object.create({});
  history.button = document.querySelector(button);
  history.isMultiple = isMultiple;
  history.multiple = document.querySelectorAll(hidden);
  history.one = document.querySelector(hidden);
  history.hidden = isMultiple ? history.multiple : history.one;

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
