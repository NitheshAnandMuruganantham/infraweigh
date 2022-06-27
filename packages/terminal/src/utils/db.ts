import Dexie, { Table } from "dexie";

export interface Config {
  id?: number;
  camera: string[];
  url: string;
}

export class MySubClassedDexie extends Dexie {
  config!: Table<Config>;

  constructor() {
    super("myDatabase");
    this.version(1).stores({
      config: "++id, camera, url",
    });
  }
}

export const db = new MySubClassedDexie();
