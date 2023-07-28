const { ActivityType } = require("discord.js");

/**
 * 
 * @param {import("discord.js").Client} client 
 */

module.exports = async (client) => {
  try {

      if (process.env.NODE_ENV === 'production') {
        client.user.setPresence({
          activities: [{ name: "/สร้างห้องเพลง | Jaosua", type: ActivityType.Watching }],
          status: 'online',
      })
    }

    if (process.env.NODE_ENV === 'development') {
      client.user.setPresence({
        activities: [{ name: "กําลังอัพเดตระบบ...", type: ActivityType.Watching }],
        status: 'dnd',
    })
  }
  
    client.logger.success(`${client.user.tag} is Ready!`);
    
    client.manager.init(client.user.id);

   const channel = client.channels.cache.get('1109514801975140463');
   const webhooks = await channel.fetchWebhooks();
   const webhookClient = webhooks.find(wh => wh.token);

   if (!webhookClient) {
    return logger.warning('ไม่พบ Webhook ที่จะใช้!!');
  }

    const embed = new EmbedBuilder()
        .setAuthor({ name: 'สถานะบอท', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        .setColor('White')
        .setDescription(`**Status:** ${client.user} \n\n${client.user.presence.status ? "**[ ออนไลน์ 🟢 ]**" : "**[ Disconnected 🔴 ]**"}`)
        .setFooter({ text: "อัพเดตล่าสุด" })
        .setTimestamp(Date.now());

    const embed2 = new EmbedBuilder()
        .setAuthor({ name: `สถานะบอท`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        .setColor('Yellow')
        .setDescription(`**Status:** ${client.user} \n\n**[ ปรับปรุงระบบ ⚙️ ]**`)
        .setFooter({ text: "อัพเดตล่าสุด" })
        .setTimestamp(Date.now());
  
    if (process.env.NODE_ENV === 'production') {
     webhookClient.send({
      content: '<@876524312344014890> <@430037313586724866>',
      embeds: [embed],
    })
  }
    if (process.env.NODE_ENV === 'development') {
      webhookClient.send({
      content: '<@876524312344014890> <@430037313586724866>',
      embeds: [embed2],
    })
  }
    } catch (e) {
      client.logger.danger(e)
      console.log(e)
    }
  }