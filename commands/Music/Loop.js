const { EmbedBuilder } = require('discord.js');
const errorReply = new EmbedBuilder();

/**
     * 
     * @param {import("discord.js").Client} client 
     * @param {import("discord.js").Interaction} interaction
     */

module.exports = {
    data: {
        name: "เล่นวนลูปเพลง",
        description: "ฟังก์ชั่น Loop ต่างๆ",
        options: [
            {
                name: "type",
                type: 3,
                description: "🔁 เลือกฟังก์ชั่น วนลูป",
                choices: [
                    {
                        name: 'วนลูปเพลง', value: 'song'
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
                embeds: [new EmbedBuilder()
                    .setColor('Red')
                    .setFooter({ text: client.user.username + " | Version " + client.config.version, iconURL: client.user.displayAvatarURL() })
                    .setTitle(`กรุณาเข้าห้องเสียงก่อนใช้งานบอท`)
                ], ephemeral: false
            });
        }

        if (player && channel.id !== player.voiceChannel)
            return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor("Red")
                    .setFooter({ text: client.user.username + " | Version " + client.config.version, iconURL: client.user.displayAvatarURL() })
                    .setTitle(`กรุณาเข้าห้องเสียงเดียวกับบอท ${client.user.username}`)
                    .setDescription(`<#${player.voiceChannel}>`)
                ], ephemeral: false
            });

        if (!player) return interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor('Red')
                .setFooter({ text: client.user.username + " | Version " + client.config.version, iconURL: client.user.displayAvatarURL() })
                .setTitle(`${client.user.username} ไม่ได้เล่นเพลงอยู่ในขณะนี้`)
            ], ephemeral: false
        });

        try {
            queue = client.SIRUManager.players.get(interaction.guild.id)

            if(!queue) return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setAuthor({ name: `❌ | ไม่มีเพลงในคิว ณ ขณะนี้!`, iconURL: interaction.user.displayAvatarURL() })
                    .setColor('Red')
                ],
            })

            if(loopfunction === 'song') {
                if (player.trackRepeat === false) {
                    await player.setTrackRepeat(true)

                    const RTA_Loopped = new EmbedBuilder()
                        .setAuthor({ name: `✅ | เปลี่ยนการวนเพลงเป็น \`เปิด Song-Loop\` เรียบร้อย`, iconURL: interaction.user.displayAvatarURL() })
                        .setColor('Green')

                    return interaction.reply({ embeds: [RTA_Loopped] });
            } else {
                await player.setTrackRepeat(false)

                const RTA_Loopped = new EmbedBuilder()
                    .setAuthor({ name: `✅ | เปลี่ยนการวนเพลงเป็น \`ปิด Song-Loop\` เรียบร้อย`, iconURL: interaction.user.displayAvatarURL() })
                    .setColor('Green')

                return interaction.reply({ embeds: [RTA_Loopped] });
            }
        } else if(loopfunction === 'queue') {
            if (player.queueRepeat == true) {
                await player.setQueueRepeat(false)

                const RTA_Loopped = new EmbedBuilder()
                    .setAuthor({ name: `✅ | เปลี่ยนการวนเพลงเป็น \`ปิด Queue-Loop\` เรียบร้อย`, iconURL: interaction.user.displayAvatarURL() })
                    .setColor('Green')

                return interaction.reply({ embeds: [RTA_Loopped] });
            } else {
                await player.setQueueRepeat(true)

                const RTA_Loopped = new EmbedBuilder()
                    .setAuthor({ name: `✅ | เปลี่ยนการวนเพลงเป็น \`เปิด Queue-Loop\` เรียบร้อย`, iconURL: interaction.user.displayAvatarURL() })
                    .setColor('Green')

                return interaction.reply({ embeds: [RTA_Loopped] });
            }
          }
        } catch (e) {
            client.logger.danger(e)
            errorReply.setColor('Red').setDescription('เกิดข้อผิดพลาดในการใช้คําสั่ง โปรดลองใช้คําสั่งอีกครั้ง');
            return interaction.reply({ embeds: [errorReply],  ephemeral: false });
        }
    }
}