var express = require('express');
var router = express.Router();

const game = require("../game");
const stats = require("../stats");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
// var cards = new game(14).shuffleArr();


// (function(){
//   curr.shuffleArr();
// })();


router.get('/', (req,res,next) => {
  res.render("splash.ejs", {
    stats: stats
  });
});

// router.get('/game', (req,res,next) => {
//   res.sendFile("game.html", {root: "./public"}, (err) => {
//     console.error(err);
//   });
// });

router.get("/game", function(req, res) {
  console.log(currentGame);
  res.render("game.ejs", 
  {
    cards: currentGame.cards
  }
  );
});

module.exports = router;
