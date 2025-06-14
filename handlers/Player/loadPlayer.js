const { readdirSync } = require("fs");

module.exports = async (client) => {
    try {
        readdirSync("./events/player/").forEach(file => {
            const event = require(`../../events/player/${file}`);
            let eventName = file.split(".")[0];
            client.manager.on(eventName, event.bind(null, client));
            client.logger.debug(`Loaded Player: ${eventName}`);

        });
    } catch (e) {
        console.log(e);
    }
};