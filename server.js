const express = require("express"); // Webサーバーの機能を使うためのライブラリ
const app = express();              // サーバーアプリの本体を作成
const path = require("path");

// 学内のIPアドレス帯（例：10.0. や 192.168.1. など）を設定
const universityIPPatterns = [
  /^10\.0\./,
  /^192\.168\.1\./,
  /^203\.0\.113\./ // 仮のグローバルIP（あとで変更）
];

app.use(express.static("public")); // publicフォルダの中のHTMLなどを配信する設定

// /check というURLにアクセスしたときの処理
app.get("/check", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress; // アクセス元のIPアドレスを取得

  // IPアドレスが学内のものかどうかチェック
  const isCampus = universityIPPatterns.some(pattern => pattern.test(ip));

  // 判定結果をJSON形式で返す
  res.json({
    ip,
    connectedToCampus: isCampus
  });
});

// サーバーをポート3000で起動
app.listen(3000, () => {
  console.log("サーバーが http://localhost:3000 で起動中");
});
