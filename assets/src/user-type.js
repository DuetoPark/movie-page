// 전역변수
const sectionOfHistory = document.querySelector('#history');
const searchButton = document.querySelector('.search');
const searchInput = document.querySelector('#order-number');
const cancelButton = document.querySelector('#history .cancel');

// 예매확인 - 조회하기 버튼 활성화
function toggleSearchButton() {
  const isFilled = searchInput.value ? true : false;
  const isInactived = searchButton.classList.contains('inactive');

  if (isFilled && isInactived) {
    searchButton.classList.remove('inactive');
    searchButton.setAttribute('tabindex', 0);
  }

  if (!isFilled && !isInactived) {
    searchButton.classList.add('inactive');
    searchButton.setAttribute('tabindex', -1);
  }
}

searchInput.addEventListener('keyup', toggleSearchButton);




// 예매확인 - 예약번호 조회
function compareSeat(data, index) {
  data.sort((a, b) => {
    const lastNumber = a.split("-")[index];
    const nextNumber = b.split("-")[index];
    return lastNumber < nextNumber ? -1 : 1;
  });
  return data;
}

function displayName(data) {
  const section = document.querySelector('#history-name .mypage-desc');
  const koreanName = state.reservation.time[data.movie.name].name;
  const time = data.movie.time[0];
  const nameHTML = `<strong>${koreanName}</strong>(<strong>${time}</strong>)`;
  section.innerHTML = nameHTML;
}

function displaySeat(data) {
  const section = document.querySelector('#history-seat .mypage-desc');

  const sortNumber = compareSeat(data.seat, 1);
  const sortText = compareSeat(sortNumber, 0);

  let arrayOfseatsHTML = sortText
    .map(seat => `<span>${seat.split("-").join("")}</span>`);

  section.innerHTML = `<strong>${arrayOfseatsHTML}</strong>`;
}

function displayCount(data) {
  const sectionOfTotal = document.querySelector('#history-count .mypage-desc');
  const sectionOfDetails = document.querySelector('#history-count .details');

  let detailsHTML = "";
  for (const key in data.count) {
    if (data.count[key] && key != "total") {
      const value = data.count[key];
      const text = state.reservation.count[key].text;
      const textHTML = `<span>${text} ${value}명</span>`;
      detailsHTML += textHTML;
    }
  }

  sectionOfTotal.innerHTML = `<strong>총 ${data.count.total}명</strong>`;
  sectionOfDetails.innerHTML = detailsHTML;
}

function toggleHistory(active) {
  sectionOfHistory.classList[active ? 'remove' : 'add']('hidden');
  sectionOfHistory.classList[active ? 'add' : 'remove']('active');
  cancelButton.setAttribute('tabindex', [active ? 0 : -1]);
}

function searchReservation() {
  const userOrderData = JSON.parse(window.localStorage.getItem('userOrderData'));
  const orderNumber = searchInput.value;
  let isincluding = userOrderData
    .findIndex(element => element.order === orderNumber);

  if (isincluding >= 0) {
    toggleHistory(true);
    displayName(userOrderData[isincluding]);
    displaySeat(userOrderData[isincluding]);
    displayCount(userOrderData[isincluding]);
    sessionStorage.setItem('searchedOrderData', JSON.stringify(userOrderData[isincluding]));
  } else if (isincluding === -1) {
    alert('입력하신 번호를 찾을 수 없습니다. 다시 확인해 주시기 바랍니다.');
    searchInput.value = ''; // 인풋 초기화
    toggleHistory(false);
  }
}

searchButton.addEventListener('click', searchReservation);




// 예매확인 - 예매취소
let searchedOrderData;
let userOrderData;

function getStorageData(storage, key) {
  return JSON.parse(storage.getItem(key));
}

function saveChangedData(storage, key, changedData) {
  storage.setItem(key, JSON.stringify(changedData));
}

function returnCancelMessage() {
  return `
  예약 번호: ${searchedOrderData.order}
  영화명: ${searchedOrderData.movie.name}(${searchedOrderData.movie.time[0]})
  인원: 총 ${searchedOrderData.count.total}명
  `;
}

function returnChangedSeastData(seatData) {
  const name = searchedOrderData.movie.name;
  const time = searchedOrderData.movie.time[1];
  const seat = searchedOrderData.seat;

  seat.forEach(seat => {
    const key = seat.split('-')[0];
    const index = seat.split('-')[1] - 1;

    seatData[name][time][key][index] = 0;
  });

  return seatData;
}

function returnChangedUserOrderData() {
  // 일치하는 데이터 찾기
  const index = userOrderData
    .findIndex(element => element.order === searchedOrderData.order);

  // 찾은 데이터 삭제
  userOrderData.splice(index, 1);

  return userOrderData;
}

function hideHistory() {
  sectionOfHistory.classList.add('hidden');
  searchInput.value = ''; // input 빈칸
}

function cancelReservation() {
  searchedOrderData = getStorageData(sessionStorage, 'searchedOrderData');

  // 취소 의사 다시 확인
  if (confirm(returnCancelMessage()) === true) {
    alert('예매 취소가 완료되었습니다.');
  } else {
    return;
  }

  const seatData = getStorageData(localStorage, 'seatData');
  userOrderData = getStorageData(localStorage, 'userOrderData');
  saveChangedData(localStorage, 'seatData', returnChangedSeastData(seatData));
  saveChangedData(localStorage, 'userOrderData', returnChangedUserOrderData());
  hideHistory();
}

cancelButton.addEventListener('click', cancelReservation);
