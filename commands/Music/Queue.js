const { EmbedBuilder } = require('discord.js');
const JSA_Leave = require('./JSA_Leave');
const errorReply = new EmbedBuilder();

module.exports = {
    data: {
        name: "คิวเพลง",
        description: "เช็คดูคิวเพลง / Queue List",
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
                        color: #FF0000,
                        title: `กรุณาเข้าห้องเสียงเดียวกับบอท ${client.user.username}`,
                        description: `<#${player.voiceChannel}>`,
                        footer: {
                            text: client.user.username + " | Version " + client.config.version,
                            icon_url: client.user.displayAvatarURL(),
                        }
                    }
                ], ephemeral: true
            });

        if (!player) return interaction.reply({
            embeds: [
                {
                    color: #FF0000,
                    title: `${client.user.username} ไม่ได้เล่นเพลงอยู่ในขณะนี้`,
                    footer: {
                        text: client.user.username + " | Version " + client.config.version,
                        icon_url: client.user.displayAvatarURL(),
                    }
                }
            ], ephemeral: true
        });

        const queue = player.queue

        const tracks = queue.slice(0,10);

        const JSAQueue = {
                    color: #fef3c7,
                    author: {
                        name: `${client.user.username} Queue Player`,
                        icon_url: client.user.displayAvatarURL(),
                    },
                    footer: {
                        text: `มีเพลงในคิว: ${queue.length} เพลง`,
                        icon_url: interaction.user.displayAvatarURL(),
                    }
        }

        if (queue.current)
            JSAQueue = {
                        fields: [
                            {
                                name: "กําลังเล่นเพลง",
                                value: `\`${queue.current.title}\``,
                                inline: true,
                            }
                        ]
        }
                
        if (!tracks.length) 
            JSAQueue = {
                    description: "❌ \`|\` **ไม่มีเพลงในคิว ณ ขณะนี้**",
            }
        else
            JSAQueue = {
                    description: tracks.map((t, i) => {
                        return `\`${i + 1}. ${t.title}\``
                    }) .join('\n')
        }
            
        

        return interaction.reply({ embeds: [ JSAQueue ], ephemeral: false })

        //if (queue.current) RTA_Queue.addFields({ name: 'เพลงที่กําลังเล่น', value: `\`${queue.current.title}\``, inline: true })
        //if (!tracks.length) RTA_Queue.setDescription("❌ \`|\` **ไม่มีเพลงในคิว ณ ขณะนี้**")
        //else RTA_Queue.setDescription(
            //tracks.map((t, i) => {
                //return `\`${i + 1}. ${t.title}\``
            //})
            //.join('\n')
        //)


    }, catch (e) {
        client.logger.danger(e)
        errorReply.setColor('Red').setDescription('เกิดข้อผิดพลาดในการใช้คําสั่ง โปรดลองใช้คําสั่งอีกครั้ง');
        return interaction.reply({
            embeds: [
                {
                    color: #FF0000,
                    description: `เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้ง | ${e}`,
                    footer: {
                        text: `Report By ${client.user.username}`,
                        icon_url: interaction.user.displayAvatarURL(),
                    }
                }
            ],  ephemeral: false });
    }
}