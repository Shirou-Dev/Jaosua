const { EmbedBuilder } = require('discord.js');
const errorReply = new EmbedBuilder();

/**
     * 
     * @param {import("discord.js").Client} client 
     * @param {import("discord.js").Interaction} interaction
     */

module.exports = {
    data: {
        name: "ออกห้องเสียง",
        description: "ออกจากห้องเสียงที่กําลังเล่น / Leave22222",
    },

        run: async (client, interaction) => {
            const channel = interaction.member.voice?.channel;
            var player = client.manager.players.get(interaction.guild.id)
            
        if (!channel) {
            return interaction.reply({
                embeds: [
                {
                        color: #FF0000,
                        title: "กรุณาเข้าห้องเสียงก่อนใข้งานบอท",
                        footer: {
                            text: client.user.username + " | Version " + client.config.version,
                            icon_url: client.user.displayAvatarURL(),
                        }
                    }
                ], ephemeral: false,
            });
        }

        if (player && channel.id !== player.voiceChannel)
            return interaction.reply({
                embeds: [
                    {
                        color: #FF0000,
                        title: `กรุณาเข้าห้องเสียงเดียวกับบอท ${client.user.username}`,
                        description: `<#${player.voiceChannel}>`,
                        footer: {
                            text: client.user.username + " | Version " + client.config.version,
                            icon_url: client.user.displayAvatarURL(),
                        }
                    }
                ], ephemeral: false,
            });

        if (!player) return interaction.reply({
            embeds: [
                {
                    color: #FF0000,
                    title: `ไม่ได้เล่นเพลงอยู่ในขณะนี้ ${client.user.username}`,
                    footer: {
                        text: client.user.username + " | Version " + client.config.version,
                        icon_url: client.user.displayAvatarURL(),
                    }
                }
            ], ephemeral: false
        });
        
        player.destroy()

        return interaction.reply({
            embeds: [
                {
                    color: rgb(0, 250, 154),
                    author: {
                        name: '🔇 | ออกห้องเสียงเเล้วนะ!!',
                        icon_url: interaction.user.displayAvatarURL(),
                    },
                }
            ]
        });

        }, catch (e) {
            client.logger.danger(e)
            return interaction.reply({
                embeds: [
                    {
                        color: #FF0000,
                        description: `เกิดข้อผิดพลาด โปรดลองใหมอีกครั้ง | ${e}`,
                        footer: {
                            name: `Report By ${client.user.username}`,
                            icon_url: interaction.user.displayAvatarURL(),
                        }
                    }
                ],  ephemeral: true
            });
        }
    }