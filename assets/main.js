// 배너 중복 처리
let star;
let genre;
const prototypeInfo = {
  selectImage: function(data, item) {
    const path = '../assets/images/' + data.image + '.gif';
    item.querySelector('.image').setAttribute('src', path);

  },
  selectStar: function(data, item) {
    const fillStar = Math.floor(data.star);
    const emptyStar = Math.ceil(data.star - Math.floor(data.star));
    star = '★'.repeat(fillStar) + '☆'.repeat(emptyStar) + '(';

    item.querySelector('.icon').textContent = star;
  },
  selectGenre: function(data, item) {
    const keys = Object.keys(data.genre);
    genre = keys
      .map(function(key) {return this.genre[key] ? key+',' : '';}, data)
      .filter(function(item) {return item != ''})
      .join('')
      .slice(0, -1);

    item.querySelector('.genre > dd').textContent = genre;
  },
  clone: function(data) {
    const item = this.origin.cloneNode(true);
    item.setAttribute('data-origin', false);
    item.querySelector('.name').textContent = data.name;
    this.selectImage(data, item);

    item.querySelector('.review > p').textContent = data.review;
    item.querySelector('.review > cite').textContent = data.reviewUser;
    item.querySelector('.desc-title').textContent = data.name;
    this.selectStar(data, item);
    item.querySelector('.rating').setAttribute('aria-label', data.star + '점');
    item.querySelector('.rating').textContent =  data.star;
    this.selectGenre(data, item);
    item.querySelector('.actor > dd').textContent = data.actor;
    item.querySelector('.director > dd').textContent = data.director;
    this.container.appendChild(item);
  },

};

function infoFactory(section) {
  let info = Object.create(prototypeInfo);
  info.elem = document.querySelector(section);
  info.container = info.elem.querySelector('ol');
  info.origin = info.elem.querySelector('li:first-child');

  return info; // 이걸로 30분 삽질
}

function populateInfo() {
  const keys = Object.keys(state.movieList).slice(1);

  keys.forEach(function(key) {
    bannerInfo.clone(state.movieList[key]);
  });
}

const bannerInfo = infoFactory('#banner');
// const bannerInfo = infoFactory('#banner');

populateInfo();
