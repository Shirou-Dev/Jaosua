import { Client } from "discord.js"
import ICustomClient from "../iCustomClient";
import { IConfig } from "../iConfig";
 
export default class CustomClient extends Client implements ICustomClient
{
    config: IConfig;

    constructor()
    {
        super({ intents: [] })

        this.config = require(`${process.cwd()}/data/config.json`);
    }
    Init(): void {
        throw new Error("Method not implemented.");
    }
}