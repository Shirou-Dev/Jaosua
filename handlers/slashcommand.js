const Discord = require("discord.js")
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require(`../config`);

module.exports = async (client) => {

    if (process.env.NODE_ENV === 'production') {

    client.slashcommands = new Discord.Collection()
    client.commandsPush = new Array();
    client.slashcommands.clear();
    
    fs.readdirSync('./commands').forEach(async (dir) => {

        const commandFiles = fs.readdirSync(`./commands/${dir}`).filter((file) => file.endsWith(".js"));
        for (const file of commandFiles) {
            const command = require(`../commands/${dir}/${file}`)
            client.slashcommands.set(command.data.name, command);
            client.commandsPush.push(command.data);
            client.logger.debug(`Command: ${command.data.name} Loaded`);
        }
    })


        const clientId = config.clientId;
        const rest = new REST({ version: '10' }).setToken(config.token);
        try {
            client.logger.debug("Started load applicationCommands (/) commands.");

            await rest.put(Routes.applicationCommands(clientId), {
                body: client.commandsPush,
            });
            
            client.logger.debug("Successfully load (/) commands.");

        } catch (error) {
            console.error(error);
        }
    };
}