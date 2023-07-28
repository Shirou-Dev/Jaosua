const { EmbedBuilder } = require('discord.js');
const errorReply = new EmbedBuilder();

/**
     * 
     * @param {import("discord.js").Client} client 
     * @param {import("discord.js").Interaction} interaction
     */

module.exports = {
    data: {
        name: "ปรับระดับเสียง",
        description: "ปรับระดับเสียงของเพลง",
        options: [
            {
                name: "vol",
                type: 3,
                description: "ปรับระดับเสียงตั้งเเต่ 0-100 %",
                required: true
            }
        ]
    },

        run: async (client, interaction) => {


            const volume = interaction.options.getString("vol");
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
        
       if (volume < 1 || volume > 100) return interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor('Red')
                .setDescription("❌ | ปรับระดับเสียงได้ถึง 1-100 เท่านั้น!")
            ],
        })
            
        player.setVolume(Number(volume));
        await client.UpdateQueueMsg(player);
        const RTA_Volumed = new EmbedBuilder()
        .setAuthor({ name: `✅ | ปรับระดับเสียงเป็น ${volume}% เรียบร้อย`, iconURL: interaction.user.displayAvatarURL() })
        .setColor('Green')
        await interaction.reply({ embeds: [RTA_Volumed] });

    }, catch (e) {
        client.logger.danger(e)
        errorReply.setColor('Red').setDescription('เกิดข้อผิดพลาดในการใช้คําสั่ง โปรดลองใช้คําสั่งอีกครั้ง');
        return interaction.reply({ embeds: [errorReply],  ephemeral: false });
    }
}