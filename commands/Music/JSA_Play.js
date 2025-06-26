const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    data: {
        name: "เล่น",
        description: "เล่นเพลง",
        options: [
            {
                name: "ค้นหา",
                type: 3,
                description: "พิมพ์ชื่อเพลง / ลิ้งเพลง URL",
                required: true
            }
        ]
    },
    
/**
     * 
     * @param {import("discord.js").Client} client 
     * @param {import("discord.js").Interaction} interaction
     */
    run: async (client, interaction) => {

try {

    if (interaction.commandName === 'เล่น') {
        const InviteButton = new ActionRowBuilder()
        .addComponents(
                new ButtonBuilder()
                    .setURL(`${client.config.inviteurl}`)
                    .setLabel('เชิญบอท')
                    .setEmoji('1068583137971552336')
                    .setStyle(ButtonStyle.Link),
            );

        let player = client.manager.players.get(interaction.guild.id)
        var node = client.manager.nodes.first(1)

        const node_Name = node[0].options.identifier
        const channel = interaction.member.voice?.channel;
        const music = interaction.options.get("ค้นหา").value;

        if (!channel) {
            return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor("Red")
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

              if (!player) {
                 player = await client.manager.create({
                     guild: interaction.guild.id,
                     voiceChannel: interaction.member.voice.channel.id,
                     textChannel: interaction.channel.id,
                     region: channel?.rtcRegion || undefined,
                     selfDeafen: true,
                });
             }
        
             if (player.state != "CONNECTED")
                await player.connect();

            let res;
            
            res = await client.manager.search(music, interaction.user);

            client.logger.musicsearch(`${interaction.user.tag} (${interaction.user.id}) > ${music}`)

            if (music.startsWith("https://") || music.startsWith("http://")) {
                    if (!music.startsWith("https://www.youtube.com/") && !music.startsWith("https://youtube.com/") && !music.startsWith("https://youtu.be/") && !music.startsWith("https://m.youtube.com/") && !music.startsWith("https://open.spotify.com/") && !music.startsWith("https://soundcloud.com/") && !music.startsWith("http://www.youtube.com/") && !music.startsWith("http://youtube.com/") && !music.startsWith("http://youtu.be/") && !music.startsWith("http://m.youtube.com/") && !music.startsWith("http://open.spotify.com/") && !music.startsWith("http://soundcloud.com/")) {
                        client.logger.musicerror(`${interaction.tag} (${interaction.id}) > ${music}`)
                        return interaction.reply({ embeds: [new EmbedBuilder().setDescription(`❌ \`|\` ไม่ค้นพบลิ้งที่กําลังค้นหา \n\`${music}\``) .setColor("Red") ] }).catch(console.error);
                    }
                }

             switch (res.loadType) {
                 case 'error':
                     await interaction.reply({ embeds: [new EmbedBuilder() .setDescription(`❌ \`|\` ไม่พบเพลงที่กําลังค้นหา \n\`${music}\``) .setColor("Red") ], iconURL: interaction.user.displayAvatarURL(), ephemeral: false })

                     break;

                 case 'empty':
                     await interaction.reply({ embeds: [new EmbedBuilder() .setDescription(`❌ \`|\` ไม่พบชื่อเพลงที่กําลังค้นหา \n\`${music}\``) .setColor("Red") ], iconURL: interaction.user.displayAvatarURL(), ephemeral: false })

                     break;

                 case 'track':
                        player.queue.add(res.tracks[0]);

                        await client.UpdateQueueMsg(player);
                        await client.clearInterval(client.interval);

                        if (!player.playing && !player.paused && !player.queue.size)
                            player.play();

                         const RTA_AddQueue3 = new EmbedBuilder()

                         .setAuthor({ name: `${client.user.username} Player | Add Queue`, iconURL: client.user.displayAvatarURL() })
                         .setColor('White')
                         .addFields({ name: `${res.tracks[0].author} - ${res.tracks[0].isStream ? "🔴 ไลฟ์สด" : moment.duration(res.tracks[0].duration).format('hh:mm:ss')}`, value: `\`\`\`\n${res.tracks[0].title}\`\`\``, inline: false })
                         .setImage('https://cdn.discordapp.com/attachments/1129726217101250661/1130838816899481740/image.png')
                         .setFooter({ text: `Node: ${node_Name} • ระดับเสียง: ${player.volume}%`, iconURL: interaction.user.displayAvatarURL() })

                         await interaction.reply({ embeds: [RTA_AddQueue3], components: [InviteButton], ephemeral: false })

                            
                     break;
                     case 'playlist':
                         player.queue.add(res.tracks)

                         await client.UpdateQueueMsg(player);
                         await client.clearInterval(client.interval);
    
                         if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length)
                             player.play();

                         const RTA_AddPlaylist = new EmbedBuilder()
                             .setAuthor({ name: `${client.user.username} Player | Add Playlist`, iconURL: client.user.displayAvatarURL() })
                             .setColor('White')
                             .addFields({ name: `${res.tracks.author} - ${res.tracks.isStream ? "🔴 ไลฟ์สด" : moment.duration(res.playlist.duration).format('hh:mm:ss')}`, value: `\`\`\`\n${res.playlist.name}\`\`\``, inline: false })
                             .setImage('https://cdn.discordapp.com/attachments/1129726217101250661/1130838816899481740/image.png')
                             .setFooter({ text: `Node: ${node_Name} • ระดับเสียง: ${player.volume}%`, iconURL: interaction.user.displayAvatarURL() })

                            await interaction.reply({ embeds: [RTA_AddPlaylist], components: [InviteButton], ephemeral: true })
                            
                     break;
                     case 'search':
                             player.queue.add(res.tracks[0])

                             await client.UpdateQueueMsg(player);
                             await client.clearInterval(client.interval);

                             if (!player.playing && !player.paused && !player.queue.size)
                                 player.play();
    
                             const RTA_AddQueue2 = new EmbedBuilder()
                                 .setAuthor({ name: `${client.user.username} Player | Add Search Music`, iconURL: client.user.displayAvatarURL() })
                                 .setColor('White')
                                 .addFields({ name: `${res.tracks[0].author} - ${res.tracks[0].isStream ? "🔴 ไลฟ์สด" : moment.duration(res.tracks[0].duration).format('hh:mm:ss')}`, value: `\`\`\`\n${res.tracks[0].title}\`\`\``, inline: false })
                                 .setImage('https://cdn.discordapp.com/attachments/1129726217101250661/1130838816899481740/image.png')
                                 .setFooter({ text: `Node: ${node_Name} • ระดับเสียง: ${player.volume}%`, iconURL: interaction.user.displayAvatarURL() })
    
                                await interaction.reply({ embeds: [RTA_AddQueue2], components: [InviteButton], ephemeral: false })
                     break;
                }
            }
                    } catch (error) {
                        console.log(error) 
                    }
                }
            }
