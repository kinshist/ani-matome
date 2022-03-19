/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/assets/js/script.ts":
/*!************************************!*\
  !*** ./src/js/assets/js/script.ts ***!
  \************************************/
/***/ (function() {

eval("\n// 未読フラグデータが入ってくる用の配列\nlet releaseNoteFlags;\n// まず未読フラグがストレージにないかチェック\nconst checkLocalStorage = (data) => {\n    const readFlag = localStorage.getItem('readFlag');\n    if (!readFlag) {\n        // なし(初回)なら全部未読の配列を作成\n        let flags = [], i = 0;\n        while (i < data.length) {\n            flags.push(false);\n            i++;\n        }\n        // ストレージにセット\n        localStorage.setItem('readFlag', JSON.stringify(flags));\n    }\n    else {\n        // ありならそのデータをパースして変数に格納。\n        // 一時変数\n        const tmpFlags = JSON.parse(readFlag);\n        // もしこのフラグがjsonデータと一致しない場合…（つまりチャット数が増えていた場合\n        if (tmpFlags.length < data.length) {\n            // その差分だけ配列頭にfalseを足す\n            for (let i = 0; i < data.length - tmpFlags.length; i++) {\n                tmpFlags.unshift(false);\n            }\n            // console.log(tmpFlags)\n        }\n        // 最終的な変数に突っ込む\n        releaseNoteFlags = tmpFlags;\n    }\n};\nconst toggleChat = () => {\n    const wrapDom = document.getElementById('js-note-wrap');\n    const toggleNoteDom = document.getElementById('js-note-toggle');\n    if (!toggleNoteDom || !wrapDom) {\n        return;\n    }\n    toggleNoteDom.addEventListener('click', () => {\n        wrapDom.classList.toggle('-js-active');\n    });\n};\nconst removeBr = (str) => {\n    if (str.indexOf('\\n') == -1) {\n        return str;\n    }\n    const replaced = str.replace('\\n', '');\n    return replaced;\n};\nconst trimString = (str, max_length) => {\n    if (str.length <= max_length) {\n        return str;\n    }\n    let trimedStr = str.substring(0, max_length) + '…';\n    return trimedStr;\n};\nconst formatDate = (date) => {\n    const dt = new Date(date);\n    const year = dt.getFullYear();\n    const month = dt.getMonth() + 1;\n    const day = dt.getDate();\n    return `${year}-${month}-${day}`;\n};\nconst insertBr = (str) => {\n    return str.replace('\\n', '<br>');\n};\nconst makeListHTML = (data) => {\n    const listContentDom = document.getElementById('js-note-listContent');\n    if (!listContentDom)\n        return;\n    const list = data;\n    let html = '<ul>';\n    for (let i = 0; i < list.length; i++) {\n        html += `<li class=\"js-note-item\">\n    <div class=\"icon\">\n    <img src=\"${list[i].chats[0].who.icon.url}\" alt=\"\" />\n    </div>\n    <div class=\"text\">\n    <div class=\"head\">${formatDate(list[i].date)}</div>\n    <p>${trimString(removeBr(list[i].chats[0].says), 13)}</p>\n    </div>\n    <div class=\"count js-count ${releaseNoteFlags[i] ? '' : 'unRead'}\">${list[i].chats.length}</div>\n    </li>`;\n    }\n    html += '</ul>';\n    listContentDom.innerHTML = html;\n};\nconst makeBallons = (listNum, data) => {\n    const numberOfUma = data[listNum].person;\n    document.getElementById(\"js-note-number\").innerHTML = numberOfUma;\n    const notes = data[listNum].chats;\n    let html = '';\n    notes.forEach((note) => {\n        html += `<li>\n    <div class=\"icon\">\n      <img src=\"${note.who.icon.url}\", alt=\"${note.who.nameJp}\">\n    </div>\n    <div class=\"left\">\n      <div class=\"name\">${note.who.nameJp}</div>\n      <div class=\"says\">${insertBr(note.says)}</div>\n    </div>\n    </li>`;\n        if (note.image) {\n            html += `<li>\n      <div class=\"icon\">\n      <img src=\"${note.who.icon.url}\", alt=\"${note.who.nameJp}\">\n      </div>\n      <div class=\"left\">\n        <div class=\"name\">${note.who.nameJp}</div>\n        <a href=\"${note.image.url}\" class=\"saysImage\">\n          <img src=\"${note.image.url}\", alt=\"\">\n        </a>\n      </div>\n      </li>`;\n        }\n    });\n    document.getElementById(\"js-note-chat\").innerHTML = html;\n};\nconst moveListToDetail = (data) => {\n    const listDom = document.getElementById('js-note-list');\n    const pageDom = document.getElementById('js-note-page');\n    const backDom = document.getElementById('js-note-back');\n    const listItemsDom = document.getElementsByClassName('js-note-item');\n    if (!listDom || !pageDom || !backDom) {\n        return false;\n    }\n    // 一覧アイテムを押したとき詳細へ\n    for (let i = 0; i < listItemsDom.length; i++) {\n        listItemsDom[i].addEventListener('click', function () {\n            listDom.classList.add('slideOut');\n            pageDom.classList.add('slideIn');\n            // ここでスクロールリセット\n            pageDom.scrollTo(0, 0);\n            makeBallons(i, data);\n            // ここでフラグを切り替える\n            if (!releaseNoteFlags[i]) {\n                releaseNoteFlags[i] = true;\n                // フラグの切り替えを生成済みのhtmlに反映する\n                // バルーン\n                // ballonIsRead()\n                // リスト\n                const countDoms = document.getElementsByClassName('js-count');\n                for (let i = 0; i < countDoms.length; i++) {\n                    if (releaseNoteFlags[i]) {\n                        countDoms[i].classList.remove('unRead');\n                    }\n                }\n                // localStrageにも反映しとく\n                localStorage.setItem('readFlag', JSON.stringify(releaseNoteFlags));\n            }\n        });\n    }\n    // 詳細から一覧へ\n    backDom.addEventListener('click', function () {\n        listDom.classList.remove('slideOut');\n        pageDom.classList.remove('slideIn');\n    });\n};\nasync function init() {\n    const res = await fetch(\"https://uma-chat.microcms.io/api/v1/chat\", {\n        headers: {\n            \"X-MICROCMS-API-KEY\": \"eb94b33042b64da7badbbba4642b22db81a3\"\n        }\n    });\n    const json = await res.json();\n    const cmsData = await json.contents;\n    console.log(cmsData);\n    checkLocalStorage(cmsData);\n    // チャット画面のtoggle\n    toggleChat();\n    // チャット一覧の内容描画\n    makeListHTML(cmsData);\n    // チャット一覧-詳細の移動\n    moveListToDetail(cmsData);\n}\ninit();\n//pages\n$('#js-reload').on('click', function () {\n    location.reload();\n});\n\n\n//# sourceURL=webpack://animatome/./src/js/assets/js/script.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/assets/js/script.ts"]();
/******/ 	
/******/ })()
;