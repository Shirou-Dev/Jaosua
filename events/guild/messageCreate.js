const { EmbedBuilder } = require("discord.js");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").Interaction} interaction
 */

module.exports = async (client, message) => {
    try {

        const user = message.author;

        if (!message.guild || !message.guild.available) return;

        let player = client.manager.players.get(message.guild.id)

        await client.createMessage(message);    
            
             const database = await client.setup.findOne({ guild: message.guild.id });
             if (database.enable === false) return;

                const channel_find = await message.guild.channels.cache.get(database.channel);
                if (!channel_find ) return;

                if (database.channel != message.channel.id) return;

                try {
                    const msg = await channel_find.messages.fetch(database.playmsg, { cache: true, force: true });
                    if (!msg) return;
                } catch (e) {
                    return;
                }

                if (message.author.id === client.user.id) {
                    // check if from database.playmsg
                    if (message.id === database.playmsg) {
                        ///
                    } else {
                        await delay(3000);
                        message.delete();
                    }
                }
    
                if (message.author.bot) return;

                const song = message.cleanContent;
                    await message.delete();
                if (song.startsWith("https://") || song.startsWith("http://")) {
                    if (!song.startsWith("https://www.youtube.com/") && !song.startsWith("https://youtube.com/") && !song.startsWith("https://youtu.be/") && !song.startsWith("https://m.youtube.com/") && !song.startsWith("https://open.spotify.com/") && !song.startsWith("https://soundcloud.com/") && !song.startsWith("http://www.youtube.com/") && !song.startsWith("http://youtube.com/") && !song.startsWith("http://youtu.be/") && !song.startsWith("http://m.youtube.com/") && !song.startsWith("http://open.spotify.com/") && !song.startsWith("http://soundcloud.com/")) {
                        client.logger.musicerror(`${user.username} (${user.id}) > ${song}`)
                        return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`❌ \`|\` ไม่ค้นพบลิ้งที่กําลังค้นหา \n\`${song}\``) .setColor("Red") ] }).catch(console.error);
                    }
                }

                    const { channel } = await message.member.voice;
                    if (!channel) {
                        return message.channel.send({
                            embeds: [new EmbedBuilder()
                                .setColor('Red')
                                .setFooter({ text: client.user.username + " | Version " + client.config.version, iconURL: client.user.displayAvatarURL() })
                                .setTitle(`กรุณาเข้าห้องเสียงก่อนใช้งานบอท`)
                            ], ephemeral: false
                        });
                    }

                    if (player && channel.id !== player.voiceChannel)
                        return message.channel.send({
                            embeds: [new EmbedBuilder()
                                .setColor("Red")
                                .setFooter({ text: client.user.username + " | Version " + client.config.version, iconURL: client.user.displayAvatarURL() })
                                .setTitle(`กรุณาเข้าห้องเสียงเดียวกับบอท ${client.user.username}`)
                                .setDescription(`<#${player.voiceChannel}>`)
                            ], ephemeral: false
                    });

                if (!player) {
                    player = await client.manager.create({
                        guild: message.guild.id,
                        voiceChannel: message.member.voice.channel.id,
                        textChannel: message.channel.id,
                        volume: 60,
                        region: channel?.rtcRegion || undefined,
                        selfDeafen: true
                    });
                        player.connect()
                }
                
                if (player.state != "CONNECTED")
                await player.connect();

                const res = await client.manager.search(song, message.author);
                
                client.logger.musicsearch(`${user.username} (${user.id}) > ${song}`)

            switch (res.loadType) {
                 case 'error':

                    await message.channel.send({ embeds: [new EmbedBuilder() .setDescription(`❌ \`|\` ไม่สามารถโหลดชื่อเพลง หรือ URL ได้! \n\`${song}\``) .setColor("Red") ] }).catch(console.error);
                    client.logger.musicerror(`${user.tag} (${user.id}) > ${song}`)

                     break;

                case 'empty':

                    await message.channel.send({ embeds: [new EmbedBuilder() .setDescription(`❌ \`|\` ไม่พบเพลงที่กําลังค้นหา! \n\`${song}\``) .setColor("Red") ] }).catch(console.error);
                    client.logger.musicerror(`${user.tag} (${user.id}) > ${song}`)

                    break;

                case 'track':
                        player.queue.add(res.tracks[0])
    
                        if (!player.playing && !player.paused && !player.queue.size)
                            player.play();

                        if (player) {
                            client.UpdateQueueMsg(player);
                        }
                            
                    break;
                case 'playlist':
                        player.queue.add(res.tracks)
    
                        if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length)
                            player.play();

                        if (player) {
                            client.UpdateQueueMsg(player);
                        }
                            
                    break;

                        case 'search':
                            player.queue.add(res.tracks[0])

                            if (!player.playing && !player.paused && !player.queue.size)
                                player.play();

                            if (player) {
                                client.UpdateQueueMsg(player);
                            }
                    break;
                    
                    }
        } catch (e) {
            client.logger.danger(e)
            console.log(e)
        }
    }
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }