const { ShardingManager } = require("discord.js");
const config = require("./config");
const logger = require("./function/logger");

 
 const Manager = new ShardingManager(`${__dirname}/index.js`, {
    token: config.token,
    totalShards: config.shard,
    respawn: true,
    shardList: "auto",
    mode: "process",
 })

Manager.spawn({ amount: Manager.totalShards, delay: null, timeout: -1 }).then((shards) => {
    logger.info(`${shards.size} shard(s) spawned.`);
  }).catch((err) => {
    logger.danger("An error has occurred :", err);
  });

 Manager.on("shardCreate", (shard) => {
    shard.on("ready", () => {
        logger.info(`Shard ${shard.id} Connected!`)
    });
});