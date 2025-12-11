# bridge-site

###事前開発構築
* 共通パーツの使い回しを行いたいが最終静的なHTMLファイルで納品したいためejsを使用しています。
* scssのコンパイルにDartSassを使用しています。
* ※パッケージをインストールするために以下を実行。

```
npm install
```
* HTMLは共通パーツ(headerやfooter)を最終的に静的HTMLとして出力したいためejsを使用しています。
* インストールするために以下を実行。

```
npm install ejs
```
* 保存の度にHTMLを出力して確認を行いたい場合は以下も実行

```
npm install chokidar --save-dev

```


###開発方法
* ejs,scssの一括コンパイルをする場合は以下を実行

```
npm run build
```
* scssファイル保存するたびにコンパイルする場合は以下を実行

```
npm run sass
```

* ejsをHTMLに変換するには以下コマンド

```
npm run ejs
```
* ejsファイルを保存するたびにコンパイルする場合は以下を実行

```
npm run ejs-watch
```

* ejsでhtmlを出力後インデントが崩れてしまうためjs-beautifyを使用
* インデントを調節したいタイミングで以下を実行

```
npm run beautify
```

###ファイル構造
```
root/
├── dist/                        （静的HTML出力先）
│   ├── jp/                      （日本語版 HTML）
│   │   ├── index.html           （トップページ）
│   │   ├── company.html         （会社概要）
│   │   ├── service.html         （事業紹介ページ）
│   │   ├── service/             （事業紹介の下層ページ）
│   │   │   ├── marketing.html   （Webマーケティング事業）
│   │   │   ├── event.html       （イベントコーディネート事業）
│   │   │   └── clinical.html    （臨床研究サポート事業）
│   │   ├── terms.html           （利用規約）
│   │   └── privacy.html         （個人情報保護方針）
│   │   
│   │
│   └── en/                      （英語版 / 多言語 HTML）
│       ├── index.html           （トップページ）
│       ├── company.html         （会社概要）
│       ├── service.html         （事業紹介ページ）
│       ├── service/
│       │   ├── marketing.html   （Webマーケティング事業）
│       │   ├── event.html       （イベントコーディネート事業）
│       │   └── clinical.html    （臨床研究サポート事業）
│       ├── terms.html           （利用規約）
│       └── privacy.html         （個人情報保護方針）
│       
│
│
│
├── src/  
│   │  
│   ├── views/                       （EJSソース）
│   │   ├── jp/                      （日本語ページのEJS）
│   │   │   ├── index.ejs            （トップページ）
│   │   │   ├── about.ejs            （会社概要）
│   │   │   ├── service.ejs          （事業紹介）
│   │   │   ├── service/
│   │   │   │   ├── marketing.ejs    （Webマーケティング事業）
│   │   │   │   ├── event.ejs        （イベントコーディネート事業）
│   │   │   │   └── clinical.ejs     （臨床研究サポート事業）
│   │   │   ├── terms.ejs            （利用規約）
│   │   │   └── privacy.ejs          （個人情報保護方針）
│   │   │   
│   │   │ 
│   │   ├── en/                      （英語ページのEJS）
│   │   │   ├── index.ejs
│   │   │   ├── about.ejs
│   │   │   ├── service.ejs
│   │   │   ├── service/
│   │   │   │   ├── marketing.ejs
│   │   │   │   ├── event.ejs
│   │   │   │   └── clinical.ejs
│   │   │   ├── terms.ejs
│   │   │   └── privacy.ejs
│   │   │   
│   │   └── common/                  （共通パーツ）
│   │       ├── _headContent.ejs     （<head> 内共通パーツ）
│   │       ├── _metaCreate.ejs      （meta系情報整形共通処理）
│   │       ├── _header.ejs          （共通ヘッダー）
│   │       ├── _contact.ejs         （お問い合わせ共通パーツ）
│   │       └── _footer.ejs          （共通フッター）
│   │
│   └── scss/                   （SCSSソース）
│       ├── main.scss           （各コンテンツスタイル）                    
│       ├── common.scss         （共通スタイル）                    
│       ├── _header.scss        （ヘッダー共通スタイル）                    
│       ├── _footer.scss        （フッター共通スタイル）                    
│       ├── _reset.scss         （リセットcss）                   
│       └── common.vars.scss     (共通変数格納ファイル)
│       
└── asset/                       （静的ファイル）
   ├── css/                       (scss出力先)
   ├── js/                                       
   └── img/                  

```

####[memo]
* ejs、scssどちらも保存するたびに出力したい場合はターミナルを2台起動してそれぞれコマンドを実行する必要がある。