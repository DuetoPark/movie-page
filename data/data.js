let state = {
  banner: [
    "록키호러픽쳐쇼2",
    "록키호러픽쳐쇼3",
    "록키호러픽쳐쇼4",
    "록키호러픽쳐쇼5",
    "록키호러픽쳐쇼6",
    "록키호러픽쳐쇼7",
  ],
  movieList: {
    rocky: {
      name: '록키호러픽쳐쇼',
      review: '눈과 귀가 즐거운 B급 호러영화',
      reviewUser: '58세, 넌나의록기록키록기',
      star: 4.2,
      genre: {
        "판타지": true,
        "공포": true,
        "코미디": true,
        "뮤지컬": true,
        "아동": false,
        "드라마": false,
        "어드벤처": false,
        "액션": false,
        "가족": false,
        sf: false,
      },
      actor: '팀커리, 수잔 서랜든, 베리보스트윅, 리처드오브라이언, 패트리샤 퀸, 넬 캠밸, 미트 로트 외',
      director: '짐 셔먼',
      image: '록키호러픽쳐쇼4',
      poster: '록키호러픽쳐쇼',
    },
    matilda: {
      name: '마틸다',
      review: '어른들을 향한 아이들의 발칙한 반란!',
      reviewUser: '22세, 영화20번보는사람',
      star: 4.5,
      genre: {
        "판타지": true,
        "공포": false,
        "코미디": true,
        "뮤지컬": false,
        "아동": true,
        "드라마": false,
        "어드벤처": false,
        "액션": false,
        "가족": false,
        sf: false,
      },
      actor: '마라 윌슨, 대니 드비토, 레아 펄먼, 엠베스 데이비츠, 펨페리스, 폴 루번스',
      director: '대니 드비토',
      image: '마틸다2',
      poster: '마틸다',
    },
    mean: {
      name: '퀸카로 살아남는 법',
      review: '내 인생의 첫 하이틴 영화',
      reviewUser: '19세, 로우틴',
      star: 4.3,
      genre: {
        "판타지": false,
        "공포": false,
        "코미디": true,
        "뮤지컬": false,
        "아동": false,
        "드라마": true,
        "어드벤처": false,
        "액션": false,
        "가족": false,
        sf: false,
      },
      actor: '린제이 로한, 레이첼 맥아담스, 리지 캐플런, 레이시 샤버트, 아만다 사이프리드, 조나단 베넷',
      director: '마크 워터스',
      image: '퀸카로살아남는법',
      poster: '퀸카로살아남는법',
    },
    harry: {
      name: '해리포터와 마법사의 돌',
      review: '진짜 있을지도 모르겠다는 생각이 들었다',
      reviewUser: '27세, 윙가르디움레이오우사',
      star: 4.7,
      genre: {
        "판타지": true,
        "공포": false,
        "코미디": false,
        "뮤지컬": false,
        "아동": false,
        "드라마": false,
        "어드벤처": true,
        "액션": true,
        "가족": true,
        sf: false,
      },
      actor: '다니엘 래드클리프, 엠마 왓슨, 루퍼트 그린트, 앨런 랙먼, 리처드 해리스, 로비 콜트레인',
      director: '크리스 콜럼버스',
      image: '해리포터와마법사의돌2',
      poster: '해리포터와마법사의돌',
    },
    marie: {
      name: '마리앙투아네트',
      review: '색감과 영상미가 아름다운 영화',
      reviewUser: '32세, 무비무비',
      star: 4.0,
      genre: {
        "판타지": false,
        "공포": false,
        "코미디": false,
        "뮤지컬": false,
        "아동": false,
        "드라마": true,
        "어드벤처": false,
        "액션": false,
        "가족": false,
        sf: false,
      },
      actor: '커스틴 던스트, 제이슨 슈왈츠먼, 주디 데이비스, 스티브 쿠건, 립 톤, 아시아 아르젠토, 로즈 번',
      director: '소피아 코폴라',
      image: '마리앙투아네트2',
      poster: '마리앙투아네트',
    },
    truman: {
      name: '트루먼 쇼',
      review: '믿고 보는 짐 캐리',
      reviewUser: '46세, 팔공산다람쥐',
      star: 4.5,
      genre: {
        "판타지": false,
        "공포": false,
        "코미디": true,
        "뮤지컬": false,
        "아동": false,
        "드라마": true,
        "어드벤처": false,
        "액션": false,
        "가족": false,
        sf: true,
      },
      actor: '짐캐리, 에드 해리스, 나타샤 맥켈혼, 노아 에머리히, 로라 리니',
      director: '피터 위어',
      image: '트루먼쇼',
      poster: '트루먼쇼',
    },
  },
  reservation: {
    time: {
      rocky: {
        name: "록키호러픽쳐쇼",
        timetable: [
          "20:45",
          "21:10",
          "21:35",
          "22:00",
          "22:25",
          "22:50",
        ]
      },
      matilda: {
        name: "마틸다",
        timetable: [
          "08:45",
          "09:10",
          "09:35",
          "10:00",
          "10:25",
          "10:50",
        ]
      },
      mean: {
        name: "퀸카로 살아남는 법",
        timetable: [
          "22:45",
          "23:10",
          "23:35",
          "24:00",
          "24:25",
          "24:50",
        ]
      },
      harry: {
        name: "해리포터와 마법사의 돌",
        timetable: [
          "18:45",
          "19:10",
          "19:35",
          "20:00",
          "20:25",
          "20:50",
        ]
      },
      marie: {
        name: "마리앙투아네트",
        timetable: [
          "16:45",
          "17:10",
          "17:35",
          "18:00",
          "18:25",
          "18:50",
        ]
      },
      truman: {
        name: "트루먼 쇼",
        timetable: [
          "10:45",
          "11:10",
          "11:35",
          "13:00",
          "13:25",
          "13:50",
        ]
      },
    },
    count: {
      adult: {
        text: '성인',
        price: 12000,
      },
      teen: {
        text: '청소년',
        price: 9000,
      },
      kid: {
        text: '어린이',
        price: 6000,
      },
      discount: {
        text: '우대',
        price: 6000,
      },
    },
  },
  booked: [
    {
      date: "20XX-08-31",
      movie: {
        name: "스타워즈",
        time: "17:20",
      },
      count: {
        total: 2,
        adult: 2,
        teen: 0,
        kid: 0,
        discount: 0,
      },
      seat: ["C6, C7"],
    },
    {
      date: "20XX-08-19",
      movie: {
        name: "화이트칙스",
        time: "20:45",
      },
      count: {
        total: 2,
        adult: 2,
        teen: 0,
        kid: 0,
        discount: 0,
      },
      seat: ["C6, C7"],
    },
    {
      date: "20XX-08-03",
      movie: {
        name: "2001: 스페이스 오디세이",
        time: "23:10",
      },
      count: {
        total: 1,
        adult: 1,
        teen: 0,
        kid: 0,
        discount: 0,
      },
      seat: ["D6"],
    },
    {
      date: "20XX-07-08",
      movie: {
        name: "미니언즈",
        time: "17:20",
      },
      count: {
        total: 2,
        adult: 1,
        teen: 1,
        kid: 0,
        discount: 0,
      },
      seat: ["E8, E9"],
    },
    {
      date: "20XX-06-13",
      movie: {
        name: "셜록: 유령신부",
        time: "21:50",
      },
      count: {
        total: 1,
        adult: 1,
        teen: 0,
        kid: 0,
        discount: 0,
      },
      seat: ["E8"],
    },
    {
      date: "20XX-05-29",
      movie: {
        name: "가장 보통의 연애",
        time: "20:20",
      },
      count: {
        total: 2,
        adult: 2,
        teen: 0,
        kid: 0,
        discount: 0,
      },
      seat: ["C6, C7"],
    },
    {
      date: "20XX-05-05",
      movie: {
        name: "센과 치히로의 움직이는 성",
        time: "17:10",
      },
      count: {
        total: 5,
        adult: 5,
        teen: 0,
        kid: 0,
        discount: 0,
      },
      seat: ["E6, E7, E8, E9, E10"],
    },
  ],
};
