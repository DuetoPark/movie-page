window.onload = function() {

  // Main page

  // Login Modal
  // Open Modal Function
  function onClick(){
    document.querySelector('.modal-wrap').style.display='block';
  }
  // Close Modal Function
  function closeModal(){
    document.querySelector('.modal-wrap').style.display='none';
  }

  $(".modal-close").click(function() {
    closeModal();
    document.querySelector('.total').style.filter='none';
  });
  $(".login-modal-button").click(function() {
    onClick();
    // 모달 열리면 배경에 블러
    document.querySelector('.total').style.filter='blur(5px)';
  });
  $(".signin-modal-button").off('click').click(function() {
    onClick();
    // 모달 닫히면 배경 블러 삭제
    document.querySelector('.total').style.filter='blur(5px)';
  });


  // Event -  Login-button
  $(".login-button").click(function() {
    let userId = document.getElementById("userId").value;

    // 로그인 버튼 누르면, 다음 페이지로 사용자 아이디 데이터 전송.
    location.href="01-main-after-login.html?userId="+userId;
  });






  // My page
  // Open Menu (CSS display:none; 사용 안 함)
  function openMenu(){
    document.querySelector('.page-menu').style.left='0'; // 스크린 왼쪽에서 나옴
    document.querySelector('.page-menu').style.opacity='1';
  }
  // Close Menu
  function closeMenu(){
    document.querySelector('.page-menu').style.left='-100vw'; // 스크린 왼쪽으로 튀어나감
    document.querySelector('.page-menu').style.opacity='0';
  }

  $(".menu-button").off('click').click(function() {
    openMenu();
  });
  $(".close-button").off('click').click(function() {
    closeMenu();
  });



  // Open Seen Movies
  // Fade in & 열림 버튼 사라짐 - 인터넷에서 긁어옴.
  // '이전 관람 내역' 버튼 누르면, 현제 섹션 우측에 fade-in.
  let elem = document.querySelector('.reservation-confirm-seen');
  let pagenation = document.querySelector('.reservation-confirm .col-md-4');
  let fadeInInterval;

  $('.seen-confirm-button').click(function(){
    clearInterval(fadeInInterval); //동작완료하면 멈추세용.

    // Fade-in Function
    elem.fadeIn = function(timing) {
      let newValue = 0;

      elem.style.display = 'block';
      elem.style.opacity = 0;

      fadeInInterval = setInterval(function(){
        if (newValue < 1) {
          newValue += 0.01;
        } else if (newValue === 1) {
          clearInterval(fadeInInterval);
        }

        elem.style.opacity = newValue;

      }, timing);
    }

    elem.fadeIn(10);
    // '이전 관람 내역'버튼 숨김
    $('.seen-confirm-button').css("display","none");
  });



  // More other Reviews
  // '더보기' 버튼 누르면, 현제 섹션 하단에 fade-in.
  let reviews=document.querySelectorAll('.user-review .col-md-4');

  function moreReviews(){
    for(i=3; i<reviews.length;i++ ){
      reviews[i].style.display = 'block';
    }
    document.querySelector('.more-button').style.display='none';
  }

  // Fade-in
  $('.more-button').off('click').click(function(){

    clearInterval(fadeInInterval); //동작완료하면 멈추세용.

    reviews.fadeIn = function(timing) {

      let newValue = 0;

      for (let i = 3; i < reviews.length; i++) {
        reviews[i].style.display='block';
        reviews[i].style.opacity='0';
      }

      fadeInInterval = setInterval(function(){
        if (newValue < 1) {
          newValue += 0.01;
        } else if (newValue === 1) {
          clearInterval(fadeInInterval);
        }

        for (let i = 3; i < reviews.length; i++) {
          reviews[i].style.opacity = newValue;
        }
      }, timing);
    }
    moreReviews();
    reviews.fadeIn(10);
  });



  // Change Profile Image - 인터넷에서 긁어옴.
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



  // Click Event - <option-items-movie>
  // 영화이름 누르면 '진하기 700', '글자색 #181818'로 변경.
  // + 선택한 영화이름 Booking Section에 출력됨.
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


  // 적용이 안되는 코드.
  // 1. 자바스크립트의 변수와 제이쿼리 메소드를 함께 사용할 때
  // movieName.click(function(){    //여기가 문제
  //   if(movieName.checked){
  //     nameLabel.style.fontWeight = "700";
  //   }
  // });

  // 2. if문 안의 '동작문'에서, 객체 자체를 호출(배열 안의 '구성원'를 가져와야 함).
  // $("input[name=movie-name]").click(function(){
  //   if(movieName[0].checked){
  //     nameLabel.style.fontWeight = "700";   //여기가 문제
  //   }
  // });

  // 3. if문 안의 '조건문'에서, 객체 자체를 호출(배열 안의 '구성원'를 가져와야 함).
  // $("input[name=movie-name]").click(function(){
  //   if(movieName.checked){      //여기가 문제
  //     nameLabel[0].style.fontWeight = "700";
  //   }
  // });

  // 4. 배열의 구성원에 클릭 메소드 이용할 때
  // $("input[name=movie-name]")[0].click(function(){      //여기가 문제
  //   if(movieName[0].checked){
  //     nameLabel[0].style.fontWeight = "700";
  //     nameLabel[0].style.color = "#181818";
  //   }
  // });



  // Booking
  // 인원수 제한(5명)
  // '누적' 인원 5명 이상 - alert 발생 & '인원'과 '금액' 초기화
  // '누적' 인원 5명 이하 - '최종결정금액' 계산
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
  }

  // 회계형 숫자표현 - stackoverflow에서 긁어옴.
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


  // option change 함수.
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
  });



  // Checked 수 한정 함수.
  // 1. 인원 수 지정한 만큼만 체크 가능.
  // 2. Input:checked.value는 Booking-desc에 출력
  // 3. 인원 수 만큼 체크되면, 모든 체크박스 선택 불가로 변경됨.
  const checkbox = document.querySelectorAll('input[name=seat]');
  const seatLabel = document.querySelectorAll('.booking .seat-table label');
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
    if(checkedCount>=numOfTotal){
      for(let i=0; i<checkbox.length; i++){
        checkbox[i].disabled = true;
        seatLabel[i].style.opacity = "0.5";
      }
    }

    // Input:checked.value는 Booking-desc에 출력.
    seatInHtml.innerHTML = checkedSeat.slice(checkedSeat.length - numOfTotal,checkedSeat.length);
  });



};
