window.onload = function() {


  // Main - Open Login Modal
  function onClick(){
    document.querySelector('.modal-wrap').style.display='block';
  }
  // Main - Close Login Modal
  function closeModal(){
    document.querySelector('.modal-wrap').style.display='none';
  }

  $(".modal-close").click(function() {
    closeModal();
    document.querySelector('.total').style.filter='none';
  });
  $(".login-modal-button").click(function() {
    onClick();
    document.querySelector('.total').style.filter='blur(5px)';
  });
  $(".signin-modal-button").off('click').click(function() {
    onClick();
    document.querySelector('.total').style.filter='blur(5px)';
  });



  // Main - Event Login-button
  $(".login-button").click(function() {
    let userId = document.getElementById("userId").value;

    location.href="01-main-after-login.html?userId="+userId;
  });






  // My page - Open Menu
  function openMenu(){
    document.querySelector('.page-menu').style.left='0';
    document.querySelector('.page-menu').style.opacity='1';
  }
  // My page - Close Menu
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



  // My page - Open Seen Movies
  let elem = document.querySelector('.reservation-confirm-seen');
  let pagenation = document.querySelector('.reservation-confirm .col-md-4');
  let fadeInInterval;

  $('.seen-confirm-button').click(function(){

    clearInterval(fadeInInterval); //동작완료하면 멈추세용.

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
    $('.seen-confirm-button').css("display","none");
  });



  // My page - Bring More Reviews
  // Display Reviews
  let reviews=document.querySelectorAll('.user-review .col-md-4');

  function moreReviews(){
    for(i=3; i<reviews.length;i++ ){
      reviews[i].style.display = 'block';
    }
    document.querySelector('.more-button').style.display='none';
  }

  // Fade-in Reviews
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




  // Change Profile Image
    // let imageBefore = document.querySelector('.profile-image');
    // let imageAfter = document.getElementById('files');
    //
    // $('#files').on('change', function(){
    //
    //   imageBefore.src = imageAfter.value;
    //
    // });
    var readURL = function(input) {
        if (input.files && input.files[0]) {
          // 업로드 된 파일을 읽는다.
            var reader = new FileReader();

            // 업로드 된 파일의 읽기 동작이 성공적으로 완료될 때마다 동작한다.
            reader.onload = function (e) {
              //클래스가 .profile-image 요소에 읽은 파일의 경로를 세팅한다.
                $('.profile-image').attr('src', e.target.result);
            }
            // FileList에서 경로를 가져온다.
            reader.readAsDataURL(input.files[0]);
        }
    }

    // id가 files인 요소가 변화할 때 함수 실행.
    $("#files").on('change', function(){
        readURL(this);
    });





  // Scroll Animation
    $(document).on('click', 'a[href^="#"]', function (event) {
      event.preventDefault();

      $('html, body').animate({
          scrollTop: $($.attr(this, 'href')).offset().top
      }, 500);

      document.querySelector('.page-menu').style.left='-100vw';
    });





};
