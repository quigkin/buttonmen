var socketio = require('socket.io'),
    uuid = require('node-uuid'),
    io,
    guestNumber = 1,
    nickNames = {},
    namesUsed = [],
    currentRoom = {},
    rooms = {
        'Lobby': 'Lobby'
    };

exports.listen = function(server) {
    io = socketio.listen(server);
    io.set('log level', 1);

    io.sockets.on('connection', function(socket) {
        guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
        joinRoom(socket, 'Lobby');

        handleMessageBroadcasting(socket, nickNames);
        handleNameChangeAttempts(socket, nickNames, namesUsed);
        handleRoomJoining(socket);
        handleHostGame(socket);
        handleAck(socket);

        socket.on('rooms', function() {
            socket.emit('rooms', rooms);
        });

        handleClientDisconnection(socket, nickNames, namesUsed);
    });

    setInterval(function() {
        removeUnusedRooms();
        io.sockets.to('Lobby').emit('rooms', rooms);
    }, 2500);
}

/*
 * Provide the client with a hook to let the server know when
 * it has finished setting up handlers for the socket created
 * during the connection process.
 */
function handleAck(socket) {
    socket.on('ack', function() {
        socket.emit('rooms', rooms);
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

function removeUnusedRooms() {
    var currentRooms = io.sockets.manager.rooms;
    for (room in rooms) {
        if (currentRooms['/' + room] === undefined && room !== 'Lobby') {
            delete rooms[room];
        }
    }
}

function joinRoom(socket, room, displayName) {
    socket.join(room);
    currentRoom[socket.id] = room;
    socket.emit('joinResult', {room: room});
    socket.broadcast.to(room).emit('message', {
        text: nickNames[socket.id] + ' has joined ' + room + '.'
    });

    var usersInRoom = io.sockets.clients(room);
    if (usersInRoom.length > 1) {
        var usersInRoomSummary = 'Users currently in ' + room + ': ';
        for (var index in usersInRoom) {
            var userSocketId = usersInRoom[index].id;
            if (userSocketId != socket.id) {
                if (index > 0) {
                    usersInRoomSummary += ', ';
                }
                usersInRoomSummary += nickNames[userSocketId];
            }
        }
        usersInRoomSummary += '.';
        socket.emit('message', {text: usersInRoomSummary});
    }
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
                changeRoomName(previousName, name);
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

function handleRoomJoining(socket) {
    socket.on('join', function(room) {
        socket.leave(currentRoom[socket.id]);
        joinRoom(socket, room.newRoom);
    });
}

function handleHostGame(socket) {
    socket.on('host', function() {
        var newRoom = uuid.v4();
        socket.leave(currentRoom[socket.id]);
        joinRoom(socket, newRoom);
        rooms[newRoom] = nickNames[socket.id];
    });
}

function changeRoomName(oldName, newName) {
    for (room in rooms) {
        if (rooms[room] == oldName) {
            rooms[room] = newName;
        }
    }
}

function handleClientDisconnection(socket) {
    socket.on('disconnect', function() {
        var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
        delete namesUsed[nameIndex];
        delete nickNames[socket.id];
    });
}
