const { EmbedBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, ButtonStyle, ButtonBuilder } = require('discord.js');
const errorReply = new EmbedBuilder();

/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").Interaction} interaction
 */
module.exports = async (client, interaction, language) => {


    if (process.env.NODE_ENV === 'production') {

  if (interaction.isModalSubmit()) {

    try {

    const player = await client.manager.get(interaction.guild.id);
    if (!player) return;

    if (interaction.customId === 'volume-modal') {
        client.UpdateQueueMsg(player);
        client.clearInterval(client.interval);
        const response = interaction.fields.getTextInputValue('volume-input');

        if (isNaN(response)) return
        if (response > 100 || response < 1) return
        await player.setVolume(response);
        interaction.reply({
            embeds: [new EmbedBuilder()
                .setAuthor({ name: `✅ | ปรับระดับเสียงเป็น ${response}% เรียบร้อย`, iconURL: interaction.user.displayAvatarURL() })
                .setColor('Green')
            ], ephemeral: true
            })
        }
    } catch (e) {
        console.log(e)
        }
    }

  if (interaction.isButton()) {

    try {

    const { customId, member } = interaction;
    let voiceMember = interaction.guild.members.cache.get(member.id);
    let channel = voiceMember.voice.channel;

    const player = await client.manager.get(interaction.guild.id);
    if (!player) return;

    const playChannel = client.channels.cache.get(player.textChannel);
    if (!playChannel) return;

    const database = await client.setup.findOne({ guild: interaction.guild.id });
    if (database.enable === false) return;

    switch (customId) {
        case "sskip":
            {
                if (!channel) {
                    return interaction.reply({
                        embeds: [new EmbedBuilder()
                            .setAuthor({ name: `${client.i18n.get(language, "noplayer", "no_voice")}`, iconURL: interaction.user.displayAvatarURL() })
                            .setColor('Red')
                        ], ephemeral: true
                    })
                } else if (interaction.guild.members.me.voice.channel && !interaction.guild.members.me.voice.channel.equals(channel)) {
                    return interaction.reply({
                        embeds: [new EmbedBuilder()
                            .setAuthor({ name: `${client.i18n.get(language, "noplayer", "no_voice")}`, iconURL: interaction.user.displayAvatarURL() })
                            .setColor('Red')
                        ], ephemeral: true
                    })
                } else if (!player) {
                    return interaction.reply({
                        embeds: [new EmbedBuilder()
                            .setAuthor({ name: `${client.i18n.get(language, "noplayer", "no_player")}`, iconURL: interaction.user.displayAvatarURL() })
                            .setColor('Red')
                        ], ephemeral: true
                    })
                } else if (player.queue.length < 1) return interaction.reply({
                    embeds: [new EmbedBuilder()
                        .setAuthor({ name: `❌ | ไม่มีเพลงในคิวเเล้ว`, iconURL: interaction.user.displayAvatarURL() })
                        .setColor('Red')
                    ], ephemeral: true
                })
                if (player.queue.size == 0) {
                    await player.destroy();
                    await client.UpdateMusic(player);

                    const embed = new EmbedBuilder()
                        .setDescription(`${client.i18n.get(language, "music", "skip_msg")}`)
                        .setColor('White');

                    interaction.reply({ embeds: [embed], ephemeral: true });
                } else {
                    await player.stop();

                    const embed = new EmbedBuilder()
                        .setDescription(`${client.i18n.get(language, "music", "skip_msg")}`)
                        .setColor('White');

                    interaction.reply({ embeds: [embed], ephemeral: true });
                }
            }
            break;

        case "sstop":
            {
                if (!channel) {
                    return interaction.reply({
                        embeds: [new EmbedBuilder()
                            .setAuthor({ name: `${client.i18n.get(language, "noplayer", "no_voice")}`, iconURL: interaction.user.displayAvatarURL() })
                            .setColor('Red')
                        ], ephemeral: true
                    })
                } else if (interaction.guild.members.me.voice.channel && !interaction.guild.members.me.voice.channel.equals(channel)) {
                    return interaction.reply({
                        embeds: [new EmbedBuilder()
                            .setAuthor({ name: `${client.i18n.get(language, "noplayer", "no_voice")}`, iconURL: interaction.user.displayAvatarURL() })
                            .setColor('Red')
                        ], ephemeral: true
                    })
                } else if (!player) {
                    return interaction.reply({
                        embeds: [new EmbedBuilder()
                            .setAuthor({ name: `${client.i18n.get(language, "noplayer", "no_player")}`, iconURL: interaction.user.displayAvatarURL() })
                            .setColor('Red')
                        ], ephemeral: true
                    })
                } else {
                    await player.destroy();
                    await client.UpdateMusic(player);

                    const embed = new EmbedBuilder()
                        .setDescription(`${client.i18n.get(language, "player", "stop_msg")}`)
                        .setColor('White');

                    interaction.reply({ embeds: [embed], ephemeral: true });
                }
            }
            break;

        case "spause":
            {
                if (!channel) { 
                    return interaction.reply(`${client.i18n.get(language, "noplayer", "no_voice")}`);
                } else if (interaction.guild.members.me.voice.channel && !interaction.guild.members.me.voice.channel.equals(channel)) {
                    return interaction.reply(`${client.i18n.get(language, "noplayer", "no_voice")}`);
                } else if (!player) {
                    return interaction.reply(`${client.i18n.get(language, "noplayer", "no_player")}`);
                } else {
                    await player.pause(!player.paused);
                    const uni = player.paused ? `${client.i18n.get(language, "player", "switch_pause")}` : `${client.i18n.get(language, "player", "switch_resume")}`;

                    const embed = new EmbedBuilder()
                        .setDescription(`${client.i18n.get(language, "player", "pause_msg", {
                        pause: uni,
                        })}`)
                        .setColor('White');
                        
                    client.UpdateQueueMsg(player);
                    interaction.reply({ embeds: [embed], ephemeral: true });
                }
            }
            break;

        case "sloop":
            {
                if (!channel) {
                    return interaction.reply(`${client.i18n.get(language, "noplayer", "no_voice")}`);
                } else if (interaction.guild.members.me.voice.channel && !interaction.guild.members.me.voice.channel.equals(channel)) {
                    return interaction.reply(`${client.i18n.get(language, "noplayer", "no_voice")}`);
                } else if (!player) {
                    return interaction.reply(`${client.i18n.get(language, "noplayer", "no_player")}`);
                } else {

                    const loopSwitch = new ActionRowBuilder()
                    .addComponents([
                        new ButtonBuilder()
                            .setStyle(ButtonStyle.Success)
                            .setCustomId("looptrack")
                            .setLabel('วนลูปเพลงเดียว'),
                        new ButtonBuilder()
                            .setStyle(ButtonStyle.Success)
                            .setCustomId("loopqueue")
                            .setLabel('วนลูปทั้งคิว'),
                    ]);
            
                    // const embed = new EmbedBuilder()
                    //     .setDescription(`${client.i18n.get(language, "player", "repeat_msg", {
                    //     loop: uni,
                    //     })}`)
                    //     .setColor('White');

                        await interaction.reply({ components: [loopSwitch], ephemeral: true });
                }
            }
        break;

        case "looptrack":
            {
                if (!channel) {
                    return interaction.reply(`${client.i18n.get(language, "noplayer", "no_voice")}`);
                } else if (interaction.guild.members.me.voice.channel && !interaction.guild.members.me.voice.channel.equals(channel)) {
                    return interaction.reply(`${client.i18n.get(language, "noplayer", "no_voice")}`);
                } else if (!player) {
                    return interaction.reply(`${client.i18n.get(language, "noplayer", "no_player")}`);
                } else {

                    if (player.trackRepeat === false) {
                        await player.setTrackRepeat(true)
    
                        const RTA_Loopped = new EmbedBuilder()
                            .setAuthor({ name: `✅ | เปลี่ยนการวนเพลงเป็น เปิด Song-Loop เรียบร้อย`, iconURL: interaction.user.displayAvatarURL() })
                            .setColor('Green')
    
                        await interaction.reply({ embeds: [RTA_Loopped], ephemeral: true });

                    } else {
                        await player.setTrackRepeat(false)
    
                        const RTA_Loopped = new EmbedBuilder()
                            .setAuthor({ name: `✅ | เปลี่ยนการวนเพลงเป็น ปิด Song-Loop เรียบร้อย`, iconURL: interaction.user.displayAvatarURL() })
                            .setColor('Green')
    
                        await interaction.reply({ embeds: [RTA_Loopped], ephemeral: true });
                }
                client.UpdateQueueMsg(player);
                }
            }
            break;

        case "loopqueue":
                {
                    if (!channel) {
                        return interaction.reply(`${client.i18n.get(language, "noplayer", "no_voice")}`);
                    } else if (interaction.guild.members.me.voice.channel && !interaction.guild.members.me.voice.channel.equals(channel)) {
                        return interaction.reply(`${client.i18n.get(language, "noplayer", "no_voice")}`);
                    } else if (!player) {
                        return interaction.reply(`${client.i18n.get(language, "noplayer", "no_player")}`);
                    } else {
    
                        if (player.queueRepeat == true) {
                            await player.setQueueRepeat(false)
            
                            const RTA_Loopped = new EmbedBuilder()
                                .setAuthor({ name: `✅ | เปลี่ยนการวนเพลงเป็น ปิด Queue-Loop เรียบร้อย`, iconURL: interaction.user.displayAvatarURL() })
                                .setColor('Green')
            
                            await interaction.reply({ embeds: [RTA_Loopped], ephemeral: true });
                        } else {
                            await player.setQueueRepeat(true)
            
                            const RTA_Loopped = new EmbedBuilder()
                                .setAuthor({ name: `✅ | เปลี่ยนการวนเพลงเป็น เปิด Queue-Loop เรียบร้อย`, iconURL: interaction.user.displayAvatarURL() })
                                .setColor('Green')
            
                            await interaction.reply({ embeds: [RTA_Loopped], ephemeral: true });
                        }
                        client.UpdateQueueMsg(player);
                    }
                }
                break;

        case "svol":
            {

                if (!channel) { 
                    return interaction.reply(`${client.i18n.get(language, "noplayer", "no_voice")}`);
                } else if (interaction.guild.members.me.voice.channel && !interaction.guild.members.me.voice.channel.equals(channel)) {
                    return interaction.reply(`${client.i18n.get(language, "noplayer", "no_voice")}`);
                } else if (!player) {
                    return interaction.reply(`${client.i18n.get(language, "noplayer", "no_player")}`);
                } else {

                    const modal = new ModalBuilder()
                     .setCustomId('volume-modal')
                     .setTitle('Volume | ระดับเสียง')
                     .addComponents([
                         new ActionRowBuilder().addComponents(
                           new TextInputBuilder()
                             .setCustomId('volume-input')
                             .setLabel(`ปรับระดับเสียง 1-100 | ระดับเสียงตอนนี้: ${player.volume}%`)
                             .setStyle(TextInputStyle.Short)
                             .setPlaceholder('ใส่เลขตรงนี้!')
                             .setRequired(true),
                         ),
                       ]);
                await interaction.showModal(modal);
                }

            }
        break;
        case "safk":
            {

                if (!channel) { 
                    return interaction.reply(`${client.i18n.get(language, "noplayer", "no_voice")}`);
                } else if (interaction.guild.members.me.voice.channel && !interaction.guild.members.me.voice.channel.equals(channel)) {
                    return interaction.reply(`${client.i18n.get(language, "noplayer", "no_voice")}`);
                } else if (!player) {
                    return interaction.reply(`${client.i18n.get(language, "noplayer", "no_player")}`);
                } else {

                    if (player.twentyFourSeven) {
                        player.twentyFourSeven = false;
            
                        const embed = new EmbedBuilder()
                            .setAuthor({ name: ' ', iconURL: interaction.user.displayAvatarURL() })
                            .setDescription(`${client.i18n.get(language, "music", "247_off")}`)
                            .setColor('White');
            
                        await interaction.reply({ embeds: [embed], ephemeral: true });
                    } else {
                        player.twentyFourSeven = true;
            
                        const embed = new EmbedBuilder()
                            .setAuthor({ name: ' ', iconURL: interaction.user.displayAvatarURL() })
                            .setDescription(`${client.i18n.get(language, "music", "247_on")}`)
                            .setColor('White');
            
                        await interaction.reply({ embeds: [embed], ephemeral: true });
                    }
                    client.UpdateQueueMsg(player);
                }
            }
        break;
    default:
        break;
        }
    } catch (e) {
        console.log(e)
    }
}
  
  if (interaction.isCommand()) {
      interaction.debug
      const cmd = client.slashcommands.get(interaction.commandName);
      client.logger.debug(`${interaction.user.tag} (${interaction.user.id}) [ ${interaction.guild.name} (${interaction.guild.id}) ] > /${interaction.commandName}`)
      if (cmd) {
      try {
            cmd.run(client, interaction);
            } catch (e) {
                client.logger.danger(e)
                errorReply.setColor('Red').setDescription('เกิดข้อผิดพลาดในการใช้คําสั่ง โปรดลองใช้คําสั่งอีกครั้ง');
                return interaction.reply({ embeds: [errorReply], ephemeral: false });
                            }
                        }
                    }
                }
            }