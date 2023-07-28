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
                .setTitle(`Shirou Music ไม่ได้เล่นเพลงอยู่ในขณะนี้`)
            ], ephemeral: false
        });
        
        player.pause(false);
        const RTA_Resume = new EmbedBuilder()
        .setAuthor({ name: `🎵 | เล่นเพลงต่อ`, iconURL: interaction.user.displayAvatarURL() })
        .setColor('Green')
        await interaction.reply({ embeds: [RTA_Resume] });

        }, catch (e) {
            client.logger.danger(e)
            errorReply.setColor('Red').setDescription('เกิดข้อผิดพลาดในการใช้คําสั่ง โปรดลองใช้คําสั่งอีกครั้ง');
            return interaction.reply({ embeds: [errorReply],  ephemeral: true });
        }
    }