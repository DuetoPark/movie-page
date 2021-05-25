// Dataset
let data = new Object();
data = {
  order: '',
  movie: {
    name: '',
    time: [],
  },
  count: {
    total: 0,
    adult: 0,
    teen: 0,
    kid: 0,
    discount: 0,
  },
  seat: [],
  price: 0,
};




// 상영시간표 출력
const reservationTimeData = state.reservation.time;
const stepTimeLists = document.querySelector('#step-time .movie-list');

function templateTimeTable() {
  return `<li aria-label='시간'>
    <input id='' class='hidden' type='checkbox' name='' value=''/>
    <label></label>
  </li>`;
}

function populateTimetable(data, index, key) {
  const div = document.createElement('div');

  div.innerHTML = templateTimeTable();
  div.querySelector('input').setAttribute('id', key + index);
  div.querySelector('input').setAttribute('name', key);
  div.querySelector('input').setAttribute('value', data);
  div.querySelector('label').setAttribute('for', key + index);
  div.querySelector('label').textContent = data;

  return div.firstChild;
}

function templateMovieListItem() {
  return `<li class='movie' data-timetable='' aria-label='상영 중인 영화'>
    <h4 class='movie-name'></h4>
    <ol class='time-list d-flex flex-wrap justify-content-between' aria-label='상영시간'></ol>
  </li>`;
}

(function populateMovieList() {
  for (const key in reservationTimeData) {
    const data = reservationTimeData[key].timetable;

    const div = document.createElement('div');
    const fragment = document.createDocumentFragment();
    fragment.appendChild(div);

    div.innerHTML = templateMovieListItem();
    div.querySelector('.movie').setAttribute('data-timetable', key);
    div.querySelector('.movie-name').textContent = reservationTimeData[key].name;

    data.forEach((data, index) => {
      div.querySelector('.time-list').appendChild(populateTimetable(data, index, key));
    });

    stepTimeLists.appendChild(fragment.querySelector('div').firstChild);
  };
})();




// 상영시간표 영화 선택
const timetableForEachMovie = document.querySelectorAll('.movie');

const prototypeTimetable = {
  inActiveAllTimetables: function() {
    timetableForEachMovie.forEach(timetable => timetable.classList.add('inactive'));
  },
  activeSelectedTimeTable: function() {
    this.timetable.classList.remove('inactive');
    this.timetable.classList.add('active');
  },
  inActiveAllTheTime: function() {
    this.times.forEach(time => time.classList.add('inactive'));
  },
  activeSelectedTime: function(selectedTime) {
    selectedTime.classList.remove('inactive');
  },
  init: function() {
    timetableForEachMovie.forEach(timetable => timetable.classList.remove('inactive'));
    this.timetable.classList.remove('active');
    this.times.forEach(list => list.classList.remove('inactive'));

    document.querySelector('#check-name .mypage-desc').innerHTML = "";
    document.querySelector('#check-seat .mypage-desc').innerHTML = "";
    data.seat = [];
  },
  changeData: function(input) {
    data.movie.name = input.name;
    data.movie.time = [input.value, input.id];
  },
  displayData: function() {
    const section = document.querySelector('#check-name .mypage-desc');
    const koreanName = state.reservation.time[data.movie.name].name;
    const time = data.movie.time[0];
    const nameHTML = `<strong>${koreanName}</strong>`;
    const timeHTML = `<strong>(${time})</strong>`;
    section.innerHTML = nameHTML + timeHTML;
  },
  toggleSeatTable: function() {
    const isBanned = this.seatTableWrapper.classList.contains('inactive');
    this.seatTableWrapper.classList[isBanned ? 'remove' : 'add']('inactive');
  },
  alertMessage: function() {
    if (this.classList.contains('inactive')) {
      alert("관람하실 영화를 선택해주세요.");
    }
  },
};

function movieAndTime(timetable) {
  const movie = Object.create(prototypeTimetable);
  movie.timetable = document.querySelector(timetable);
  movie.times = movie.timetable.querySelectorAll('li');
  movie.labels = movie.timetable.querySelectorAll('label');
  movie.seatTableWrapper = document.querySelector(".table-wrapper");

  // 이벤트 선언
  movie.labels.forEach(label => {
    const input = label.previousElementSibling;
    const selectedTime = label.parentElement;

    input.addEventListener('change', function() {
      if (input.checked === false) { // 선택 해제 시
        movie.init();
        movie.toggleSeatTable();
        return;
      }
      movie.inActiveAllTimetables();
      movie.activeSelectedTimeTable();
      movie.inActiveAllTheTime();
      movie.activeSelectedTime(selectedTime);
      movie.changeData(input);
      movie.displayData();
      movie.toggleSeatTable();
    });
  });

  movie.seatTableWrapper.addEventListener('click', movie.alertMessage);

  return movie;
}

const rocky = movieAndTime("[data-timetable=rocky]");
const matilda = movieAndTime("[data-timetable=matilda]");
const mean = movieAndTime("[data-timetable=mean]");
const harry = movieAndTime("[data-timetable=harry]");
const marie = movieAndTime("[data-timetable=marie]");
const truman = movieAndTime("[data-timetable=truman]");




// 상영시간표 - 데이터와 화면 매칭
const checkboxesInTimeList = document.querySelectorAll(".time-list input");

function matchSeatDataAndDomTable() {
  const movieName = data.movie.name;
  const movieTime = data.movie.time[1];

  const seatData = JSON.parse(window.localStorage.getItem("seatData"));
  // ㄴ선택완료 하기 전에 다른 옵션으로 변경하면 변형된 데이터 초기화
  const checkboxesInSeatTable = document.querySelectorAll('.seat-table .seat-input');
  // checkboxesInSeatTable 전역변수로 선언하지 않은 이유
  // 좌석(.seat-input) 출력은 현재 함수보다 아래에 존재하므로, 전역변수로 설정하면 오류가 발생한다.
  // 동기-좌석 출력, 비동기-데이터와 화면 매칭(현재 함수)

  checkboxesInSeatTable.forEach((checkbox, index) => {
    const seatKey = checkbox.id.split("-")[0];
    const seatIndex = Number(checkbox.id.split("-")[1]) - 1;
    const thisData = seatData[movieName][movieTime][seatKey][seatIndex];
    let isChecked = thisData === 1 ? true : false;

    checkbox.checked = isChecked ? true : false;
    checkbox.classList[isChecked ? 'add' : 'remove']('already-booked');
  });
}

checkboxesInTimeList.forEach(checkbox => {
  checkbox.addEventListener('change', matchSeatDataAndDomTable);
});




// 인원 선택 - 중복 출력
const reservationCountData = state.reservation.count;
const sectionCountList = document.querySelector('#step-count ol');
const originListItem = sectionCountList.querySelector('li');

function templateCountList() {
  return `<li class="d-flex align-center" data-count="" aria-label='구분'>
    <p class="count-type"><strong></strong></p>
    <div class="d-flex button-group">
      <button class="square count-button down inactive" type="button">-</button>
      <p class="square"><strong>0</strong></p>
      <button class="square count-button up" type="button">+</button>
    </div>
  </li>`;
}

(function populateCountList() {
  for (const key in reservationCountData) {
    const data = reservationCountData[key];
    const div = document.createElement('div');
    const fragment = document.createDocumentFragment();

    div.innerHTML = templateCountList();
    div.querySelector('li').dataset.count = key;
    div.querySelector('.count-type').textContent = data.text;

    fragment.appendChild(div);
    sectionCountList.appendChild(fragment.querySelector('div').firstChild);
  }
})();




// 인원선택 버튼 이벤트
const prototypeCount = {
  plus: function(displayCount, downButton, upButton, type) {
    // 인원이 5면 alert
    if (data.count.total === 5) {
      alert('선택 가능 인원 5명을 초과했습니다.');
      return;
    }

    // 데이터 변경과 화면 매칭
    data.count.total += 1;
    data.count[type] += 1;
    displayCount.textContent = data.count[type];

    let numberOfPeaple = data.count[type];
    if (numberOfPeaple === 1) { // 인원이 1이면 down버튼 활성화
      downButton.classList.remove('inactive');
    }
    if (numberOfPeaple === 5) { // 인원이 5면 up버튼 비활성화
      upButton.classList.add('inactive');
    }
  },
  minus: function(displayCount, downButton, upButton, type) {
    // 데이터 변경과 화면 매칭
    data.count.total -= 1;
    data.count[type] -= 1;
    displayCount.textContent = data.count[type];

    let numberOfPeaple = data.count[type];
    if (numberOfPeaple === 0) { // 인원이 0명일 때 down버튼 비활성화
      downButton.classList.add('inactive');
    }
    if (numberOfPeaple === 4) { // 인원이 4명일 때 up버튼 활성화
      upButton.classList.remove('inactive');
    }
  },
  totalHTML: function() {
    const section = document.querySelector('#check-count .total');
    section.innerHTML = `<strong>총 ${data.count.total}명</strong>`;
  },
  detailsHTML: function(type) {
    const section = document.querySelector('#check-count .details');
    let detailsHTML = "";
    for (const key in data.count) {
      if (data.count[key] && key != "total") {
        const value = data.count[key];
        const text = state.reservation.count[key].text;
        const textHTML = `<span>${text} ${value}명</span>`;
        detailsHTML += textHTML;
      }
    }
    section.innerHTML = detailsHTML;
  },
  priceHTML: function() {
    const section = document.querySelector('#check-price .mypage-desc');
    data.price = 0;
    for (const key in data.count) {
      if (data.count[key] && key != "total") {
        const calculate = state.reservation.count[key].price * Number(data.count[key]);
        data.price += calculate;
      }
    }
    const accountExp = data.price.toLocaleString();

    section.innerHTML = `<strong>${accountExp}원</strong>`;
  },
};

function Count(wrapper) {
  let count = Object.create(prototypeCount);
  count.wrapper = document.querySelector(wrapper);
  count.upButton = count.wrapper.querySelector(".count-button.up");
  count.downButton = count.wrapper.querySelector(".count-button.down");
  count.displayCount = count.wrapper.querySelector(".button-group > p");
  count.type = count.wrapper.dataset.count;

  // 이벤트 선언
  count.upButton.addEventListener('click', function() {
    count.plus(count.displayCount, count.downButton, count.upButton, count.type);
    count.totalHTML();
    count.detailsHTML();
    count.priceHTML();
  });
  count.downButton.addEventListener('click', function() {
    count.minus(count.displayCount, count.downButton, count.upButton, count.type);
    count.totalHTML();
    count.detailsHTML();
    count.priceHTML();
  });

  return count;
}

const adultGroup = Count('li[data-count=adult]');
const teenGroup = Count('li[data-count=teen]');
const kidGroup = Count('li[data-count=kid]');
const discountGroup = Count('li[data-count=discount]');




// 좌석선택 - 중복 출력
const seatTableHead = document.querySelector("#step-seat table thead");
const seatTableBody = document.querySelector("#step-seat table tbody");

function populateTableHead() {
  const fragment = document.createDocumentFragment();
  const tr = document.createElement('tr');

  // 맨 첫번째 칸 생성
  const th = document.createElement('th');
  tr.appendChild(th);

  // 나머지 15칸 생성
  for (let i=0; i<15; i+=1) {
    const th = document.createElement('th');
    th.textContent = i + 1;
    tr.appendChild(th);
  }

  fragment.appendChild(tr);
  seatTableHead.appendChild(fragment);
}

function templateSeat() {
  return `<input id='' class='seat-input hidden' type='checkbox'/>
    <label for='' class='seat-label'></label>`;
}

function populateTableBody() {
  for (const key in seat) {
    // 열 생성
    const fragment = document.createDocumentFragment();
    const tr = document.createElement('tr');

    // 맨 첫번째 칸 생성
    const column = key;
    const th = document.createElement('th');
    th.textContent = column;
    tr.appendChild(th);

    // 나머지 15칸 생성
    for (let i=0; i<seat[key].length; i+=1) {
      const checkboxId = column + "-" + (i + 1);
      const td = document.createElement('td');

      td.innerHTML = templateSeat();
      td.querySelector('input').setAttribute('id', checkboxId);
      td.querySelector('label').setAttribute('for', checkboxId);

      tr.appendChild(td);
    }

    fragment.appendChild(tr);
    seatTableBody.appendChild(fragment);
  }
}

function setSeatDataInLocalStorage() {
  const resourceData = state.reservation.time;
  const newObject = {};

  const test = window.localStorage.getItem("seatData");

  if (test) return;

  for (const key in resourceData) {
    newObject[key] = {};
    const length = resourceData[key].timetable.length;

    for (let i=0; i<length; i+=1) {
      newObject[key][key + i] = Object.assign(seat);
    }
  }
  window.localStorage.setItem("seatData", JSON.stringify(newObject));
}

(function init() {
  populateTableHead();
  populateTableBody();
  setSeatDataInLocalStorage();
})();




// 좌석선택 - 선택 이벤트(데이터 변경)
const stepSeatCheckboxes = document.querySelectorAll('#step-seat .seat-input');

let seatData = JSON.parse(window.localStorage.getItem('seatData'));
let lastOption = [];

function changeSeatData() {
  const movieName = data.movie.name;
  const movieTime = data.movie.time[1];

  const seatKey = this.id.split("-")[0];
  const seatIndex = Number(this.id.split("-")[1]) - 1;
  let keepOptions = lastOption[0] === movieName && lastOption[1] === movieTime;

  // 다른 옵션(영화, 시간)으로 변경할 때
  if (!keepOptions) {
    data.seat = []; // 데이터 초기화(옵션)
  }

  // 데이터 변경
  // 화면 매칭 필요 없음 (CSS로 구현)
  if (this.checked) {
    seatData[movieName][movieTime][seatKey][seatIndex] = 1;
    data.seat.push(this.id);
  } else {
    seatData[movieName][movieTime][seatKey][seatIndex] = 0;
    const index = data.seat.indexOf(this.id);
    data.seat.splice(index, 1);
  }

  displaySeat();

  // 비교할 대상 저장
  lastOption = [movieName, movieTime];
}

function compareSeat(data, index) {
  data.sort((a, b) => {
    const lastNumber = a.split("-")[index];
    const nextNumber = b.split("-")[index];
    return lastNumber < nextNumber ? -1 : 1;
  });
  return data;
}

function displaySeat() {
  const section = document.querySelector('#check-seat .mypage-desc');

  const sortNumber = compareSeat(data.seat, 1);
  const sortText = compareSeat(sortNumber, 0);

  let arrayOfseatsHTML = sortText
    .map(seat => `<span>${seat.split("-").join("")}</span>`);

  section.innerHTML = `<strong>${arrayOfseatsHTML}</strong>`;
}

function limitCheck() {
  if (data.seat.length > data.count.total) {
    alert(`선택 인원 ${data.count.total}명을 초과했습니다.`);
    this.checked = false;
    changeSeatData.call(this);
  }
}

stepSeatCheckboxes.forEach(function(checkbox) {
  checkbox.addEventListener('change', changeSeatData.bind(checkbox));
  checkbox.addEventListener('change', limitCheck.bind(checkbox));
});




// 선택확인 - 선택완료버튼 활성화
function activeButton() {
  const play = data.count.total > 0 ? true : false;

  if (play) {
    const finishButton = document.querySelector('.finish');
    const checkName = data.movie.name.length ? true : false;
    const checkCount = data.count.total ? true : false;
    const checkSeat = data.seat.length === data.count.total ? true : false;

    const allSelected = checkName && checkCount && checkSeat;

    finishButton.classList[allSelected ? 'remove' : 'add']('inactive');
  }
}

window.addEventListener('click', function(){
  setTimeout(activeButton, 300);
});




// 선택확인 - 선택 이벤트(주문번호 생성)
const finishButton = document.querySelector('.finish');

function changeExpression(zeroLength, inputValue) {
  let displayLength;

  if (zeroLength.length === 1) {
    displayLength = -2;
  } else if (zeroLength.length === 2) {
    displayLength = -3;
  }

  return (zeroLength + inputValue).slice(displayLength);
}

function saveDataIntoLocalStorage(key, value) {
  window.localStorage.setItem(key, value);
}

function createLeftSideOfOrderNumber() {
  const newDate = new Date();
  const year = newDate.getFullYear();
  const month = changeExpression('0', (newDate.getMonth() + 1));
  const date = changeExpression('0', newDate.getDate());
  const hours = changeExpression('0', newDate.getHours());
  const minutes = changeExpression('0', newDate.getMinutes());
  const seconds = changeExpression('0', newDate.getSeconds());

  return year + month + date + hours + minutes + seconds;
}

function createRightSideOfOrderNumber() {
  const newDate = new Date();
  const lastDate = window.localStorage.getItem('lastDate') || newDate.getDate();
  const today = newDate.getDate();
  let rightSide;
  let lastOrder = Number(window.localStorage.getItem('lastOrder')) || 0;

  // 날짜 바뀌면 주문번호 초기화
  if (lastDate != today) {
    lastOrder = 0;
  }

  lastOrder += 1;

  saveDataIntoLocalStorage('lastOrder', lastOrder);
  saveDataIntoLocalStorage('lastDate', today);

  return changeExpression('00', lastOrder);
}

function createOrderNumber() {
  let order = new Array();
  order = [createLeftSideOfOrderNumber(), createRightSideOfOrderNumber()];

  data.order = order.join('-');
}

finishButton.addEventListener('click', createOrderNumber);




// 선택확인 - 선택 이벤트(선택완료)
function returnMessage() {
  const infoName = state.movieList[data.movie.name].name;
  const infoTime = data.movie.time[0];
  const infoCount = data.count.total;

  return `
    영화명: ${infoName}(${infoTime})
    인원: 총 ${infoCount}명

    계속 진행하시겠습니까?
  `;
}

function saveSeatData() {
  window.localStorage.setItem('seatData', JSON.stringify(seatData));
  alert('예매가 완료되었습니다.');
}

function initStepTime() {
  // 선택 안 된 시간표
  let notSelectedTimeTables = document.querySelectorAll('.movie.inactive');
  notSelectedTimeTables.forEach(timetable => timetable.classList.remove('inactive'));

  // 선택 된 시간표
  const selectedTimeTable = document.querySelector('.movie.active');
  selectedTimeTable.classList.remove('active');

  // 선택된 시간표의 시간
  const allTimes = selectedTimeTable.querySelectorAll('li');
  allTimes.forEach(time => {
    time.classList.remove('inactive');
    time.children[0].checked = false;
  });
}

function initStepCount() {
  for (const key in data.count) {
    data.count[key] = 0;
  }

  const displayCount = document.querySelectorAll('.button-group > p');
  displayCount.forEach(count => {
    const downButton = count.previousElementSibling;
    const upButton = count.nextElementSibling;

    count.textContent = 0;
    downButton.classList.add('inactive');
    upButton.classList.remove('inactive');
  });
}

function initStepSeat() {
  matchSeatDataAndDomTable(); // 191번째 줄에 위치

  // 좌석 테이블 inactive 설정
  const tableWrapper = document.querySelector('#step-seat .table-wrapper');
  tableWrapper.classList.add('inactive');
}

function initStepCheck() {
  // 화면
  document.querySelector('#check-name .mypage-desc').innerHTML = "";
  document.querySelector('#check-seat .mypage-desc').innerHTML = "";
  document.querySelector('#check-count .total').innerHTML = "";
  document.querySelector('#check-count .details').innerHTML = "";
  document.querySelector('#check-price .mypage-desc').innerHTML = "";

  // 데이터
  data.movie.name = '';
  data.movie.time = [];
  for (const key in data.count) {
    data.count[key] = 0;
  }
  data.seat = [];
  data.price = 0;
}

function initFinishButton() {
  finishButton.classList.add('inactive');
}

function initOrderNumber() {
  data.order = '';
}

function saveUserOrderData() {
  const localStorageData = JSON.parse(window.localStorage.getItem('userOrderData')) || [];
  localStorageData.push(data);
  window.localStorage.setItem('userOrderData', JSON.stringify(localStorageData));
}

function confirmOptionAndInit(e) {
  const message = returnMessage();

  // 선택 옵션 확인
  if (confirm(message) === true) { // 확인 선택
    saveSeatData();
  } else { // 취소 선택
    return;
  }

  saveUserOrderData();

  initStepTime();
  initStepCount();
  initStepSeat();
  initStepCheck();
  initFinishButton();
  initOrderNumber();
}

finishButton.addEventListener('click', confirmOptionAndInit);
