// SETUP

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// ROUTER

var router = express.Router();
app.use('/api', router);

router.get('/', (req, res) => {
    res.json({ message: 'This is your first endpint!!' });
});

router.get('/second', (req, res) => {
    res.json({ message: 'This is your second andpoint!!' });
});

app.listen(port);
console.log('Api rest over port ' + port);
