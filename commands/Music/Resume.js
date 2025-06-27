const { EmbedBuilder } = require('discord.js');
const errorReply = new EmbedBuilder();

/**
     * 
     * @param {import("discord.js").Client} client 
     * @param {import("discord.js").Interaction} interaction
     */

module.exports = {
    data: {
        name: "เล่นเพลงต่อ",
        description: "เล่นเพลงต่อในคิวเพลง",
    },

        run: async (client, interaction) => {

            const channel = interaction.member.voice?.channel;
            var player = client.manager.players.get(interaction.guild.id)
            
            if (!channel) {
                return interaction.reply({
                    embeds: [
                        {
                            color: #FF0000,
                            title: "กรุณาเข้าห้องเสียงก่อนใช้งานบอท",
                            footer: {
                                text: client.user.username + " | Version" + client.config.version,
                                icon_url: client.user.displayAvatarURL(),
                            }
                        }
                    ], ephemeral: false
                })
            }

            if (player && channel.id !== player.voiceChannel)
                return interaction.reply({
                    embeds: [
                        {
                            color: #FF0000,
                            title: `กรุณาเข้าห้องเสียงเดียวกับบอท ${client.user.username}`,
                            description: `<#${player.voiceChannel}`,
                            footer: {
                                text: client.user.username + " | Version " + client.config.version,
                                icon_url: client.user.displayAvatarURL(),
                            }
                        }
                    ], ephemeral: false
                });

            if (!player) return interaction.reply({
                embeds: [
                    {
                        color: #FF0000,
                        title: `${client.user.username} ไม่ได้เล่นเพลงอยู่ในขณะนี้`,
                        footer: {
                            text: client.user.username + " | Version " + client.config.version,
                            icon_url: client.user.displayAvatarURL()
                        }
                    }
                ], ephemeral: false
            });
        
            player.pause(false);
            await interaction.reply({
                embeds: [
                    {
                        color: rgb(80,200,120),
                        author: {
                            name: "🎶 | เล่นเพลงต่อ",
                            icon_url: interaction.user.displayAvatarURL(),
                        }
                    }
                ]
            });

        }, catch (e) {
            client.logger.danger(e)
            errorReply.setColor('Red').setDescription('เกิดข้อผิดพลาดในการใช้คําสั่ง โปรดลองใช้คําสั่งอีกครั้ง');
            return interaction.reply({ embeds: [errorReply],  ephemeral: true });
        }
    }