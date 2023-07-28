/**
 * @param {import("discord.js").Client} client 
 */

module.exports = async (client, player, oldChannel, newChannel) => {

  try {
    const guild = client.guilds.cache.get(player.guild)
    if(!guild) return;

    const channel = guild.channels.cache.get(player.textChannel);
    if (!channel) return;

    /////////// Update Music Setup ///////////

    await client.UpdateQueueMsg(player);
    await client.clearInterval(client.interval);

    ////////// End Update Music Setup //////////

    if(oldChannel === newChannel) return;
    if(newChannel === null || !newChannel)
    if(!player) return;
   
} catch (e) {
  client.logger.danger(e)
  console.log(e)
}
}