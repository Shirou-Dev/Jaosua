const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
const os = require('os');
const prettyBytes = require("pretty-bytes");
const moment = require("moment");
require("moment-duration-format");
const errorReply = new EmbedBuilder();

    /**
     * 
     * @param {import("discord.js").Client} client 
     * @param {import("discord.js").Interaction} interaction
     */

     module.exports = {
        data: {
            name: "ข้อมูลบอท",
            description: "เช็ครายละเอียดบอท",
        },

        run: async (client, interaction) => {

        try {

             if (interaction.commandName === 'ข้อมูลบอท') {
                 const DcButton = new ActionRowBuilder()
                     .addComponents(
                         new ButtonBuilder()
                             .setURL(`${client.config.dcurl}`)
                             .setEmoji('1068597419912204469')
                             .setLabel('Rotia | Support')
                             .setStyle(ButtonStyle.Link),
                     );
                 const InviteButton = new ActionRowBuilder()
                 .addComponents(
                         new ButtonBuilder()
                             .setURL(`${client.config.inviteurl}`)
                             .setLabel('เชิญบอท')
                             .setEmoji('1068583137971552336')
                             .setStyle(ButtonStyle.Link),
                     );
                
            var node = client.manager.nodes.first(1)
            
            const node_Players = node[0].stats.players
            const node_playingPlayers = node[0].stats.playingPlayers
            const node_connect = node[0].connected ? "Online" : "Offline"
                        
                const RTA_BotInfo = new EmbedBuilder()
                .setAuthor({name: `${client.user.username} Info`, iconURL: client.user.displayAvatarURL()})
                .setColor('White')
                .addFields({ name: 'รายละเอียดเครื่องเชิฟเวอร์', value: `\`\`\`css\nซีพียู: Intel Core I7-9700\nเเรมกําลังใช้งาน: ${prettyBytes(process.memoryUsage().heapUsed)}\nเเรมลิมิต: ${prettyBytes(os.totalmem())}\`\`\``, inline: false },)
                .addFields({ name: 'ข้อมูลเชิฟเวอร์ & จํานวนคน', value: `\`\`\`css\nเชิฟเวอร์: ${client.guilds.cache.size} เชิฟเวอร์\nสมาชิก: ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} คน\nห้องเเชท: ${client.channels.cache.size} ห้อง\`\`\``, inline: false },)
                .addFields({ name: 'สถานะบอท', value: `\`\`\`css\nNode Status: ${node_connect}\nเชื่อมต่อ: ${node_Players} ห้อง\nกําลังเล่น: ${node_playingPlayers} ห้อง\`\`\``, inline: true },)
                .setFooter({ text: `Uptime : ${moment.duration(client.uptime).format(" d [วัน] h [ชั่วโมง] m [นาที] s [วินาที] ")}`, })

                await interaction.reply({ embeds: [RTA_BotInfo], components: [DcButton, InviteButton] })
        }

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
