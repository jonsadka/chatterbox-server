var utils = require('./util');

var messageIdCounter = 1;
var messages = [
  {
    username: "Jon Sadka",
    text:"Thanks for joining the chat room. Enjoy, and remember... stay classy San Diego.",
    roomname: "Lobby",
    objectId: messageIdCounter
  }
];

var handleCORS = function(request, response){
  utils.sendResponse(response);
}

var createNewMessage = function(request, response){
  utils.collectData(request, function(message){
    messageIdCounter++
    message.objectId = messageIdCounter;
    messages.unshift(message)
  });
}

var getAllMessages = function(request, response){
  utils.sendResponse(response, {results: messages});
}

var actionMap = {
  'GET': getAllMessages,
  'POST': createNewMessage,
  'OPTIONS': handleCORS
}

module.exports.messageHandler = function(request, response){
  console.log("Serving request type " + request.method + " for url " + request.url);

  var action = actionMap[request.method];
  if ( action ){
    action( request, response );
  } else {
    utils.send404( response );
  }
};
