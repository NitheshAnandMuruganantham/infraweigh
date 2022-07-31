import Dexie, { Table } from "dexie";

export interface Config {
  id?: number;
  camera: string[];
  url: string;
}

export class configStore extends Dexie {
  config!: Table<Config>;

  constructor() {
    super("configStore");
    this.version(1).stores({
      config: "++id, camera, url",
    });
  }
}

export const db = new configStore();
