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
const sectionTime = document.querySelector('#step-time .movie-list');

function populateTimetableForEachMovie(ol, data, index, key) {
  const timeListItem = document.createElement('li');
  const input = document.createElement('input');
  const label = document.createElement('label');

  timeListItem.setAttribute('aria-label', '시간');

  input.setAttribute('id', key + index);
  input.setAttribute('class', 'hidden');
  input.setAttribute('type', 'checkbox');
  input.setAttribute('name', key);
  input.setAttribute('value', data);

  label.setAttribute('for', key + index);
  label.textContent = data;

  ol.appendChild(timeListItem);
  timeListItem.appendChild(input);
  timeListItem.appendChild(label);
}

function populateListsForEachMovie() {
  for (key in reservationTimeData) {
    const data = reservationTimeData[key].timetable;
    const movieListItem = document.createElement('li');
    const name = document.createElement('h4');
    const timeList = document.createElement('ol');

    movieListItem.setAttribute('class', 'movie');
    movieListItem.setAttribute('data-timetable', key);
    movieListItem.setAttribute('aria-label', '상영 중인 영화');

    name.setAttribute('class', 'movie-name');
    name.textContent = reservationTimeData[key]['name'];

    timeList.setAttribute('class', 'time-list d-flex flex-wrap justify-content-between');
    timeList.setAttribute('aria-label', '상영시간');

    sectionTime.appendChild(movieListItem);
    movieListItem.appendChild(name);
    movieListItem.appendChild(timeList);

    data.forEach(function(data, index) {
      populateTimetableForEachMovie(timeList, data, index, key);
    });
  };
}

populateListsForEachMovie();


// 상영시간표 영화 선택
const timetableForEachMovie = document.querySelectorAll('.movie');

const prototypeTimetable = {
  inActiveAllTimetables: function() {
    timetableForEachMovie.forEach(function(timetable) {
      timetable.classList.add('inactive');
    });
  },
  activeSelectedTimeTable: function() {
    this.timetable.classList.remove('inactive');
    this.timetable.classList.add('active');
  },
  inActiveAllTheTime: function() {
    this.times.forEach(function(time) {
      time.classList.add('inactive');
    });
  },
  activeSelectedTime: function(selectedTime) {
    selectedTime.classList.remove('inactive');
  },
  init: function() {
    timetableForEachMovie.forEach(function(timetable) {
      timetable.classList.remove('inactive');
    });

    this.timetable.classList.remove('active');

    this.times.forEach(function(list) {
      list.classList.remove('inactive');
    });

    document.querySelector('#check-name .mypage-desc').innerHTML = "";
    document.querySelector('#check-seat .mypage-desc').innerHTML = "";
    data.seat = [];
  },
  changeData: function(input) {
    data.movie.name = input.name;
    data.movie.time[0] = input.value;
    data.movie.time[1] = input.id;
  },
  displayData: function() {
    const section = document.querySelector('#check-name .mypage-desc');
    const koreanName = state.reservation.time[data.movie.name].name;
    const time = data.movie.time[0];
    const nameHTML = "<strong>" + koreanName + "</strong>";
    const timeHTML = "<strong>(" + time + ")</strong>";
    section.innerHTML = nameHTML + timeHTML;
  },
  toggleSeatTable: function() {
    const isChecked = this.seatTableWrapper.classList.contains('inactive') ? true : false;

    if (isChecked) {
      this.seatTableWrapper.classList.remove('inactive');
    } else {
      this.seatTableWrapper.classList.add('inactive');
    }
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
  movie.labels.forEach(function(label) {
    label.addEventListener('click', function() {
      const input = this.previousElementSibling;
      const selectedTime = this.parentElement;

      if (input.checked) { // 선택 해제 시
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
const timeListCheckboxes = document.querySelectorAll(".time-list input");

function matchSeatDataAndDomTable() {
  const movieName = data.movie.name;
  const movieTime = data.movie.time[1];

  // 로컬 스토리지 데이터 초기화
  // (저장 전에 다른 옵션으로 변경하면 변형된 데이터 초기화)
  const seatData = JSON.parse(localStorage.getItem("seatData"));
  const seatTableCheckboxes = document.querySelectorAll('.seat-table .seat-input');
  // 전역변수로 선언하지 않은 이유
  // 좌석(.seat-input) 출력은 현재 함수보다 아래에 존재하므로 전역변수로 설정하면 오류가 발생한다.
  // 동기-좌석 출력, 비동기-데이터와 화면 매칭(현재 함수)

  seatTableCheckboxes.forEach(function(checkbox, index) {
    const seatKey = checkbox.id.split("-")[0];
    const seatIndex = Number(checkbox.id.split("-")[1]) - 1;
    const thisData = seatData[movieName][movieTime][seatKey][seatIndex];

    let isChecked = thisData === 1 ? true : false;
    if (isChecked) {
      checkbox.checked = true;
      checkbox.classList.add('already-booked');
    } else {
      checkbox.checked = false;
      checkbox.classList.remove('already-booked');
    }
  });
}

timeListCheckboxes.forEach(function(checkbox) {
  checkbox.addEventListener('change', matchSeatDataAndDomTable);
});




// 인원 선택 - 클론 노드
const reservationCountData = state.reservation.count;
const sectionCountList = document.querySelector('#step-count ol');
const originListItem = sectionCountList.querySelector('li');

function cloneListItems() {
  for (key in reservationCountData) {
    const data = reservationCountData[key];
    const clone = originListItem.cloneNode(true);

    const p = clone.querySelector('.count-type');

    clone.dataset.count = key;
    p.textContent = data.text;

    sectionCountList.appendChild(clone);
  }
}

cloneListItems();
originListItem.remove();


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
    section.innerHTML = "<strong>총 " + data.count.total + "명</strong>";
  },
  detailsHTML: function(type) {
    const section = document.querySelector('#check-count .details');
    let detailsHTML = "";
    for (key in data.count) {
      if (data.count[key] && key != "total") {
        const value = data.count[key];
        const text = state.reservation.count[key].text;
        const textHTML = "<span>" + text + " " + value + "명</span>";
        detailsHTML += textHTML;
      }
    }
    section.innerHTML = detailsHTML;
  },
  priceHTML: function() {
    const section = document.querySelector('#check-price .mypage-desc');
    data.price = 0;
    for (key in data.count) {
      if (data.count[key] && key != "total") {
        const calculate = state.reservation.count[key].price * Number(data.count[key]);
        data.price += calculate;
      }
    }
    const accountExp = data.price.toLocaleString();

    section.innerHTML = "<strong>" + accountExp + "원</strong>";
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
  // 맨 첫번째 칸 생성
  const tr = document.createElement('tr');
  const th = document.createElement('th');

  seatTableHead.appendChild(tr);
  tr.appendChild(th);

  // 나머지 15칸 생성
  for (let i=0; i<15; i+=1) {
    const th = document.createElement('th');
    th.textContent = i + 1;
    tr.appendChild(th);
  }
}

function populateTableBody() {
  for (key in seat) {
    // 열 생성
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    const column = key;

    th.textContent = column;
    seatTableBody.appendChild(tr);
    tr.appendChild(th);

    // 나머지 15칸 생성
    for (let i=0; i<seat[key].length; i+=1) {
      const td = document.createElement('td');
      const checkbox = document.createElement('input');
      const label = document.createElement('label');
      const row = key;
      const checkboxId = column + "-" + (i + 1);

      checkbox.id = checkboxId;
      checkbox.className = "seat-input hidden";
      checkbox.type = 'checkbox';
      label.setAttribute('for', checkboxId);
      label.className = "seat-label";

      tr.appendChild(td);
      td.appendChild(checkbox);
      td.appendChild(label);
    }
  }
}

function setSeatDataInLocalStorage() {
  const resourceData = state.reservation.time;
  const newObject = {};

  if (localStorage.getItem("seatData")) return;

  for (key in resourceData) {
    newObject[key] = {};
    const length = resourceData[key].timetable.length;

    for (let i=0; i<length; i+=1) {
      newObject[key][key + i] = Object.assign(seat);
    }
  }
  localStorage.setItem("seatData", JSON.stringify(newObject));
}

function init() {
  populateTableHead();
  populateTableBody();
  setSeatDataInLocalStorage();
}

init();




// 좌석선택 - 선택 이벤트(데이터 변경)
const stepSeatCheckboxes = document.querySelectorAll('#step-seat .seat-input');
let seatData = JSON.parse(localStorage.getItem('seatData'));
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

function displaySeat() {
  const section = document.querySelector('#check-seat .mypage-desc');
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

function limitCheck() {
  if (data.seat.length > data.count.total) {
    alert('선택 인원 ' + data.count.total + '명을 초과했습니다.');
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
    let checkName = data.movie.name.length > 0;
    let checkCount = data.count.total > 0;
    let checkSeat = data.seat.length === data.count.total ? true : false;
    const finishButton = document.querySelector('.finish');

    if (checkName && checkCount && checkSeat) {
      finishButton.classList.remove('inactive');
    }
    if (data.seat.length < data.count.total) {
      finishButton.classList.add('inactive');
    }
  }
}

window.addEventListener('click', function(){
  setTimeout(activeButton, 500);
});




// 선택확인 - 선택 이벤트(주문번호 생성)
const finishButton = document.querySelector('.finish');

function changeExpression(zeroLength, inputValue, displayLength) {
  return (zeroLength + inputValue).slice(displayLength);
}

function saveDataIntoLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

function createLeftSideOfOrderNumber() {
  const newDate = new Date();
  const year = newDate.getFullYear();
  const month = changeExpression('0', (newDate.getMonth() + 1), -2);
  const date = changeExpression('0', newDate.getDate(), -2);
  const hours = changeExpression('0', newDate.getHours(), -2);
  const minutes = changeExpression('0', newDate.getMinutes(), -2);
  const seconds = changeExpression('0', newDate.getSeconds(), -2);
  const today = newDate.getDate();

  saveDataIntoLocalStorage('lastDate', today);

  return year + month + date + hours + minutes + seconds;
}

function createRightSideOfOrderNumber() {
  const newDate = new Date();
  const lastDate = localStorage.getItem('lastDate') || newDate.getDate();
  const today = newDate.getDate();
  let rightSide;
  let lastOrder = Number(localStorage.getItem('lastOrder')) || 0;

  if (lastDate != today) {
    lastOrder = 0;
  }

  lastOrder += 1;

  saveDataIntoLocalStorage('lastOrder', lastOrder);

  return changeExpression('00', lastOrder, -3);
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

  message = '영화명: ' +infoName+ '(' +infoTime+ ')\n인원: 총' +infoCount+ '명\n\n계속 진행하시겠습니까?';
  return message;
}

function saveSeatData() {
  localStorage.setItem('seatData', JSON.stringify(seatData));
  alert('예매가 완료되었습니다.');
}

function initStepTime() {
  const timetables = document.querySelectorAll('.movie-list > li');
  timetables.forEach(function(timetable) {
    if (timetable.classList.contains('active')) {
      const timelistItmes = timetable.querySelectorAll('li');
      for (let i=0; i<timelistItmes.length; i+=1) {
        timelistItmes[i].classList.remove('inactive');
        timelistItmes[i].children[0].checked = false;
      }
    }

    timetable.classList.remove('inactive');
    timetable.classList.remove('active');
  });
}

function initStepCount() {
  for (key in data.count) {
    data.count[key] = 0;
  }

  const displayCount = document.querySelectorAll('.button-group > p');
  for (let i=0; i<displayCount.length; i+=1) {
    displayCount[i].textContent = 0;
  }
}

function initStepSeat() {
  matchSeatDataAndDomTable(); // 323번째 줄에 위치

  // 좌석 테이블 inactive 설정
  const tableWrapper = document.querySelector('#step-seat .table-wrapper');
  tableWrapper.classList.add('inactive');
}

function initStepCheck() {
  document.querySelector('#check-name .mypage-desc').innerHTML = "";
  document.querySelector('#check-seat .mypage-desc').innerHTML = "";
  document.querySelector('#check-count .total').innerHTML = "";
  document.querySelector('#check-count .details').innerHTML = "";
  document.querySelector('#check-price .mypage-desc').innerHTML = "";
  data.movie.name = '';
  data.movie.time = [];
  for (key in data.count) {
    data.count[key] = 0;
  }
  data.seat = [];
  data.price = 0;
}

function initOrderNumber() {
  data.order = '';
}

function saveUserOrderData() {
  const localStorageData = JSON.parse(localStorage.getItem('userOrderData')) || [];
  localStorageData.push(data);
  localStorage.setItem('userOrderData', JSON.stringify(localStorageData));
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
  initOrderNumber();
}

finishButton.addEventListener('click', confirmOptionAndInit);
