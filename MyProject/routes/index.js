var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

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

module.exports = router;
