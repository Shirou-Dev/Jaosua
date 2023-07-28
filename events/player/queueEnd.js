/**
 * @param {import("discord.js").Client} client 
 */

module.exports = async (client, player) => {

	try {

    const channel = client.channels.cache.get(player.textChannel);
	if (!channel) return;

	if (player.twentyFourSeven) return;

	/////////// Update Music Setup ///////////

	await client.UpdateMusic(player);
	await client.clearInterval(client.interval);

	const db = await client.setup.findOne({ guild: channel.guild.id });
  	if (db.enable) return player.destroy();
	
	} catch (e) {
    	client.logger.danger(e)
    	console.log(e)
	}
}