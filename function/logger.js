const colors = require("colors")
module.exports = {
    /**
     * 
     * @param { string } msg
     */
    debug: (msg) => {
        console.log(`[${`${createDateTime()}`.blue}]`.gray + ` [${`DEBUG`.green}]`.gray + ` ${msg}`.white)
    },
    /**
     * 
     * @param { string } msg 
     */
    info: (msg) => {
        console.log(`[${`${createDateTime()}`.blue}]`.gray + ` [${`INFO`.blue}]`.gray + ` ${msg}`.white)
    },
    /**
     * 
     * @param { string } msg 
     */
    music: (msg) => {
        console.log(`[${`${createDateTime()}`.blue}]`.gray + ` [${`MUSIC-LOGS`.white}]`.gray + ` ${msg}`.green)
    },
    /**
     * 
     * @param { string } msg 
     */
    musicsearch: (msg) => {
        console.log(`[${`${createDateTime()}`.blue}]`.gray + ` [${`MUSIC-SEARCH`.blue}]`.gray + ` ${msg}`.white)
    },
     /**
     * 
     * @param { string } msg 
     */
    musicerror: (msg) => {
        console.log(`[${`${createDateTime()}`.blue}]`.gray + ` [${`MUSIC-ERROR`.red}]`.gray + ` ${msg}`.red)
    },
    /**
     * 
     * @param { string } msg 
     */
    musicroom: (msg) => {
        console.log(`[${`${createDateTime()}`.blue}]`.gray + ` [${`MUSIC-ROOM`.white}]`.gray + ` ${msg}`.white)
    },
    /**
     * 
     * @param { string } msg 
     */
    setup: (msg) => {
        console.log(`[${`${createDateTime()}`.blue}]`.gray + ` [${`MUSIC-SETUP`.white}]`.gray + ` ${msg}`.white)
    },
    /**
     * 
     * @param { string } msg 
     */
    volume: (msg) => {
        console.log(`[${`${createDateTime()}`.blue}]`.gray + ` [${`VOLUME-LOGS`.white}]`.gray + ` ${msg}`.white)
    },
    /**
     * 
     * @param { string } msg 
     */
    warning: (msg) => {
        console.log(`[${`${createDateTime()}`.blue}]`.gray + ` [${`WARN`.yellow}]`.gray + ` ${msg}`.white)
    },
    /**
     * 
     * @param { string } msg 
     */
    danger: (msg) => {
        console.log(`[${`${createDateTime()}`.blue}]`.gray + ` [${`DANGER`.red}]`.gray + ` ${msg}`.white)
    },
    /**
     * 
     * @param { string } msg 
     */
    success: (msg) => {
        console.log(`[${`${createDateTime()}`.blue}]`.gray + ` [${`SUCCESS`.green}]`.gray + ` ${msg}`.white)
    }
}

function createDateTime(ts) {
    if (!ts) ts = Date.now();
    return new Date(ts).toLocaleString("th-TH", { timeZone: "Asia/Bangkok" });
}