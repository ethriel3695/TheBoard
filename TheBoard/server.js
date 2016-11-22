var http = require("http");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
//var ejsEngine = require("ejs-locals");

var controllers = require("./controllers");
var flash = require("connect-flash");
var cookieParser = require("cookie-parser");
var expressSession = require("express-session");

//app.set("view engine", "jade");
//app.engine("ejs", ejsEngine);
//app.set("view engine", "ejs");
app.set("view engine", "vash");

//Opt into Services
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({ secret: "PluralsightTheBoard" }));
app.use(flash());
 
//set the public static resource folder
app.use(express.static(__dirname + "/public"));

var auth = require("./auth");
auth.init(app);

controllers.init(app);

app.get("/api/users", function (req, res) {
    res.set("Content-Type", "application/json");
    res.send({ name: "Reuben", isValid: true, group: "Admin" });
});

var server = http.createServer(app);

server.listen(3000);

var updater = require("./updater");
updater.init(server);