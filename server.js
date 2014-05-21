var DEFAULT_HOST	= '127.0.0.1',
	DEFAULT_PORT	= 1337,
	DEFAULT_IO_PORT	= 31337,
	http	= require('http'),
	url		= require('url'),
	fs		= require('fs'),
	express	= require('express'),
	app		= express(),
	io		= require('socket.io').listen(DEFAULT_IO_PORT),
	utils	= {
		parseTextWithObject: function (text, object) {
			for (i in object) {
				text = text.toString().replace(new RegExp('{{' + i + '}}', 'g'), object[i]);
				console.log(i, object[i]);
			}
			return text;
		},
		sendParsedFile: function (filename, stream, default_callback_for_error) {
			fs.readFile(filename, function (err, document) {
				if (err) {
					if (default_callback_for_error !== undefined)
						return default_callback_for_error(filename, err, stream);

					stream.writeHead(500);
					return stream.end('Error loading '.concat(filename));
				}

				stream.writeHead(200);

				return stream.end(utils.parseTextWithObject(document, {
					DEFAULT_HOST  : DEFAULT_HOST,
					DEFAULT_PORT : DEFAULT_PORT,
					DEFAULT_IO_PORT : DEFAULT_IO_PORT
				}));
			});
		},
		sendFile: function (filename, stream, default_callback_for_error) {
			fs.readFile(filename, function (err, document) {
				if (err) {
					if (default_callback_for_error !== undefined)
						return default_callback_for_error(filename, err, stream);

					stream.writeHead(500);
					return stream.end('Error loading '.concat(filename));
				}

				stream.writeHead(200);

				return stream.end(document);
			});
		}
	},
	config = (function AutoConfigure(data, default_data) {
		configs = {};
		
		for (i in default_data)
			configs[i] = data[i] || default_data[i];

		return configs;
	})(process.argv, {
		elevators: 3,
		floors: 15,
		capacity: 1
	});

app.get('/', function (req, res) {
	utils.sendParsedFile(__dirname + '/views/index.html', res);
});

// Default 404 error page routing
app.get('*', function (req, res) {
	return utils.sendFile('node_modules'+req.params[0], res, function(filename) {
		return res.send('Unknow page ' + filename, 404);
	});
});

server = http.createServer(app);

server.listen(DEFAULT_PORT, function () {
	console.log('Express server running at', 'http://'.concat(DEFAULT_HOST).concat(':'.concat(DEFAULT_PORT)));
});