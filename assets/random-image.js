// 배너 이미지 랜덤 출력(IE는 동작 안 함ㅠㅠㅠㅠ)
const banner = document.querySelector("#advertising-banner-image");
const imagePaths = state.banner.map(image => `../assets/images/${image}.gif`);
const index = Math.floor(Math.random() * imagePaths.length);

banner.src = imagePaths[index];
