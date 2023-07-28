const { EmbedBuilder } = require('discord.js');
const errorReply = new EmbedBuilder();

module.exports = {
    data: {
        name: "คิว",
        description: "เช็คดูคิวเพลง",
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

        const queue = player.queue

        const RTA_Queue = new EmbedBuilder()
        .setAuthor({ name: `${client.user.username} Queue Player | คิวเพลง`, iconURL: client.user.displayAvatarURL() })
        .setColor('#fef3c7')
        .setFooter({ text: `มีเพลงในคิว: ${queue.length} เพลง`, iconURL: interaction.user.displayAvatarURL() })

        const tracks = queue.slice(0, 10)

        if (queue.current) RTA_Queue.addFields({ name: 'เพลงที่กําลังเล่น', value: `\`${queue.current.title}\``, inline: true })
        if (!tracks.length) RTA_Queue.setDescription("❌ \`|\` **ไม่มีเพลงในคิว ณ ขณะนี้**")
        else RTA_Queue.setDescription(
            tracks.map((t, i) => {
                return `\`${i + 1}. ${t.title}\``
            })
            .join('\n')
        )

        return interaction.reply({ embeds: [RTA_Queue] });


    }, catch (e) {
        client.logger.danger(e)
        errorReply.setColor('Red').setDescription('เกิดข้อผิดพลาดในการใช้คําสั่ง โปรดลองใช้คําสั่งอีกครั้ง');
        return interaction.reply({ embeds: [errorReply],  ephemeral: false });
    }
}