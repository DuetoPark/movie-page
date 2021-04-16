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
  this.classList.add('hidden');
}

showHistory.addEventListener('click', handleHistory);
