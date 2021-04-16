// Open Menu
const pageMenu = document.querySelector('.page-menu');
const openMenu = document.querySelector('.menu-button');
const closeMenu = pageMenu.querySelector('.close-button')

function handleMenu(boolean) {
  if (boolean) {
    pageMenu.classList.remove('hidden');
    pageMenu.classList.add('active');
  } else {
    pageMenu.classList.add('hidden');
    pageMenu.classList.remove('active');

  }
}

openMenu.addEventListener('click', handleMenu.bind(null, true));
closeMenu.addEventListener('click', handleMenu.bind(null, false));
