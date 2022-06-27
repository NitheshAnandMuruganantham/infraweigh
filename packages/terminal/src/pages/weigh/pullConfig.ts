import { GetConfigrationQueryResult } from "../../generated";
import { db } from "../../utils/db";

export default async (Configration: GetConfigrationQueryResult) => {
  console.log(Configration.data?.weighbridge[0]);
  await db.config.clear();
  await db.config.add({
    camera: Configration.data?.weighbridge[0].config.camera,
    url: Configration.data?.weighbridge[0].config.url,
  });
};
