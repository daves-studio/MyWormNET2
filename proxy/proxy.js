var net = require('net');

function sendU16(socket, value) {
	const buf = new Uint8Array(2);
	buf[0] = value & 0xFF;
	buf[1] = value >> 8;
	socket.write(buf);
}

const controlPort = 9301;
const controlServer = net.createServer(function(controlSocket) {
	console.log("Control Connected")
	// A WormNAT2 user connected to the WormNAT2 server
	const publicServer = net.createServer(function(publicSocket) {
		console.log("Public Connected")
		// A client is connecting to the WormNAT2 user's game
		const hostServer = net.createServer(function(hostSocket) {
			console.log("HOST Connected")
			// The host is connecting to receive the client's connection
			hostServer.close();
			hostSocket.pipe(publicSocket);
			publicSocket.pipe(hostSocket);

			hostSocket.on('error', function(error) {
				console.log("Host Errored: ", error)
			})
		});
		hostServer.on('listening', function() {
			console.log("Host Listening")
			sendU16(controlSocket, hostServer.address().port);
		});
		publicSocket.on('error', function(error) {
			console.log("Public Errored: ", error)
		})
		hostServer.listen(9303);
	});
	publicServer.on('listening', function() {
		console.log("Public Listening")
		sendU16(controlSocket, publicServer.address().port);
	});
	publicServer.listen(9302);
	controlSocket.on('close', function() {
		console.log("Control Disconnected")
		publicServer.close();
	});
	controlSocket.on('error', function(error) {
		console.log("Control Errored: ", error)
	})
});
controlServer.listen(controlPort);


console.log("Started Server on Port ", controlServer.address().port)
