// 헤더 버튼 보임/숨김 & 탭 포커스 이벤트
const header = document.querySelector('#header');
const buttons = header.querySelectorAll(".button-group > *");
const threeLinesButton = header.querySelector('.three-lines-button');
const screen = {
  desktop: 768,
  tablet: 576,
};
let onTablet = false;
let isActived = false;

function setTabIndex(elem, tabIndex) {
  elem.setAttribute('tabindex', tabIndex);
}

function handleTabIndexOfBanner() {
  onTablet = window.innerWidth >= screen.tablet ? true : false;
  isActived = header.classList.contains('active');

  setTabIndex(threeLinesButton, 0);

  if (onTablet) {
    buttons.forEach(function(button) {setTabIndex(button, 0);});
    setTabIndex(threeLinesButton, -1);
  } else if (!onTablet && isActived) { // Mobile & 활성화 상태
    buttons.forEach(function(button) {setTabIndex(button, 0);});
  } else if (!onTablet && !isActived) { // Mobile & 비활성화 상태
    buttons.forEach(function(button) {setTabIndex(button, -1);});
  }
}

function activeOrInactiveHeader() {
  const buttonGroup = header.querySelector('.button-group');

  isActived = header.classList.contains('active');

  if (onTablet || isActived) {
    isActived = false;
    header.classList.remove('active');
    threeLinesButton.setAttribute('aria-expanded', false);
    threeLinesButton.textContent = "메뉴";
    handleTabIndexOfBanner();
  } else {
    isActived = true;
    header.classList.add('active');
    threeLinesButton.setAttribute('aria-expanded', true);
    threeLinesButton.textContent = "닫기";
    handleTabIndexOfBanner();
  }
}

function toggleBannerButtons(state) {
  if (state === 'show') {
    threeLinesButton.classList.remove('hidden');
  } else if (state === 'hide') {
    threeLinesButton.classList.add('hidden');
  }
}

function displayHeaderButtons() {
  onTablet = window.innerWidth >= screen.tablet ? true : false;

  if (onTablet) {
    toggleBannerButtons('hide');
    activeOrInactiveHeader();
  } else { // Mobile
    toggleBannerButtons('show');
    handleTabIndexOfBanner();
  }
}

window.addEventListener('resize', displayHeaderButtons);
window.addEventListener("DOMContentLoaded", displayHeaderButtons);
window.addEventListener("DOMContentLoaded", handleTabIndexOfBanner);
threeLinesButton.addEventListener('click', activeOrInactiveHeader);




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
const localId = JSON.parse(localStorage.getItem('bookedData')).id;
data = {
  id: localId,
  movie: {
    name: "",
    time: "",
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

function createTimeListItems(ol, data, index, key) {
  const timeListItem = document.createElement('li');
  const input = document.createElement('input');
  const label = document.createElement('label');

  timeListItem.setAttribute('aria-label', '상영시간');

  input.id = key + index;
  input.classList = "hidden";
  input.type = "checkbox";
  input.name = key;
  input.value = data;

  label.setAttribute('for', key + index);
  label.textContent = data;

  ol.appendChild(timeListItem);
  timeListItem.appendChild(input);
  timeListItem.appendChild(label);
}

function populateStepTime() {
  for (key in reservationTimeData) {
    const data = reservationTimeData[key].timetable;
    const movieListItem = document.createElement('li');
    const name = document.createElement('h4');
    const timeList = document.createElement('ol');

    movieListItem.className = "movie";
    movieListItem.setAttribute('data-timetable', key);
    movieListItem.setAttribute('aria-label', '상영 중인 영화');
    name.className = "movie-name";
    name.textContent = reservationTimeData[key]['name'];
    timeList.className = "time-list d-flex flex-wrap justify-content-between";
    timeList.setAttribute('aria-label', '시간');

    sectionTime.appendChild(movieListItem);
    movieListItem.appendChild(name);
    movieListItem.appendChild(timeList);

    data.forEach(function(data, index) {
      createTimeListItems(timeList, data, index, key);
    });
  };
}

populateStepTime();


// 상영시간표 영화 선택
// ↓↓↓↓↓↓↓↓↓↓↓↓↓ 여기 리팩토링 하셈 ↓↓↓↓↓↓↓↓↓↓↓↓↓
const movies = document.querySelectorAll('.movie');

const prototypeTimetable = {
  inActiveSections: function() {
    movies.forEach(function(movie) {
      movie.classList.add('inactive');
    });
  },
  activeSelectedSections: function() {
    this.section.classList.remove('inactive');
    this.section.classList.add('active');
  },
  inActiveLists: function() {
    this.lists.forEach(function(list) {
      list.classList.add('inactive');
    });
  },
  activeList: function(selectedListItem) {
    selectedListItem.classList.remove('inactive');
  },
  init: function() {
    this.lists.forEach(function(list) {
      list.classList.remove('inactive');
    });

    movies.forEach(function(movie) {
      movie.classList.remove('inactive');
    });

    this.section.classList.remove('active');
  },
  changeData: function(input) {
    data.movie.name = input.name;
    data.movie.time = input.value;
    localStorage.setItem('bookedData', JSON.stringify(data));
  },
  displayValue: function() {
    const data = JSON.parse(localStorage.getItem("bookedData"));
    const section = document.querySelector('#check-name .mypage-desc');
    const koreanName = state.reservation.time[data.movie.name].name;
    const time = data.movie.time;
    const nameHTML = "<strong>" + koreanName + "</strong>";
    const timeHTML = "<strong>(" + time + ")</strong>";
    section.innerHTML = nameHTML + timeHTML;
  },
};

function movieAndTime(timetable) {
  const movie = Object.create(prototypeTimetable);
  movie.section = document.querySelector(timetable);
  movie.lists = movie.section.querySelectorAll('li');
  movie.labels = movie.section.querySelectorAll('label');

  movie.labels.forEach(function(label) {
    label.addEventListener('click', function() {
      const input = this.previousElementSibling;
      const list = this.parentElement;

      if (input.checked) {
        movie.init();
        return;
      }

      movie.inActiveSections();
      movie.activeSelectedSections();
      movie.inActiveLists();
      movie.activeList(list);
      movie.changeData(input);
      movie.displayValue();
    });
  });

  return movie;
}

const rocky = movieAndTime("[data-timetable=rocky]");
const matilda = movieAndTime("[data-timetable=matilda]");
const mean = movieAndTime("[data-timetable=mean]");
const harry = movieAndTime("[data-timetable=harry]");
const marie = movieAndTime("[data-timetable=marie]");
const truman = movieAndTime("[data-timetable=truman]");



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
  plus: {
    main: function(displayCount, downButton, upButton, type) {
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
    localStorage.setItem('bookedData', JSON.stringify(data));
  },
  displayTotal: function() {
    const data = JSON.parse(localStorage.getItem("bookedData"));
    const section = document.querySelector('#check-count .total');
    const total = data.count.total;
    const totalHTML = "<strong>총 " + total + "명</strong>";

    section.innerHTML = totalHTML;
  },
  displayDetails: function() {
    const data = JSON.parse(localStorage.getItem("bookedData"));
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
    const data = JSON.parse(localStorage.getItem("bookedData"));
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
    count.plus.main(count.displayCount, count.downButton, count.upButton, count.type);
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




// 좌석선택 출력
let seatData = seat; // input[type=radio]의 id 값을 받아와서 seat[영화명][영화시간]으로 이용할 것임.
const seatTableHead = document.querySelector("#step-seat table thead");
const seatTableBody = document.querySelector("#step-seat table tbody");

function populateTableHead() {
  const tr = document.createElement('tr');
  const th = document.createElement('th');

  seatTableHead.appendChild(tr);
  tr.appendChild(th);

  for (key in seat['rocky']['rocky1']['a']) {
    const th = document.createElement('th');
    th.textContent = key;
    tr.appendChild(th);
  }
}

function populateTableBody() {
  for (key in seat['rocky']['rocky1']) {
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    const column = key;

    th.textContent = column;
    seatTableBody.appendChild(tr);
    tr.appendChild(th);

    for (key in seat['rocky']['rocky1'][key]) {
      const td = document.createElement('td');
      const checkbox = document.createElement('input');
      const label = document.createElement('label');
      const row = key;
      const checkboxId = column + "-" + row;

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

populateTableHead();
populateTableBody();



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
