// 전역변수
const history = document.querySelector('#history');
const searchButton = document.querySelector('.search');
const searchInput = document.querySelector('#order-number');




// 예매확인 - 조회하기 버튼 활성화
function toggleSearchButton() {
  const isFilled = searchInput.value ? true : false;
  const isInactived = searchButton.classList.contains('inactive') ? true : false;
  if (isFilled && isInactived) {
    searchButton.classList.remove('inactive');
  }

  if (!isFilled && !isInactived) {
    searchButton.classList.add('inactive');
  }
}

searchInput.addEventListener('keyup', toggleSearchButton);




// 예매확인 - 예약번호 조회
function displayName(data) {
  const section = document.querySelector('#history-name .mypage-desc');
  const koreanName = state.reservation.time[data.movie.name].name;
  const time = data.movie.time[0];
  const nameHTML = "<strong>" + koreanName + "</strong>";
  const timeHTML = "<strong>(" + time + ")</strong>";
  section.innerHTML = nameHTML + timeHTML;
}

function displaySeat(data) {
  const section = document.querySelector('#history-seat .mypage-desc');
  sortNumber = data.seat.sort(function(a, b) {
    const lastNumber = a.split("-")[1];
    const nextNumber = b.split("-")[1];
    return lastNumber - nextNumber < 0 ? -1 : 1;
  });

  sortText = sortNumber.sort(function(a,b) {
    const lastText = a.split("-")[0];
    const nextText = b.split("-")[0];
    return lastText < nextText ? -1 : 1;
  });

  let arrayOfseatsHTML = sortText.map(function(seat) {
    return '<span>' + seat.split("-").join("") + '</span>';
  });

  section.innerHTML = "<strong>" + arrayOfseatsHTML + "</strong>";
}

function displayCount(data) {
  const sectionOfTotal = document.querySelector('#history-count .mypage-desc');
  const sectionOfDetails = document.querySelector('#history-count .details');

  let detailsHTML = "";
  for (key in data.count) {
    if (data.count[key] && key != "total") {
      const value = data.count[key];
      const text = state.reservation.count[key].text;
      const textHTML = "<span>" + text + " " + value + "명</span>";
      detailsHTML += textHTML;
    }
  }

  sectionOfTotal.innerHTML = "<strong>총 " + data.count.total + "명</strong>";
  sectionOfDetails.innerHTML = detailsHTML;
}

function showHistory() {
  history.classList.remove('hidden');
}

function searchReservation() {
  const userOrderData = JSON.parse(localStorage.getItem('userOrderData'));
  const orderNumber = searchInput.value;
  let isincluding = userOrderData.findIndex(function(element) {
    return element.order === orderNumber;
  });

  if (isincluding > 0) {
    showHistory()
    displayName(userOrderData[isincluding]);
    displaySeat(userOrderData[isincluding]);
    displayCount(userOrderData[isincluding]);
    sessionStorage.setItem('searchedOrderData', JSON.stringify(userOrderData[isincluding]));
  } else if (isincluding === -1) {
    alert('입력하신 번호를 찾을 수 없습니다. 다시 확인해 주시기 바랍니다.');
    searchInput.value = ''; // 인풋 초기화
    return;
  }
}

searchButton.addEventListener('click', searchReservation);




// 예매확인 - 예매취소
const cancelButton = document.querySelector('#history .cancel');
let searchedOrderData;
let userOrderData;

function getStorageData(storage, key) {
  return JSON.parse(storage.getItem(key));
}

function saveChangedData(storage, key, changedData) {
  storage.setItem(key, JSON.stringify(changedData));
}

function returnCancelMessage() {
  const orderNumber = '예약 번호: ' + searchedOrderData.order + '\n';
  const orderMovie = '영화명: ' + searchedOrderData.movie.name;
  const orderTime = '(' +searchedOrderData.movie.time[0]+ ')\n';
  const orderCount = '인원: 총' + searchedOrderData.count.total + '명\n';

  return orderNumber + orderMovie + orderTime + orderCount+ '\n예매 취소를 진행하시겠습니까?';
}

function returnChangedSeastData(seatData) {
  const name = searchedOrderData.movie.name;
  const time = searchedOrderData.movie.time[1];
  const seat = searchedOrderData.seat;

  seat.forEach(function(seat) {
    const key = seat.split('-')[0];
    const index = seat.split('-')[1] - 1;

    seatData[name][time][key][index] = 0;
  });

  return seatData;
}

function returnChangedUserOrderData() {
  // 일치하는 데이터 찾기
  const index = userOrderData.findIndex(function(element) {
    return element.order === searchedOrderData.order;
  });

  // 찾은 데이터 삭제
  userOrderData.splice(index, 1);

  return userOrderData;
}

function hiddenHistory() {
  history.classList.add('hidden');
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
  hiddenHistory();
}

cancelButton.addEventListener('click', cancelReservation);
