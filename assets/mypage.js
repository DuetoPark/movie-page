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



// 관람내역 확인 이벤트
const history = document.querySelector('.reservation-confirm-seen');
const showHistory = document.querySelector('.seen-confirm-button');

function handleHistory() {
  history.classList.remove('hidden');
  history.classList.add('active');
  this.classList.add('hidden');
}

showHistory.addEventListener('click', handleHistory);




// 리뷰 더보기 이벤트
const reviews = [];
const showReviews = document.querySelector('.more-button');

for (let i=0; i<document.querySelectorAll('[data-hide="true"]').length; i+=1) {
  reviews.push(document.querySelectorAll('[data-hide="true"]')[i]);
}

function handldReviews() {
  reviews.map(function(review) {
    review.classList.remove('hidden');
    review.classList.add('active');
  });
  this.classList.add('hidden');
}

showReviews.addEventListener('click', handldReviews);
