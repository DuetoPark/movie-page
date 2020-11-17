window.onload = function() {


  // Main - Modal Open
  function onClick(){
    document.querySelector('.modal-wrap').style.display='block';
  }
  // Main - Modal Close
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


  // My page - Open Login
  function openMenu(){
    document.querySelector('.hiddenItems').style.display='block';
  }
  // My page - Close Login
  function closeMenu(){
    document.querySelector('.hiddenItems').style.display='none';
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
};
