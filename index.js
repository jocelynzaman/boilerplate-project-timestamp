// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//date request
app.use("/api/:date", function (req, res) {
  var date = req.params.date;
  date = (req.params.date.includes("-")) ? new Date(req.params.date) : new Date(Number(req.params.date));
  var time = date.getTime();
  if (!isNaN(time))
  {
    res.json({"unix": time, "utc": date.toUTCString()});
  }
  else
  {
    res.json({ error : "Invalid Date" });
  }
});

 //empty date request
app.use("/api/", function (req, res) {
  var date = Date.now();
  res.json({"unix": date, "utc": new Date(Number(date)).toUTCString()});
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
