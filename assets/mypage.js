// 헤더 버튼 보임/숨김 & 탭 포커스 이벤트
const header = document.querySelector('#header');
const buttons = header.querySelectorAll(".button-group > *");
const threeLinesButton = header.querySelector('.three-lines-button');
const screen = {
  desktop: 768,
  tablet: 576,
};
let onTablet = false;
let isActived = false;

function setTabIndex(elem, tabIndex) {
  elem.setAttribute('tabindex', tabIndex);
}

function handleTabIndexOfBanner() {
  onTablet = window.innerWidth >= screen.tablet ? true : false;
  isActived = header.classList.contains('active');

  setTabIndex(threeLinesButton, 0);

  if (onTablet) {
    buttons.forEach(function(button) {setTabIndex(button, 0);});
    setTabIndex(threeLinesButton, -1);
  } else if (!onTablet && isActived) { // Mobile & 활성화 상태
    buttons.forEach(function(button) {setTabIndex(button, 0);});
  } else if (!onTablet && !isActived) { // Mobile & 비활성화 상태
    buttons.forEach(function(button) {setTabIndex(button, -1);});
  }
}

function activeOrInactiveHeader() {
  const buttonGroup = header.querySelector('.button-group');

  isActived = header.classList.contains('active');

  if (onTablet || isActived) {
    isActived = false;
    header.classList.remove('active');
    threeLinesButton.setAttribute('aria-expanded', false);
    handleTabIndexOfBanner();
  } else {
    isActived = true;
    header.classList.add('active');
    threeLinesButton.setAttribute('aria-expanded', true);
    handleTabIndexOfBanner();
  }
}

function toggleBannerButtons(state) {
  if (state === 'show') {
    threeLinesButton.classList.remove('hidden');
  } else if (state === 'hide') {
    threeLinesButton.classList.add('hidden');
  }
}

function displayHeaderButtons() {
  onTablet = window.innerWidth >= screen.tablet ? true : false;

  if (onTablet) {
    toggleBannerButtons('hide');
    activeOrInactiveHeader();
  } else { // Mobile
    toggleBannerButtons('show');
    handleTabIndexOfBanner();
  }
}

window.addEventListener('resize', displayHeaderButtons);
window.addEventListener("DOMContentLoaded", displayHeaderButtons);
window.addEventListener("DOMContentLoaded", handleTabIndexOfBanner);
threeLinesButton.addEventListener('click', activeOrInactiveHeader);



// 스크롤 이동 (인터넷에서 긁어옴)
$(document).on('click', 'a[href^="#"]', function (event) {
  event.preventDefault();

  $('html, body').animate({
    scrollTop: $($.attr(this, 'href')).offset().top
  }, 500);
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
