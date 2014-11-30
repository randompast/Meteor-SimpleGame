// This application is a modification of:
// meteor create --example leaderboard

// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".
Players = new Mongo.Collection("players");

if (Meteor.isClient) {

  // Get updates when they occur
  Meteor.subscribe('playerPositions')

  // Get arrow key presses
  // Not passing a value allows server to be authoritative
  window.addEventListener("keydown", function(e) {
    switch(e.keyCode) {
      case 37:
        Meteor.call('LEFTd'); break;
      case 38:
        Meteor.call('UPd'); break;
      case 39:
        Meteor.call('RIGHTd'); break;
      case 40:
        Meteor.call('DOWNd'); break;
    }
  });
  window.addEventListener("keyup", function(e) {
    switch(e.keyCode) {
      case 37:
        Meteor.call('LEFTu'); break;
      case 38:
        Meteor.call('UPu'); break;
      case 39:
        Meteor.call('RIGHTu'); break;
      case 40:
        Meteor.call('DOWNu'); break;
    }
  });

  // This function returns the canvas.context
  gc = function() { //var doesn't work here
    canvas = document.getElementById("canvas")
    return context = canvas.getContext('2d')
  }

  // This is the main render loop
  // It draws a rectangle for each player
  render = function() {
    Players.find().fetch().forEach(function(i){
      gc().clearRect(0,0,400,400)
      gc().fillRect(i.xpos,i.ypos,10,10)
    })
    requestAnimationFrame(render)
  }
  render()
}

// On server startup, create some players if the database is empty.
if (Meteor.isServer) {
  // Allow clients to subscribe to Players
  Meteor.publish('playerPositions', function() {
    return Players.find()
  })

  // Meteor.call('METHODNAME') points here
  Meteor.methods({
    //keydown events
    'LEFTd': function(){
      Players.update({id: Meteor.userId()}, {$set: {xdir: -1}})
    },
    'RIGHTd': function(){
      Players.update({id: Meteor.userId()}, {$set: {xdir: 1}})
    },
    'UPd': function(){
      Players.update({id: Meteor.userId()}, {$set: {ydir: -1}})
    },
    'DOWNd': function(){
      Players.update({id: Meteor.userId()}, {$set: {ydir: 1}})
    },
    //keyup events
    'LEFTu': function(){
      Players.update({id: Meteor.userId()}, {$set: {xdir: 0}})
    },
    'RIGHTu': function(){
      Players.update({id: Meteor.userId()}, {$set: {xdir: 0}})
    },
    'UPu': function(){
      Players.update({id: Meteor.userId()}, {$set: {ydir: 0}})
    },
    'DOWNu': function(){
      Players.update({id: Meteor.userId()}, {$set: {ydir: 0}})
    }
  })

  // Do this upon a player loggin in for the first time
  Accounts.onLogin(function(options) {
   if(Players.findOne({id : options.user._id}) === undefined) {
    // Add a new player for the new user.
    Players.insert({
      id: options.user._id,
      xdir: 0,
      ydir: 0,
      xpos: Math.floor(Math.random()*400),
      ypos: Math.floor(Math.random()*400)
    })
   }
  })

  // GAME LOOP
  Meteor.setInterval(function() {
    var players = Players.find().fetch()
    if (players.length > 0){
      players.forEach(function(i) {
        var speed = 1
        // Keep the position within the canvas
        var x = (i.xpos < 0) ? 400 : (i.xpos + speed*i.xdir)%400
        var y = i.ypos < 0 ? 400 : (i.ypos + speed*i.ydir)%400
        Players.update({id: i.id}, {$set: {xpos: x, ypos: y}})
      })
    }
  }, 10)
}
