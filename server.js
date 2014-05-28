var app 		= require('http').createServer(handler)
  , io 			= require('socket.io').listen(app)
  , fs 			= require('fs')
  , Building 	= require('./building')
  , Person	 	= require('./person') 
app.listen(8080);






if(process.argv.length < 4){
	throw new Error('É obrigatório passar o número de eladores e de andares');
}

require('./header.js').print();

console.log('Elevadores', process.argv[2]);
console.log('Andares', process.argv[3]);

function handler (req, res) {
	var fileToSend = req.url;

	if(req.url == '/'){
		fileToSend = '/index.html';
	} else if(req.url == '/io.js'){
		fileToSend = '/node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.js';
	} else {
		fileToSend = req.url;
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


/*
  ===================================
*/


var building = new Building({
	elevators: parseInt(process.argv[2]),
	floors: parseInt(process.argv[3])
});

console.log(building,1); 
io.set('log level', 1);
io.sockets.on('connection', function (socket) {
	socket.emit('news', { message: 'Welcome to the Node-Elevator!!!' });
	socket.on('my other event', function (data) {
		console.log(data);
	});

	socket.on('enter-building', function (data) {
		console.log('-----------',data.name + ' entrou no prédio.');

		var newPerson = new Person({id: building.persons.length+1, name: data.name});

		building.persons.push(newPerson);

		socket.emit('handshake', { 
			message: 'Hello '+data.name+'. Welcome to my building!',
			persons: building.persons,
			elevators: building.elevators,
			yourself: newPerson
		});

		socket.broadcast.emit('person-on-building', { 
			list: building.persons,
		});
	});

	socket.on('person-send-message', function (data) {
		console.log('--- MESSAGE --- ' + data.message);
		socket.broadcast.emit('person-receive-message', {
			message: data.message,
		});

	});

	
}); 

console.log('Started at :',new Date());