var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
app.listen(8080);

if(process.argv.length < 4){
	throw new Error('É obrigatório passar o número de eladores e de andares');
}

console.log("                                 ___           ___           ___           ___     ");
console.log("                                /\\__\\         /\\  \\         /\\  \\         /\\  \\    ");
console.log("                               /::|  |       /::\\  \\       /::\\  \\       /::\\  \\   ");
console.log("                              /:|:|  |      /:/\\:\\  \\     /:/\\:\\  \\     /:/\\:\\  \\  ");
console.log("                             /:/|:|  |__   /:/  \\:\\  \\   /:/  \\:\\__\\   /::\\~\\:\\  \\ ");
console.log("                            /:/ |:| /\\__\\ /:/__/ \\:\\__\\ /:/__/ \\:|__| /:/\\:\\ \\:\\__\\");
console.log("                            \\/__|:|/:/  / \\:\\  \\ /:/  / \\:\\  \\ /:/  / \\:\\~\\:\\ \\/__/");
console.log("                                |:/:/  /   \\:\\  /:/  /   \\:\\  /:/  /   \\:\\ \\:\\__\\  ");
console.log("                                |::/  /     \\:\\/:/  /     \\:\\/:/  /     \\:\\ \\/__/  ");
console.log("                                /:/  /       \\::/  /       \\::/__/       \\:\\__\\    ");
console.log("                                \\/__/         \\/__/         ~~            \\/__/    ");
console.log("       ___           ___       ___           ___           ___           ___           ___           ___     ");
console.log("      /\\  \\         /\\__\\     /\\  \\         /\\__\\         /\\  \\         /\\  \\         /\\  \\         /\\  \\    ");
console.log("     /::\\  \\       /:/  /    /::\\  \\       /:/  /        /::\\  \\        \\:\\  \\       /::\\  \\       /::\\  \\   ");
console.log("    /:/\\:\\  \\     /:/  /    /:/\\:\\  \\     /:/  /        /:/\\:\\  \\        \\:\\  \\     /:/\\:\\  \\     /:/\\:\\  \\  ");
console.log("   /::\\~\\:\\  \\   /:/  /    /::\\~\\:\\  \\   /:/__/  ___   /::\\~\\:\\  \\       /::\\  \\   /:/  \\:\\  \\   /::\\~\\:\\  \\ ");
console.log("  /:/\\:\\ \\:\\__\\ /:/__/    /:/\\:\\ \\:\\__\\  |:|  | /\\__\\ /:/\\:\\ \\:\\__\\     /:/\\:\\__\\ /:/__/ \\:\\__\\ /:/\\:\\ \\:\\__\\");
console.log("  \\:\\~\\:\\ \\/__/ \\:\\  \\    \\:\\~\\:\\ \\/__/  |:|  |/:/  / \\/__\\:\\/:/  /    /:/  \\/__/ \\:\\  \\ /:/  / \\/_|::\\/:/  /");
console.log("   \\:\\ \\:\\__\\    \\:\\  \\    \\:\\ \\:\\__\\    |:|__/:/  /       \\::/  /    /:/  /       \\:\\  /:/  /     |:|::/  / ");
console.log("    \\:\\ \\/__/     \\:\\  \\    \\:\\ \\/__/     \\::::/__/        /:/  /     \\/__/         \\:\\/:/  /      |:|\\/__/  ");
console.log("     \\:\\__\\        \\:\\__\\    \\:\\__\\        ~~~~           /:/  /                     \\::/  /       |:|  |    ");
console.log("      \\/__/         \\/__/     \\/__/                       \\/__/                       \\/__/         \\|__|    ");


console.log('Elevadores', process.argv[2]);
console.log('Andares', process.argv[3]);

function handler (req, res) {
	console.log(req.url);

	var fileToSend = ''

	if(req.url == '/'){
		fileToSend = '/index.html';
	} else if(req.url == '/io.js'){
		fileToSend = '/node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.js';
	}

	fs.readFile(__dirname + fileToSend,
		function (err, data) {
			if (err) {
			res.writeHead(500);
			return res.end('Error loading '+fileToSend);
			}

			res.writeHead(200);
			res.end(data);
		}
	);
}

io.sockets.on('connection', function (socket) {
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', function (data) {
		console.log(data);
	});
});