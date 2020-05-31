var express = require("express");
var app = express();

var articleC = require("../controllers/articleController");

app.post("/crt", articleC.CreateArticle);
app.get("/lst/:limit?", articleC.GetArticles);
app.get("/:id", articleC.GetArticleById);
app.get("/search/:search", articleC.SearchArticle);
app.put("/:id", articleC.UpdateArticle);
app.delete("/:id", articleC.DeleteArticle);

module.exports = app;
