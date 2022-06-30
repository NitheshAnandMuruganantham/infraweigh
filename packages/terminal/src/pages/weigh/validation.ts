import * as Yup from "yup";

const optionValidate = Yup.object().shape({
  value: Yup.string().required("Required"),
  label: Yup.string().required("Required"),
});

export default () => {
  return Yup.object().shape({
    vehicleNumber: Yup.string().required("Required"),
    material: optionValidate.required(),
    vehicle: optionValidate.required(),
    driver_phone: Yup.string().min(8).required(),
    charges: Yup.number().required(),
    tareWeight: Yup.lazy((val) =>
      val.secondWeight ? Yup.string().required("Required") : Yup.number()
    ),
  });
};
