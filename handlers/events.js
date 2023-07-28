const fs = require("fs");

/**
 * 
 * @param {import("discord.js").Client} client 
 */

module.exports = (client) => {
    client.events = new Array()
    try {
    const loadcommand = dirs => {
    const events = fs.readdirSync(`./events/${dirs}/`).filter(d => d.endsWith('.js'));
        for (let file of events) {
            const evt = require(`../events/${dirs}/${file}`);
            const eName = file.split('.')[0];
            client.on(eName, evt.bind(null, client));
            client.logger.debug(`Loaded Event ${eName}`);
        }
    };
        ["client", "guild"].forEach((x) => loadcommand(x));
    } catch (e) {
        client.logger.danger(String(e))
    }
    // try {
    //     fs.readdirSync("./events").filter(file => file.endsWith(`.js`)).forEach(fileName => {
    //         try {
    //             const event = require(`../events/${fileName}`);
    //             const eventName = fileName.split(".")[0]
    //             client.events.push(eventName);
    //             client.on(eventName, event.bind(null, client));
    //             logger.debug(`Loaded Event ${eventName}`);
    //         } catch (e) {
    //             logger.danger(String(e))
    //             logger.danger(`Can't Not ReadFile "/events/${fileName}"`)
    //         }
            
    //     })
    // } catch (e) {
    //     logger.danger(`${String(e)}`)
    // }
}