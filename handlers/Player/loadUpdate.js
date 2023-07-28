const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const errorReply = new EmbedBuilder();
  
module.exports = async (client, language) => {

try {

    client.UpdateQueueMsg = async function (player) {
        const database = await client.setup.findOne({ guild: player.guild });
        if (database.enable === false) return;

        const channel = await client.channels.cache.get(database.channel);
        if (!channel) return;

        const msg = await channel.messages.fetch(database.playmsg, { cache: false, force: true });
        if (!msg) return;


                                /////////// Button Music UI ///////////

                const enable2 = client.button.song_request_on;

                    const enSwitch = new ActionRowBuilder()
                            .addComponents([
                                new ButtonBuilder()
                                    .setStyle(ButtonStyle[enable2.pause.style])
                                    .setCustomId("spause")
                                    .setLabel(enable2.pause.label)
                                    .setEmoji('1117334470102626364'),
                                new ButtonBuilder()
                                    .setStyle(ButtonStyle[enable2.stop.style])
                                    .setCustomId("sstop")
                                    .setLabel(enable2.stop.label)
                                    .setEmoji('1117338497183907870'),
                                new ButtonBuilder()
                                    .setStyle(ButtonStyle[enable2.skip.style])
                                    .setCustomId("sskip")
                                    .setLabel(enable2.skip.label)
                                    .setEmoji('1117334789968637982'),
                                new ButtonBuilder()
                                    .setStyle(ButtonStyle[enable2.loop.style])
                                    .setCustomId("sloop")
                                    .setLabel(enable2.loop.label)
                                    .setEmoji('1117338467874119731'),
                                new ButtonBuilder()
                                    .setStyle(ButtonStyle[enable2.afk.style])
                                    .setCustomId("safk")
                                    .setLabel(enable2.afk.label)
                                    .setEmoji('1130067588093853736'),
                            ])

                    const enSwitch2 = new ActionRowBuilder()
                    .addComponents([
                        new ButtonBuilder()
                            .setStyle(ButtonStyle[enable2.vol.style])
                            .setCustomId("svol")
                            .setLabel(`Volume: ${player.volume}%`)
                            .setEmoji('1117339480882425856'),
                        ])

                                    /////////// Update UI Music ///////////
  
        const songStrings = [];
        const queuedSongs = player.queue.map((song, i) => `${client.i18n.get(language, "setup", "setup_content_queue", {
            index: i + 1,
            title: song.title,
            duration: moment.duration(song.duration).format('hh:mm:ss'),
            request: song.requester.username,
        })}`);

        songStrings.push(...queuedSongs);

        const Str = songStrings.slice(0, 10).join('\n');

        const queue = player.queue

        const afkui = player.twentyFourSeven ? 'เปิดใช้งาน' : 'ปิดใช้งาน';

        const played = player.playing ? `${client.i18n.get(language, "setup", "setup_nowplay")}` : `${client.i18n.get(language, "setup", "setup_songpause")}`;

        const EmbedPlay = new EmbedBuilder()
            .setAuthor({ name: `${played}`, iconURL: client.user.displayAvatarURL() })
            .setDescription(`${client.i18n.get(language, "setup", "setup_desc", {
                titleui: queue.current.title,
                durationui: moment.duration(queue.current.duration).format('hh:mm:ss'),
                requestui: queue.current.requester.username,
            })}`)
            .setImage(`${client.i18n.get(language, "setup", "setup_playembed_image")}`)
            .setColor('White')
            .setFooter({ text: `${client.i18n.get(language, "setup", "setup_footer", {
                requestui: queue.current.requester.username,
                nodeName: player.node.options.identifier,
                volume: player.volume,
                afk: afkui
            })}`, iconURL: player.queue.current.requester.displayAvatarURL() })

        return msg.edit({ 
            content: `${client.i18n.get(language, "setup", "setup_content", {
                queue: player.queue.length,
            })}\n\n${Str == '' ? `${client.i18n.get(language, "setup", "setup_content_queuetrack")}` : Str}`, 
            embeds: [EmbedPlay],
            components: [enSwitch, enSwitch2]
        }).catch((e) => 
            client.logger.danger(e),

    client.UpdateMusic = async function (player) {
        const database = await client.setup.findOne({ guild: player.guild });
        if (database.enable === false) return;

        const channel = await client.channels.cache.get(database.channel);
        if (!channel) return;

        const msg = await channel.messages.fetch(database.playmsg, { cache: true, force: true });
        if (!msg) return;

        const playEmbed = new EmbedBuilder()
          .setColor('White')
          .setAuthor({ name: `${client.i18n.get(language, "setup", "setup_playembed_author")}`, iconURL: client.user.displayAvatarURL() })
          .setDescription(`${client.i18n.get(language, "setup", "setup_content_empty")}`)
          .setImage(`${client.i18n.get(language, "setup", "setup_playembed_image")}`)

        return msg.edit({
            content: ' ',
            embeds: [playEmbed],
            components: [client.InviteSwitch]
        }).catch((e) => 
            client.logger.danger(e)
        )})
    }

  } catch (e) {
    client.logger.danger(e)
    errorReply.setColor('Red').setDescription('เกิดข้อผิดพลาดในการใช้คําสั่ง โปรดลองใช้คําสั่งอีกครั้ง');
    return interaction.reply({ embeds: [errorReply],  ephemeral: false });
  }
}   