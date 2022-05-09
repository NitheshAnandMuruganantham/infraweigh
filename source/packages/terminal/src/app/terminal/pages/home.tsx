import {
  Box,
  Button,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Radio,
  TextField as TF,
} from '@mui/material';
import BillInfo from '../printBill';
import { FunctionComponent, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Field } from 'formik';
import { TextField, Autocomplete, RadioGroup, Switch } from 'formik-mui';
import SelectWeight from '../components/selectWeight';
import { v4 as uuid } from 'uuid';
import Loader from '@infra-weigh/loading';

import {
  useGetMaterialDropDownListQuery,
  useGetVehiclesDropDownListQuery,
  useAddBillMutation,
  useGetCustomerDropdownOptionsQuery,
} from '@infra-weigh/generated';
import { auth, storage } from '@infra-weigh/firebase';
import Capture from '../components/capture';
import { toast } from 'react-toastify';
import { ref, uploadString, deleteObject } from 'firebase/storage';
const Home: FunctionComponent = () => {
  const { data: customerData, loading: customerLoading } =
    useGetCustomerDropdownOptionsQuery({
      variables: {
        where: {
          tenent_id: {
            _eq: localStorage.getItem('x-tenent-id'),
          },
        },
      },
    });
  const { data: materialData, loading: materialLoading } =
    useGetMaterialDropDownListQuery();
  const { data: vehicleData, loading: vehicleLoading } =
    useGetVehiclesDropDownListQuery();
  const [addBill] = useAddBillMutation();
  const [BillRefId, SetBillRefId] = useState<string>();
  const [open, SetOpen] = useState<boolean>(false);
  const [data, SetData] = useState<any>(null);
  const [photo1, setPhoto1] = useState<any>(null);
  const [photo2, setPhoto2] = useState<any>(null);
  const [photo3, setPhoto3] = useState<any>(null);
  const [photo4, setPhoto4] = useState<any>(null);
  const [load, setLoad] = useState(true);
  useEffect(() => {
    if (materialData && customerData && vehicleData) {
      setLoad(false);
    }
  }, [
    materialLoading,
    customerLoading,
    vehicleLoading,
    materialData,
    customerData,
    vehicleData,
  ]);
  return (
    <>
      <Loader open={load} setOpen={setLoad} />
      <Formik
        initialValues={{
          vehicleNumber: '',
          material: {
            label: '',
            value: null,
          },
          vehicle: {
            label: '',
            value: null,
          },
          buyer: {
            label: '',
            value: null,
          },
          seller: {
            label: '',
            value: null,
          },
          trader: {
            label: '',
            value: null,
          },
          secondWeight: false,
          charges: 0,
          scaleWeight: 0,
          tareWeight: 0,
          paidBy: 'other',
        }}
        validationSchema={() => {
          return Yup.object().shape({
            vehicleNumber: Yup.string().required('Required'),
            material: Yup.object()
              .shape({
                value: Yup.string().required('Required'),
                label: Yup.string().required('Required'),
              })
              .required(),
            vehicle: Yup.object()
              .shape({
                value: Yup.string().required('Required'),
                label: Yup.string().required('Required'),
              })
              .required(),
            charges: Yup.number().required(),
            scaleWeight: Yup.string().required('Required'),
            tareWeight: Yup.lazy((val) =>
              val.secondWeight
                ? Yup.string().required('Required')
                : Yup.string()
            ),
            buyer: Yup.object().shape({
              value: Yup.string().required('Required'),
              label: Yup.string().required('Required'),
            }),
          });
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          setLoad(true);
          try {
            const id = uuid();
            // eslint-disable-next-line prefer-const
            let correctedVal: any = { ...values };
            if (!values.secondWeight) {
              correctedVal.tareWeight = null;
            }

            const claims = await auth.currentUser?.getIdTokenResult();
            const hasura: any = claims?.claims['https://hasura.io/jwt/claims'];
            const n1 = `${hasura['x-hasura-tenent-id']}/${hasura['x-hasura-weighbridge-id']}/${id}-folder/one.jpeg`;
            const n2 = `${hasura['x-hasura-tenent-id']}/${hasura['x-hasura-weighbridge-id']}/${id}-folder/two.jpeg`;
            const n3 = `${hasura['x-hasura-tenent-id']}/${hasura['x-hasura-weighbridge-id']}/${id}-folder/three.jpeg`;
            const n4 = `${hasura['x-hasura-tenent-id']}/${hasura['x-hasura-weighbridge-id']}/${id}-folder/four.jpeg`;

            const up1 = await uploadString(
              ref(storage, n1),
              photo1,
              'data_url'
            );
            const up2 = await uploadString(
              ref(storage, n2),
              photo2,
              'data_url'
            );
            const up3 = await uploadString(
              ref(storage, n3),
              photo3,
              'data_url'
            );
            const up4 = await uploadString(
              ref(storage, n4),
              photo4,
              'data_url'
            );

            await addBill({
              variables: {
                object: {
                  id,
                  photos: [
                    up1.ref.fullPath,
                    up2.ref.fullPath,
                    up3.ref.fullPath,
                    up4.ref.fullPath,
                  ],
                  charges: values.charges,
                  vehicle_id: values.vehicle.value,
                  material_id: values.material.value,
                  vehicle_number: values.vehicleNumber,
                  customer_id: values.buyer.value,
                  customer_2_id: values.seller.value,
                  customer_3_id: values.trader.value,
                  scale_weight: values.scaleWeight,
                  tare_weight: values.secondWeight ? values.tareWeight : 0,
                  second_weight: values.secondWeight,
                  reference_bill_id: values.secondWeight ? BillRefId : null,
                  paid_by: values.paidBy,
                },
              },
            })
              .catch(() => {
                deleteObject(up1.ref);
                deleteObject(up2.ref);
                deleteObject(up3.ref);
                deleteObject(up4.ref);
              })
              .then((dat) => {
                // eslint-disable-next-line prefer-const
                let dt: any = dat?.data?.insert_bill_one;
                dt.photos = [photo1, photo2, photo3, photo4];
                SetData(dt);
                SetOpen(true);
                setPhoto1(null);
                setPhoto2(null);
                setPhoto3(null);
                setPhoto4(null);
                setSubmitting(false);
                toast.success('Bill Added Successfully');
                resetForm();
                setLoad(false);
              });
          } catch (error) {
            setLoad(false);
            setSubmitting(false);
            console.log(error);
          }
        }}
      >
        {({
          submitForm,
          isSubmitting,
          setFieldValue,
          values,
          isValid,
          resetForm,
        }) => (
          <Box
            component="form"
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
              <Capture
                submitting={isSubmitting}
                setData1={setPhoto1}
                setData2={setPhoto2}
                setData3={setPhoto3}
                setData4={setPhoto4}
              />
              <Box flex={1} flexDirection="column">
                {photo1 && (
                  <img
                    style={{
                      margin: '10px',
                      width: '100px',
                    }}
                    src={photo1}
                    alt="photo1"
                  />
                )}
                {photo2 && (
                  <img
                    style={{
                      margin: '10px',
                      width: '100px',
                    }}
                    src={photo2}
                    alt="photo1"
                  />
                )}
                {photo3 && (
                  <img
                    style={{
                      margin: '10px',
                      width: '100px',
                    }}
                    src={photo3}
                    alt="photo1"
                  />
                )}
                {photo4 && (
                  <img
                    style={{
                      margin: '10px',
                      width: '100px',
                    }}
                    src={photo4}
                    alt="photo1"
                  />
                )}
              </Box>
              <Field
                component={Autocomplete}
                name="material"
                options={materialData?.material || []}
                renderInput={(params: any) => (
                  <TF {...params} label="Material" />
                )}
                id="outlined-required"
                sx={{
                  margin: 2,
                  width: '90%',
                }}
              />
              <Field
                component={Autocomplete}
                filterOptions={(options: any, state: any) => {
                  if (
                    values.seller.value !== null &&
                    values.trader.value !== null
                  ) {
                    const filtered = options.filter((option: any) => {
                      return (
                        option.value !== values.trader.value &&
                        option.value !== values.seller.value
                      );
                    });
                    return filtered;
                  } else {
                    return options;
                  }
                }}
                name="buyer"
                options={customerData?.customer || []}
                renderInput={(params: any) => <TF {...params} label="buyer" />}
                sx={{
                  margin: 2,
                  width: '90%',
                }}
              />

              <Field
                name="seller"
                filterOptions={(options: any, state: any) => {
                  if (
                    values.buyer.value !== null &&
                    values.trader.value !== null
                  ) {
                    const filtered = options.filter((option: any) => {
                      return (
                        option.value !== values.trader.value &&
                        option.value !== values.buyer.value
                      );
                    });
                    return filtered;
                  } else {
                    return options;
                  }
                }}
                component={Autocomplete}
                options={customerData?.customer || []}
                renderInput={(params: any) => <TF {...params} label="seller" />}
                id="outlined-required"
                sx={{
                  margin: 2,
                  width: '90%',
                }}
              />

              <Field
                name="trader"
                filterOptions={(options: any, state: any) => {
                  if (
                    values.buyer.value !== null &&
                    values.seller.value !== null
                  ) {
                    const filtered = options.filter((option: any) => {
                      return (
                        option.value !== values.buyer.value &&
                        option.value !== values.seller.value
                      );
                    });
                    return filtered;
                  } else {
                    return options;
                  }
                }}
                component={Autocomplete}
                options={customerData?.customer || []}
                renderInput={(params: any) => (
                  <TF {...params} label="trader or mediator" />
                )}
                sx={{
                  margin: 2,
                  width: '90%',
                }}
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
                  <FormControlLabel
                    value="buyer"
                    control={<Radio />}
                    label="buyer"
                  />
                  <FormControlLabel
                    value="trader"
                    control={<Radio />}
                    label="trader"
                  />
                  <FormControlLabel
                    value="seller"
                    control={<Radio />}
                    label="seller"
                  />
                  <FormControlLabel
                    value="driver"
                    control={<Radio />}
                    label="driver"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="other"
                  />
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
              <Field
                component={TextField}
                name="scaleWeight"
                label="scale weight"
                sx={{ m: 2, width: '90%' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">kg</InputAdornment>
                  ),
                }}
              />
              {values.secondWeight && (
                <Box sx={{ m: 1, width: '90%', display: 'flex' }}>
                  <SelectWeight
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
                    name="tareWeight"
                    sx={{ m: 1, width: '50%' }}
                  />
                </Box>
              )}
              <Field
                component={Autocomplete}
                name="vehicle"
                options={vehicleData?.vehicle || []}
                renderInput={(params: any) => (
                  <TF {...params} label="Vehicle" />
                )}
                id="outlined-required"
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
                {isValid && photo1 && photo2 && photo3 && photo3 && (
                  <Button
                    sx={{ marginRight: 2 }}
                    onClick={() => submitForm()}
                    variant="contained"
                    color="success"
                  >
                    ACCEPT
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={() => resetForm()}
                  color="error"
                >
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

export default Home;
