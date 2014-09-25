angular.module('buttonmenApp').factory('ChatService', function() {
    return {

        chatApp: new Chat(socket),

        changeName: function(name) {
            socket.emit('nameAttempt', name);
        }

    };
});
