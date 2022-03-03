# アニマトメ ani-matome

CSSアニメーションを始めとした、Web上のアニメーション表現をまとめているサイトです。

## gulp タスク

- pug → HTML
- Sass（scss）→ CSS
  - Stylelint
- TypeScript → Javascript
  - ESLint
  - Webpack bundle
- Local Server
  - Hot Reload
  - Server Side Include（SSI）
- Image Optimize

## 動作確認済み環境

- macOS Monterey 12.2
- node v16.13.0
- npm v8.1.0


## ローカル開発環境の起動

初回のみ

```
npm i
```

```
npm start
```

2 回目以降

```
npm start
```
※ `Cannot find name 'lottie'.`などts関連のエラーがいくつか表示されますが、動作には問題ありません。


## データの追加手順

### リンク(AF動画)追加の手順

1. `site.json`のlinks(af)内にオブジェクトを追加してくだい。
2. ローカル環境を起動、トップページに反映されるのを確認してください。

### サンプル追加の手順

1. `site.json`のanime内にオブジェクトを追加してくだい。
  * トップページのgifサムネイルを設定したい場合はgifをtrue
  * 個別にcssファイルを使用する場合はcssをtrue。
2. `src/pug/`に[id_jsonのname_enと同名のディレクトリ]/index.pugを追加してください。（`sample/index.pug`参考
3. 個別cssファイルは`scss/assets/css/pages/`配下にpug時と同名.scssで作成してください。
※gifサムネイルは、完成した動きをgif録画し`src/img/assets/img/`配下に配置する。gif録画にはLICEcap`https://www.cockos.com/licecap/`を用いている


## ディレクトリ構成詳細

`/src/` で開発用ファイルを管理します。

`/dist/` に各種変換/コンパイル/ビルドしたファイルが格納されます。
`/dist/` 配下のファイルは直接編集してはいけません。

gitignore で除外していますが Heroku 等の deploy 環境で Git に含む必要がある場合は、gitignore を編集してください。

ローカルサーバーでは `/dist/` ディレクトリをドキュメントルートとして表示します。

### /src/\_data

HTML の head タグに反映する meta 関連の情報を json で管理します。

### /src/img

gulp の image タスクで、画像を圧縮します。watch 状態であればこのディレクトリにファイルを追加するだけで圧縮します。

`/src/img/` 配下に作成した任意のフォルダ構造のまま公開ディレクトリ(dist)に出力します。

```
例）
/src/img/assets/img/sample.png
↓
/dist/assets/img/sample.png
```

### /src/js

gulp の js タスクで Webpack を使って TypeScript から JavaScript へ変換します。

また、分割している ts ファイルは bundle します。

`/src/js/_module/` 配下には import 用の ts ファイルを格納します。

`/src/js/` 配下に作成した任意のフォルダ構造のまま公開ディレクトリ(dist)に出力します。

```
例）
/src/js/assets/js/script.ts
↓
/dist/assets/js/script.js
```

### /src/public

gulp の copy タスクでファイルを dist へコピーします。

favicon や manifest.json 等の変換不要なファイルを設置します。

`/src/public/` 配下に作成した任意のフォルダ構造のまま公開ディレクトリ(dist)に出力します。

```
例）
/src/public/manifest.json
↓
/dist/manifest.json
```

### /src/pug

gulp の pug タスクで Pug ファイルを HTML に変換します。

`/src/pug/_include/` に extends する layout ファイルやインクルード用ファイルをまとめています。

各 pug ファイルでは `- var directory ='/'` の項目で `/src/_data/site.json` のオブジェクトのキーと紐付けることで json で指定した値を head タグに反映します。

`/src/pug/` 配下に作成した任意のフォルダ構造のまま公開ディレクトリ(dist)に出力します。

```
例）
/src/pug/sample/index.pug
↓
/dist/sample/index.html
```

### /src/scss

gulp の sass タスクで scss ファイルを css に変換します。

`/src/scss/` 配下に作成した任意のフォルダ構造のまま公開ディレクトリ(dist)に出力します。

```
例）
/src/scss/assets/css/style.scss
↓
/dist/assets/css/style.css
```

FLOCSS を参考にディレクトリを分けています。運用ルールに合わせて変更してかまいません。

```
例）
/src/scss/
  ├─ _component/・・・各ページで使えるパーツを格納
  │
  ├─ _foundation/・・・設定ファイルを格納
  │    ├─ _mixin.scss・・・mixinや関数等
  │    ├─ _reset.scss・・・リセット用のstyle
  │    └─ _var.scss・・・カスタムプロパティ（変数）
  │
  ├─ _layout/・・・header/footer等のサイト内で共通の要素
  │    ├─ _header.scss
  │    └─ _footer.scss
  │
  └─ _page・・・各ページ固有のスタイル
       ├─ _top.scss
       ├─ _list.scss
       └─ _xxx.scss
```


## ToDo

今後対応予定のタスクです。著者も順次対応していますが、PRなどでアドバイスいただけると大変助かります。

### バグ
* [!!!] 個別のtsで外部ライブラリを読めないエラーがでる
### 共通の構成改善
* [!] ブラウザ指定にspのchromeとか増やす。
    →ちょっとどこまで書いたらいいのかわからん。
    →ブラウザチェック検証シートをベースにしよう。
* [!] ブラウザ指定で調査中にしてるやつ、一気に埋める。
  * ie
  * edge
  * safari
  * iphone
  * アンドロイド
* [!] scssの変数動かない問題
  →dartsassの仕様。読み込んであげれば動くはず。
* [!] 各アニメで関連項目を設定できるように。jsonで
* [!!] 脱jquery > それ用のnpmいれてしまったのでトリ
* [!!!] カテゴリーで絞り込み可能にする。（もっとアイテム増えてから
* [!!!] サイト全体のリデザイン。spでのテーブルなどいけてないので、モバイルファーストな見た目に。
* [!!] ファビコン追加
* [!!] meta情報改修
  * 最新のアニメの内容が設定されるようにpug書いておく
  * ogp用にいちいちアニメのスクショとるのはしんどい。
* [!!] pugのlayoutがトップページと個別ページで2つに分かれている問題。1つにまとめて効率的に管理したい。
* [!!!] そもそも静的に作りたくない
  →更新をmicroCMS上でできるようにする。
  * いきなりは無理。どこか別サイトとかでやり方練習したい。
  * 更新しやすいリンクまとめ、あたりから徐々に対応していく。
* [!!] 共通cssファイルが細分化しすぎてる問題。common.scssとか1つにまとめたい。
* [!!] afで作ったものをyoutubeにあげるので、それを自動取得したい。
* [!!!] 各サンプルのソースを表に出す。コピペ機能もつけたい。
* [!!!] サイトから更新通知を出す。プッシュ？RSS？まだイメージついてない。
### アニメ単体の改修
* [!] lottie.jsのでも,全画面じゃないパターンにする。
* [!] hover系まとめを1アニメごとに切り分ける。
  * テキスト
    * 02
    * 03
    * 04
    * 05 
    * 06
    * 07
    * 08
  * ボタン
* [!!] 星空のアニメーションがビルドするたびに差分が出てしまう問題
* [!!!] cssで制作したアニメをAFでも作りたい
* [!] lottie.jsについて導入手順をくわしくまとめて追記。
* [!!] https://photoshopvip.net/121220
### 追加予定のサンプル
* ウマ娘でつかった、スマホでスワイプしてる風のアニメ（画面2枚をスライドinout同時に
* https://photoshopvip.net/121220#tip7「ろってぃぷれびゅー」
* ウマ娘でつかった（予定）チャットしてる風アニメ
* https://ics.media/entry/11336/
* https://ics.media/entry/11336/
* https://techblog.raccoon.ne.jp/archives/1569826832.html
* https://postfake.com/
* https://toolsp.kyocera.com/showroom/index.html#event
* (ここの内容をcms化しても良いかも)
### 「ウマ娘のショートストーリーがついでに更新される。チャットで会話してる風。」
------保留-----
* 先にストーリーは執筆できるように、公開状態のフラグをもたせる。onにしたら表に出るように。
  →一旦コメントアウトで良い。
* 未読のフラグはローカルストレージを使う。ページアクセス時に全チャットに対して未読フラグを付与しておき、ユーザーが開いたらフラグを反転。
  * 一旦荒く実装完了。かなり荒いコードなのでリファクタリング必須
  * [バグ] サイトの初回ロード時にlocalStorage読むより前に以降の処理が走ってしまってエラーになる。→ローカルストレージ読み込みを待つような処理。
  * [バグ] jsonで画像がチャットの最後になってた場合、それを処理できずmakelisthtmlが止まる。
    -> 除外処理をいれる
  * [バグもどき] 未読フラグで、一度チャットを増やして減らす、みたいなことをすると対応できない。ローカルストレージの枠は増えたままになる。
-----対応予定-----
* チャット画面の位置を画面右下から呼び出すように調整
  * [!!] sp時で画面下でかなり開きにくい！！修正必須。
    * twitterぽくする？
  * [!!] 将来的にはTwitterの見た目どおりにしたい。
  * [!!] 未読フラグがトグル部分に赤丸ぽちで反映されるように
* [!!!] チャットを実際にしてる風に1つずつでるアニメーション。
  * チャット画面下にタップエリアをつくる。
  * タップされたら各ballonにactiveフラグつけていく。いまどこまで表示したかはタップ数でカウントしておき、その個数に応じてballonのインデックスを指定できる
  * 1度読んだらもうアニメなしで出しっぱにしとく。未読フラグを読むように。
* [!!!] チャットで自分の吹き出しになったら選択肢が出るようなつくり。一旦は選択肢は１つだけにしておく。
  * タップエリアに選択肢が表示されるUI。
* [!!!] キャラのアイコン押したら、LINE風に説明が出る。
  * ボイスとかも流せたら最高。
* [!] チャットの末尾に小さめだけど、会話が終了しましたorチャットを閉じる、的な文字出しとく。
* [!!!] 一覧の頭にストーリー機能で、キャラ自身を掘れるようにしておく。
  →現状のUIだとストーリーは余分かも。


