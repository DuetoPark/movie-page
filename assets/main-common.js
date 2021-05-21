const screenSize = {
  desktop: 768,
  tablet: 576,
};

let onTablet = false;
let onMobile = false;

function checkScreenSize() {
  if (window.innerWidth >= screenSize.tablet) {
    onTablet = true;
    onMobile = false;
  } else {
    onTablet = false;
    onMobile = true;
  }
}

window.addEventListener('resize', checkScreenSize);
document.addEventListener('DOMContentLoaded', checkScreenSize);



// 헤더 버튼 보임/숨김 & 탭 포커스 이벤트
const header = document.querySelector('#header');
const navButtons = header.querySelectorAll("#menu > *[data-menu=true]");
const threeLinesButton = header.querySelector('.three-lines-button');
const eventButton = header.querySelector('.event-button') || '';
const logoutButton = header.querySelector('.logout-button') || '';
let isActivated = false;

function setTabIndex(elem, tabIndex) {
  elem.setAttribute('tabindex', tabIndex);
}

function setTabIndexOfHeader() {
  isActivated = header.classList.contains('active');

  setTabIndex(threeLinesButton, onMobile ? 0 : -1);
  navButtons.forEach(button => {
    setTabIndex(button, onMobile && !isActivated ? -1 : 0);
  });

  if (eventButton) {
    setTabIndex(eventButton, isActivated ? 0 : -1);
  }
  
  if (logoutButton) {
    setTabIndex(logoutButton, onTablet || isActivated ? 0 : -1);
  }
}

function toggleHeader() {
  isActivated = header.classList.contains('active');

  if (onTablet || isActivated) { isActivated = false; }
  else { isActivated = true; }

  header.classList[isActivated ? 'add' : 'remove']('active');
  threeLinesButton.setAttribute('aria-expanded', isActivated ? true : false);
  threeLinesButton.textContent = isActivated ? "닫기" : "메뉴";
  setTabIndexOfHeader();
}

function toggleMenuButtons() {
  threeLinesButton.classList[onMobile ? 'remove' : 'add']('hidden');
  if (eventButton) {
    eventButton.classList[onMobile ? 'remove' : 'add']('hidden');
  }
}

function handleHeader() {
  toggleMenuButtons();

  if (onTablet) {
    toggleHeader();
  }
  if (onMobile){
    setTabIndexOfHeader();
  }
}

document.addEventListener("DOMContentLoaded", setTabIndexOfHeader);
document.addEventListener("DOMContentLoaded", handleHeader);
window.addEventListener('resize', handleHeader);
threeLinesButton.addEventListener('click', toggleHeader);
