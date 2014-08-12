/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */


module.exports.handleRequest = function(request, response) {
  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */

  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */


  if (request.method === 'GET'){
    // if( /\/^classes$\/^messages$/g.test(request.url) ){
    if( request.url === "/1/classes/messages" ){
      var statusCode = 200;
      var endReturn = JSON.stringify( serverData );
    } else {
      var statusCode = 404;
    }
  } else if (request.method === 'POST'){
    var statusCode = 201;
    var body = '';
    request.on('data', function(data){
      body += data;
    });
    request.on('end', function(){
      var newData = JSON.parse(body);
      serverData.results.push(newData);
    });
    var endReturn = 'Hey1';
  } else {
      var statusCode = 200;
      var endReturn = "Hey2";
  }

  /* Without this line, this server wouldn't work. See the note
   * below about CORS. */
  var headers = defaultCorsHeaders;

  headers['Content-Type'] = "text/plain";

  /* .writeHead() tells our server what HTTP status code to send back */
  response.writeHead(statusCode, headers);

  /* Make sure to always call response.end() - Node will not send
   * anything back to the client until you do. The string you pass to
   * response.end() will be the body of the response - i.e. what shows
   * up in the browser.*/
  response.end(endReturn);
};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var serverData = { results: [] };