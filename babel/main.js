// 헤더 버튼 보임/숨김 & 탭 포커스 이벤트
const header = document.querySelector('#header');
const buttons = header.querySelectorAll(".button-group > *");
const threeLinesButton = header.querySelector('.three-lines-button');
const eventButton = header.querySelector('.event-button');
const screen = {
  desktop: 768,
  tablet: 576
};
let onTablet = false;
let isActived = false;

function setTabIndex(elem, tabIndex) {
  elem.setAttribute('tabindex', tabIndex);
}

function handleTabIndexOfHeader() {
  onTablet = window.innerWidth >= screen.tablet ? true : false;
  isActived = header.classList.contains('active');

  setTabIndex(threeLinesButton, 0);
  setTabIndex(eventButton, 0);

  if (onTablet) {
    buttons.forEach(button => setTabIndex(button, 0));
    setTabIndex(threeLinesButton, -1);
    setTabIndex(eventButton, -1);
  } else if (!onTablet && isActived) {
    // Mobile & 활성화 상태
    buttons.forEach(button => setTabIndex(button, 0));
  } else if (!onTablet && !isActived) {
    // Mobile & 비활성화 상태
    buttons.forEach(button => setTabIndex(button, -1));
  }
}

function activeOrInactiveHeader() {
  const buttonGroup = header.querySelector('.button-group');

  isActived = header.classList.contains('active');

  if (onTablet || isActived) {
    isActived = false;
    header.classList.remove('active');
    threeLinesButton.setAttribute('aria-expanded', false);
    handleTabIndexOfHeader();
  } else {
    isActived = true;
    header.classList.add('active');
    threeLinesButton.setAttribute('aria-expanded', true);
    handleTabIndexOfHeader();
  }
}

function toggleBannerButtons(state) {
  if (state === 'show') {
    eventButton.classList.remove('hidden');
    threeLinesButton.classList.remove('hidden');
  } else if (state === 'hide') {
    eventButton.classList.add('hidden');
    threeLinesButton.classList.add('hidden');
  }
}

function displayHeaderButtons() {
  onTablet = window.innerWidth >= screen.tablet ? true : false;

  if (onTablet) {
    toggleBannerButtons('hide');
    activeOrInactiveHeader();
  } else {
    // Mobile
    toggleBannerButtons('show');
    handleTabIndexOfHeader();
  }
}

window.addEventListener('resize', displayHeaderButtons);
window.addEventListener("DOMContentLoaded", displayHeaderButtons);
window.addEventListener("DOMContentLoaded", handleTabIndexOfHeader);
threeLinesButton.addEventListener('click', activeOrInactiveHeader);

// 헤더 스크롤 이동 (인터넷에서 긁어옴) - 이벤트 버튼
$(document).on('click', '.event-button', function (event) {
  event.preventDefault();

  $('html, body').animate({
    scrollTop: $($.attr(this, 'href')).offset().top
  }, 1000);

  isActived = false;
  activeOrInactiveHeader();
});

// 배너 & playing - 중복 처리
let star;
let genre;
const prototypeInfo = {
  displayName: function (data, item) {
    if (item.dataset.list) return; // playingInfo
    item.querySelector('.name').textContent = data.name;
  },
  selectImage: function (data, item) {
    let path;
    if (item.dataset.list) {
      // playingInfo
      path = '../assets/images/' + data.poster + '.jpg';
    } else {
      // bannerInfo
      path = '../assets/images/' + data.image + '.gif';
    }

    item.querySelector('.image').setAttribute('src', path);
    item.querySelector('.image').setAttribute('alt', data.name);
  },
  selectStar: function (data, item) {
    let star = [];
    const fillStar = Math.floor(data.star);
    const emptyStar = Math.ceil(data.star - Math.floor(data.star));
    star = '★'.repeat(fillStar) + '☆'.repeat(emptyStar) + '(';

    item.querySelector('.icon').textContent = star;
  },
  selectGenre: function (data, item) {
    const keys = Object.keys(data.genre);
    genre = keys.map(function (key) {
      return data.genre[key] ? key : '';
    }, data).filter(item => item != '').join(', ');

    item.querySelector('.genre > dd').textContent = genre;
  },
  clone: function (data) {
    const item = this.origin.cloneNode(true);
    item.setAttribute('data-origin', false);
    item.querySelector('.review > p').textContent = data.review;
    item.querySelector('.review > cite').textContent = data.reviewUser;
    item.querySelector('.desc-title').textContent = data.name;
    item.querySelector('.rating').setAttribute('aria-label', data.star + '점');
    item.querySelector('.rating').textContent = data.star;
    item.querySelector('.actor > dd').textContent = data.actor;
    item.querySelector('.director > dd').textContent = data.director;

    this.displayName(data, item);
    this.selectImage(data, item);
    this.selectStar(data, item);
    this.selectGenre(data, item);
    this.container.appendChild(item);
  }
};

function infoFactory(section) {
  let info = Object.create(prototypeInfo);
  info.elem = document.querySelector(section);
  info.container = info.elem.querySelector('ol');
  info.origin = info.elem.querySelector('li:first-of-type');

  return info; // 이걸로 30분 삽질
}

function populateInfo(subject) {
  const keys = Object.keys(state.movieList).slice(1);

  keys.forEach(function (key) {
    subject.clone(state.movieList[key]);
  });
}

const bannerInfo = infoFactory('#banner');
const playingInfo = infoFactory('#playing');

populateInfo(bannerInfo);
populateInfo(playingInfo);

// 배너 영화정보 활성/비활성
const banner = document.querySelector('#banner');
const bannerItems = [];

for (let i = 0; i < banner.querySelectorAll('li').length; i += 1) {
  bannerItems.push(banner.querySelectorAll('li')[i]);
  // 하루 빨리 모두가 인터넷 익스플로러에서 다른 브라우저로 갈아탔으면 좋겠다.
}

function showOrHideInfo(state, bannerItem, info) {
  if (state === 'show') {
    bannerItem.classList.add('active');
    info.classList.remove('hidden');
  }
  if (state === 'hide') {
    bannerItem.classList.remove('active');
    info.classList.add('hidden');
  }
}

function translateInfo(bannerItem, info) {
  const coords = {};

  if (navigator.userAgent.indexOf('Chrome') != -1) {
    // chrome
    coords.left = banner.offsetLeft;
    coords.top = bannerItem.offsetTop + banner.offsetTop + banner.offsetHeight * 0.5;
  } else {
    // Internet Explore
    coords.left = banner.offsetLeft - bannerItem.offsetWidth * 1.5;
    coords.top = bannerItem.offsetTop + banner.offsetTop;
  }
  info.style.transform = 'translate(' + coords.left + 'px, ' + coords.top + 'px)';
}

function handleMouseEnter() {
  if (window.innerWidth < screen.desktop) return;

  const info = this.querySelector('.info');
  translateInfo(this, info);
  showOrHideInfo('show', this, info);
}

function handleMouseLeave() {
  if (window.innerWidth < screen.desktop) return;

  const info = this.querySelector('.info');
  showOrHideInfo('hide', this, info);
}

bannerItems.forEach(function (item) {
  item.addEventListener('mouseenter', handleMouseEnter);
  item.addEventListener('mouseleave', handleMouseLeave);
});

// New 리사이즈 이벤트
const firstReview = document.querySelector('#new .review > p:first-of-type');

function handleReview() {
  if (window.innerWidth > screen.tablet) {
    firstReview.classList.remove('hidden');
  } else {
    firstReview.classList.add('hidden');
  }
}

window.addEventListener('DOMContentLoaded', handleReview);
window.addEventListener('resize', handleReview);

// Playing 이미지카드 클릭 이벤트
const imageCards = document.querySelectorAll('.image-card');

function flipCard() {
  if (window.innerWidth < screen.tablet) {
    this.classList.toggle('flipped');
  }
}

imageCards.forEach(function (card) {
  card.addEventListener('click', flipCard);
});

// Playing 높이 조절 이벤트
function isChangableHeight() {
  const playing = document.querySelector('#playing');
  const imagesCards = playing.querySelectorAll('.image-card');

  imagesCards.forEach(function (card) {
    const image = card.querySelector('.image');
    const height = image.clientHeight;

    card.style.setProperty('--imageHeight', height + 'px');
  });
}

// load 이벤트를 사용하는 이유
// - isChangableHeight()는 이미지의 clientHeight를 이용하는 함수
// - img태그를 인식하고 바로 넘겨버리는 DOMContentLoaded는 적합하지 않음
window.addEventListener("load", isChangableHeight);
window.addEventListener('resize', isChangableHeight);

// 로컬스토리지 데이터 저장
function saveData(e) {
  let data = new Object();
  const userId = window.location.search.split("=")[1];

  if (userId) {
    data.id = userId;
    localStorage.setItem('bookedData', JSON.stringify(data));
  }
}

saveData();