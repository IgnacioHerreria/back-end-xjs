"use strict";

var articleM = require("../models/articleModel");
var v = require("validator");

var articleController = {
  CreateArticle: (req, res) => {
    var params = req.body;
    try {
      var vTitle = !v.isEmpty(params.title);
      var vContent = !v.isEmpty(params.content);
    } catch (err) {
      return res.status(500).json({
        ok: false,
        msg: "Fail to create article " + err,
      });
    }

    if (vTitle && vContent) {
      var newArticle = new articleM();
      newArticle.title = params.title;
      newArticle.content = params.content;
      newArticle.state = true;
      newArticle.img = params.img;

      newArticle.save((err, articleStored) => {
        if (err || !articleStored) {
          return res.status(500).json({
            ok: false,
            msg: err,
            entity: articleStored,
          });
        }

        return res.status(200).json({
          ok: true,
          msg: "Success",
          entity: newArticle,
        });
      });
    } else {
      return res.status(500).json({
        ok: false,
        msg: "Request fail",
      });
    }
  },

  UpdateArticle: (req, res) => {
    var idArt = req.params.id;
    var params = req.body;
    if (!idArt || idArt == undefined) {
      return res.status(500).json({
        ok: false,
        msg: "Validate data",
      });
    }

    try {
      var vTitle = !v.isEmpty(params.title);
      var vContent = !v.isEmpty(params.content);
    } catch (err) {
      if (err) {
        return res.status(500).json({
          ok: false,
          msg: "Validation failed",
          err,
        });
      }
    }
    if (vTitle && vContent) {
      console.log(vTitle + vContent);
      articleM.findOneAndUpdate(
        { _id: idArt },
        params,
        { new: true },
        (err, articleUpdated) => {
          if (err) {
            return res.status(500).json({
              ok: false,
              msg: "Fail updating article",
              err,
            });
          }
          if (!articleUpdated) {
            return res.status(404).json({
              ok: false,
              msg: "Article not found",
            });
          }
          return res.status(200).json({
            ok: true,
            msg: "Success",
            article: articleUpdated,
          });
        }
      );
    } else {
      return res.status(500).json({
        ok: false,
        msg: "Validation failed",
        err,
      });
    }
  },
  GetArticles: (req, res) => {
    var limit = req.params.limit;

    var query = articleM.find({});

    if ((limit != null || limit != undefined) && v.isNumeric(limit)) {
      query.limit(Number(limit));
    }
    query.sort("-date").exec((err, articles) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          msg: "Fail to list articles " + err,
          err,
        });
      }
      return res.status(200).json({
        ok: true,
        msg: "Success",
        articles,
      });
    });
  },

  GetArticleById: (req, res) => {
    var idArt = req.params.id;
    if (!idArt || idArt == null || idArt == undefined) {
      return res.status(500).json({
        ok: false,
        msg: "Validate data",
      });
    }

    articleM.findById(idArt).exec((err, article) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          msg: "Error on consult",
          err,
        });
      }
      if (!article) {
        return res.status(404).json({
          ok: true,
          msg: "Data not found " + idArt,
        });
      }
      return res.status(200).json({
        ok: true,
        msg: "Success",
        article,
      });
    });
  },

  DeleteArticle: (req, res) => {
    var idArt = req.params.id;

    if (!idArt || idArt === undefined) {
      return res.status(500).json({
        ok: false,
        msg: "Validate data",
      });
    }
    articleM.findByIdAndDelete({ _id: idArt }, (err, articleDeleted) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          msg: "Error on deleted",
          err,
        });
      }
      if (!articleDeleted) {
        return res.status(404).json({
          ok: false,
          msg: "Article not found",
        });
      }
      return res.status(500).json({
        ok: true,
        msg: "Success",
        articleDeleted,
      });
    });
  },
  SearchArticle: (req, res) => {
    var search = req.params.search;

    articleM
      .find({
        $or: [
          {
            title: { $regex: search, $options: "i" }, //When title or content containts search string
            content: { $regex: search, $options: "i" },
          },
        ],
      })
      .sort({ date: -1 })
      .exec((err, articles) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            msg: "Error on get articles",
            err,
          });
        }
        if (!articles || articles.length <= 0) {
          return res.status(404).json({
            ok: false,
            msg: "Not found",
          });
        }

        return res.status(200).json({
          ok: true,
          msg: "Success",
          articles,
        });
      });
  },
};

module.exports = articleController;
