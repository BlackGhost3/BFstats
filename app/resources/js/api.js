const BattlefieldStats = require('battlefield-stats');
let api = {};

api.bf = function (gt, plat, g) {
    return new Promise(function(resolve, reject) {
        const BattlefieldStats = require('battlefield-stats');
        const API_KEY = 'YOUR API KEY'; // get it from https://battlefieldtracker.com/site-api
        const bf = new BattlefieldStats(API_KEY);

        // All params mirror params listed at http://docs.trnbattlefield.apiary.io/#
        const params = {
          platform: bf.Platforms[plat],
          displayName: gt.toString(),  // Or you can use personaId
          game: g.toString()
        }
        bf.Stats.basicStats(params, (error, response) => {
          if(error)
            reject(error);

            if(!error)
                response.profile.game = g.toString();
                
            resolve(response);
        });
    });
}

module.exports = api;
