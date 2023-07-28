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
            defaultLocale: "th", // "en" = default language
            directory: resolve("languages"), // <= location of language
    })
    client.config = require("./config.js");
    client.logger = require("./function/logger");
    client.button = require("./button.js");
    client.setup = require("./models/Setup.js");

    client.manager = new Manager({
    clientName: "Jaosua-Manager",
    shards: client.config.shard,
    nodes: client.config.nodes,
     send(id, payload) {
         const guild = client.guilds.cache.get(id);
         if (guild) guild.shard.send(payload);
     },
 });

client.on('guildCreate', (guild) => {
    client.logger.info(`มีเชิฟเวอร์เข้ามาใหม่ -> ${guild.name} -> ${guild.id} -> มีสมาชิกทั้งหมด ${guild.memberCount} คน!`);
});

["slashcommand", "events", "loadDB","loadPlayer"].forEach(x => {
    client.logger.debug(`Loaded Hander ${x}`)
    require(`./handlers/${x}`)(client)
});
    

client.logger.info(`Logging in . . .`)

client.login(process.env.token || client.config.token)