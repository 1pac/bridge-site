//ファイル操作をするためfsを読み込む
import fs from "fs";
//ファイルパスを結合したり拡張子を取り出したりするためを読み込む
import path from "path";
//EJS テンプレートエンジン本体を読み込む
import ejs from "ejs";
//ejsのwatch用にchokidarを読み込む
import chokidar from "chokidar";
import 'dotenv/config'; 

// 入力フォルダと出力フォルダを指定
const inputDir = "src/views";
const outputDir = "./dist";

// 環境変数 ENV を取得 ('local' か 'amplify')
const env = process.env.ENV || "local";
// ASSET_PATH を環境ごとに設定
const ASSET_PATH = env === "amplify" ? "" : "dist/";

// EJSをコンパイルしてHTMLを出力する関数
function compileEjs(src, out) {
    //.ejsの中身をUTF-8の文字列として読み込む
    const content = fs.readFileSync(src, "utf8");

    // EJSの render() 関数を使ってHTMLに変換
    // (変数を使っていないため第二引数は空のオブジェクト、第三引数はheader.ejsなどのパーツを相対で探すのでejsファイルのパスを渡す)
    const html = ejs.render(content, { ASSET_PATH }, {
        filename: src,
        root: path.resolve("src/views") // ルートディレクトリを指定
    });

    // 出力先のフォルダへ書き込み
    fs.writeFileSync(out, html);
}


// ejsファイル変更を監視して自動出力
const watcher = chokidar.watch("src/views", {
    ignored: /(^|[\/\\])\../, // .隠しファイルを無視
    persistent: true
});

//views配下の変更を検知したら以下実行
watcher.on("change", filePath => {
    // .ejsファイル以外またはパーシャルファイルは無視  
    if (path.extname(filePath) !== ".ejs") return;
    if (path.basename(filePath).startsWith("_")) return;

    console.log(`変更対象: ${filePath}`);

    // 出力先のパスを作成してEJSをコンパイル
    const relativePath = path.relative("src/views", filePath);
    const outPath = path.join("./dist", relativePath.replace(".ejs", ".html"));
    compileEjs(filePath, outPath);
});

console.log("保存すると自動でHTMLを出力します");