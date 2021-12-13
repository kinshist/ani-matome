# アニマトメ

## 概要
CSSアニメのまとめサイト（仮

## 起動
1. `npm install`
2. `npm run start`

## 環境
### 言語
- pug → html
- scss → css
- es6 → es5

### ファイル構成
開発はsrcディレクトリでおこない、コンパイル後ファイルはhtdocsディレクトリに出力されます。
```
root/
  ├── src/
  ├── htdocs/
  ├── .gitignore
  ├── gulpfile.js
  ├── package.json
  └── README.md
```

## リンク追加の手順
* index.jsonにデータを追記するだけ

## サンプル追加の手順
1. `index.json`に必要データを記載
2. `pug/`にjsonのname_enと同名のディレクトリ追加
3. `pug/sample/index.pug`をコピペして当該ディレクトリ配下に設置。適宜編集
4. 個別scssファイルは`src/sass/pages/`配下にjsonのname_enと同名.scssで作成
5. `index.json`に`"gif": true`を設定すると、一覧ページにはname_enと同名.gifが読み込まれる。完成した動きをgif録画し、`src/images/gif/`配下に配置する。（gif録画にはLICEcap`https://www.cockos.com/licecap/`を用いている



## Task
### バグ編
* [!!!] Gulpのファイル変更からのビルドが終わらない問題。
* [!] 星空のアニメーションがビルドするたびに差分が出てしまう問題

#### 構成編
* 共通cssファイルが細分化しすぎてる問題。common.scssとか1つにまとめたい。
* afで作ったものをyoutubeにあげるので、それを自動取得できるようにする。
* cssを1ファイルにまとめる
* cssのソースが見れるように。コピペ機能も必須。
* デザインの調整
* ボタン系まとめを切り分ける
* そもそも静的に作りたくない→headlessCMS化（firebaseだと更新不便
* リスト機能をサンプルに対して作るテーブルとして、そこから参考サイト、コピペができるようにする
* 各ページのogpに画像が自動吐き出ししたい。
* 更新をmicroCMS上でできるようにする。
  
#### コンテンツ編
* aftereffectでcssアニメの再現
  * 簡単なものから再現（ex.ピコピコ
* コンテンツが順にふわふわと順番で出てくるアニメ
* svgアニメを充実させたい
  * [UI改善にキラリと役立つ！ SVGアニメーションの作り方まとめ - ICS MEDIA](https://ics.media/entry/15970/)
  * [コピペで使える！ CSS Animationだけで実現するキャラクターアニメーション - ICS MEDIA](https://ics.media/entry/11336/)
  * [コピペで使える！ CSS Animationだけで実現するキャラクターアニメーション - ICS MEDIA](https://ics.media/entry/11336/)
  * https://techblog.raccoon.ne.jp/archives/1569826832.html
