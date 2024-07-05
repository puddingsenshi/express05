// <註解>
// 引入一個json
// 使用條件式=> 在網址上輸入查詢的參數，出現特定網頁(文字)
// 使用陣列 find()
// 介紹: redirect()


// <執行>
// 引入express模組
const express = require("express");
// 引入json
// const data = require("./singer.json");
// express 可用大括號直接引入
const { singers } = require("./singer.json");
console.log(singers);

const app = express();

app.get("/", (req, res) => {
    // res.send("這是首頁");
    // redirect()=> 自動導向
    res.redirect("/singer/1.html")
});

// :id=> 預計抓進參數的東西
app.get("/singer/:id.html", (req, res) => {
    const id = parseInt(req.params.id);

    // 陣列尋找有無singer.id，回傳true
    const result = singers.find(singer => {
        if (singer.id === id) {
            return true;
        }
    });
    // result 回傳值，執行這個條件式以下:
    // 1 無結果
    if (!result) {
        // http寫法
        // res.statusCode = 404;
        // express寫法 "status()"
        res.status(404);
        res.send("<h1>404 - 找不到歌手</h1>");
        return;
    }
    // 2 有結果
    // 加入html並且新增更改的變數進入
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${result.singer_name}</title>
</head>
<body>
    <h1>${result.singer_name}</h1>
    <h3>${result.singer_id}</h3>
    <img src="${result.singer_img}" alt="">
</body>
</html>`);
});

app.all("*", (req, res) => {
    res.send("<h1>404 - 找不到歌手</h1>");
})

app.listen(3000, () => {
    console.log(`服務已啟動於 http://localhost:3000`);
})