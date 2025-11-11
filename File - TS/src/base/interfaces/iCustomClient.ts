import { IConfig } from "./iConfig";

export default interface ICustomClient {
    config: IConfig;

    Init(): void;
}