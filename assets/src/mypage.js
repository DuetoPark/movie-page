// 헤더 스크롤 이벤트 - fixedNav
const nav = document.querySelector('#menu');
const topOfNav = nav.offsetHeight;

function fixNav() {
  if (window.scrollY >= 72) {
    nav.classList.add('fixed-nav');
  } else {
    nav.classList.remove('fixed-nav');
  }
}

window.addEventListener('scroll', fixNav);





// 헤더 클릭 이벤트 - 스크롤 이동 (인터넷에서 긁어옴)
$(document).on('click', 'a[href^="#"]', function (event) {
  event.preventDefault();

  $('html, body').animate({
    scrollTop: $($.attr(this, 'href')).offset().top - topOfNav,
  }, 500);
});




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




// 예매내역 출력 & pagenation 클릭 이벤트
// ↓↓↓↓↓↓↓↓↓↓↓↓↓ 여기 리팩토링 하셈 ↓↓↓↓↓↓↓↓↓↓↓↓↓
const bookedHistory = document.querySelector('#history');
const historyData = state.booked;
let currentData = [];
let currentTableRow = [];
let currentIndex = 0;

function createHistory() {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  const tr = document.createElement('tr');
  const headDate = document.createElement('th');
  const headName = document.createElement('th');
  const headCount = document.createElement('th');
  const headSeat = document.createElement('th');

  table.setAttribute('aria-label', '이전 예매 내역');
  thead.className = 'table-head';
  headDate.textContent = "날짜";
  headName.textContent = "영화이름";
  headCount.textContent = "인원";
  headSeat.textContent = "좌석";
  tbody.id = "table-body";
  tbody.classList = "table-body";
  tbody.setAttribute('role', 'tabpanel');

  bookedHistory.appendChild(table);
  table.appendChild(thead);
  table.appendChild(tbody);
  thead.appendChild(tr);
  tr.appendChild(headDate);
  tr.appendChild(headName);
  tr.appendChild(headCount);
  tr.appendChild(headSeat);

  populateCurrentData(tbody);
}

function populateCurrentData(tbody) {
  currentData = historyData.slice(currentIndex, currentIndex + 5);

  for (let i=0; i<5; i+=1) {
    createContent(tbody);
  }
  matchData(currentData);
}

function createContent(tbody) {
  const tr = document.createElement('tr');
  const historyDate = document.createElement('td');
  const historyName = document.createElement('td');
  const historyCount = document.createElement('td');
  const historySeat = document.createElement('td');

  historyDate.className = "history-date";
  historyName.className = "history-name";
  historyCount.className = "history-count";
  historySeat.className = "history-seat";

  tbody.appendChild(tr);
  tr.appendChild(historyDate);
  tr.appendChild(historyName);
  tr.appendChild(historyCount);
  tr.appendChild(historySeat);

  currentTableRow.push(tr);
}

function matchData(currentData) {
  currentTableRow.forEach(function(tr, index) {
    const dateElement = tr.querySelector(".history-date");
    const nameElement = tr.querySelector(".history-name");
    const countElement = tr.querySelector(".history-count");
    const seatElement = tr.querySelector(".history-seat");

    const dateValue = currentData[index] ? currentData[index].date : "";
    const nameValue = currentData[index] ? currentData[index].movie.name : "";
    const countValue = currentData[index] ? currentData[index].count.total : "";
    const seatValue = currentData[index] ? currentData[index].seat : "";

    dateElement.textContent = dateValue;
    nameElement.textContent = nameValue;
    countElement.textContent = countValue;
    seatElement.textContent = seatValue;
  });
}


function createPagenation() {
  const pagenation = document.createElement('div');
  const preButton = document.createElement('button');
  const nextButton = document.createElement('button');

  pagenation.className = "pagenation";
  pagenation.classList.add('d-flex', 'justify-content-center');
  preButton.className = "pagenation-button pre inactive";
  preButton.setAttribute('role', 'tab');
  preButton.setAttribute('aria-controls', 'table-body');
  preButton.setAttribute('aria-label', '이전');
  nextButton.className = "pagenation-button next";
  nextButton.setAttribute('role', 'tab');
  nextButton.setAttribute('aria-controls', 'table-body');
  nextButton.setAttribute('aria-label', '다음');

  bookedHistory.appendChild(pagenation);
  pagenation.appendChild(preButton);
  pagenation.appendChild(nextButton);

  pagenation.addEventListener('click', sliceFiveUnits);
}

function sliceFiveUnits(e) {
  const tbody = document.querySelector('.table-body');
  const preButton = document.querySelector(".pagenation-button.pre");
  const nextButton = document.querySelector(".pagenation-button.next");
  const limit = Math.floor(historyData.length / 5) * 5;

  if (currentIndex > 0 && e.target === preButton) {
    currentIndex -= 5;
  } else if (currentIndex < limit && e.target === nextButton) {
    currentIndex += 5;
  }

  tbody.innerHTML = "";
  currentTableRow = [];
  populateCurrentData(tbody);
}

createHistory();
createPagenation();




// 예매내역 버튼 클릭
const bookedButton = document.querySelector('#booked .show-more');

function showMoreHistory() {
  const bookedHistory = document.querySelector('#history');
  bookedHistory.classList.remove('hidden');
  bookedHistory.classList.add('active');
  bookedButton.setAttribute('aria-expanded', true);
}

function hideBookedButton() {
  bookedButton.classList.add('hidden');
}

function toggleHistory() {
  showMoreHistory();
  hideBookedButton();
}

bookedButton.addEventListener('click', toggleHistory);
