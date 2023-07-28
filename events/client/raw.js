/**
 * 
 * @param {import("discord.js").Client} client 
 */

module.exports = async (client, d) => {
    client.manager.updateVoiceState(d);
}