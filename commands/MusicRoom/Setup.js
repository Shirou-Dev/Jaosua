const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: "สร้างห้องเพลง",
        description: "ระบบสร้างห้อง Jaosua-MusicRoom",
        default_member_permissions: "5"
    },

     /**
     * 
     * @param {import("discord.js").Client} client 
     * @param {import("discord.js").Interaction} interaction
     */
    run: async (client, interaction, player, language) => {
        await interaction.deferReply({ ephemeral: false });

        if (player) player.destroy();

        await interaction.guild.channels.create({
            name: "🎵︱jaosua",
            type: 0,
            parent: interaction.channel.parentId,
        }).then(async (channel) => {

        const playEmbed = new EmbedBuilder()
            .setColor('White')
            .setAuthor({ name: `${client.i18n.get(language, "setup", "setup_playembed_author")}`, iconURL: client.user.displayAvatarURL()})
            .setDescription(`${client.i18n.get(language, "setup", "setup_content_empty")}`)
            .setImage(`${client.i18n.get(language, "setup", "setup_playembed_image")}`)
            .setFooter({ text: `${client.i18n.get(language, "setup", "setup_playembed_footer", {
                prefix: "/"
            })}` });

            await channel.setRateLimitPerUser(5, "reason");

            await channel.send({ embeds: [playEmbed], components: [client.InviteSwitch] }).then(async (playmsg) => {
                await client.setup.findOneAndUpdate({ guild: interaction.guild.id }, { 
                    guild: interaction.guild.id,
                    enable: true,
                    channel: channel.id,
                    playmsg: playmsg.id,
                });
                client.logger.setup(`Setup MUSIC-ROOM > [ ${interaction.guild.name} (${interaction.guild.id}) ]`)

                const embed = new EmbedBuilder()
                .setDescription(`${client.i18n.get(language, "setup", "setup_msg", {
                    channel: channel,
                })}`)
                .setColor('White');
                
                return interaction.followUp({ embeds: [embed] });
            }
        )}
    )}
}