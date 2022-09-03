import { Field, Formik } from 'formik';
import { RadioGroup, Switch, TextField } from 'formik-mui';
import MuiPhoneNumber from 'material-ui-phone-number';
import { FunctionComponent, useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, FormLabel, InputAdornment } from '@mui/material';
import FormData from 'form-data';
import AutoCompleteComponent from '../../components/autoComplete';
import Loader from '../../components/loading';
import RadioListComponent from '../../components/radio';
import {
  useGetConfigrationQuery,
  useGetCustomerDropdownOptionsLazyQuery,
  useGetMaterialDropDownListLazyQuery,
  useGetVehiclesDropDownListLazyQuery,
} from '../../generated';
import BillInfo from './printBill';
import SelectWeight from './selectWeight';
import validation from './validation';
import { toast } from 'react-toastify';

const Weigh: FunctionComponent = () => {
  const [BillRefId, SetBillRefId] = useState<string | null>(null);
  const [open, SetOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, SetData] = useState<any>(null);
  const configQuery = useGetConfigrationQuery();

  return (
    <>
      <Loader open={loading || configQuery.loading} setOpen={setLoading} />

      <Formik
        initialValues={{
          vehicleNumber: '',
          box_number: '',
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
        validationSchema={validation}
        onSubmit={async (values: any, { setSubmitting, resetForm }) => {
          try {
            setLoading(true);
            setSubmitting(true);
            const local_server: any = await configQuery.data?.weighbridge[0]
              .local_server_url;
            const camera = [
              configQuery.data?.weighbridge[0].camera_url_1,
              configQuery.data?.weighbridge[0].camera_url_2,
              configQuery.data?.weighbridge[0].camera_url_3,
              configQuery.data?.weighbridge[0].camera_url_4,
            ];
            const config: any = {
              url: local_server,
              camera,
            };
            console.log(camera);
            const getLocalData = await Promise.all([
              fetch(`${config.url}/weight`),

              Promise.all(
                config.camera.map((camera: any) => {
                  return fetch(`${config.url}/?url=${camera}`);
                })
              ),
            ]);

            const ImagesBlob = await Promise.all(
              getLocalData[1].map((image) => {
                return image.blob();
              })
            );

            const form = new FormData();

            ImagesBlob.map((images, index) => {
              const file = new File([images], `${index}.jpg`);
              form.append('files', file, `${index}.jpg`);
            });

            if (values.secondWeight) {
              form.append('tare_weight', values.tareWeight);
              if (BillRefId) {
                form.append('reference_bill_id', BillRefId);
              }
            }

            if (values?.buyer?.value) {
              form.append('customer_id', values.buyer.value);
            }

            if (
              typeof values?.box_number === 'string' &&
              values?.box_number.length > 0
            ) {
              form.append('box_number', values.box_number);
            }

            if (values.seller) {
              form.append('customer_2_id', values.buyer.value);
            }

            if (values.trader) {
              form.append('customer_3_id', values.trader.value);
            }

            form.append('vehicle_number', values.vehicleNumber);
            form.append('material_id', values.material.value);
            form.append('vehicle_id', values.vehicle.value);
            form.append('paid_by', values.paidBy);
            form.append('driver_phone', values.driver_phone);
            form.append('charges', values.charges);
            form.append(
              'scale_weight',
              await getLocalData[0].json().then((weight) => weight.weight)
            );

            const dat = await axios({
              method: 'post',
              url: import.meta.env['VITE_SERVER_URL'] + '/bill',
              headers: {
                authorization: 'Bearer ' + sessionStorage.getItem('token'),
                'Content-Type': 'undefined',
              },
              data: form,
            });

            var dt: any = { ...dat.data[0], photos: dat.data[1] };
            SetData(dt);
            SetOpen(true);
            setSubmitting(false);
            setLoading(false);
            toast.success('Bill Added Successfully');
            SetBillRefId(null);
            resetForm();
          } catch (err) {
            console.log(err);

            toast.error('something went wrong');
            setLoading(false);
            console.log(err);
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
                autoFocus
                name="box_number"
                onChange={(e: any) =>
                  setFieldValue(
                    'box_number',
                    e.target.value.replace(' ', '').toUpperCase()
                  )
                }
                label="container box number"
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
