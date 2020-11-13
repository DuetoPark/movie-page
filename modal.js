window.onload = function() {

  function onClick(){
    document.querySelector('.modal-wrap').style.display='block';
    document.querySelector('.black-bg').style.display='block';
  }

  function closeModal(){
    document.querySelector('.modal-wrap').style.display='none';
    document.querySelector('.black-bg').style.display='none';
  }

  document.querySelector('.modal-close').addEventListener('click', closeModal);
  // document.querySelector('.login-modal-button').addEventListener('click', onClick);
  $(".login-modal-button").click(function() {
    onClick();
  });
  // document.querySelector('.signin-modal-button').addEventListener('click', onClick);
  $(".signin-modal-button").off('click').click(function() {
    onClick();
  });


};
