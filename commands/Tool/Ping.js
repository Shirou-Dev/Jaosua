const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: "ปิงบอท",
        description: "เช็คค่าปิงต่างๆ",
    },

        run: async (client, interaction) => {

        const RTA_Ping = new EmbedBuilder()
                .setAuthor({ name: `สถานะ Ping ปัจจุบัน`, iconURL: client.user.displayAvatarURL() })
                .setColor('White')
                .setDescription(`\`Latency:\` ${Date.now() - interaction.createdTimestamp} ms\n\`API:\` ${client.ws.ping} ms`)
        await interaction.reply({
            embeds: [RTA_Ping]
        });
    }

}