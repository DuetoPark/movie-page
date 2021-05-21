"use strict";var screenSize={desktop:768,tablet:576},onTablet=!1,onMobile=!1;function checkScreenSize(){window.innerWidth>=screenSize.tablet?(onTablet=!0,onMobile=!1):(onTablet=!1,onMobile=!0)}window.addEventListener("resize",checkScreenSize),document.addEventListener("DOMContentLoaded",checkScreenSize);// 헤더 버튼 보임/숨김 & 탭 포커스 이벤트
var header=document.querySelector("#header"),navButtons=header.querySelectorAll("#menu > *[data-menu=true]"),threeLinesButton=header.querySelector(".three-lines-button"),eventButton=header.querySelector(".event-button")||"",logoutButton=header.querySelector(".logout-button")||"",isActivated=!1;function setTabIndex(elem,tabIndex){elem.setAttribute("tabindex",tabIndex)}function setTabIndexOfHeader(){isActivated=header.classList.contains("active"),setTabIndex(threeLinesButton,onMobile?0:-1),navButtons.forEach(function(button){setTabIndex(button,onMobile&&!isActivated?-1:0)}),eventButton&&setTabIndex(eventButton,isActivated?0:-1),logoutButton&&setTabIndex(logoutButton,onTablet||isActivated?0:-1)}function toggleHeader(){isActivated=header.classList.contains("active"),isActivated=!(onTablet||isActivated),header.classList[isActivated?"add":"remove"]("active"),threeLinesButton.setAttribute("aria-expanded",!!isActivated),threeLinesButton.textContent=isActivated?"\uB2EB\uAE30":"\uBA54\uB274",setTabIndexOfHeader()}function toggleMenuButtons(){threeLinesButton.classList[onMobile?"remove":"add"]("hidden"),eventButton&&eventButton.classList[onMobile?"remove":"add"]("hidden")}function handleHeader(){toggleMenuButtons(),onTablet&&toggleHeader(),onMobile&&setTabIndexOfHeader()}document.addEventListener("DOMContentLoaded",setTabIndexOfHeader),document.addEventListener("DOMContentLoaded",handleHeader),window.addEventListener("resize",handleHeader),threeLinesButton.addEventListener("click",toggleHeader);