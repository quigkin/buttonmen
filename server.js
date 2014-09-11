var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    mime = require('mime'),
    cache = {},
    chatServer = require('./api/chat_server');

function send404(response) {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('Error 404: resource not found.');
    response.end();
}

function sendFile(response, filePath, fileContents) {
    response.writeHead(
        200,
        {'Content-Type': mime.lookup(path.basename(filePath))}
    );
    response.end(fileContents);
}

function serveStatic(response, cache, absPath) {
    if (cache[absPath]) {
        sendFile(response, absPath, cache[absPath]);
    } else {
        fs.exists(absPath, function(exists) {
            if (exists) {
                fs.readFile(absPath, function(err, data) {
                    if (err) {
                        send404(response);
                    } else {
                        cache[absPath] = data;
                        sendFile(response, absPath, data);
                    }
                });
            } else {
                send404(response);
            }
        });
    }
}

var server = http.createServer(function(request, response) {
    var filePath = false;

    // this should never happen if we are proxying
    if (request.url == '/') {
        filePath = 'app/index.html';
    // } else if (request.url.indexOf('/api') == 0) {
    //     filePath = request.url.substring(1);
    } else {
        filePath = request.url;
    }
    var absPath = __dirname + '/' + filePath;
    serveStatic(response, cache, absPath);
});

server.listen(3000, function() {
    console.log('Server listening on port 3000');
});

chatServer.listen(server);
