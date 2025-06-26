const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    data: {
        name: "เล่น",
        description: "เล่นเพลง / Play Music",
        options: [
            {
                name: "ค้นหา",
                type: 3,
                description: "พิมพ์ชื่อเพลง Search / Link URL",
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
                embeds: [
                    {
                        color: #FF0000,
                        title: "กรุณาเข้าห้องเสียงก่อนใช้งานบอท",
                        footer: {
                            text: client.user.username + " | Version " + client.config.version,
                            icon_url: client.user.displayAvatarURL()
                        }
                    }
                ], ephemeral: false
            })
        };

        if (player && channel.id !== player.voiceChannel)
            return interaction.reply({
                embeds: [
                    {
                        color: #FF0000,
                        title: `กรุณาเข้าห้องเสียงเดียวกับบอท ${client.user.username}`,
                        description: `<#${player.voiceChannel}>`,
                        footer: {
                            text: client.user.username + " | Version " + client.config.version,
                            icon_url: client.user.displayAvatarURL()
                        }
                    }
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

            client.logger.musicsearch(`${interaction.user.tag} (${interaction.user.id}) > ${music}`)``
`1`
            if (music.startsWith("https://") || music.startsWith("http://")) {
                    if (!music.startsWith("https://www.youtube.com/") && !music.startsWith("https://youtube.com/") && !music.startsWith("https://youtu.be/") && !music.startsWith("https://m.youtube.com/") && !music.startsWith("https://open.spotify.com/") && !music.startsWith("https://soundcloud.com/") && !music.startsWith("http://www.youtube.com/") && !music.startsWith("http://youtube.com/") && !music.startsWith("http://youtu.be/") && !music.startsWith("http://m.youtube.com/") && !music.startsWith("http://open.spotify.com/") && !music.startsWith("http://soundcloud.com/")) {
                        client.logger.musicerror(`${interaction.tag} (${interaction.id}) > ${music}`)
                        return interaction.reply({ embeds: [new EmbedBuilder().setDescription(`❌ \`|\` ไม่ค้นพบลิ้งที่กําลังค้นหา \n\`${music}\``) .setColor("Red") ] }).catch(console.error);
                    }
                }

             switch (res.loadType) {
                 case 'error':

                    await interaction.reply({
                        embeds: [
                            {
                                description: `❌ \`|\` ไม่พบเพลงที่กําลังค้นหา \n\`${music}`,
                                color: #FF0000,
                                footer: {
                                    icon_url: interaction.user.displayAvatarURL()
                                }

                            }
                        ], ephemeral: false
                    });

                     break;

                 case 'empty':

                        await interaction.reply({
                        embeds: [
                            {
                                description: `❌ \`|\` ไม่พบชื่อเพลงที่กําลังค้นหา \n\`${music}`,
                                color: #FF0000,
                                footer: {
                                    icon_url: interaction.user.displayAvatarURL()
                                }

                            }
                        ], ephemeral: false
                    });
                     break;

                 case 'track':

                        player.queue.add(res.tracks[0]);


                        if (!player.playing && !player.paused && !player.queue.size)
                            player.play();

                        await interaction.reply({
                            embeds: [
                                {
                                    anthor: {
                                        name: `${client.user.username} Player | Add Queue`,
                                        icon_url: client.user.displayAvatarURL(),
                                    },
                                    color: #FFFFFF,
                                    fields: [
                                        {
                                            name: `${res.tracks[0].author} - ${res.tracks[0].isStream ? "🔴 ไลฟ์สด" : moment.duration(res.tracks[0].duration).format('hh:mm:ss')}`,
                                            value: `\`\`\`\n${res.tracks[0].name}\`\`\``,
                                            inline: false
                                        }
                                    ]
                                }
                            ]
                        })
                            
                     break;
                     case 'playlist':
                         player.queue.add(res.tracks)

    
                         if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length)
                             player.play();

                        await interaction.reply({
                            embeds: [
                                {
                                    author: {
                                        name: `${client.user.username} Player | Add Playlist`,
                                        icon_url: client.user.displayAvatarURL(),
                                    },
                                    color: #FFFFFF,
                                    fields: [
                                        {
                                            name: `${res.tracks.author} - ${res.tracks.isStream ? "🔴 ถ่ายทอดสด" : moment.duration(res.playlist.duration).format('hh:mm:ss')}`,
                                            value: `\`\`\`\n${res.playlist.name}\`\`\``,
                                            inline: false,
                                        }
                                    ],
                                    footer: {
                                        text: `Node: Unkown • ระดับเสียง: ${player.volume}%`,
                                        icon_url: interaction.user.displayAvatarURL(),
                                    }
                                }
                            ], components: [InviteButton], ephemeral: true
                        })
                            
                     break;
                     case 'search':
                             player.queue.add(res.tracks[0])

                             if (!player.playing && !player.paused && !player.queue.size)
                                 player.play();
    
                            await interaction.reply({
                            embeds: [
                                {
                                    author: {
                                        name: `${client.user.username} Player | Add Search Music`,
                                        icon_url: client.user.displayAvatarURL(),
                                    },
                                    color: #FFFFFF,
                                    fields: [
                                        {
                                            name: `${res.tracks[0].author} - ${res.tracks[0].isStream ? "🔴 ไลฟ์สด" : moment.duration(res.tracks[0].duration).format('hh:mm:ss')}`,
                                            value:`${res.tracks[0].author} - ${res.tracks[0].isStream ? "🔴 ถ่ายทอดสด" : moment.duration(res.tracks[0].duration).format('hh:mm:ss')}`,
                                            inline: false,
                                        }
                                    ],
                                    footer: {
                                        text: `Node: Unkown • ระดับเสียง: ${player.volume}%`,
                                        icon_url: interaction.user.displayAvatarURL(),
                                    }
                                }
                            ], components: [InviteButton], ephemeral: false
                        });  
                     break;
                }
            }
                    } catch (error) {
                        console.log(error) 
                    }
                }
            }
