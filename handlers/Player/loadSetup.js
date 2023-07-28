const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const Stats = require("../../models/CommandStats.js");
const Profile = require("../../models/Profile.js");

/**
     * 
     * @param {import("discord.js").Client} client 
     * @param {import("discord.js").Interaction} interaction
     */

module.exports = async (client) => {

        client.InviteSwitch = new ActionRowBuilder()
            .addComponents([
                new ButtonBuilder()
                    .setURL(`${client.config.inviteurl}`)
                    .setLabel('เชิญบอท')
                    .setEmoji('1068583137971552336')
                    .setStyle(ButtonStyle.Link),
                new ButtonBuilder()
                    .setURL(`${client.config.dcurl}`)
                    .setEmoji('1068597419912204469')
                    .setLabel('Rotia Support')
                    .setStyle(ButtonStyle.Link),
            ]);

    client.createDatabase = async function (interaction) {
        const find_setup = await client.setup.findOne({ guild: interaction.guild.id });
        if (!find_setup) {
            const newSetup = await new client.setup({
                guild: interaction.guild.id,
                enable: false,
                channel: "",
                playmsg: "",
            });
            await newSetup.save();
        }

        const CProfile = await Profile.findOne({ userId: interaction.user.id });
        if (!CProfile) {
            const newUser = await Profile.create({ 
                userId: interaction.user.id,
                playedCount: 0,
                useCount: 0,
                listenTime: 0,
            });
            await newUser.save();
        }
    }

    client.createMessage = async function (message) {
        const find_setup = await client.setup.findOne({ guild: message.guild.id });
        if (!find_setup) {
            const newSetup = await new client.setup({
                guild: message.guild.id,
                enable: false,
                channel: "",
                playmsg: "",
            });
            await newSetup.save();
        }

        const CProfile = await Profile.findOne({ userId: message.author.id });
        if (!CProfile) {
            const newUser = await Profile.create({ 
                userId: message.author.id,
                playedCount: 0,
                useCount: 0,
                listenTime: 0,
            });
            await newUser.save();
        }
    }

    client.interval = null;

    client.clearInterval = async function (interval) {
        clearInterval(interval);
    }

    client.addStats = async function (name, interaction) {
        const BStats = await Stats.findOne({ name: name });
        if (BStats) {
            BStats.count += 1;
            await BStats.save();
        } else {
            const newStats = await Stats.create({
                name: name,
                count: 1,
            });
            await newStats.save();
        }

        const PStats = await Profile.findOne({ userId: interaction.user.id });
        if (PStats) {
            PStats.useCount += 1;
            await PStats.save();
        } else {
            const newStats = await Profile.create({
                userId: interaction.user.id,
                useCount: 1,
            });
            await newStats.save();
        }
    }

    };