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
};


// 상영시간표 출력
const reservationTimeData = state.reservation.time;
const sectionTime = document.querySelector('#step-time');

function createTimeListItems(ol, data, index, key) {
  const li = document.createElement('li');
  const input = document.createElement('input');
  const label = document.createElement('label');

  input.id = key + index;
  input.classList = "hidden";
  input.type = "checkbox";
  input.name = key;
  input.value = data;

  label.setAttribute('for', key + index);
  label.textContent = data;

  ol.appendChild(li);
  li.appendChild(input);
  li.appendChild(label);
}

function populateStepTime() {
  for (key in reservationTimeData) {
    const data = reservationTimeData[key].timetable;
    const div = document.createElement('div');
    const name = document.createElement('h4');
    const ol = document.createElement('ol');

    div.className = "movie";
    div.setAttribute('data-timetable', key);
    name.className = "movie-name";
    name.textContent = reservationTimeData[key]['name'];
    ol.className = "time-list d-flex flex-wrap justify-content-between";

    sectionTime.appendChild(div);
    div.appendChild(name);
    div.appendChild(ol);

    data.forEach(function(data, index) {
      createTimeListItems(ol, data, index, key);
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

    // const li = clone.querySelector('li');
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

      let countValue = Number(displayCount.textContent);

      if (!countValue) {
        downButton.classList.remove('inactive');
      }

      if (countValue < 5) {
        // data
        total += 1;
        data.count[type] += 1;
        // display
        displayCount.textContent = countValue + 1;
      }

      countValue = Number(displayCount.textContent);
      if (countValue === 5) {
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
  }
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
  });
  count.downButton.addEventListener('click', function() {
    count.minus(count.displayCount, count.downButton, count.upButton, count.type);
    count.changeData(count.type);
  });

  return count;
}

const adultGroup = Count('li[data-count=adult]');
const teenGroup = Count('li[data-count=teen]');
const kidGroup = Count('li[data-count=kid]');
const discountGroup = Count('li[data-count=discount]');




// 좌석선택 출력
let seatData = seat; // input[type=radio]의 id 값을 받아와서 seat[영화명][영화시간]으로 이용할 것임.
const timetableHead = document.querySelector("#step-seat table thead");
const timetableBody = document.querySelector("#step-seat table tbody");

function populateTableHead() {
  const tr = document.createElement('tr');
  const th = document.createElement('th');

  timetableHead.appendChild(tr);
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
    timetableBody.appendChild(tr);
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
    handleTabIndexOfBanner();
  } else {
    isActived = true;
    header.classList.add('active');
    threeLinesButton.setAttribute('aria-expanded', true);
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




// 스크롤 이동 (인터넷에서 긁어옴)
$(document).on('click', 'a[href^="#"]', function (event) {
  event.preventDefault();

  $('html, body').animate({
    scrollTop: $($.attr(this, 'href')).offset().top
  }, 500);
});




// 관람 내역, 리뷰
const prototypeHistory = {
  showHistory: function(isMultiple, hidden, button) {
    button.classList.add('hidden');

    if (isMultiple) {
      for (let i=0; i < hidden.length; i++) {
        hidden[i].classList.remove('hidden');
        hidden[i].classList.add('active');
      }
    } else {
      hidden.classList.remove('hidden');
      hidden.classList.add('active');
    }
  },

  applyEvent: function(button) {
    button.addEventListener('click',
      this.showHistory.bind(null, this.isMultiple, this.hidden, this.button));
  },
};

function historyFactory(isMultiple, hidden, button) {
  let history = Object.create({});
  history.button = document.querySelector(button);
  history.isMultiple = isMultiple;
  history.multiple = document.querySelectorAll(hidden);
  history.one = document.querySelector(hidden);
  history.hidden = isMultiple ? history.multiple : history.one;

  history.__proto__ = prototypeHistory;

  history.applyEvent(history.button); // 클릭 이벤트 실행

  return history;
}

const seen = historyFactory(false, '.reservation-confirm-seen', '.seen-confirm-button');
const review = historyFactory(true, '[data-review="hidden"]', '.more-button');




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




// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 여기부터 다시 리팩토링 하셈 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// Booking System - Select option ('num of person' and 'price')
// 1. 인원수 제한-5명 (Limit the number of person to five)
// 2. '누적' 인원 5명 이상 - alert 발생 & '인원'과 '금액' 초기화
// (Over 5, alert message & reset 'number of person' and 'price')
// 3. '누적' 인원 5명 이하 - '최종결정금액' 계산
// (Under 5, accumulate total price)
let numOfTotal = 0;
let priceOfTotal = 0;

function Accumulate(option, price){
  this.ageOption = document.querySelectorAll(option);
  this.optionValue = 0;
  this.price = price;
  this.saveOptionValue = [0];

  // value 자료형 변경 함수 (문자형 -> 정수형)
  this.changeDataType = function (){
    for(let i=0; i<this.ageOption.length; i++){
      if(this.ageOption[i].selected){
        this.optionValue = Number(this.ageOption[i].value);
      }
    }
    this.saveOptionValue.push(this.optionValue);  // Option 선택값 저장
  }

  // '인원' & '금액' 누적값 계산 함수.
  this.$Sum = function (){
    let current=this.saveOptionValue[this.saveOptionValue.length-1];  //선택된 옵션 현재 값.
    let past=this.saveOptionValue[this.saveOptionValue.length-2]; //선택된 옵션 이전 값.

    // '누적' 인원 & 총금액.
    numOfTotal += (current - past);
    console.log("총원 "+numOfTotal);
    priceOfTotal += this.price * (current - past);
    console.log("총금액 "+priceOfTotal);

    // 누적 인원수 5명 초과시, 선택한 인원과 금액을 초기화.
    if(numOfTotal>5){
      alert("인원 선택은 최대 5명입니다.");
      numOfTotal -= current;
      this.saveOptionValue[this.saveOptionValue.length-1]="0";
      console.log("수정된 총원 "+numOfTotal);
      priceOfTotal -= this.price * current;
      console.log("수정된 총금액 "+priceOfTotal);
      this.ageOption[0].selected = 'true';
    }
  }

  // '인원' & '금액' 누적값 출력 함수.
  // 1. 좌석예약 Booking-desc의 dd에 출력.
  // 2. 좌석 선택 활성화.
  this.output$Sum = function(){
    document.getElementById("seat-desc-count").innerHTML = "총 "+ numOfTotal +"명";
    document.getElementById("seat-desc-price").innerHTML = this.numberWithCommas(priceOfTotal)+"원";
    document.getElementById("seat-desc-count").style.opacity = '1';
    document.getElementById("seat-desc-price").style.opacity = '1';
    // 좌석 선택 활성화.
    document.querySelector(".seat-table").style.pointerEvents = "auto";
    document.querySelector(".seat-table").style.opacity = "1";
  }

  // 회계형 숫자표현 - stackoverflow에서 긁어옴.
  this.numberWithCommas = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

let ageType1 = new Accumulate('#adult option', 12000);
let ageType2 = new Accumulate('#Teenager option', 9000);
let ageType3 = new Accumulate('#child option', 6000);
let ageType4 = new Accumulate('#preferential-treatment option', 3000);

// Click Event (Type of age)
$("select[name=adult]").change(function(){
  ageType1.changeDataType();
  ageType1.$Sum();
  ageType1.output$Sum();
});
$("select[name=Teenager]").change(function(){
  ageType2.changeDataType();
  ageType2.$Sum();
  ageType2.output$Sum();
});
$("select[name=child]").change(function(){
  ageType3.changeDataType();
  ageType3.$Sum();
  ageType3.output$Sum();
});
$("select[name=preferential-treatment]").change(function(){
  ageType4.changeDataType();
  ageType4.$Sum();
  ageType4.output$Sum();
});




// Booking System - Checked 수 한정 함수.
// 1. 인원 수 지정한 만큼만 체크 가능.
// 2. Input:checked.value는 Booking-desc에 출력.
// 3. 인원 수 만큼 체크되면, 모든 체크박스 & 인원 선택 불가.
let checkboxs = document.querySelectorAll('input[name=seat]');
let seatInHtml = document.getElementById("seat-desc-seat");
let ageTypes = document.querySelectorAll('.age');
let checkedSeat = []; // Input:checked 값 저장.

function toUseElem(elem, pointer, opacity){
  for(let i=0; i<elem.length; i++){
    elem[i].style.pointerEvents = pointer;
    elem[i].style.opacity = opacity;
  }
}

$("input[name=seat]").change(function(){
  let checkedBoxs = document.querySelectorAll('.seat-table input[type=checkbox]:checked').length;

  for(let i=0; i<checkboxs.length; i++){
    if(checkboxs[i].checked){
      checkedSeat.push(checkboxs[i].value);
    }
  }

  console.log(checkedBoxs);
  console.log(numOfTotal);

  // 인원 선택 수만큼 체크되면, 모든 체크박스 & 인원 선택불가로 변경.
  if(checkedBoxs>=numOfTotal){
    document.querySelector(".seat-table table").style.pointerEvents = "none";
    document.querySelector(".seat-table table").style.opacity = "0.5";
    toUseElem(ageTypes, 'none', '0.5');
  }

  // Input:checked.value는 Booking-desc에 출력.
  seatInHtml.innerHTML = checkedSeat.slice(checkedSeat.length - numOfTotal,checkedSeat.length);
  seatInHtml.style.opacity = '1';
});






// Click Event - Reset button
// 좌석 선택 초기화
// 1. 인원 선택 활성화.
// 2. 누적값 (인원 & 금액) 0으로 초기화.
// 3. 인원 [option:selected].value 저장한 배열 [0]으로 초기화.
// 4. 좌석 [input[name=seat]:checked].value 저장한 배열 [0]으로 초기화.
// 5. HTML Booking-desc part 출력값 초기화.
// 6. HTML - <div class="seat-table">의 자식태그 <table> pointerEvents 활성화.
// 변수 중복 사용
// let checkedSeat = []; // Input:checked 값 저장. (Output - HTML Booking-desc part)
// ageTypes = document.querySelectorAll('.age');
// 함수 중복 사용 toUseElem();
$('.reset-button').click(function(){
  toUseElem(ageTypes, 'auto', '1');

  numOfTotal = 0;
  priceOfTotal = 0;

  ageType1.saveOptionValue = [0];
  ageType2.saveOptionValue = [0];
  ageType3.saveOptionValue = [0];
  ageType4.saveOptionValue = [0];

  checkedSeat = [0];

  document.getElementById('seat-desc-count').innerHTML = "";
  document.getElementById('seat-desc-seat').innerHTML = "";
  document.getElementById('seat-desc-price').innerHTML = "";

  for(let i=0; i<checkboxs.length; i++){
    document.querySelector(".seat-table table").style.pointerEvents = "auto";
    document.querySelector(".seat-table table").style.opacity = "1";
  }
});
