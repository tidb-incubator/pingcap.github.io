const rankURL = 'https://internal.pingcap.net/bcp/api/rank/all'
const rankSeasonURL = 'https://internal.pingcap.net/bcp/api/rank'

const rankSeasonData = [
  {
    rank: 1,
    season: 1,
    type: 'team',
    name: 'Manuel Rigger',
    community: true,
    url:
      'https://github.com/tidb-challenge-program/bug-hunting-register/issues/8',
    score: 11700,
    'doing-task': '',
  },
  {
    rank: 2,
    season: 1,
    type: 'team',
    name: 'wwar',
    community: true,
    url:
      'https://github.com/tidb-challenge-program/bug-hunting-register/issues/14',
    score: 5950,
    'doing-task': '',
  },
  {
    rank: 3,
    season: 1,
    type: 'team',
    name: '章鱼烧',
    community: true,
    url:
      'https://github.com/tidb-challenge-program/bug-hunting-register/issues/19',
    score: 5850,
    'doing-task': '',
  },
  {
    rank: 4,
    season: 1,
    type: 'team',
    name: 'YKG',
    community: true,
    url:
      'https://github.com/tidb-challenge-program/bug-hunting-register/issues/24',
    score: 5500,
    'doing-task': '',
  },
  {
    rank: 5,
    season: 1,
    type: 'team',
    name: 'AndrewDi',
    community: true,
    url:
      'https://github.com/tidb-challenge-program/bug-hunting-register/issues/9',
    score: 4000,
    'doing-task': '',
  },
  {
    rank: 6,
    season: 1,
    type: 'team',
    name: 'cars',
    community: true,
    url:
      'https://github.com/tidb-challenge-program/bug-hunting-register/issues/15',
    score: 1700,
    'doing-task': '',
  },
  {
    rank: 7,
    season: 1,
    type: 'team',
    name: 'CHJ\u0026navy',
    community: false,
    url:
      'https://github.com/tidb-challenge-program/bug-hunting-register/issues/6',
    score: 500,
    'doing-task': '',
  },
  {
    rank: 8,
    season: 1,
    type: 'team',
    name: ' jinxianqi',
    community: true,
    url:
      'https://github.com/tidb-challenge-program/bug-hunting-register/issues/7',
    score: 500,
    'doing-task': '',
  },
  {
    rank: 9,
    season: 1,
    type: 'team',
    name: 'North of Community',
    community: false,
    url:
      'https://github.com/tidb-challenge-program/bug-hunting-register/issues/17',
    score: 500,
    'doing-task': '',
  },
  {
    rank: 10,
    season: 1,
    type: 'team',
    name: 'PingCAP',
    community: false,
    url:
      'https://github.com/tidb-challenge-program/bug-hunting-register/issues/22',
    score: 500,
    'doing-task': '',
  },
  {
    rank: 11,
    season: 1,
    type: 'team',
    name: 'xiaodong-ji',
    community: false,
    url:
      'https://github.com/tidb-challenge-program/bug-hunting-register/issues/10',
    score: 50,
    'doing-task': '',
  },
]

const rankData = []

const season = $('#ranking-switch .first')
const history = $('#ranking-switch .second')
const slider = $('#ranking-switch .slider')

let sliderTextSeason, sliderTextHistory

if (slider.data('lang') === 'cn') {
  sliderTextSeason = '赛季积分'
  sliderTextHistory = '历史积分'
} else {
  sliderTextSeason = 'Current'
  sliderTextHistory = 'Accumulative'
}

function renderData(data) {
  data
    .sort((a, b) => b.score - a.score)
    .forEach((d, i) =>
      $(
        '<div>' +
          (i < 3
            ? '<div class="medal medal' + (i + 1) + '"></div>'
            : '<div class="index">' + (i + 1) + '</div>') +
          '<div class="github"></div>\
          <div class="main">\
            <div class="info">\
              <div class="name">' +
          d.name +
          (!d.community ? ' <span class="ti"></span>' : '') +
          (d.type === 'team' ? ' <span class="team">Team</span>' : '') +
          '</div>\
              <div class="score">' +
          d.score +
          '</div>\
            </div>\
            <div class="progress-wrapper">\
              <progress class="progress" value="' +
          d.score +
          '" max="10000" />\
            </div>\
          </div>\
        </div>'
      ).appendTo('#ranking-list')
    )
}

function getRankData(isSeason) {
  // let url
  let data

  if (isSeason) {
    data = rankSeasonData
    // url = rankSeasonURL
    slider.text(sliderTextSeason)
    if (window.matchMedia('(max-width: 768px)').matches) {
      slider.css('left', '1rem')
    } else {
      slider.css('left', 'calc(30% + 1rem)')
    }
  } else {
    // url = rankURL
    data = rankData
    slider.text(sliderTextHistory)
    slider.css('left', 'calc(50% - 1rem)')
  }

  // $.getJSON(url, data => {
  //   $('#ranking-list').empty()

  //   renderData(data)
  // })
  $('#ranking-list').empty()

  renderData(data)
}

season.on('click', () => getRankData(true))

history.on('click', () => getRankData())

$(document).ready(() => {
  getRankData(true)

  const slidesPerView = !window.matchMedia('(max-width: 768px)').matches ? 3 : 1
  new Swiper('.swiper-container', {
    autoplay: {
      delay: 6000,
    },
    loop: true,
    slidesPerView,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })
})
