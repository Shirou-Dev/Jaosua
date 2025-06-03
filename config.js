require("dotenv").config();

const config = {
    development: {
        LEAVE_TIMEOUT: parseInt(process.env.LEAVE_TIMEOUT || "30000"),
        MONGO_URI: "/",
        version: require("./package.json").version,
        token: "",
        YOUTUBE_API: "AIzaSyDjmtXRDGkK2o1gjCuNunuAoEcRFIXVxqc",
        clientId: "1134126376170041445",
        dcurl: "https://discord.gg/TrPfMEwwVY",
        inviteurl: "https://discord.com/api/oauth2/authorize?client_id=1134126376170041445&permissions=8&scope=applications.commands%20bot",
        shard: 1,
        intents: 35505,
        pushcommand: false,
        pushGlobal: false,
        guildPushCommand: ["1063431229728362616"],

        nodes: [
            {
                identifier: "RTA-Lavalink [DEV]",
                host: "",
                port: 2333,
                password: "",
                secure: false,
            }
        ],
    },
    production: {
        LEAVE_TIMEOUT: parseInt(process.env.LEAVE_TIMEOUT || "30000"),
        MONGO_URI: "",
        version: require("./package.json").version,
        token: "",
        clientId: "1134126376170041445",
        YOUTUBE_API: "AIzaSyDjmtXRDGkK2o1gjCuNunuAoEcRFIXVxqc",
        dcurl: "https://discord.gg/TrPfMEwwVY",
        inviteurl: "https://discord.com/api/oauth2/authorize?client_id=1134126376170041445&permissions=8&scope=applications.commands%20bot",
        shard: 1,
        intents: 35505,
        pushcommand: true,
        pushGlobal: true,
        guildPushCommand: ["1063431229728362616"],

        nodes: [
            {
                identifier: "Licha",
                host: "",
                port: 2333,
                password: "",
                secure: false,
                version: "v4",
                regions: ["us-east", "us-central", "us-south", "us-west", "singapore"]
            }
        ],
    },

    }
module.exports = config[process.env.NODE_ENV === 'development' ? 'development' : 'production']
