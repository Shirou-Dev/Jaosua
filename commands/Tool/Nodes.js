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
            name: "โหนด",
            description: "เช็คสถานะ Node-Lavalink",
        }, 

        run: async (client, interaction) => {

            try {

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
                .setDescription('**__Node Lavalink Status__**')
                .setColor('White')
                .addFields(RTA_Node)
                ]
            })

        } catch (e) {
            client.logger.danger(e)
            console.log(e)
        }

    }, catch (e) {
        client.logger.danger(e)
        errorReply.setColor('Red').setDescription('เกิดข้อผิดพลาดในการใช้คําสั่ง โปรดลองใช้คําสั่งอีกครั้ง');
        return interaction.reply({ embeds: [errorReply],  ephemeral: true });
    }
}
