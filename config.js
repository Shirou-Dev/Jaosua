require("dotenv").config();

const config = {
    development: {
        LEAVE_TIMEOUT: parseInt(process.env.LEAVE_TIMEOUT || "30000"),
        MONGO_URI: "mongodb+srv://rtabetadb:RTA_1974@rta-beta-cluster.gjar3u2.mongodb.net/",
        version: require("./package.json").version,
        token: "MTEzNDEyNjM3NjE3MDA0MTQ0NQ.GsF8NG.3LRhjGUtSdw9fDgo8TCTqtT6vykRQmC4j6YmJM",
        YOUTUBE_API: "AIzaSyDjmtXRDGkK2o1gjCuNunuAoEcRFIXVxqc",
        clientId: "1056112082896035920",
        dcurl: "https://discord.gg/TrPfMEwwVY",
        inviteurl: "https://discord.com/api/oauth2/authorize?client_id=1056112082896035920&permissions=8&scope=bot%20applications.commands",
        shard: 1,
        intents: 35505,
        pushcommand: false,
        pushGlobal: false,
        guildPushCommand: ["1063431229728362616"],

        nodes: [
            {
                identifier: "RTA-Lavalink [DEV]",
                host: "localhost",
                port: 2333,
                password: "youshallnotpass",
                secure: false,
            }
        ],
    },
    production: {
        LEAVE_TIMEOUT: parseInt(process.env.LEAVE_TIMEOUT || "30000"),
        MONGO_URI: "mongodb+srv://jsa_db:JSA-1441@jsa-db.dthcl7b.mongodb.net/",
        version: require("./package.json").version,
        token: "MTEzNDEyNjM3NjE3MDA0MTQ0NQ.GsF8NG.3LRhjGUtSdw9fDgo8TCTqtT6vykRQmC4j6YmJM",
        clientId: "1134126376170041445",
        YOUTUBE_API: "AIzaSyDjmtXRDGkK2o1gjCuNunuAoEcRFIXVxqc",
        dcurl: "https://discord.gg/TrPfMEwwVY",
        inviteurl: "https://discord.com/api/oauth2/authorize?client_id=1056112082896035920&permissions=8&scope=bot%20applications.commands",
        shard: 1,
        intents: 35505,
        pushcommand: true,
        pushGlobal: true,
        guildPushCommand: ["1063431229728362616"],

        nodes: [
            {
                identifier: "Jaosua",
                host: "0.0.0.0",
                port: 2333,
                password: "rta_music",
                secure: false,
                version: "v4",
                regions: ["us-east", "us-central", "us-south", "us-west", "singapore"]
            }
        ],
    },

    }
module.exports = config[process.env.NODE_ENV === 'development' ? 'development' : 'production']
