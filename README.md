Meteor-SimpleGame
=================

###Description
This is an adaptation from leaderboard application (meteor create --example leaderboard) and the [meteortips tutorial.](http://meteortips.com/book/)  Hopefully, this will help people get started who wish to create a browser based game in meteor.  This project currently shows a black square that moves on a canvas via arrow keys.  Some minor security precautions have been taken using "meteor add accounts-password" and removing "meteor remove autopublish insecure". 

###Installation - Running

1. git clone https://github.com/randompast/Meteor-SimpleGame.git
2. cd Meteor-SimpleGame
3. meteor
4. Browser: localhost:3000
5. Create account (left)
6. Arrow keys to move

###Todo

1. meteor add slava:miniredis
  * https://atmospherejs.com/slava/miniredis
  * Use Miniredis.RedisStore for player positions.
  * Use Mongo.Collection for longer term information
  * Maybe use [meteorhacks:npm](https://atmospherejs.com/meteorhacks/npm) for redis?
2. handle logout
3. Add [keypress](https://atmospherejs.com/keypress/keypress) [info](http://dmauro.github.io/Keypress/)
