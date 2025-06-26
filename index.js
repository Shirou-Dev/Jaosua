const { Client, GatewayIntentBits } = require("discord.js");
const { Manager } = require("erela.js");
const { I18n } = require("@hammerhq/localization");
const { resolve } = require("path");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
    ]
});

client.i18n = new I18n({
    defaulLocale: "th",
    directory: resolve("languages"),
})
client.config = require("./config.js");
client.logger = require("./function/logger.js");
client.button = require("./button.js");

client.on('guildCreate', (guild) => {
    client.logger.info(`NewServer -> ${guild.name} -> ${guild.id} -> Member ${guild.memberCount} People.`);
});

["slashcommand", "events", "loadDB","loadPlayer"].forEach(x => {
    client.logger.debug(`Loaded Hander ${x}`)
    require(`./handlers/${x}`)(client)
});
    

client.logger.info(`Logging To Jaosua. . .`)

client.login(process.env.token || client.config.token)