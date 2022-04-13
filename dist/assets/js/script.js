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

eval("\n// ローカルストレージのreadIdsを取得する関数\n// readIdsは読んだチャットのidが配列に入るもの、これによりチャットの順序などが移動しても正確に「そのチャット」を特定できる\n// 既読が存在しない場合は空配列が返るように\nconst getReadIds = () => {\n    const readIds = localStorage.getItem('readIds');\n    return readIds ? JSON.parse(readIds) : [];\n};\nconst toggleChat = () => {\n    const wrapDom = document.getElementById('js-note-wrap');\n    const toggleNoteDom = document.getElementById('js-note-toggle');\n    if (!toggleNoteDom || !wrapDom) {\n        return;\n    }\n    toggleNoteDom.addEventListener('click', () => {\n        wrapDom.classList.toggle('-js-active');\n    });\n};\nconst removeBr = (str) => {\n    if (str.indexOf('\\n') == -1) {\n        return str;\n    }\n    return str.replace('\\n', '');\n};\nconst trimString = (str, max_length) => {\n    if (str.length <= max_length) {\n        return str;\n    }\n    return str.substring(0, max_length) + '…';\n};\nconst formatDate = (date) => {\n    const dt = new Date(date);\n    const year = dt.getFullYear();\n    const month = dt.getMonth() + 1;\n    const day = dt.getDate();\n    return `${year}-${month}-${day}`;\n};\nconst insertBr = (str) => {\n    return str.replace('\\n', '<br>');\n};\nconst makeListHTML = (data) => {\n    const readIds = getReadIds();\n    const listContentDom = document.getElementById('js-note-listContent');\n    if (!listContentDom)\n        return;\n    const list = data;\n    let html = '<ul>';\n    for (let i = 0; i < list.length; i++) {\n        html += `<li class=\"js-note-item\">\n    <div class=\"icon\">\n    <img src=\"${list[i].chats[0].who.icon.url}\" alt=\"\" />\n    </div>\n    <div class=\"text\">\n    <div class=\"head\">${formatDate(list[i].date)}</div>\n    <p>${trimString(removeBr(list[i].chats[0].says), 13)}</p>\n    </div>\n    <div class=\"count js-count ${readIds.includes(list[i].id) ? '' : 'unRead'}\">${list[i].chats.length}</div>\n    </li>`;\n    }\n    html += '</ul>';\n    listContentDom.innerHTML = html;\n};\nconst makeBallons = (data) => {\n    const numberOfUma = data.person;\n    const place = data.place;\n    const hedaDom = document.getElementById('js-note-head');\n    const chatDom = document.getElementById('js-note-chat');\n    if (!hedaDom || !chatDom)\n        return;\n    hedaDom.innerHTML = `${place} (${numberOfUma})`;\n    const notes = data.chats;\n    let html = '';\n    notes.forEach((note) => {\n        html += `<li>\n    <div class=\"icon\">\n      <img src=\"${note.who.icon.url}\", alt=\"${note.who.nameJp}\">\n    </div>\n    <div class=\"left\">\n      <div class=\"name\">${note.who.nameJp}</div>\n      <div class=\"says\">${insertBr(note.says)}</div>\n    </div>\n    </li>`;\n        if (note.image) {\n            html += `<li>\n      <div class=\"icon\">\n      <img src=\"${note.who.icon.url}\", alt=\"${note.who.nameJp}\">\n      </div>\n      <div class=\"left\">\n        <div class=\"name\">${note.who.nameJp}</div>\n        <a href=\"${note.image.url}\" target=\"_blank\" class=\"saysImage\">\n          <img src=\"${note.image.url}\", alt=\"\">\n        </a>\n      </div>\n      </li>`;\n        }\n        if (note.link) {\n            html += `<li>\n      <div class=\"icon\">\n      <img src=\"${note.who.icon.url}\", alt=\"${note.who.nameJp}\">\n      </div>\n      <div class=\"left\">\n        <div class=\"name\">${note.who.nameJp}</div>\n        <a href=\"${note.link}\" target=\"_blank\" class=\"says -link\">${note.link}</a>\n      </div>\n      </li>`;\n        }\n    });\n    chatDom.innerHTML = html;\n};\nconst setListToDetail = (data) => {\n    const listDom = document.getElementById('js-note-list');\n    const pageDom = document.getElementById('js-note-page');\n    const backDom = document.getElementById('js-note-back');\n    const listItemsDom = document.getElementsByClassName('js-note-item');\n    if (!listDom || !pageDom || !backDom) {\n        return;\n    }\n    // 一覧アイテムを押したとき詳細へ\n    for (let i = 0; i < listItemsDom.length; i++) {\n        listItemsDom[i].addEventListener('click', () => {\n            const readIds = getReadIds();\n            listDom.classList.add('slideOut');\n            pageDom.classList.add('slideIn');\n            // ここでスクロールリセット\n            pageDom.scrollTo(0, 0);\n            makeBallons(data[i]);\n            // ここでフラグを切り替える\n            if (!readIds.includes(data[i].id)) {\n                readIds.push(data[i].id);\n                const countDoms = document.getElementsByClassName('js-count');\n                countDoms[i].classList.remove('unRead');\n                // localStrageに既読を反映\n                localStorage.setItem('readIds', JSON.stringify(readIds));\n            }\n        });\n    }\n    // 詳細から一覧へ\n    backDom.addEventListener('click', function () {\n        listDom.classList.remove('slideOut');\n        pageDom.classList.remove('slideIn');\n    });\n};\nconst init = async () => {\n    try {\n        const cmsData = await fetch('https://uma-chat.microcms.io/api/v1/chat', {\n            headers: {\n                'X-MICROCMS-API-KEY': 'eb94b33042b64da7badbbba4642b22db81a3',\n            },\n        })\n            .then((response) => {\n            if (!response.ok) {\n                throw new Error('Network response was not OK');\n            }\n            return response.json();\n        })\n            .then((data) => data.contents)\n            .catch((error) => {\n            throw new Error(error);\n        });\n        // console.log(cmsData)\n        // チャット画面のtoggle\n        toggleChat();\n        // チャット一覧の内容描画\n        makeListHTML(cmsData);\n        // チャット一覧-詳細の移動\n        setListToDetail(cmsData);\n    }\n    catch (error) {\n        console.error(error);\n    }\n};\ninit();\n//pages\nconst reloadFunc = () => {\n    const reloadBtn = document.getElementById('js-reload');\n    if (!reloadBtn)\n        return;\n    reloadBtn.addEventListener('click', () => {\n        location.reload();\n    });\n};\nreloadFunc();\n\n\n//# sourceURL=webpack://animatome/./src/js/assets/js/script.ts?");

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