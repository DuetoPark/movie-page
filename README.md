# Movie-page
🎥영화관 페이지🎥

>'현장'에서 '어디서나'로 개념을 바꾼 페이지들이 존재합니다.<br>
>그 많은 페이지를 하나하나 도장 깨기 하려 합니다.<br>
>그 중 첫 번째 페이지입니다.<br>
>
>이번이 마지막이 될 수도 있습니다.
<br>

## 목차
1. [GNB](#gnb)
2. [페이지 기능](#페이지-기능)
3. [사용 언어](#사용-언어)
4. [프레임워크](#프레임워크)
5. [디자인툴](#디자인툴)
<br>

## GNB
### 1. 메인 페이지
- 로그인을 한 경우
```html
<header id="header" class="container" aria-label="페이지 상단 영역">
  <div class="row d-flex justify-content-between align-items-center overflow-hidden">
    <h1 id='page-title' class="col-12 col-sm-4">
      <a id='home' href="./01-main-after-login.html" aria-current='page'>
        Movie
      </a>
    </h1>

    <button class="three-lines-button" type='button'
      aria-controls='menu' aria-expanded='false'>
      메뉴
    </button>

    <nav id='menu' class="col-12 col-sm-8 col-md-6 d-flex flex-column flex-sm-row button-group">
      <a class="fill-button my-page-button" href="./03-mypage.html">My page</a>
      <a class="fill-button check-button" href="./03-mypage.html#reservation">예매/좌석확인</a>
      <a class="fill-button logout-button" href="./01-main.html">로그아웃</a>
      <a class="fill-button event-button" href="#event" aria-label='이벤트 영역으로 건너뛰기'>이벤트</a>
    </nav>
  </div>
</header>
```
- 로그인을 하지 않은 경우
```html
<header id="header" class="container" aria-label="페이지 상단 영역">
  <div class="row d-flex justify-content-between align-items-center overflow-hidden">
    <h1 id='page-title' class="col-12 col-sm-6">
      <a id='home' href="./01-main.html" aria-current='page'>
        Movie
      </a>
    </h1>

    <button class="three-lines-button" type='button'
      aria-controls='menu' aria-expanded='false'>
      메뉴
    </button>

    <div id='menu' class="col-12 col-sm-6 col-md-4 d-flex flex-wrap button-group">
      <a class="fill-button check-button" href="./02-user-type.html">예매/좌석확인</a>
      <button class="fill-button login-button">로그인</button>
      <a class="fill-button event-button" href="#event" aria-label='이벤트 영역으로 건너뛰기'>이벤트</a>
    </div>
  </div>
</header>
```

### 2. 마이 페이지
```html
<header id="header" class="container" aria-label="페이지 상단 영역">
  <div class="row overflow-hidden">
    <h1 id='page-title' class="col-12">
      <a id='home' href="./01-main-after-login.html">
        Movie
      </a>
    </h1>

    <button class="three-lines-button" type='button'
      aria-controls='menu' aria-expanded='false' aria-haspopup='menu'>
      메뉴
    </button>

    <nav id='menu' class="col-12 d-flex flex-wrap justify-content-sm-center button-group"
         aria-labelledby="menu-title">
      <h2 id="menu-title" class="hidden">페이지 내부에서 이동</h2>
      <a class="fill-button" data-type="menu" href="#profile">프로필 수정</a>
      <a class="fill-button" data-type="menu" href="#reservation">좌석예매</a>
      <a class="fill-button" data-type="menu" href="#booked">예매내역</a>

      <a class="fill-button logout-button col-sm-3 col-lg-2" href="./01-main.html">로그아웃</a>
    </nav>
  </div>
</header>
```

### 3. 그 외 페이지
```html
<header id="header" class="container" aria-label="페이지 상단 영역">
   <div class="row d-flex justify-content-between align-items-center overflow-hidden">
     <h1 id='page-title' class="col-12 col-sm-6">
       <a id='home' href="./01-main.html">
         Movie
       </a>
     </h1>
   </div>
 </header>
```

## 페이지 기능
### 1. 메인 페이지
#### 탭 포커스
```javascript
function setTabIndex(elem, tabIndex) {
  elem.setAttribute('tabindex', tabIndex);
}

function handleTabIndexOfBanner() {
  onTablet = window.innerWidth >= screen.tablet ? true : false;
  isActived = header.classList.contains('active');

  setTabIndex(threeLinesButton, 0);
  setTabIndex(eventButton, 0);

  if (onTablet) {
    buttons.forEach(function(button) {setTabIndex(button, 0);});
    setTabIndex(threeLinesButton, -1);
    setTabIndex(eventButton, -1);
  } else if (!onTablet && isActived) { // Mobile & 활성화 상태
    buttons.forEach(function(button) {setTabIndex(button, 0);});
  } else if (!onTablet && !isActived) { // Mobile & 비활성화 상태
    buttons.forEach(function(button) {setTabIndex(button, -1);});
  }
}
```
#### 로그인
- 버튼 활성화
- 아이디 다른 페이지로 전송
  
### 2. 회원가입 페이지
#### 회원가입
- 회원가입 버튼 활성화/비활성화
- 비밀번호 확인

### 3. 마이 페이지
#### 프로필 수정
- 프로필 사진 수정
#### 영화 예매
- 웹 스토리지 사용
- 데이터와 화면 매칭
```javascript
function matchSeatDataAndDomTable() {
  // 변경된 세션 스토리지 불러옴
  const optionData = JSON.parse(sessionStorage.getItem('optionData'));
  const movieName = optionData.movie.name;
  const movieTime = optionData.movie.time[1];

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
```

## 사용 언어
- HTML
- CSS (반응형 디자인 구현)
- Vanilla Javascript
<br>

## 프레임워크
- Bootstrap   
  - 레이아웃 설정
  - Flex 설정

## 디자인툴
피그마: [https://www.figma.com](https://www.figma.com/file/YRCjGUt8kyQv3VvMpmvSNM/Movie?node-id=0%3A1)
