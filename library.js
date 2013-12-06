(function(module) {
  "use strict";

  var User = module.parent.require('../src/user.js'),
      RDB = module.parent.require('../src/redis.js'),
      passport = module.parent.require('passport'),
      passportSteam = require('passport-steam').Strategy,
      fs = module.parent.require('fs'),
      path = module.parent.require('path'),
      http = module.parent.require('http');

  var constants = Object.freeze({
    'name': 'Steam',
    'admin': {
      'route': '/steam',
      'icon': 'fa-gamepad'  // while there are no Steam icon on FontAwesome
    }
  });

  var Steam = {};

  Steam.getStrategy = function(strategies) {
    if (meta.config['social:steam:apikey']) {
      passport.use(new passportSteam({
        returnURL: module.parent.require('nconf').get('url') + 'auth/steam/callback',
        realm: module.parent.require('nconf').get('url')
      }, function(identifier, profile, done) {
        process.nextTick(function () {
          // As Steam Passport does't not provide the username, steamid and avatar information, we have to get from Steam API using http get request.
          var clientApiKey = meta.config['social:steam:apikey'],
              Steam64Id = identifier.replace('http://steamcommunity.com/openid/id/', ''),
              apiUrl = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + clientApiKey + '&steamids=' + Steam64Id,
              player = {};
          http.get(apiUrl, function(res) {
            res.on('data', function(chunck){
              var responseObj = JSON.parse(chunck.toString());
              player.id = responseObj.response.players[0].steamid;
              player.username = responseObj.response.players[0].personaname;
              player.avatar = responseObj.response.players[0].avatarfull;
              player.profileurl = responseObj.response.players[0].profileurl;

              Steam.login(player.id, player.username, player.avatar, player.profileurl, function(err, user) {
                if (err) {
                  return done(err);
                }
                console.log(done);
                done(null, user);
              });

            });
          }).on('error', function(e) {
            console.log('problem with request: ' + e.message);
          });
        });
      }));

      strategies.push({
        name: 'steam',
        url: '/auth/steam',
        callbackURL: '/auth/steam/callback',
        icon: 'check',
        scope: 'user:username'
      });
    }

    return strategies;
  };

  Steam.login = function(steamID, username, avatar, profileUrl, callback) {
    Steam.getUidBySteamID(steamID, function(uid) {
      if (uid !== null) {
        // Existing User
        callback(null, {
          uid: uid
        });
      } else {
        // New User
        User.create(username, undefined, undefined, function(err, uid) {
          if (err !== null) {
            callback(err);
          } else {
            // Save steam-specific information to the user
            User.setUserField(uid, 'steamid', steamID);
            User.setUserField(uid, 'profileurl', profileUrl);
            RDB.hset('steamid:uid', steamID, uid);

            // Save their avatar
            User.setUserField(uid, 'uploadedpicture', avatar);
            User.setUserField(uid, 'picture', avatar);

            callback(null, {
              uid: uid
            });
          }
        });
      }
    });
  }

  Steam.getUidBySteamID = function(steamID, callback) {
    RDB.hget('steamid:uid', steamID, function(err, uid) {
      if (err !== null) {
        RDB.handle(err);
      }
      callback(uid);
    });
  };

  Steam.addMenuItem = function(custom_header) {
    custom_header.authentication.push({
      "route": constants.admin.route,
      "icon": constants.admin.icon,
      "name": constants.name
    });

    return custom_header;
  }

  Steam.addAdminRoute = function(custom_routes, callback) {
    fs.readFile(path.resolve(__dirname, './static/admin.tpl'), function (err, template) {
      custom_routes.routes.push({
        "route": constants.admin.route,
        "method": "get",
        "options": function(req, res, callback) {
          callback({
            req: req,
            res: res,
            route: constants.admin.route,
            name: constants.name,
            content: template
          });
        }
      });

      callback(null, custom_routes);
    });
  };

  module.exports = Steam;
}(module));