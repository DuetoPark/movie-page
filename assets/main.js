// 배너 중복 처리
let star;
let genre;
const prototypeInfo = {
  displayName: function(data, item) {
    if (item.dataset.list) return; // playingInfo
    item.querySelector('.name').textContent = data.name;
  },
  selectImage: function(data, item) {
    let path;
    if (item.dataset.list) { // playingInfo
      path = '../assets/images/' + data.poster + '.jpg';
    } else { // bannerInfo
      path = '../assets/images/' + data.image + '.gif';
    }

    item.querySelector('.image').setAttribute('src', path);
    item.querySelector('.image').setAttribute('alt', data.name);
  },
  selectStar: function(data, item) {
    let star = [];
    const fillStar = Math.floor(data.star);
    const emptyStar = Math.ceil(data.star - Math.floor(data.star));
    // star = '★'.repeat(fillStar) + '☆'.repeat(emptyStar) + '(';

    for (let i=0; i<fillStar; i+=1) {
      star = star.concat('★');
    }
    for (let i=0; i<emptyStar; i+=1) {
      star = star.concat('☆');
    }

    const display = star.join("") + "(";
    item.querySelector('.icon').textContent = display;
  },
  selectGenre: function(data, item) {
    const keys = Object.keys(data.genre);
    genre = keys
      .map(function(key) {return this.genre[key] ? key : '';}, data)
      .filter(function(item) {return item != ''})
      .join(', ');

    item.querySelector('.genre > dd').textContent = genre;
  },
  clone: function(data) {
    const item = this.origin.cloneNode(true);
    item.setAttribute('data-origin', false);
    item.querySelector('.review > p').textContent = data.review;
    item.querySelector('.review > cite').textContent = data.reviewUser;
    item.querySelector('.desc-title').textContent = data.name;
    item.querySelector('.rating').setAttribute('aria-label', data.star + '점');
    item.querySelector('.rating').textContent =  data.star;
    item.querySelector('.actor > dd').textContent = data.actor;
    item.querySelector('.director > dd').textContent = data.director;

    this.displayName(data, item);
    this.selectImage(data, item);
    this.selectStar(data, item);
    this.selectGenre(data, item);
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

function populateInfo(subject) {
  const keys = Object.keys(state.movieList).slice(1);

  keys.forEach(function(key) {
    subject.clone(state.movieList[key]);
  });
}

const bannerInfo = infoFactory('#banner');
const playingInfo = infoFactory('#playing');

populateInfo(bannerInfo);
populateInfo(playingInfo);
