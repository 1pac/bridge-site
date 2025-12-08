//ファイル操作をするためfsを読み込む
import fs from "fs";
//ファイルパスを結合したり拡張子を取り出したりするためを読み込む
import path from "path";
//EJS テンプレートエンジン本体を読み込む
import ejs from "ejs";

// 入力フォルダと出力フォルダを指定
const inputDir = "src/views/jp";
const outputDir = "./dist/jp";

// viewsディレクトリ内の全ファイルを読み込んで配列にする
fs.readdirSync(inputDir).forEach(file => {
    if (file.startsWith(".")) return;
    
    if (path.extname(file) === ".ejs") {

        // パーシャルファイルはスキップ
        if (file.startsWith("_")) return;
        //ディレクトリ名+ファイル名を結合してパスを作成
        var src = path.join(inputDir, file);
        var out = path.join(outputDir, file.replace(".ejs", ".html"));

        compileEjs(src, out);

    } else {
        //上位ディレクトリ+取得ディレクトリでパスを作成
        const inputDirCommon = path.join(inputDir, file);
        const outputDirCommon = path.join(outputDir, file);


        const stat = fs.statSync(inputDirCommon);
        if (!stat.isDirectory()) return; // ← フォルダでないならスキップ！

        fs.readdirSync(inputDirCommon).forEach(file => {
            // パーシャルファイルはスキップ
            if (file.startsWith("_")) return;

            //ディレクトリ名+ファイル名を結合してパスを作成
            const src = path.join(inputDirCommon, file);
            const out = path.join(outputDirCommon, file.replace(".ejs", ".html"));
            compileEjs(src, out);

        });

    }
});

// 入力フォルダと出力フォルダを指定
const inputDirGlobal = "src/views/en";
const outputDirglobal = "./dist/en";

// viewsディレクトリ内の全ファイルを読み込んで配列にする
fs.readdirSync(inputDirGlobal).forEach(file => {
    if (file.startsWith(".")) return;
    
    if (path.extname(file) === ".ejs") {

        // パーシャルファイルはスキップ
        if (file.startsWith("_")) return;
        //ディレクトリ名+ファイル名を結合してパスを作成
        var src = path.join(inputDirGlobal, file);
        var out = path.join(outputDirglobal, file.replace(".ejs", ".html"));

        compileEjs(src, out);

    } else {
        //上位ディレクトリ+取得ディレクトリでパスを作成
        const inputDirCommonGlobal = path.join(inputDirGlobal, file);
        const outputDirCommonGlobal = path.join(outputDirglobal, file);


        const stat = fs.statSync(inputDirCommonGlobal);
        if (!stat.isDirectory()) return; // ← フォルダでないならスキップ！

        fs.readdirSync(inputDirCommonGlobal).forEach(file => {
            // パーシャルファイルはスキップ
            if (file.startsWith("_")) return;

            //ディレクトリ名+ファイル名を結合してパスを作成
            const src = path.join(inputDirCommonGlobal, file);
            const out = path.join(outputDirCommonGlobal, file.replace(".ejs", ".html"));
            compileEjs(src, out);

        });

    }
});


// EJSをコンパイルしてHTMLを出力する関数
function compileEjs(src, out) {
    //.ejsの中身をUTF-8の文字列として読み込む
    const content = fs.readFileSync(src, "utf8");

    // EJSの render() 関数を使ってHTMLに変換
    // (変数を使っていないため第二引数は空のオブジェクト、第三引数はheader.ejsなどのパーツを相対で探すのでejsファイルのパスを渡す)
    const html = ejs.render(content, {}, {
        filename: src,
        root: path.resolve("src/views") // ルートディレクトリを指定
    });

    // 出力先のフォルダへ書き込み
    fs.writeFileSync(out, html);

    console.log("変更対象: " + src);
}
