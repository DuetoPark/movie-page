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
2. [페이지별 구현 목표](#페이지별-구현-목표)
3. [언어](#언어)
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
<br>

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
<br>

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
<br>

## 페이지별 구현 목표
### 1. 메인 페이지
#### CSS
- 반응형 CSS
여기에 영상 넣으면 되겠다.

#### JS
- 탭 포커스
```javascript
코드 넣기
```
- 중복 요소 구현(cloneNode, prototype)
```javascript
코드 넣기
```
### 2. 회원가입 페이지
#### CSS + JS
- input 포커스에 따른 label CSS 변화
여기에 영상넣자
#### JS
- 비밀번호 일치/불일치 알림 구현
```javascript
코드 넣기
```

### 3. 마이 페이지 & 비회원 예매 페이지
#### JS
- 웹 스토리지 사용
- 데이터와 화면 매칭
```javascript
코드 넣기
```
- 주문번호 생성
```javascript
코드 넣기
```

### 4. 예매확인 페이지
#### JS
- 웹 스토리지 사용
- 데이터 조회/수정
```javascript
코드 넣기
```
<br>

## 언어
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
