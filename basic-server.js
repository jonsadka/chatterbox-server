/* Import node's http module: */
var http = require("http");
var requestMod = require('./request-handler.js');
var urlParser = require('url');
var utils = require('./util.js')


/* Every server needs to listen on a port with a unique number. The
 * standard port for HTTP servers is port 80, but that port is
 * normally already claimed by another server and/or not accessible
 * so we'll use a higher port number that is not likely to be taken: */
var port = 3000;
var ip = "100.74.232.22";

var routeMap = {
  '/': requestMod.messageHandler
  // '/classes/chatterbox': messageHandler
  // '/somthing/else' -> otherHandler
};

var server = http.createServer(function(request, response){
  var parsedUrl = urlParser.parse(request.url);
  var route = routeMap[parsedUrl.pathname];
  if( route ){
    route( request, response );
  } else {
    utils.send404( response );
  }
});

console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

/* To start this server, run:
     node basic-server.js
 *  on the command line.

 * server.listen() will continue running as long as there is the
 * possibility of serving more requests. To stop your server, hit
 * Ctrl-C on the command line. */
