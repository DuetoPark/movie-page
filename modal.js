window.onload = function() {

  // Main page

  // Login Modal
  // 1. 로그인 모달 열면, 배경 블러. (Open Modal, Background Blur)
  // 2. 로그인 모달 닫으면, 배경 선명. (Close Modal, Background Clear)
  // 3. 로그인 버튼 - 로그인 모달(배경 블러) - 모달 내 버튼(배경 선명)

  // Open Modal Function
  function onClick(){
    document.querySelector('.modal-wrap').style.display='block';
  }
  // Close Modal Function
  function closeModal(){
    document.querySelector('.modal-wrap').style.display='none';
  }


  // Event - Modal's Close Button
  // 모달 '닫힘' & 배경 '선명' ('Close' Modal & 'Clear' Background)
  $(".modal-close").off("click").click(function() {
    closeModal();
    document.querySelector('.total').style.filter='none';
  });

  $(".modal-close").click(function() {
    // closeModal();
    document.querySelector('section.modal-wrap.signin').style.display='none';
    document.querySelector('.total').style.filter='none';
  });



  // Event - Modal's Login Button
  // 모달 '열림' & 배경 '블러' ('Open' Modal & 'Blur' Background)
  $(".login-modal-button").click(function() {
    onClick();
    document.querySelector('.total').style.filter='blur(5px)';
  });

  // Event - Modal's Sign in Button
  // 모달 '열림' & 배경 '블러' ('Open' Modal & 'Blur' Background)
  $(".signin-modal-button").click(function() {
    document.querySelector('section.modal-wrap.signin').style.display='block';
    document.querySelector('.total').style.filter='blur(5px)';
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

  // Open Menu
  function openMenu(){
    document.querySelector('.page-menu').style.left='0';
    document.querySelector('.page-menu').style.opacity='1';
  }
  // Close Menu
  function closeMenu(){
    document.querySelector('.page-menu').style.left='-100vw';
    document.querySelector('.page-menu').style.opacity='0';
  }

  $(".menu-button").off('click').click(function() {
    openMenu();
  });
  $(".close-button").off('click').click(function() {
    closeMenu();
  });



  // Open Seen Movies
  // 1. '이전관람내역' 버튼 누르면, 버튼 숨김.
  // (Click seen-confirm-button, hidden button)
  // 2. '이전관람내역' 버튼 누르면, display:none;영역 출력.
  // (Click seen-confirm-button, We can see display:none; part)
  let elem = document.querySelector('.reservation-confirm-seen');
  let pagenation = document.querySelector('.reservation-confirm .col-md-4');

  $('.seen-confirm-button').click(function(){
    $('.reservation-confirm-seen').css("display","block");
    $('.seen-confirm-button').css("display","none");
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

  $('.more-button').off('click').click(function(){
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
  // (Click movie name/time, it changees to fontWeight 700 & color #181818)
  // 2. 선택한 영화이름/영화시간이 HTML Booking Section에 출력.
  // (Output movie name/time to HTML Booking Section)
  let movieName = document.querySelectorAll("input[name=movie-name]");
  let nameLabel = document.querySelectorAll("[id^=name]");

  $("input[name=movie-name]").click(function(){
    for(let i=0; i<movieName.length; i++){
      if(movieName[i].checked){
        // 폰트 변경.
        nameLabel[i].style.fontWeight = '700';
        nameLabel[i].style.color = '#181818';
        // Booking Section에 출력.
        document.getElementById("seat-desc-name").innerHTML= nameLabel[i].innerHTML;
      } else{
        nameLabel[i].style.fontWeight = '400';
        nameLabel[i].style.color = '#C4C4C4';
      }
    }
  });

  // 영화시간 누르면 '진하기 700', '글자색 #181818'로 변경.
  // 선택한 시간 Booking Section에 출력됨.
  let startTime = document.querySelectorAll("input[name=start-time]");
  let timeLabel = document.querySelectorAll("[id^=time]");

  $("input[name=start-time]").click(function(){
    for(let i=0; i<startTime.length; i++){
      if(startTime[i].checked){
        // 폰트 변경.
        timeLabel[i].style.fontWeight = '700';
        timeLabel[i].style.color = '#181818';
        // Booking Section에 출력.
        document.getElementById("seat-desc-time").innerHTML= timeLabel[i].innerHTML;
      } else{
        timeLabel[i].style.fontWeight = '400';
        timeLabel[i].style.color = '#C4C4C4';
      }
    }
  });





  // Booking System - Select option ('movie name')
  // 영화이름 누르면, 해당 영화의 상영시간표가 display='block';됨.
  // 변수 재사용.
  // let movieName = document.querySelectorAll("input[name=movie-name]");
  let timetable = document.querySelectorAll("[id^=Timetable]");

  function showTimetable(){
    for(let j=1; j<=movieName.length; j++){
      if(document.getElementById('movie-name'+j).checked){
        for(let i=0; i<timetable.length; i++){
          timetable[i].style.display = 'none';
        }

        document.getElementById('Timetable'+j).style.display = 'block';
      }
    }
  }

  $('[name=movie-name]').click(function (){
    document.querySelector('.option-items:nth-of-type(2)').style.display = 'block';
    showTimetable();
  });





  // Booking System - Select option ('start time')
  // 상영시간 누르면, 좌석 선택 섹션이 display='block';됨.
  $('[id^=Timetable]').click(function (){
    document.querySelector('.select-seat-button').disabled = false;
  });

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


  // '인원' & '금액' 누적값 계산 함수.
  function accumulateValue (dataSave, price, obj){
    // 선택된 Option Value.
    let current = dataSave[dataSave.length-1]; //현재 값.
    let past = dataSave[dataSave.length-2]; // 이전 값.

    // '누적' 인원 & 총금액.
    numOfTotal += (current - past);
    console.log("총원 "+numOfTotal);
    priceOfTotal += price * (current - past);
    console.log("총금액 "+priceOfTotal);

    // 누적 인원수 5명 초과시,
    // 선택한 인원과 금액이 초기화 됨.
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
  // 좌석예약 Booking-desc의 dd에 출력.
  function outputValue(){
    document.getElementById("seat-desc-count").innerHTML = "총 "+numOfTotal+"명";
    document.getElementById("seat-desc-price").innerHTML = numberWithCommas(priceOfTotal)+"원";
    document.getElementById("seat-desc-count").style.opacity = '1';
    document.getElementById("seat-desc-price").style.opacity = '1';
  }
  // 회계형 숫자표현 - stackoverflow에서 긁어옴.
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function activeSeatTable(){
    document.querySelector(".seat-table").style.pointerEvents = "auto";
    document.querySelector(".seat-table").style.opacity = "1";
  }


  // Event - Type of age
  // '누적' 인원 & 금액 계산 후 출력.
  // 원인: Change 이벤트 안에 변수선언해서 매번 변수를 덮어쓰게 함.
  // 해결: 변수 선언을 이벤트 선언 전에 해야 함(배열에 value push 됨).
  // 잘하자 과거의 나야.
  let dataSaveAdult = [0];    // 이것땜에 한시간 삽질 함.
  $("select[name=adult]").change(function(){
    for(let i=0; i<adult.length; i++){
      if(adult[i].selected){
        numOfAdult = Number(adult[i].value);  // value 자료형 변경 (문자형 -> 정수형)
      }
    }

    dataSaveAdult.push(numOfAdult);  // Option 선택값 저장
    console.log("성인 ["+dataSaveAdult+"]");
    console.log("선택인원 "+numOfAdult);

    accumulateValue(dataSaveAdult, 12000, adult);
    outputValue();
    activeSeatTable();
  });

  let dataSaveTeen = [0];
  $("select[name=Teenager]").change(function(){
    for(let i=0; i<teen.length; i++){
      if(teen[i].selected){
        numOfTeen = Number(teen[i].value);
      }
    }

    dataSaveTeen.push(numOfTeen); // Option 선택값 저장
    console.log("청소년 ["+dataSaveTeen+"]");
    console.log("선택인원 "+numOfTeen);

    accumulateValue(dataSaveTeen, 9000, teen);
    outputValue();
    activeSeatTable();
  });


  let dataSaveChild = [0];
  $("select[name=child]").change(function(){
    for(let i=0; i<child.length; i++){
      if(child[i].selected){
        numOfChild = Number(child[i].value);
      }
    }

    dataSaveChild.push(numOfChild); // Option 선택값 저장
    console.log("어린이 ["+dataSaveChild+"]");
    console.log("선택인원 "+numOfChild);

    accumulateValue(dataSaveChild, 6000, child);
    outputValue();
    activeSeatTable();
  });


  let dataSavePrefer = [0];
  $("select[name=preferential-treatment]").change(function(){
    for(let i=0; i<prefer.length; i++){
      if(prefer[i].selected){
        numOfPrefer = Number(prefer[i].value);
      }
    }

    dataSavePrefer.push(numOfPrefer); // Option 선택값 저장
    console.log("우대 ["+dataSavePrefer+"]");
    console.log("선택인원 "+numOfPrefer);

    accumulateValue(dataSavePrefer, 3000, prefer);
    outputValue();
    activeSeatTable();
  });






  // Booking System - Checked 수 한정 함수.
  // 1. 인원 수 지정한 만큼만 체크 가능.
  // 2. Input:checked.value는 Booking-desc에 출력
  // 3. 인원 수 만큼 체크되면, 모든 체크박스 선택 불가로 변경됨.
  const checkbox = document.querySelectorAll('input[name=seat]');
  let checkedSeat = []; // Input:checked 값 저장. (Output - HTML Booking-desc part)
  const seatInHtml = document.getElementById("seat-desc-seat");

  $("input[name=seat]").change(function(){
    let checkedCount = document.querySelectorAll('.seat-table input[type=checkbox]:checked').length;

    for(let i=0; i<checkbox.length; i++){
      if(checkbox[i].checked){
        checkedSeat.push(checkbox[i].value+" ");
      }
    }

    console.log(checkedCount);
    console.log(numOfTotal);

    // 인원 선택 수만큼 체크되면, 모든 체크박스 선택불가로 변경.
    let ageTypeConut = document.querySelectorAll('.age');

    if(checkedCount>=numOfTotal){
      for(let i=0; i<checkbox.length; i++){
        document.querySelector(".seat-table table").style.pointerEvents = "none";
        document.querySelector(".seat-table table").style.opacity = "0.5";
      }

      for(let i=0; i<ageTypeConut.length; i++){
        ageTypeConut[i].style.pointerEvents = "none";
        ageTypeConut[i].style.opacity = "0.5";
      }
    }

    // Input:checked.value는 Booking-desc에 출력.
    seatInHtml.innerHTML = checkedSeat.slice(checkedSeat.length - numOfTotal,checkedSeat.length);
    seatInHtml.style.opacity = '1';
  });




  // Event - Reset button
  // 좌석 선택 초기화
  // 1. 인원 선택하는 div pointerEvents 활성화.
  // 2. 누적값 (인원 & 금액) 0으로 초기화.
  // 3. 인원 [option:selected].value 저장한 배열 [0]으로 초기화.
  // 4. 좌석 [input:checked].length 저장한 배열 [0]으로 초기화.
  // 5. HTML Booking-desc part 출력값 초기화.
  // 6. 좌석 선택하는 div pointerEvents 활성화.
  // 변수 중복 사용
  // const checkbox = document.querySelectorAll('input[name=seat]');

  $('.reset-button').click(function(){
    let ageTypeConut = document.querySelectorAll('.age');

    for(let i=0; i<ageTypeConut.length; i++){
      ageTypeConut[i].style.pointerEvents = "auto";
      ageTypeConut[i].style.opacity = "1";
    }

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

    for(let i=0; i<checkbox.length; i++){
      document.querySelector(".seat-table table").style.pointerEvents = "auto";
      document.querySelector(".seat-table table").style.opacity = "1";
    }
  });

};



// Main page - Random Image  -> stackoverflow에서 긁어옴.
// 페이지 로드시, Advertising Section에 랜덤이미지 보이기.

$(document).ready(function(){
  let imgArray = new Array();
  imgArray.push("pictures/록키호러픽쳐쇼2.gif");
  imgArray.push("pictures/록키호러픽쳐쇼3.gif");
  imgArray.push("pictures/록키호러픽쳐쇼4.gif");
  imgArray.push("pictures/록키호러픽쳐쇼5.gif");
  imgArray.push("./pictures/록키호러픽쳐쇼6.gif");
  imgArray.push("./pictures/록키호러픽쳐쇼7.gif");
  console.log(imgArray);
  console.log(imgArray.length);

  let imgNum = Math.floor(Math.random() * imgArray.length);
  let objImg = document.getElementById("advertising-image-rocky");

  objImg.src = imgArray[imgNum];
});
