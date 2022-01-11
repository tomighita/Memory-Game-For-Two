var express = require('express');
var router = express.Router();

const game = require("../game");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
var cards = new game(14).shuffleArr();

// (function(){
//   curr.shuffleArr();
// })();

router.get('/', (req,res,next) => {
  res.sendFile("splash.html", {root: "./public"}, (err) => {
    console.error(err);
  });
});

router.get('/game', (req,res,next) => {
  res.sendFile("game.html", {root: "./public"}, (err) => {
    console.error(err);
  });
});

router.get("/game2", function(req, res) {
  res.render("game.ejs", {
    cards: cards
  });
});

module.exports = router;
