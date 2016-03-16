var sockets = function (io, config) {

	var users = {};
	var tempUsername;

	io.sockets.on('connection', function (socket) {
	  	
		if(socket.handshake.query.username != undefined) {

		  	socket.username = socket.handshake.query.username;
		  	users[socket.username] = socket;
			updateUsers();
			console.log(socket.name + ' has been connected');
		}

		socket.on('send message', function (data, callback) {
			
			var message = data.message.trim();
			if(message.substr(0, 3) == '/w ') {
				
				message = message.substr(3);
				spaceIndex = message.indexOf(' ');
				
				if(spaceIndex !== -1) {
					var receiver = message.substr(0, spaceIndex);
					message = message.substr(spaceIndex + 1);
					if(receiver in users) {
						
						data.message = message;
						users[receiver].emit('whisper', data);
						users[data.user].emit('whisper', data);
					}
					else 
						callback('Enter a valid user');
				}
				else 
					callback('Private message should be in this format: /w <username> <message>');
			}
			else
				io.sockets.emit('new message', data);
		});

		socket.on('disconnect', function (data) {
			
			if(!socket.username) return;
			delete users[socket.username];
			updateUsers();
		});
	});

	function updateUsers() {
		
		io.sockets.emit('usernames', Object.keys(users));
	}
};

module.exports = sockets;