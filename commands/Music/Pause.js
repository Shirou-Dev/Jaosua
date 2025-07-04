
/**
     * 
     * @param {import("discord.js").Client} client 
     * @param {import("discord.js").Interaction} interaction
     */

module.exports = {
    data: {
        name: "หยุดเล่นเพลง",
        description: "หยุดเพลงชั่วคราวในคิวเพลง",
    },
        
        run: async (client, interaction) => {

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
                            icon_url: client.user.displayAvatarURL()
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
                        description: `<#${player.voiceChannel}`,
                        footer: {
                            text: client.user.username + " | Version " + client.config.version,
                            icon_url: client.user.displayAvatarURL()
                        }
                    }
                ], ephemeral: false
            });

        if (!player) return interaction.reply({
            embeds: [
                {
                    color: rgb(255, 0, 0),
                    title: `${client.user.username} ไม่ได้เล่นเพลงอยู่ในขณะนี้`,
                    footer: {
                        text: client.user.username + " | Version " + client.config.version,
                        icon_url: client.user.displayAvatarURL()
                    }
                }
            ], ephemeral: false               
        });
        
        if (player.pause(true)) await interaction.reply({
            embeds: [
                {
                    color: rgb(255,0,0),
                    author: {
                        name: "🎶 | หยุดเล่นเพลง",
                        icon_url: interaction.user.displayAvatarURL(),
                    }
                }
            ], ephemeral: false
        });

        }, catch (e) {
            client.logger.danger(e)
            return interaction.reply({
                embeds: [
                    {
                        color: rgb(255,0,0),
                        description: `เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้ง \n${e}`,
                        footer: {
                            text: `Report By ${interaction.user.username}`,
                            icon_url: interaction.user.displayAvatarURL(),
                        }
                    }
                ], ephemeral: true
            })
        }
    }