import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import { db } from "../../utils/db";
import { auth, storage } from "../../utils/firebase";
export default async (
  values: any,
  { setSubmitting, resetForm }: any,
  { setLoading, addBill, SetData, SetOpen, BillRefId }: any
) => {
  setLoading(true);
  setSubmitting(true);
  try {
    const config = await db.config.toArray().then((config) => config[0]);
    const id = uuid();
    const correctedVal: any = { ...values };
    if (!values.secondWeight) {
      correctedVal.tareWeight = null;
    }
    const claims = await auth.currentUser?.getIdTokenResult();
    const hasura: any = claims?.claims["https://hasura.io/jwt/claims"];

    const weight = await fetch(`${config.url}/weight`).then((res) =>
      res.json().then((data) => data.weight)
    );
    const images = await BulkUploadImages(id, config, hasura);
    console.log(images);
    const customerData: any = values;
    await addBill({
      variables: {
        object: {
          id,
          photos: images,
          charges: values.charges,
          driver_phone: values.driver_phone,
          vehicle_id: customerData.vehicle.value,
          material_id: customerData.material.value,
          vehicle_number: values.vehicleNumber,
          customer_id: customerData.buyer ? customerData.buyer.value : null,
          customer_2_id: customerData.seller ? customerData.seller.value : null,
          customer_3_id: customerData.trader ? customerData.trader.value : null,
          scale_weight: weight,
          tare_weight: values.secondWeight ? values.tareWeight : 0,
          second_weight: values.secondWeight,
          reference_bill_id: values.secondWeight ? BillRefId : null,
          paid_by: customerData.paidBy,
        },
      },
    }).then((dat: any) => {
      const dt: any = dat?.data?.insert_bill_one;
      SetData(dt);
      SetOpen(true);
      setSubmitting(false);
      setLoading(false);
      toast.success("Bill Added Successfully");
      resetForm();
    });
  } catch (error) {
    console.log("error");
    setSubmitting(false);
    setLoading(false);
  }
};

// const uploadImages = async (id: string, config: any, hasura: any) => {
//   let urls: string[] = [];
//   await config.camera.map(async (item: any, index: number) => {
//     const response = await fetch(`${config.url}/?url=${item}`);
//     const imageBlob = await response.blob();
//     const uploadImage = await uploadBytes(
//       ref(
//         storage,
//         `${hasura["x-hasura-tenent-id"]}/${hasura["x-hasura-weighbridge-id"]}/${id}-folder/${index}.jpeg`
//       ),
//       imageBlob
//     );
//     const downloadUrl = await getDownloadURL(uploadImage.ref);
//     urls.push(downloadUrl);
//   });
//   return urls;
// };

const uploadImage = async (url: string, camera: string) => {
  const response = await fetch(camera);
  const imageBlob = await response.blob();
  const uploadImage = await uploadBytes(ref(storage, url), imageBlob);
  const downloadUrl = await getDownloadURL(uploadImage.ref);
  return {
    url: downloadUrl,
    path: uploadImage.metadata.fullPath,
  };
};

const BulkUploadImages = async (id: string, config: any, hasura: any) => {
  const url = (index: number) =>
    `${hasura["x-hasura-tenent-id"]}/${hasura["x-hasura-weighbridge-id"]}/${id}-folder/${index}.jpeg`;
  let index = 0;
  let urls = [];
  if (config.camera[0]) {
    const url1 = await uploadImage(
      url(index),
      `${config.url}/?url=${config.camera[0]}`
    );
    urls.push(url1);
    index++;
  }

  if (config.camera[1]) {
    const url2 = await uploadImage(
      url(index),
      `${config.url}/?url=${config.camera[1]}`
    );
    urls.push(url2);
    index++;
  }

  if (config.camera[2]) {
    const url3 = await uploadImage(
      url(index),
      `${config.url}/?url=${config.camera[2]}`
    );
    urls.push(url3);
    index++;
  }

  if (config.camera[3]) {
    const url4 = await uploadImage(
      url(index),
      `${config.url}/?url=${config.camera[3]}`
    );
    urls.push(url4);
    index++;
  }
  return urls;
};
