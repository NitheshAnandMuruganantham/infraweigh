import { Box, Button, FormLabel, InputAdornment } from '@mui/material';
import {
  AutoCompleteComponent,
  RadioListComponent,
} from '@infra-weigh/shared-ui';
import BillInfo from './printBill';
import { FunctionComponent, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Field } from 'formik';
import { TextField, RadioGroup, Switch } from 'formik-mui';
import SelectWeight from './selectWeight';
import { v4 as uuid } from 'uuid';

import {
  useAddBillMutation,
  useGetCustomerDropdownOptionsLazyQuery,
  useGetMaterialDropDownListLazyQuery,
  useGetVehiclesDropDownListLazyQuery,
} from '@infra-weigh/generated';
import { auth, storage } from '@infra-weigh/firebase';
import { toast } from 'react-toastify';
import Loader from '@infra-weigh/loading';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import MuiPhoneNumber from 'material-ui-phone-number';

const Weigh: FunctionComponent = () => {
  const [addBill] = useAddBillMutation();
  const [BillRefId, SetBillRefId] = useState<string | null>(null);
  const [open, SetOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, SetData] = useState<any>(null);

  const optionValidate = Yup.object().shape({
    value: Yup.string().required('Required'),
    label: Yup.string().required('Required'),
  });

  return (
    <>
      <Loader open={loading} setOpen={setLoading} />
      <Formik
        initialValues={{
          vehicleNumber: '',
          material: null,
          vehicle: null,
          buyer: null,
          seller: null,
          driver_phone: '',
          trader: null,
          secondWeight: false,
          charges: 0,
          scaleWeight: 0,
          tareWeight: 0,
          paidBy: 'other',
        }}
        validationSchema={() => {
          return Yup.object().shape({
            vehicleNumber: Yup.string().required('Required'),
            material: optionValidate.required(),
            vehicle: optionValidate.required(),
            driver_phone: Yup.string().min(8).required(),
            charges: Yup.number().required(),
            tareWeight: Yup.lazy((val) =>
              val.secondWeight
                ? Yup.string().required('Required')
                : Yup.number()
            ),
          });
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setLoading(true);
          setSubmitting(true);
          try {
            const id = uuid();
            const correctedVal: any = { ...values };
            if (!values.secondWeight) {
              correctedVal.tareWeight = null;
            }
            const url =
              window.location.hostname === 'localhost'
                ? 'http://localhost:3030/dummy'
                : 'http://infraweighcontroller.local:9999';
            const dat = await fetch(url).then((res) => res.json());
            const claims = await auth.currentUser?.getIdTokenResult();
            const hasura: any = claims?.claims['https://hasura.io/jwt/claims'];
            const filePath = `${hasura['x-hasura-tenent-id']}/${hasura['x-hasura-weighbridge-id']}/${id}-folder/`;
            const prefix = `data:image/jpeg;base64,`;
            const imageurls: string[] = [];
            dat.image.map(async (item: any, index) => {
              await uploadString(
                ref(storage, `${filePath}${index}.jpeg`),
                `${prefix}${dat.image[0]}`,
                'data_url'
              ).then(async (res) =>
                getDownloadURL(ref(storage, res.ref.fullPath)).then((url) =>
                  imageurls.push(url)
                )
              );
            });

            const customerData: any = values;
            await addBill({
              variables: {
                object: {
                  id,
                  photos: imageurls,
                  charges: values.charges,
                  driver_phone: values.driver_phone,
                  vehicle_id: customerData.vehicle.value,
                  material_id: customerData.material.value,
                  vehicle_number: values.vehicleNumber,
                  customer_id: customerData.buyer
                    ? customerData.buyer.value
                    : null,
                  customer_2_id: customerData.seller
                    ? customerData.seller.value
                    : null,
                  customer_3_id: customerData.trader
                    ? customerData.trader.value
                    : null,
                  scale_weight: dat.weight,
                  tare_weight: values.secondWeight ? values.tareWeight : 0,
                  second_weight: values.secondWeight,
                  reference_bill_id: values.secondWeight ? BillRefId : null,
                  paid_by: customerData.paidBy,
                },
              },
            }).then((dat) => {
              const dt: any = dat?.data?.insert_bill_one;
              SetData(dt);
              SetOpen(true);
              setSubmitting(false);
              setLoading(false);
              toast.success('Bill Added Successfully');
              resetForm();
            });
          } catch (error) {
            console.log(JSON.stringify(error));
            setSubmitting(false);
            setLoading(false);
          }
        }}
        onReset={() => {
          SetBillRefId(null);
          setLoading(false);
        }}
      >
        {({
          handleReset,
          handleSubmit,
          errors,
          isSubmitting,
          setFieldValue,
          values,
          handleBlur,
          touched,
          isValid,
        }) => (
          <Box
            component="form"
            onSubmit={handleSubmit}
            onReset={handleReset}
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
            noValidate
            autoComplete="off"
          >
            <Box
              sx={{
                flexDirection: 'column',
                width: '50%',
                display: 'flex',
                height: '100%',
              }}
            >
              <Field
                component={TextField}
                autoFocus
                name="vehicleNumber"
                onChange={(e: any) =>
                  setFieldValue(
                    'vehicleNumber',
                    e.target.value.replace(' ', '').toUpperCase()
                  )
                }
                label="vehicle number"
                sx={{
                  margin: 2,
                  width: '90%',
                }}
              />
              <AutoCompleteComponent
                label="material"
                serverName="material"
                name="material"
                queryHook={useGetMaterialDropDownListLazyQuery}
              />
              <AutoCompleteComponent
                label="buyer"
                serverName="customer"
                name="buyer"
                filterOptions={(options: any, state: any) => {
                  let dat: any[] = options;
                  const vals: any = values;
                  if (vals?.seller?.value) {
                    dat = dat.filter(
                      (option: any) => option.value !== vals.seller.value
                    );
                  }
                  if (vals?.trader?.value) {
                    dat = dat.filter(
                      (option: any) => option.value !== vals.trader.value
                    );
                  }
                  return dat;
                }}
                queryHook={useGetCustomerDropdownOptionsLazyQuery}
              />
              <AutoCompleteComponent
                label="seller"
                serverName="customer"
                name="seller"
                filterOptions={(options: any, state: any) => {
                  let dat: any[] = options;
                  const vals: any = values;
                  if (vals?.seller?.value) {
                    dat = dat.filter(
                      (option: any) => option.value !== vals.seller.value
                    );
                  }
                  if (vals?.buyer?.value) {
                    dat = dat.filter(
                      (option: any) => option.value !== vals.buyer.value
                    );
                  }
                  return dat;
                }}
                queryHook={useGetCustomerDropdownOptionsLazyQuery}
              />
              <AutoCompleteComponent
                label="trader"
                serverName="customer"
                name="trader"
                filterOptions={(options: any, state: any) => {
                  let dat: any[] = options;
                  const vals: any = values;
                  if (vals?.buyer?.value) {
                    dat = dat.filter(
                      (option: any) => option.value !== vals.buyer.value
                    );
                  }
                  if (vals?.seller?.value) {
                    dat = dat.filter(
                      (option: any) => option.value !== vals.seller.value
                    );
                  }
                  return dat;
                }}
                queryHook={useGetCustomerDropdownOptionsLazyQuery}
              />

              <Box>
                <FormLabel>second weight or tare weight</FormLabel>
                <Field component={Switch} type="checkbox" name="secondWeight" />
              </Box>
              <Box
                sx={{
                  margin: 2,
                  width: '90%',
                }}
              >
                <FormLabel>paid by</FormLabel>
                <Field component={RadioGroup} row name="paidBy">
                  {[
                    {
                      name: 'buyer',
                      show: values.buyer,
                    },
                    {
                      name: 'seller',
                      show: values.seller,
                    },
                    {
                      name: 'trader',
                      show: values.trader,
                    },
                    {
                      name: 'driver',
                      show: true,
                    },
                    {
                      name: 'other',
                      show: true,
                    },
                  ].map(({ name, show }) => (
                    <RadioListComponent key={name} name={name} show={show} />
                  ))}
                </Field>
              </Box>
            </Box>
            <Box
              sx={{
                width: '50%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {values.secondWeight && (
                <Box sx={{ m: 1, width: '90%', display: 'flex' }}>
                  <SelectWeight
                    setLoading={(loading: boolean) => setLoading(loading)}
                    setWeight={(val) => {
                      setFieldValue('tareWeight', val);
                    }}
                    setBillRefId={(val) => {
                      SetBillRefId(val);
                    }}
                    vehicleNumber={values.vehicleNumber}
                  />
                  <Field
                    component={TextField}
                    label="Tare weight"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">kg</InputAdornment>
                      ),
                    }}
                    disabled={BillRefId ? true : false}
                    name="tareWeight"
                    sx={{ m: 1, width: '50%' }}
                  />
                </Box>
              )}
              <AutoCompleteComponent
                name="vehicle"
                label="vehicle"
                serverName="vehicle"
                queryHook={useGetVehiclesDropDownListLazyQuery}
              />
              <MuiPhoneNumber
                label="driver phone"
                variant="outlined"
                countryCodeEditable={false}
                defaultCountry={'in'}
                onBlur={handleBlur}
                autoComplete="off"
                disabled={isSubmitting}
                error={
                  touched.driver_phone && errors.driver_phone ? true : false
                }
                value={values.driver_phone}
                onChange={(e) => setFieldValue('driver_phone', e.toString())}
                name="driver_phone"
                sx={{
                  margin: 2,
                  width: '90%',
                }}
              />
              <Field
                component={TextField}
                name="charges"
                type="number"
                sx={{
                  margin: 2,
                  width: '90%',
                }}
              />
              <Box
                sx={{
                  margin: 2,
                  width: '90%',
                  justifyContent: 'end',
                  display: 'flex',
                }}
              >
                {isValid && (
                  <Button
                    sx={{ marginRight: 2 }}
                    type="submit"
                    variant="contained"
                    color="success"
                  >
                    ACCEPT
                  </Button>
                )}
                <Button variant="contained" type="reset" color="error">
                  RESET
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Formik>
      <BillInfo data={data} open={open} setOpen={SetOpen} />
    </>
  );
};

export default Weigh;
