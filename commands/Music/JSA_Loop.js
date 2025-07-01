const { EmbedBuilder } = require('discord.js');
const errorReply = new EmbedBuilder();

/**
     * 
     * @param {import("discord.js").Client} client 
     * @param {import("discord.js").Interaction} interaction
     */

module.exports = {
    data: {
        name: "เล่นวนลูป",
        description: "ฟังก์ชั่น / Function Loop",
        options: [
            {
                name: "type",
                type: 3,
                description: "🔁 เลือกฟังก์ชั่น Loop",
                choices: [
                    {
                        name: 'วนลูปเพลงเดียว', value: 'song'
                    },
                    {
                        name: 'วนลูปคิวเพลง', value: 'queue'
                    }
                ],
                required: true
            }
        ]
    },

        run: async (client, interaction) => {

            const loopfunction = interaction.options.getString("type")

            const channel = interaction.member.voice?.channel;
            var player = client.manager.players.get(interaction.guild.id)
            
        if (!channel) {
            return interaction.reply({
                embeds: [
                    {
                        color: rgb(255, 0, 0),
                        title: "กรุณาเข้าห้องเสียงก่อนใช้งานบอท",
                        footer: {
                            text: client.user.username + " | Version " + client.config.version,
                            icon_url: client.user.displayAvatarURL(),
                        }
                    }
                ], ephemeral: false
            });
        }

        if (player && channel.id !== player.voiceChannel)
            return interaction.reply({
                embeds: [
                    {
                        color: rgb(255, 0, 0),
                        title: `กรุณาเข้าห้องเสียงเดียวกับบอท ${client.user.username}`,
                        description: `<#${player.voiceChannel}>`,
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
                        color: rgb(255, 0, 0),
                        title:`ไม่ได้เล่นเพลงอยู่ในขณะนี้ ${client.user.username}`,
                        footer: {
                            text: client.user.username + " | Version " + client.config.version,
                            icon_url: client.user.displayAvatarURL()
                        }
                    }
                ], ephemeral: false
            });

        try {
            queue = client.SIRUManager.players.get(interaction.guild.id)

            if(!queue) return interaction.reply({
                embeds: [
                    {
                        color: rgb(255, 0, 0),
                        author: {
                            name: '❌ | ไม่มีเพลงในคิว!!',
                            icon_url: interaction.user.displayAvatarURL(),
                        }
                    }
                ]
            })

            if(loopfunction === 'song') {

                if (player.trackRepeat === false) {

                    await player.setTrackRepeat(true)

                    return interaction.reply({
                        embeds: [
                            {
                                color: rgb(0,255,0),
                                author: {
                                    name: '✅ | \`On Song-Loop\`',
                                    icon_url: interaction.user.displayAvatarURL(),
                                }
                            }
                        ], ephemeral: true
                    });

            } else {

                await player.setTrackRepeat(false)

                return interaction.reply({
                    embeds: [
                        {
                            color: rgb(255, 0, 0),
                            author: {
                                name: '❌ | \`Off Song-Loop\`',
                                icon_url: interaction.user.displayAvatarURL(),
                            }
                        }
                    ], ephemeral: true
                });
            }

        } else if(loopfunction === 'queue') {

            if (player.queueRepeat == true) {

                await player.setQueueRepeat(false)

                return interaction.reply({
                    embeds: [
                        {
                            author: {
                                name: '❌ | \`Off Queue-Loop\`',
                                icon_url: interaction.user.displayAvatarURL(),
                            },
                            color: rgb(255, 0, 0),
                        }
                    ], ephemeral: true
                });

            } else {
                await player.setQueueRepeat(true)
                
                return interaction.reply({
                    embeds: [
                        {
                            author: {
                                name: '✅ | \`On Queue-Loop\`',
                                icon_url: interaction.user.displayAvatarURL(),
                            },
                            color: rgb(0,255,0),
                        }
                    ], ephemeral: true
                });
            }
          }
        } catch (e) {
            client.logger.danger(e)

            return interaction.reply({
                embeds: [
                    {
                        color: rgb(255, 0, 0),
                        description: `เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้ง | ${e}`,
                        footer: {
                            name: `Report By ${client.user.username}`,
                            icon_url: interaction.user.displayAvatarURL(),
                        }
                    }
                ], ephemeral: true
            });
        }
    }
}