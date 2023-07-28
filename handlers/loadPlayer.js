const { readdirSync } = require('fs');
const colors = require('colors');

module.exports = (client) => {
    require("./Player/loadPlayer.js")(client);
    require("./Player/loadSetup.js")(client);
    require("./Player/loadUpdate.js")(client);
    client.logger.debug('Player Loaded!')
};