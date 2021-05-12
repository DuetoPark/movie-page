// 헤더 버튼 보임/숨김 & 탭 포커스 이벤트
const header = document.querySelector('#header');
const menuButtons = header.querySelectorAll("#menu > a");
const threeLinesButton = header.querySelector('.three-lines-button');
const screen = {
  desktop: 768,
  tablet: 576,
};
let onTablet = window.innerWidth >= screen.tablet ? true : false;
let isActived = header.classList.contains('active') ? true : false;

function setTabIndex(elem, value) {
  elem.setAttribute('tabindex', value);
}

function setTabIndexOfHeader() {
  onTablet = window.innerWidth >= screen.tablet ? true : false;
  isActived = header.classList.contains('active') ? true : false;

  setTabIndex(threeLinesButton, 0);

  if (onTablet) { // tablet
    menuButtons.forEach(function(button) {setTabIndex(button, 0);});
    setTabIndex(threeLinesButton, -1);
  } else if (!onTablet && isActived) { // Mobile & 활성화 상태
    menuButtons.forEach(function(button) {setTabIndex(button, 0);});
  } else if (!onTablet && !isActived) { // Mobile & 비활성화 상태
    menuButtons.forEach(function(button) {setTabIndex(button, -1);});
  }
}

function toggleHeader() {
  isActived = header.classList.contains('active') ? true : false;

  if (onTablet || isActived) { // tablet 또는 활성화 상태
    // 메뉴 접음
    isActived = false;
    header.classList.remove('active');
    threeLinesButton.setAttribute('aria-expanded', false);
    threeLinesButton.textContent = "메뉴";
    setTabIndexOfHeader();
  } else if (!isActived){ // 비활성화 상태
    // 메뉴 펼침
    isActived = true;
    header.classList.add('active');
    threeLinesButton.setAttribute('aria-expanded', true);
    threeLinesButton.textContent = "닫기";
    setTabIndexOfHeader();
  }
}

function showOrHideThreeLinesButton(state) {
  if (state === 'show') {
    threeLinesButton.classList.remove('hidden');
  } else if (state === 'hide') {
    threeLinesButton.classList.add('hidden');
  }
}

function handleHeader() {
  onTablet = window.innerWidth >= screen.tablet ? true : false;

  if (onTablet) { // tablet
    showOrHideThreeLinesButton('hide');
    toggleHeader();
  } else { // Mobile
    showOrHideThreeLinesButton('show');
    setTabIndexOfHeader();
  }
}

window.addEventListener('resize', handleHeader);
window.addEventListener("DOMContentLoaded", handleHeader);
window.addEventListener("DOMContentLoaded", setTabIndexOfHeader);
threeLinesButton.addEventListener('click', toggleHeader);




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




// Dataset
let data = new Object();
data = {
  movie: {
    name: "",
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
  saveSessionStorage: function() {
    sessionStorage.setItem('optionData', JSON.stringify(data));
  },
  displayData: function() {
    const data = JSON.parse(sessionStorage.getItem("optionData"));
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

  // 이벤트 위임
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
      movie.saveSessionStorage();
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
  // 변경된 세션 스토리지 불러옴
  const optionData = JSON.parse(sessionStorage.getItem('optionData'));
  const movieName = optionData.movie.name;
  const movieTime = optionData.movie.time[1];
  console.log('방구똥');

  // 로컬 스토리지 데이터 초기화
  // (저장 전에 다른 옵션으로 변경하면 변형된 데이터 초기화)
  const seatData = JSON.parse(localStorage.getItem("seatData"));
  const seatTableCheckboxes = document.querySelectorAll('.seat-table .seat-input');
  // 전역변수로 선언하지 않은 이유
  // 좌석(.seat-input) 출력은 현재 함수보다 아래에 존재하므로 전역변수로 설정하면 오류가 발생한다.
  // 동기-좌석 출력, 비동기-데이터와 화면 매칭(현재 함수)

  seatTableCheckboxes.forEach(function(checkbox, index) {
    console.log('똥');
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
// ↓↓↓↓↓↓↓↓↓↓↓↓↓ 여기 리팩토링 하셈 ↓↓↓↓↓↓↓↓↓↓↓↓↓
let total = 0;
const prototypeCount = {
  plus: function(displayCount, downButton, upButton, type) {
    if (data.count.total === 5) {
      alert('선택 가능 인원 5명을 초과했습니다.');
      return;
    }

    let dataOfCountType = data.count[type];

    if (!dataOfCountType) {
      downButton.classList.remove('inactive');
    }

    if (dataOfCountType < 5) {
      // data
      total += 1;
      data.count[type] += 1;
      // display
      displayCount.textContent = data.count[type];
    }

    dataOfCountType = data.count[type];
    if (dataOfCountType === 5) {
      upButton.classList.add('inactive');
    }
  },
  minus: function(displayCount, downButton, upButton, type) {
    let countValue = Number(displayCount.textContent);

    if (countValue > 0) {
      // data
      total -= 1;
      data.count[type] -= 1;
      // display
      displayCount.textContent = countValue - 1;
    }

    countValue = Number(displayCount.textContent);
    if (countValue === 0) {
      downButton.classList.add('inactive');

    } else if (countValue === 4) {
      upButton.classList.remove('inactive');
    }
  },
  changeData: function() {
    data.count.total = total;
    sessionStorage.setItem('optionData', JSON.stringify(data));
  },
  displayTotal: function() {
    const data = JSON.parse(sessionStorage.getItem("optionData"));
    const section = document.querySelector('#check-count .total');
    const total = data.count.total;
    const totalHTML = "<strong>총 " + total + "명</strong>";

    section.innerHTML = totalHTML;
  },
  displayDetails: function() {
    const data = JSON.parse(sessionStorage.getItem("optionData"));
    const section = document.querySelector('#check-count .details');
    let details = "";
    for (key in data.count) {
      if (data.count[key] && key != "total") {
        const value = data.count[key];
        const text = state.reservation.count[key].text;
        const textHTML = "<span>" + text + " " + value + "명</span>";
        details += textHTML;
      }
    }
    section.innerHTML = details;
  },
  displayPrice: function() {
    const data = JSON.parse(sessionStorage.getItem("optionData"));
    const section = document.querySelector('#check-price .mypage-desc');
    let price = 0;
    for (key in data.count) {
      if (data.count[key] && key != "total") {
        const test = state.reservation.count[key].price * Number(data.count[key]);
        price += test;
      }
    }

    const accountExp = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const totalHTML = "<strong>" + accountExp + "원</strong>";
    section.innerHTML = totalHTML;
  },
};

function Count(wrapper) {
  let count = Object.create(prototypeCount);
  count.wrapper = document.querySelector(wrapper);
  count.upButton = count.wrapper.querySelector(".count-button.up");
  count.downButton = count.wrapper.querySelector(".count-button.down");
  count.displayCount = count.wrapper.querySelector(".button-group > p");
  count.type = count.wrapper.dataset.count;

  // button event
  count.upButton.addEventListener('click', function() {
    count.plus(count.displayCount, count.downButton, count.upButton, count.type);
    count.changeData(count.type);
    count.displayTotal();
    count.displayDetails();
    count.displayPrice();
  });
  count.downButton.addEventListener('click', function() {
    count.minus(count.displayCount, count.downButton, count.upButton, count.type);
    count.changeData(count.type);
    count.displayTotal();
    count.displayDetails();
    count.displayPrice();
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
// ↓↓↓↓↓↓↓↓↓↓↓↓↓ 여기 리팩토링 하셈 ↓↓↓↓↓↓↓↓↓↓↓↓↓
const seatCheckboxes = document.querySelectorAll('#step-seat .seat-input');
let seatData = JSON.parse(localStorage.getItem('seatData'));
let lastSelectedMovie;
let lastSelectedTime;

function changeSeatData() {
  const optionData = JSON.parse(sessionStorage.getItem('optionData'));
  const movieName = optionData.movie.name;
  const movieTime = optionData.movie.time[1];
  const seatKey = this.id.split("-")[0];
  const seatIndex = Number(this.id.split("-")[1]) - 1;
  let keepOptions = lastSelectedMovie === movieName && lastSelectedTime === movieTime;

  // 다른 옵션(영화, 시간)으로 변경할 때
  if (!keepOptions) {
    data.seat = []; // 데이터 초기화(옵션)
  }

  if (data.seat.length === 0) {
    seatData = JSON.parse(localStorage.getItem('seatData')); // 데이터 초기화(좌석)
  }

  // 데이터 변경
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
  lastSelectedMovie = movieName;
  lastSelectedTime = movieTime;
}

function displaySeat() {
  const section = document.querySelector('#check-seat .mypage-desc');
  const arrayOfseatsHTML = new Array;
  data.seat.forEach(function(seat) {
    let seatHTML = '<span>' + seat.split("-").join("") + '</span>';
    arrayOfseatsHTML.push(seatHTML);
  });

  arrayOfseatsHTML.sort(function(a,b) {
    return a > b ? 1 : -1;
  });

  section.innerHTML = "<strong>" + arrayOfseatsHTML + "</strong>";
}

seatCheckboxes.forEach(function(checkbox) {
  checkbox.addEventListener('change', changeSeatData.bind(checkbox));
});







// 선택확인 - 선택완료버튼 활성화
function activeButton() {
  const play = data.count.total > 0 ? true : false;

  if (play) {
    let checkName = data.movie.name.length > 0;
    let checkCount = data.count.total > 0;
    let checkSeat = data.seat.length === data.count.total;

    if (checkName && checkCount && checkSeat) {
      const finishButton = document.querySelector('.finish');
      finishButton.classList.remove('inactive');
    }

    console.log(data.movie.name.length, data.count.total, data.seat.length);
  }
}

window.addEventListener('click', function(){
  setTimeout(activeButton, 500);
});




// 선택확인 - 선택 이벤트(선택완료)
const finishButton = document.querySelector('.finish');

function saveSeatData(e) {
  localStorage.setItem('seatData', JSON.stringify(seatData));
}

finishButton.addEventListener('click', saveSeatData);





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

  for (i=0; i<5; i+=1) {
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
