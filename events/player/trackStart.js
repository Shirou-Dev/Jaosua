/**
 * @param {import("discord.js").Client} client 
 */

module.exports = async (client, player, track) => {
  try {

  client.logger.music(`Track Start > [ ${track.title} ] > [ ${track.uri} ] > [ ${player.guild} ]`);

  if(!player) return;

  /////////// Update Music Setup ///////////

  await client.UpdateQueueMsg(player);
  await client.clearInterval(client.interval);

  /////////// Update Music Setup ///////////

  const channel = client.channels.cache.get(player.textChannel);
  if (!channel) return;

  const db = await client.setup.findOne({ guild: channel.guild.id });
  if (db.enable) return;

  } catch (e) {
    client.logger.danger(e)
    console.log(e)
}

};