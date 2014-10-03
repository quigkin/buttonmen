var socketio = require('socket.io'),
    uuid = require('node-uuid'),
    io,
    guestNumber = 1,
    nickNames = {},
    namesUsed = [],
    occupancy = {};

exports.listen = function(server) {
    io = socketio.listen(server);
    io.set('log level', 1);

    io.sockets.on('connection', function(socket) {
        guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);

        handleMessageBroadcasting(socket, nickNames);
        handleNameChangeAttempts(socket, nickNames, namesUsed);
        handleRoomJoining(socket);
        handleRoomLeaving(socket);
        handleHostGame(socket);
        handleRoomsBroadcasting(socket);
        handleFightersBroadcasting(socket);
        handleAck(socket);

        handleClientDisconnection(socket, nickNames, namesUsed);
    });

    setInterval(function() {
        io.sockets.to('Lobby').emit('rooms', rooms());
        io.sockets.to('Lobby').emit('fighters', fighters());
    }, 2500);
}

/*
 * Provide the client with a hook to let the server know when
 * it has finished setting up handlers for the socket created
 * during the connection process.
 */
function handleAck(socket) {
    socket.on('ack', function() {
        socket.emit('nameResult', {
            success: true,
            name: nickNames[socket.id]
        });
    });
}

function assignGuestName(socket, guestNumber, nickNames, namesUsed) {
    var name = 'Guest ' + guestNumber;
    nickNames[socket.id] = name;
    socket.emit('nameResult', {
        success: true,
        name: name
    });
    namesUsed.push(name);
    return guestNumber + 1;
}

function fighters() {
    return nickNames;
}

function leaveRoom(socket) {
    console.log(nickNames[socket.id] + ' is leaving the room ' + occupancy[socket.id]);
    socket.leave(occupancy[socket.id]);
}

function joinRoom(socket, room) {
    console.log(nickNames[socket.id] + ' is entering the room ' + room);
    socket.join(room);
    occupancy[socket.id] = room;

    socket.broadcast.to(room).emit('message', {
        text: nickNames[socket.id] + ' has joined ' + room + '.'
    });
}

function handleNameChangeAttempts(socket, nickNames, namesUsed) {
    socket.on('nameAttempt', function(name) {
        if (name.indexOf('Guest') == 0) {
            socket.emit('nameResult', {
                success: false,
                message: 'Names cannot begin with "Guest".'
            });
        } else {
            if (namesUsed.indexOf(name) == -1) {
                var previousName = nickNames[socket.id];
                var previousNameIndex = namesUsed.indexOf(previousName);
                namesUsed.push(name);
                nickNames[socket.id] = name;
                delete namesUsed[previousNameIndex];
                socket.emit('nameResult', {
                    success: true,
                    name: name
                });
            } else {
                socket.emit('nameResult', {
                    success: false,
                    message: 'That name is already in use.'
                });
            }
        }
    });
}

function handleMessageBroadcasting(socket, nickNames) {
    socket.on('message', function(message) {
        socket.broadcast.to(message.room).emit('message', {
            text: nickNames[socket.id] + ': ' + message.text
        });
    });
}

function handleRoomsBroadcasting(socket) {
    socket.on('rooms', function() {
        socket.emit('rooms', rooms());
    });
}

function handleFightersBroadcasting(socket) {
    socket.on('fighters', function() {
        socket.emit('fighters', fighters());
    });
}

function rooms() {
    var currentRooms = io.sockets.manager.rooms,
        rooms = [];
    for (currentRoom in currentRooms) {
        if (currentRoom !== '' && currentRoom != '/Lobby') {
            currentMembers = currentRooms[currentRoom];
            rooms.push({
                room: currentRoom.substring(1),
                player1: nickNames[currentMembers[0]],
                player2: nickNames[currentMembers[1]]
            });
        }
    }
    return rooms;
}

function handleRoomJoining(socket) {
    socket.on('join', function(room) {
        joinRoom(socket, room.newRoom);
    });
}

function handleRoomLeaving(socket) {
    socket.on('leave', function(room) {
        leaveRoom(socket);
    });
}

function handleHostGame(socket) {
    socket.on('host', function() {
        var newRoom = uuid.v4();
        console.log(occupancy);
        joinRoom(socket, newRoom);
        console.log(occupancy);
    });
}

function handleClientDisconnection(socket) {
    socket.on('disconnect', function() {
        var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
        delete namesUsed[nameIndex];
        delete nickNames[socket.id];
    });
}
