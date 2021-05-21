// 헤더 스크롤 이동 (인터넷에서 긁어옴) - 이벤트 버튼
$(document).on('click', '.event-button', function (event) {
  event.preventDefault();

  $('html, body').animate({
    scrollTop: $($.attr(this, 'href')).offset().top
  }, 1000);

  toggleHeader();
});




// 배너 & playing - 중복 처리
const prototypeInfo = {
  changeName: function(data, item) {
    if (item.dataset.list === "playing") return;
    item.querySelector('.name').textContent = data.name;
  },
  changeImage: function(data, item) {
    let path;

    if (item.dataset.list === "playing") {
      path = `../assets/images/${data.poster}.jpg`;
    } else {
      path = `../assets/images/${data.image}.gif`;
    }

    item.querySelector('.image').setAttribute('src', path);
    item.querySelector('.image').setAttribute('alt', data.name);
  },
  changeStar: function(data, item) {
    let star;
    const fillStar = Math.floor(data.star);
    const emptyStar = Math.ceil(data.star - Math.floor(data.star));
    star = '★'.repeat(fillStar) + '☆'.repeat(emptyStar) + '(';

    item.querySelector('.icon').textContent = star;
  },
  changeGenre: function(data, item) {
    const genre = Object
      .keys(data.genre)
      .map(key => data.genre[key] ? key : '')
      .filter(item => item != '')
      .join(', ');

    item.querySelector('.genre > dd').textContent = genre;
  },
  clone: function(data) {
    const clone = this.origin.cloneNode(true);
    clone.setAttribute('data-origin', false);
    clone.querySelector('.review > p').textContent = data.review;
    clone.querySelector('.review > cite').textContent = data.reviewUser;
    clone.querySelector('.desc-title').textContent = data.name;
    clone.querySelector('.rating').setAttribute('aria-label', data.star + '점');
    clone.querySelector('.rating').textContent =  data.star;
    clone.querySelector('.actor > dd').textContent = data.actor;
    clone.querySelector('.director > dd').textContent = data.director;

    this.changeName(data, clone);
    this.changeImage(data, clone);
    this.changeStar(data, clone);
    this.changeGenre(data, clone);
    this.container.appendChild(clone);
  },
  populate: function(target) {
    const keys = Object.keys(state.movieList).slice(1);
    keys.forEach(key => target.clone(state.movieList[key]));
  }
};

function infoFactory(section) {
  let info = Object.create(prototypeInfo);
  info.elem = document.querySelector(section);
  info.container = info.elem.querySelector('ol');
  info.origin = info.elem.querySelector('li:first-of-type');

  info.populate(info);

  return info;
}

const bannerInfo = infoFactory('#banner');
const playingInfo = infoFactory('#playing');





// 배너 영화정보 활성/비활성
const bannerListItems = document.querySelectorAll('#banner li');

function toggleInfo(boolean, bannerItem) {
  const info = bannerItem.querySelector('.info');

  bannerItem.classList[boolean ? 'add' : 'remove']('active');
  info.classList[boolean ? 'remove' : 'add']('hidden');
}

function translateInfo(bannerItem){
  const info = bannerItem.querySelector('.info');
  const coords = {};

  if (navigator.userAgent.indexOf('Chrome') != -1) { // chrome
    coords.left = banner.offsetLeft;
    coords.top = bannerItem.offsetTop + banner.offsetTop + banner.offsetHeight * 0.5;
  } else { // Internet Explore
    coords.left = banner.offsetLeft - bannerItem.offsetWidth * 1.5;
    coords.top = bannerItem.offsetTop + banner.offsetTop;
  }

  info.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
}

function handleMouseEnter() {
  if (window.innerWidth < screenSize.desktop) return;
  toggleInfo(true, this);
  translateInfo(this);
}

function handleMouseLeave() {
  toggleInfo(false, this);
}

bannerListItems.forEach(item => {
  item.addEventListener('mouseenter', handleMouseEnter);
  item.addEventListener('mouseleave', handleMouseLeave);
});




// New - 첫번째 리뷰 보임/숨김
const firstReview = document.querySelector('#new .review > p:first-of-type');

function handleReview() {
  firstReview.classList[onTablet ? 'remove' : 'add']('hidden');
}

document.addEventListener('DOMContentLoaded', handleReview);
window.addEventListener('resize', handleReview);




// Playing 이미지카드 클릭 이벤트
const imageCards = document.querySelectorAll('.image-card');

function flipCard() {
  if (onMobile) {
    this.classList.toggle('flipped');
  }
}

imageCards.forEach(card => card.addEventListener('click', flipCard));




// Playing 높이 조절 이벤트
function changeHeightOfImageCards() {
  const playing = document.querySelector('#playing');
  const imagesCards = playing.querySelectorAll('.image-card');

  imagesCards.forEach(imagesCard => {
    const image = imagesCard.querySelector('.image');
    const imageHeight = image.clientHeight;

    imagesCard.style.setProperty('--imageHeight', `${imageHeight}px`);
  });
}

// load 이벤트를 사용하는 이유
// - changeHeightOfImageCards()는 이미지의 clientHeight를 이용하는 함수
// - img태그를 인식하고 바로 넘겨버리는 DOMContentLoaded는 적합하지 않음
window.addEventListener("load", changeHeightOfImageCards);
window.addEventListener('resize', changeHeightOfImageCards);


// 로컬스토리지 데이터 저장
function saveIdIntoLocalStorage(e) {
  let data = new Object();
  const userId = window.location.search.split("=")[1];

  if (userId) {
    data.id = userId;
    localStorage.setItem('bookedData', JSON.stringify(data));
  }
}

saveIdIntoLocalStorage();
