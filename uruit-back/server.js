// SETUP
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

function updateStats(winner, stats, callback) {
  var updated = false;
  for(var s of stats) {
    if(s.name == winner.name) {
      s.score = (parseInt(s.score, 10) + 1).toString();
      updated = true;
    }
  }
  if(!updated) {
    stats.push({ player: winner.name, score: "1" });
  }
  stats.sort(function(a, b){ return b.score - a.score });

  fs.writeFile('./json/stats.json', JSON.stringify(stats), (err) => {
    if (err) throw err;
    callback();
  });
}

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

var port = process.env.PORT || 8080;

// ROUTER

var router = express.Router();
app.use('/api', router);

router.get('/', (req, res, next) => {
    res.json({ message: 'This is your first endpint!!' });
});

router.get('/game/rules', (req, res, next) => {
    var rules;
    fs.readFile('./json/rules.json', 'utf-8', (err, data) => {
        if (err) throw err;
        rules = JSON.parse(data);
        res.json(rules);
    });
    
});

router.get('/game/stats', (req, res, next) => {
    var stats;
    fs.readFile('./json/stats.json', 'utf-8', (err, data) => {
        if(err) throw err;
        stats = JSON.parse(data);
        res.json(stats);
    });
});

router.put('/game/stats', (req, res, next) => {
    var winner = req.body;
    var stats;
    fs.readFile('./json/stats.json', 'utf-8', (err, data) => {
        if(err) throw err;
        stats = JSON.parse(data);
        updateStats(winner, stats, () => {
            res.json({"stats": "Ok"});
        });
    });
});

app.listen(port);
console.log('Api rest over port ' + port);
