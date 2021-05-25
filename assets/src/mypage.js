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
const bookedHistory = document.querySelector('#history');
const historyData = state.booked;
let currentData = [];
let currentTableRow = [];
let currentIndex = 0;


function createTr(tbody, fragment) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td class='history-date'></td>
    <td class='history-name'></td>
    <td class='history-count'></td>
    <td class='history-seat'></td>
  `;

  fragment.appendChild(tr);
  currentTableRow.push(tr);
}

function matchData(currentData) {
  currentTableRow.forEach((tr, index) => {
    const dateElement = tr.querySelector(".history-date");
    const nameElement = tr.querySelector(".history-name");
    const countElement = tr.querySelector(".history-count");
    const seatElement = tr.querySelector(".history-seat");

    const dateValue = currentData[index] ? currentData[index].date : '';
    const nameValue = currentData[index] ? currentData[index].movie.name : '';
    const countValue = currentData[index] ? currentData[index].count.total : '';
    const seatValue = currentData[index] ? currentData[index].seat : '';

    dateElement.textContent = dateValue;
    nameElement.textContent = nameValue;
    countElement.textContent = countValue;
    seatElement.textContent = seatValue;
  });
}

function populateTbody(tbody) {
  const fragment = document.createDocumentFragment();
  for (let i=0; i<5; i+=1) {
    createTr(tbody, fragment);
  }
  tbody.appendChild(fragment);

  currentData = historyData.slice(currentIndex, currentIndex + 5);
  matchData(currentData);
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
  populateTbody(tbody);
}

(function populateHistory() {
  bookedHistory.innerHTML = `
    <table aria-label='이전 예매 내역'>
      <thead class='table-head'>
        <tr>
          <th>날짜</th>
          <th>영화이름</th>
          <th>인원</th>
          <th>좌석</th>
        </tr>
      </thead>
      <tbody id='table-body' class='table-body' role='tabpanel'></tbody>
    </table>
  `;

  const tbody = bookedHistory.querySelector('#table-body');
  populateTbody(tbody);
})();

(function populatePagenation() {
  const pagenation = document.createElement('div');

  pagenation.setAttribute('class', 'pagenation d-flex justify-content-center');
  pagenation.innerHTML = `
    <button class='pagenation-button pre inactive'
      role='tab'
      aria-controls='table-body' aria-label='이전'>
    </button>
    <button class='pagenation-button next'
      role='tab'
      aria-controls='table-body' aria-label='다음'>
    </button>
  `;

  bookedHistory.appendChild(pagenation);
  pagenation.addEventListener('click', sliceFiveUnits);
})();




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
