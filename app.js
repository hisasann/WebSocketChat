var express = require("express"),
	ejs = require("ejs");

var port = 8125;
var app = express.createServer();
app.set("view engine", "ejs");
app.set("view options", { layout: false });
app.set("views", __dirname + "/views");

app.get("/", function(req, res) {
	console.log("/");
	res.render("index", {
		locals: { port: port }
	});
});
app.listen(port);

var io  = require("socket.io").listen(app);
io.sockets.on("connection", function(socket) {
	socket.emit('connected');
	
	socket.on("message send", function(msg) {
		socket.emit("message push", msg);
		socket.broadcast.emit("message push", msg);
	});

	socket.on("disconnect", function() {
		console.log("disconnect");
	});
});

console.log("Server running at http://localhost:" + port + "/");
