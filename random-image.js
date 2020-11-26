// Main page - Random Image  -> stackoverflow에서 긁어옴.
// 페이지 로드시, Advertising Section에 이미지가 무작위로 출력.
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
