const { EmbedBuilder } = require("discord.js")
const prettyBytes = require("pretty-bytes");
const moment = require("moment");
const errorReply = new EmbedBuilder();
require("moment-duration-format");

    /**
     * 
     * @param {import("discord.js").Client} client 
     * @param {import("discord.js").Interaction} interaction
     */

     module.exports = {
        data: {
            name: "สเตตัส",
            description: "เช็คระบบ Status-System",
            options: [
                {
                    name: "type",
                    type: 3,
                    description: "Player & Node Status",
                    choices: [
                        {
                            name: 'Player', value: 'player'
                        },
                        {
                            name: 'Player-Dev', value: 'playerdev'
                        },
                        {
                            name: 'Node', value: 'node'
                        }
                    ],
                    required: true
                }
            ]
        }, 

        run: async (client, interaction) => {

    try {

            const pingfunction = interaction.options.getString("type")

        if(pingfunction === 'player') {

                let player = client.manager.players.get(interaction.guild.id)

                const channel = interaction.member.voice?.channel;

            if (!channel) {
                return interaction.reply({
                    embeds: [new EmbedBuilder()
                        .setColor("Red")
                        .setFooter({ text: client.user.username + " | Version " + client.config.version, iconURL: client.user.displayAvatarURL() })
                        .setTitle(`กรุณาเข้าห้องเสียงก่อนใช้งานคําสั่งนี้`)
                    ], ephemeral: false
                });
            }

            if (!player) return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor('Red')
                    .setFooter({ text: client.user.username + " | Version " + client.config.version, iconURL: client.user.displayAvatarURL() })
                    .setTitle(`${client.user.username} ไม่ได้เล่นเพลงอยู่ในขณะนี้`)
                ], ephemeral: false
            });

                await interaction.reply({
                    embeds: [new EmbedBuilder()
                        .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                        .setDescription('**__Player Status__**')
                        .setColor('White')
                        .addFields(
                            {
                                name: `${interaction.guild.name} [ <#${player.voiceChannel}> ]`,
                                value: `\`\`\`css\nPing Player: ${player.wsPing} ms\nPlayer Region: ${channel?.rtcRegion || undefined}\nPlayer Connected: ${player.connected}\`\`\``,
                                inline: true,
                            }
                        )
                    ]
                })

        } else if(pingfunction === 'playerdev') {

            if (interaction.user.id !== '876524312344014890')
            return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor("Red")
                    .setFooter({ text: client.user.username + " | Version " + client.config.version, iconURL: client.user.displayAvatarURL() })
                    .setTitle(`คุณไม่ใช่เจ้าของคําสั่งนี้!`)
                ], ephemeral: false
            });

            const RTA_PlayerDev = client.manager.players.map((player) => {

            const guild = client.guilds.cache.get(player.guild)

                return {
                            name: `${guild.name}`,
                            value: `\`\`\`css\nPing Player: ${player.wsPing} ms\nPlayer Region: ${player?.region || undefined}\nPlayer Connected: ${player.connected}\`\`\``,
                            inline: true,
                        }
                    })

            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                    .setDescription('**__All Player Status__**')
                    .setColor('White')
                    .addFields(RTA_PlayerDev)
                ]
            })
        } else if(pingfunction === 'node') {

            const RTA_Node = client.manager.nodes.map((node) => {
                return {
                            name: `${node.connected ? "🟢" : "🔴"} ${node.options.identifier}`,
                            value: `\`\`\`css\nการทํางานซีพียู: ${(Math.round(node.stats.cpu.systemLoad * 100) / 100).toFixed(2)}%\nเชื่อมต่อ: ${node.stats.players} ห้อง\nกําลังเล่น: ${node.stats.playingPlayers} ห้อง\nเเรมกําลังใช้งาน: ${prettyBytes(node.stats.memory.used)}\nเเรมลิมิต: ${prettyBytes(node.stats.memory.reservable)}\nUptime: ${moment.duration(node.stats.uptime).format(" d[d] h[h] m[m] ")}\`\`\``,
                            inline: true,
                        }
                    })
                    
            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                    .setDescription('**__Node Status__**')
                    .setColor('White')
                    .addFields(RTA_Node)
                ]
            })
        }

        } catch (e) {
            console.log(e)
            client.logger.danger(e)
            errorReply.setColor('Red').setDescription('เกิดข้อผิดพลาดในการใช้คําสั่ง โปรดลองใช้คําสั่งอีกครั้ง');
            return interaction.reply({ embeds: [errorReply],  ephemeral: true });
        }
    }
}
