// 전역변수
const searchButton = document.querySelector('.search');


// 예매확인 - 조회하기 버튼 활성화
const searchInput = document.querySelector('#order-number');

function toggleSearchButton() {
  const isFilled = searchInput.value ? true : false;
  const isInactived = searchButton.classList.contains('inactive') ? true : false;
  if (isFilled && isInactived) {
    searchButton.classList.remove('inactive');
  }

  if (!isFilled && !isInactived) {
    searchButton.classList.add('inactive');
  }
}

searchInput.addEventListener('keyup', toggleSearchButton);




// 예매확인 - 예약번호 조회
const input = document.querySelector('#order-number');
const history = document.querySelector('#history');

function displayOrderDetails(data) {
  if (data.name) {
    const section = document.querySelector('#history-name .mypage-desc');
    const koreanName = state.reservation.time[data.name].name;
    const time = data.time[0];
    const nameHTML = "<strong>" + koreanName + "</strong>";
    const timeHTML = "<strong>(" + time + ")</strong>";
    section.innerHTML = nameHTML + timeHTML;
  }
  if (Array.isArray(data)) {
    const section = document.querySelector('#history-seat .mypage-desc');
    sortNumber = data.sort(function(a, b) {
      const lastNumber = a.split("-")[1];
      const nextNumber = b.split("-")[1];
      return lastNumber - nextNumber < 0 ? -1 : 1;
    });

    sortText = sortNumber.sort(function(a,b) {
      const lastText = a.split("-")[0];
      const nextText = b.split("-")[0];
      return lastText < nextText ? -1 : 1;
    });

    let arrayOfseatsHTML = sortText.map(function(seat) {
      return '<span>' + seat.split("-").join("") + '</span>';
    });

    section.innerHTML = "<strong>" + arrayOfseatsHTML + "</strong>";
  }
  if (data.total) {
    const sectionOfTotal = document.querySelector('#history-count .mypage-desc');
    const sectionOfDetails = document.querySelector('#history-count .details');

    let detailsHTML = "";
    for (key in data) {
      if (data[key] && key != "total") {
        const value = data[key];
        const text = state.reservation.count[key].text;
        const textHTML = "<span>" + text + " " + value + "명</span>";
        detailsHTML += textHTML;
      }
    }

    sectionOfTotal.innerHTML = "<strong>총 " + data.total + "명</strong>";
    sectionOfDetails.innerHTML = detailsHTML;
  }
}

function searchReservation() {
  const userOrderData = JSON.parse(localStorage.getItem('userOrderData'));
  const orderNumber = input.value;

  userOrderData.forEach(function(data) {
    if (data.order === orderNumber) {
      displayOrderDetails(data.movie);
      displayOrderDetails(data.seat);
      displayOrderDetails(data.count);
      sessionStorage.setItem('searchedOrderData', JSON.stringify(data));
    }
  });
}

function showHistory() {
  history.classList.remove('hidden');
}

searchButton.addEventListener('click', searchReservation);
searchButton.addEventListener('click', showHistory);
