window.onload = function() {

  // Main page
  // Open Modal - Login
  // 모달 '열림' & 배경 '블러' ('Open' Modal & 'Blur' Background)
  $(".login-modal-button").click(function() {
    document.querySelector('.modal-wrap').style.display='block';
    document.querySelector('.modal-X').style.filter='blur(5px)';
  });

  // Open Modal - Sign in
  // 모달 '열림' & 배경 '블러' ('Open' Modal & 'Blur' Background)
  $(".signin-modal-button").click(function() {
    document.querySelector('section.modal-wrap.signin').style.display='block';
    document.querySelector('.modal-X').style.filter='blur(5px)';
  });



  // Close Modal - Login
  // 모달 '닫힘' & 배경 '선명' ('Close' Modal & 'Clear' Background)
  $(".modal-close").off("click").click(function() {
    document.querySelector('.modal-wrap').style.display='none';
    document.querySelector('.modal-X').style.filter='none';
  });

  // Close Modal - Sign in
  // 모달 '닫힘' & 배경 '선명' ('Close' Modal & 'Clear' Background)
  $(".modal-close").click(function() {
    document.querySelector('section.modal-wrap.signin').style.display='none';
    document.querySelector('.modal-X').style.filter='none';
  });



  // Event - Login button
  // 로그인 버튼 누르면, 다음 페이지로 사용자 아이디 데이터 전송.
  // (Click login button, This page send user id data to next page.)
  $(".login-button").click(function() {
    let userId = document.getElementById("userId").value;

    location.href="01-main-after-login.html?userId="+userId;  //데이터 전송
  });





  // My page
  // Open Menu (CSS display:none; 사용 안 함)
  // 1. 메뉴 버튼 누르면, 스크린 왼쪽에서 튀어나옴.
  // (Click menu button, Menu poping out form the left side of the screen)
  // 2. 닫힘 버튼 누르면, 스크린 왼쪽으로 튀어나감.
  // (Click close button, Menu run to the left of the screen)
  function moveMenu(left, opacity){
    document.querySelector('.page-menu').style.left=left;
    document.querySelector('.page-menu').style.opacity=opacity;
  }

  // Open Menu
  $(".menu-button").click(function() {
    moveMenu('0','1');
  });

  // Close Menu
  $(".close-button").click(function() {
    moveMenu('-100vw','0');
  });



  // Open Seen Movies
  // 1. '이전관람내역' 버튼 누르면, 버튼 숨김.
  // (Click seen-confirm-button, hidden button)
  // 2. '이전관람내역' 버튼 누르면, display:none;영역 출력.
  // (Click seen-confirm-button, We can see display:none; part)
  $('.seen-confirm-button').click(function(){
    document.querySelector('.reservation-confirm-seen').style.display='block';
    document.querySelector('.seen-confirm-button').style.display='none';
  });



  // More other Reviews
  // 1. '더보기' 버튼 누르면, 버튼 숨김.
  // (Click 'more-button', hidden button)
  // 2. '더보기' 버튼 누르면, display:none;영역 출력.
  // (Click 'more-button', We can see display:none; part)
  let reviews=document.querySelectorAll('.user-review .col-md-4');

  function moreReviews(){
    for(i=3; i<reviews.length;i++ ){
      reviews[i].style.display = 'block';
    }
  }

  $('.more-button').click(function(){
    moreReviews();
    document.querySelector('.more-button').style.display='none';
  });





  // Change Profile Image - 인터넷에서 긁어옴.
  // 프로필 사진 변경.
    var readURL = function(input) {
        if (input.files && input.files[0]) {
          // 업로드 된 파일을 읽음.
            var reader = new FileReader();

            // 업로드 된 파일의 읽기 동작이 성공적으로 완료될 때마다 동작.
            reader.onload = function (e) {
              //클래스가 .profile-image 요소에 읽은 파일의 경로를 세팅.
                $('.profile-image').attr('src', e.target.result);
            }
            // FileList에서 경로를 가져옴.
            reader.readAsDataURL(input.files[0]);
        }
    }

    // id가 files인 요소가 변화할 때 함수 실행.
    $("#files").on('change', function(){
      readURL(this);
    });





  // Scroll Animation - 인터넷에서 긁어옴.
  //스크롤 부드럽게 이동.
    $(document).on('click', 'a[href^="#"]', function (event) {
      event.preventDefault();

      $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
      }, 500);

      document.querySelector('.page-menu').style.left='-100vw';
    });





  // Booking System - Click Event (Movie name/Start time)
  // 1. 영화이름/영화시간 누르면 '진하기 700', '글자색 #181818'로 변경.
  // (Click movie name/time, it changes to fontWeight 700 & color #181818)
  // 2. 선택한 영화이름/영화시간이 HTML Booking Section에 출력.
  // (Output movie name/time to HTML Booking Section)
  // 3. 영화이름 누르면, 시간 선택 파트와 영화의 상영시간표가 출력.
  let timetables = document.querySelectorAll("[id^=Timetable]");
  let movieNames = document.querySelectorAll("input[name=movie-name]");
  let nameLabels = document.querySelectorAll("[id^=name]");

  // 폰트 변경 & HTML Booking Section에 출력하는 함수.
  function changeFont(checkedElem, fontElem, showElem){
    for(let i=0; i<checkedElem.length; i++){
      if(checkedElem[i].checked){
        // 폰트 변경.
        fontElem[i].style.fontWeight = '700';
        fontElem[i].style.color = '#181818';
        // Booking Section에 출력.
        document.getElementById(showElem).innerHTML= fontElem[i].innerHTML;
      } else{
        fontElem[i].style.fontWeight = '400';
        fontElem[i].style.color = '#C4C4C4';
      }
    }
  }


  // 영화이름 클릭 이벤트
  $("input[name=movie-name]").click(function(){
    changeFont(movieNames, nameLabels, "seat-desc-name");

    // 같은 섹션 안의 '시간 선택' 파트가 출력.
    document.querySelector('.option-items:nth-of-type(2)').style.display = 'block';

    // 해당 영화의 시간표 출력
    for(let j=1; j<=movieNames.length; j++){
      if(document.getElementById('movie-name'+j).checked){
        for(let i=0; i<timetables.length; i++){
          timetables[i].style.display = 'none';
        }
        document.getElementById('Timetable'+j).style.display = 'block';
      }
    }
  });

  // 영화시간 클릭 이벤트
  let startTimes = document.querySelectorAll("input[name=start-time]");
  let timeLabels = document.querySelectorAll("[id^=time]");

  $("input[name=start-time]").click(function(){
    changeFont(startTimes, timeLabels, "seat-desc-time");
  });




  // Booking System - Click Event ('start time')
  // 상영시간 누르면, 좌석 선택 버튼이 활성화 됨.
  $('[id^=Timetable]').click(function (){
    document.querySelector('.select-seat-button').disabled = false;
  });



  // Booking System - Click Event ('select-seat-button')
  // 좌석선택 버튼 누르면, Booking 파트 출력.
  $('.select-seat-button').click(function(){
    document.querySelector(".booking").style.display = 'block';
  });





  // Booking System - Select option ('num of person' and 'price')
  // 1. 인원수 제한-5명 (Limit the number of person to five)
  // 2. '누적' 인원 5명 이상 - alert 발생 & '인원'과 '금액' 초기화
  // (Over 5, alert message & reset 'number of person' and 'price')
  // 3. '누적' 인원 5명 이하 - '최종결정금액' 계산
  // (Under 5, accumulate total price)
  const adult = document.querySelectorAll("#adult option");
  const teen = document.querySelectorAll("#Teenager option");
  const child = document.querySelectorAll("#child option");
  const prefer = document.querySelectorAll("#preferential-treatment option");

  let numOfAdult, numOfTeen, numOfChild, numOfPrefer;
  let numOfTotal = 0;

  let priceOfTotal = 0;

  // value 자료형 변경 함수 (문자형 -> 정수형)
  function changeDataType(age, num, dataSave){
    for(let i=0; i<age.length; i++){
      if(age[i].selected){
        num = Number(age[i].value);
      }
    }
    dataSave.push(num);  // Option 선택값 저장
  }

  // '인원' & '금액' 누적값 계산 함수.
  function $Sum (dataSave, price, obj){
    // 선택된 Option Value.
    let current = dataSave[dataSave.length-1]; //현재 값.
    let past = dataSave[dataSave.length-2]; // 이전 값.

    // '누적' 인원 & 총금액.
    numOfTotal += (current - past);
    console.log("총원 "+numOfTotal);
    priceOfTotal += price * (current - past);
    console.log("총금액 "+priceOfTotal);

    // 누적 인원수 5명 초과시, 선택한 인원과 금액이 초기화 됨.
    if(numOfTotal>5){
      alert("인원 선택은 최대 5명입니다.");
      numOfTotal -= current;
      dataSave[dataSave.length-1]="0";
      console.log("수정된 총원 "+numOfTotal);
      priceOfTotal -= price * current;
      console.log("수정된 총금액 "+priceOfTotal);
      obj[0].selected = 'true';
    }


  }

  // '인원' & '금액' 누적값 출력 함수.
  // 1. 좌석예약 Booking-desc의 dd에 출력.
  // 2. 좌석 선택 활성화.
  function output$Sum(){
    document.getElementById("seat-desc-count").innerHTML = "총 "+ numOfTotal +"명";
    document.getElementById("seat-desc-price").innerHTML = numberWithCommas(priceOfTotal)+"원";
    document.getElementById("seat-desc-count").style.opacity = '1';
    document.getElementById("seat-desc-price").style.opacity = '1';
    // 좌석 선택 활성화.
    document.querySelector(".seat-table").style.pointerEvents = "auto";
    document.querySelector(".seat-table").style.opacity = "1";
  }

  // 회계형 숫자표현 - stackoverflow에서 긁어옴.
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


  // Click Event (Type of age)
  // '누적' 인원 & 금액 계산 후 출력.
  let dataSaveAdult = [0];
  $("select[name=adult]").change(function(){
    changeDataType(adult, numOfAdult, dataSaveAdult);

    console.log("성인 ["+dataSaveAdult+"]");
    console.log("선택인원 "+numOfAdult);

    $Sum(dataSaveAdult, 12000, adult);
    output$Sum();
  });

  let dataSaveTeen = [0];
  $("select[name=Teenager]").change(function(){
    changeDataType(teen, numOfTeen, dataSaveTeen);

    console.log("청소년 ["+dataSaveTeen+"]");
    console.log("선택인원 "+numOfTeen);

    $Sum(dataSaveTeen, 9000, teen);
    output$Sum();
  });


  let dataSaveChild = [0];
  $("select[name=child]").change(function(){
    changeDataType(child, numOfChild, dataSaveChild);

    console.log("어린이 ["+dataSaveChild+"]");
    console.log("선택인원 "+numOfChild);

    $Sum(dataSaveChild, 6000, child);
    output$Sum();
  });


  let dataSavePrefer = [0];
  $("select[name=preferential-treatment]").change(function(){
    changeDataType(prefer, numOfPrefer, dataSavePrefer);

    console.log("우대 ["+dataSavePrefer+"]");
    console.log("선택인원 "+numOfPrefer);

    $Sum(dataSavePrefer, 3000, prefer);
    output$Sum();
  });






  // Booking System - Checked 수 한정 함수.
  // 1. 인원 수 지정한 만큼만 체크 가능.
  // 2. Input:checked.value는 Booking-desc에 출력.
  // 3. 인원 수 만큼 체크되면, 모든 체크박스 & 인원 선택 불가.
  const checkboxs = document.querySelectorAll('input[name=seat]');
  let checkedSeat = []; // Input:checked 값 저장. (Output - HTML Booking-desc part)
  const seatInHtml = document.getElementById("seat-desc-seat");
  const ageTypes = document.querySelectorAll('.age');

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
        checkedSeat.push(checkboxs[i].value+" ");
      }
    }

    console.log(checkedBoxs);
    console.log(numOfTotal);

    // 인원 선택 수만큼 체크되면, 모든 체크박스 & 인원 선택불가로 변경.
    if(checkedBoxs>=numOfTotal){
      for(let i=0; i<checkboxs.length; i++){
        document.querySelector(".seat-table table").style.pointerEvents = "none";
        document.querySelector(".seat-table table").style.opacity = "0.5";
      }
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
  // 4. 좌석 [input:checked].length 저장한 배열 [0]으로 초기화.
  // 5. HTML Booking-desc part 출력값 초기화.
  // 6. 좌석 선택하는 div pointerEvents 활성화.
  // 변수 중복 사용
  // const checkboxs = document.querySelectorAll('input[name=seat]');
  // 함수 중복 사용 toUseElem();
  $('.reset-button').click(function(){
    let ageTypes = document.querySelectorAll('.age');

    toUseElem(ageTypes, 'auto', '1');

    numOfTotal = 0;
    priceOfTotal = 0;

    dataSaveAdult = [0];
    dataSaveTeen = [0];
    dataSaveChild = [0];
    dataSavePrefer = [0];

    checkedSeat = [0];

    document.getElementById('seat-desc-count').innerHTML = "";
    document.getElementById('seat-desc-seat').innerHTML = "";
    document.getElementById('seat-desc-price').innerHTML = "";

    for(let i=0; i<checkboxs.length; i++){
      document.querySelector(".seat-table table").style.pointerEvents = "auto";
      document.querySelector(".seat-table table").style.opacity = "1";
    }
  });

};
