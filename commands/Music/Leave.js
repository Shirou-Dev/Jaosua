const { EmbedBuilder } = require('discord.js');
const errorReply = new EmbedBuilder();

/**
     * 
     * @param {import("discord.js").Client} client 
     * @param {import("discord.js").Interaction} interaction
     */

module.exports = {
    data: {
        name: "ออกห้องเล่นเพลง",
        description: "ออกจากห้องเสียงที่กําลังเล่น",
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
        
        player.destroy()
        await client.UpdateMusic(player);
        const RTA_Leave = new EmbedBuilder()
        .setAuthor({ name: `🔇 | ออกห้องเพลงเเล้วนะะ`, iconURL: interaction.user.displayAvatarURL() })
        .setColor('Green')
        return interaction.reply({ embeds: [RTA_Leave] });

        }, catch (e) {
            client.logger.danger(e)
            errorReply.setColor('Red').setDescription('เกิดข้อผิดพลาดในการใช้คําสั่ง โปรดลองใช้คําสั่งอีกครั้ง');
            return interaction.reply({ embeds: [errorReply],  ephemeral: false });
        }
        
    }