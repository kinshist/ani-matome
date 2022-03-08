// microCMS接続処理
let cmsDataArray

const fetchCMS = () => {
  fetch(
    "https://rqfoifxr3x.microcms.io/api/v1/ani-links",
    {
      headers: {
        "X-MICROCMS-API-KEY": "309375b1533b47f4b56d85202171276bf164"
      }
    })
  .then(res => res.json())
  .then(json => {
    console.log(json)
    cmsDataArray = json.contents
    makeLinksTable()
  })
}
fetchCMS()

const makeLinksTable = () => {
  const tableDom = document.getElementById("js-links-table")
  if (!tableDom) return
  let html = ''
  cmsDataArray.forEach(item => {
    html += `<tr>
    <th><a href="${item.link}">${item.title}</a></th>`
    if (item.sample) {
      html += `<td><a href="${item.sample}">あり</a></td>`
    } else {
      html += '<td>-</td>'
    }
    html += `</tr>`
  })
  tableDom.innerHTML = html
}


//共通要素 - releaseNote
// 最初にjsonを読みにいく。
const json = require('./releaseNote.json')
// 未読フラグ機能
// 未読フラグデータが入ってくる用の配列
let releaseNoteFlags
// まず未読フラグがストレージにないかチェック
const checkLocalStorage = () => {
  const readFlag = localStorage.getItem('readFlag')
  if (!readFlag) {
    // なし(初回)なら全部未読の配列を作成
    let flags = [], i = 0
    while (i < json.releaseNote.length) {
      flags.push(false)
      i++
    }
    // ストレージにセット
    localStorage.setItem('readFlag', JSON.stringify(flags))
  } else {
    // ありならそのデータをパースして変数に格納。
    // 一時変数
    const tmpFlags = JSON.parse(readFlag)
    // もしこのフラグがjsonデータと一致しない場合…（つまりチャット数が増えていた場合
    if (tmpFlags.length < json.releaseNote.length) {
      // その差分だけ配列頭にfalseを足す
      for (let i=0; i < json.releaseNote.length - tmpFlags.length; i++) {
        tmpFlags.unshift(false)
      }
      // console.log(tmpFlags)
    }
    // 最終的な変数に突っ込む
    releaseNoteFlags = tmpFlags
  }
}
// 未読フラグを画面下バルーンに反映
const ballonIsRead = () => {
  const ballonDom =  document.getElementById('js-note-ballon')
  if (releaseNoteFlags.indexOf(false) !== -1) {
    ballonDom.classList.add('unRead')
  } else {
    ballonDom.classList.remove('unRead')
  }
}

checkLocalStorage()
// ballonIsRead()


// チャット画面のtoggle
const wrapDom = document.getElementById('js-note-wrap')
const toggleNoteDom = document.getElementById('js-note-toggle')
const closeNoteDoms = document.getElementsByClassName('js-note-close')
// toggle
toggleNoteDom.addEventListener('click', ()=> {
  wrapDom.classList.toggle('-js-active')
})
// off
for (let i=0; i<closeNoteDoms.length; i++) {
  closeNoteDoms[i].addEventListener('click', function(){
    wrapDom.classList.remove('-js-active')
  })
}

// チャット一覧の内容描画
const listContentDom = document.getElementById('js-note-listContent') || null

const removeBr = (str: string) => {
  if (str.indexOf('<br>') == -1) {
    return str
  }
  const replaced = str.replace('<br>', '')
  return replaced
}
const trimString = (str: string, max_length: number) => {
  if (str.length <= max_length) {
    return str
  }
  let trimedStr = str.substr(0, max_length) + '…'
  return trimedStr
}
function makeListHTML() {
  const list = json.releaseNote
  let html = '<ul>'
  for(let i=0; i<list.length; i++) {
    html += `<li class="js-note-item">
    <div class="icon">
    <img src="/assets/img/${list[i].chats[0].who}.jpg" alt="" />
    </div>
    <div class="text">
    <div class="head">${list[i].date}</div>
    <p>${trimString(removeBr(list[i].chats[0].says), 13)}</p>
    </div>
    <div class="count js-count ${releaseNoteFlags[i] ? '' : 'unRead'}">${list[i].chats.length}</div>
    </li>`
  }
  html += '</ul>'
  listContentDom.innerHTML = html
}
makeListHTML()


// チャット一覧-詳細の移動
const listDom = document.getElementById('js-note-list') || null
const pageDom = document.getElementById('js-note-page') || null
const backDom = document.getElementById('js-note-back') || null
const listItemsDom = document.getElementsByClassName('js-note-item')
for(let i = 0; i < listItemsDom.length; i++) {
  listItemsDom[i].addEventListener('click', function(){
    listDom.classList.add('slideOut')
    pageDom.classList.add('slideIn')
    // ここでスクロールリセット
    pageDom.scrollTo(0, 0)
    makeBallons(i)

    // ここでフラグを切り替える
    if (!releaseNoteFlags[i]) {
      releaseNoteFlags[i] = true
      // フラグの切り替えを生成済みのhtmlに反映する
      // バルーン
      // ballonIsRead()
      // リスト
      const countDoms = document.getElementsByClassName('js-count')
      for (let i=0; i<countDoms.length; i++) {
        if (releaseNoteFlags[i]) {
          countDoms[i].classList.remove('unRead')
        }
      }
      // localStrageにも反映しとく
      localStorage.setItem('readFlag', JSON.stringify(releaseNoteFlags))
    }
  })
}

backDom.addEventListener('click', function(){
  listDom.classList.remove('slideOut')
  pageDom.classList.remove('slideIn')
})

const makeBallons = (listNum:any) => {
  const uma = {
    "oguri": "オグリキャップ",
    "tama": "タマモクロス",
    "chiyo": "サクラチヨノオー"
  }
  const numberOfUma = json.releaseNote[listNum].person
  document.getElementById("js-note-number").innerHTML = numberOfUma

  const notes = json.releaseNote[listNum].chats

  let html = ''
  notes.forEach((note:any) => {
    html += `<li>
    <div class="icon">
    <img src="/assets/img/${note.who}.jpg", alt="${uma[note.who]}">
    </div>
    <div class="left">
    <div class="name">${uma[note.who]}</div>`
    if (note.says) {
      html += `<div class="says">${note.says}</div>`
    } else {
      html += `<div class="saysImage"><img src="/assets/img/${note.image}", alt=""></div>`
    }
    html += `</div></li>`
  });
  document.getElementById("js-note-chat").innerHTML = html
}


//pages
$('#js-reload').on('click', function () {
  location.reload()
})
