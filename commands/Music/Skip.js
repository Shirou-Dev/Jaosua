const { EmbedBuilder } = require('discord.js');
const errorReply = new EmbedBuilder();

module.exports = {
    data: {
        name: "เล่นเพลงถัดไป",
        description: "เพลงถัดไปในคิวเพลง",
    },

        run: async (client, interaction) => {

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
        
       if (player.queue.length < 1) return interaction.reply({
            embeds: [new EmbedBuilder()
                .setAuthor({ name: `❌ | ไม่มีเพลงในคิวเเล้ว`, iconURL: interaction.user.displayAvatarURL() })
                .setColor('Red')
            ],
        })
            
        player.stop();
        await client.UpdateMusic(player);
        const RTA_Skipped = new EmbedBuilder()
        .setAuthor({ name: `✅ | เล่นเพลงถัดไป`, iconURL: interaction.user.displayAvatarURL() })
        .setColor('Green')
        return interaction.reply({ embeds: [RTA_Skipped] });

    }, catch (e) {
        client.logger.danger(e)
        errorReply.setColor('Red').setDescription('เกิดข้อผิดพลาดในการใช้คําสั่ง โปรดลองใช้คําสั่งอีกครั้ง');
        return interaction.reply({ embeds: [errorReply],  ephemeral: false });
    }
}