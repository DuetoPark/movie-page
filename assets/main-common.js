// 헤더 버튼 보임/숨김 & 탭 포커스 이벤트
const header = document.querySelector('#header');
const navButtons = header.querySelectorAll("#menu > *[data-menu=true]");
const threeLinesButton = header.querySelector('.three-lines-button');
const eventButton = header.querySelector('.event-button') || '';
const logoutButton = header.querySelector('.logout-button') || '';
const screen = {
  desktop: 768,
  tablet: 576,
};
let onTablet = false;
let isActivated = false;

function setTabIndex(elem, tabIndex) {
  elem.setAttribute('tabindex', tabIndex);
}

function setTabIndexOfHeader() {
  onTablet = window.innerWidth >= screen.tablet ? true : false;
  isActivated = header.classList.contains('active');

  navButtons.forEach(button => setTabIndex(button, !onTablet && !isActivated ? -1: 0));
  setTabIndex(threeLinesButton, onTablet ? -1 : 0);

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

function toggleThreeLinesButton(state) {
  threeLinesButton.classList[state ? 'remove' : 'add']('hidden');
  if (eventButton) {
    eventButton.classList[state ? 'remove' : 'add']('hidden');
  }
}

function handleHeader() {
  onTablet = window.innerWidth >= screen.tablet ? true : false;

  if (onTablet) {
    toggleThreeLinesButton(false);
    toggleHeader();
  } else { // Mobile
    toggleThreeLinesButton(true);
    setTabIndexOfHeader();
  }
}

document.addEventListener("DOMContentLoaded", setTabIndexOfHeader);
document.addEventListener("DOMContentLoaded", handleHeader);
window.addEventListener('resize', handleHeader);
threeLinesButton.addEventListener('click', toggleHeader);
