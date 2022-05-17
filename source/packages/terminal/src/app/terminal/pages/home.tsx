import {
  Box,
  Button,
  FormControlLabel,
  FormLabel,
  Autocomplete as AC,
  InputAdornment,
  Radio,
  TextField as TF,
  LinearProgress,
} from '@mui/material';
import BillInfo from '../printBill';
import { FunctionComponent, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Field } from 'formik';
import { TextField, Autocomplete, RadioGroup, Switch } from 'formik-mui';
import SelectWeight from '../components/selectWeight';
import { v4 as uuid } from 'uuid';

import {
  useAddBillMutation,
  useGetCustomerDropdownOptionsLazyQuery,
  useGetMaterialDropDownListLazyQuery,
  useGetVehiclesDropDownListLazyQuery,
} from '@infra-weigh/generated';
import { auth, storage } from '@infra-weigh/firebase';
import Capture from '../components/capture';
import { toast } from 'react-toastify';
import { ref, uploadString, deleteObject } from 'firebase/storage';
const Home: FunctionComponent = () => {
  const [loadCustomers, { data: customerData, loading: customerLoading }] =
    useGetCustomerDropdownOptionsLazyQuery({
      variables: {
        where: {
          tenent_id: {
            _eq: localStorage.getItem('x-tenent-id'),
          },
        },
        limit: 3000,
      },
    });
  const [materials, setMaterials] = useState<any[]>([]);
  const [customer, setCustomer] = useState<any[]>([]);
  const [vehicle, setVehicle] = useState<any[]>([]);
  const [loadMaterialData, { data: materialData, loading: materialLoading }] =
    useGetMaterialDropDownListLazyQuery();
  const [loadVehicleData, { data: vehicleData, loading: vehicleLoading }] =
    useGetVehiclesDropDownListLazyQuery();
  const [addBill] = useAddBillMutation();
  const [BillRefId, SetBillRefId] = useState<string>();
  const [open, SetOpen] = useState<boolean>(false);
  const [data, SetData] = useState<any>(null);
  const [photo1, setPhoto1] = useState<any>(null);
  const [photo2, setPhoto2] = useState<any>(null);
  const [photo3, setPhoto3] = useState<any>(null);
  const [photo4, setPhoto4] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (materialData) {
      setMaterials(materialData.material);
    }
  }, [materialData]);
  useEffect(() => {
    if (customerData) {
      setCustomer(customerData.customer);
    }
  }, [customerData]);
  useEffect(() => {
    if (vehicleData) {
      setVehicle(vehicleData.vehicle);
    }
  }, [vehicleData]);

  return (
    <>
      {loading && (
        <LinearProgress
          sx={{
            mx: '10px',
          }}
        />
      )}
      <Formik
        initialValues={{
          vehicleNumber: '',
          material: null,
          vehicle: null,
          buyer: null,
          seller: null,
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
            scaleWeight: Yup.number().required('Required'),
            tareWeight: Yup.lazy((val) =>
              val.secondWeight
                ? Yup.string().required('Required')
                : Yup.number()
            ),
          });
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
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

            const customerData: any = values;
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
              });
          } catch (error) {
            setSubmitting(false);
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
                loading={materialLoading}
                disableClearable
                isOptionEqualToValue={(option: any, value: any) =>
                  option.value === value.value
                }
                onOpen={() =>
                  loadMaterialData({
                    variables: {
                      limit: 3000,
                    },
                  })
                }
                onInputChange={(_: any, v: any) => {
                  loadMaterialData({
                    variables: {
                      where: {
                        name: {
                          _like: `%${v}%`,
                        },
                      },
                      limit: 3000,
                    },
                  });
                }}
                options={materials}
                renderInput={(params: any) => (
                  <TF {...params} label="Material" />
                )}
                sx={{
                  margin: 2,
                  width: '90%',
                }}
              />
              <Field
                component={Autocomplete}
                name="buyer"
                loading={customerLoading}
                filterOptions={(options: any, state: any) => {
                  let dat: any[] = options;
                  const vals: any = values;
                  if (vals.seller && vals.seller.value) {
                    dat = dat.filter(
                      (option: any) => option.value !== vals.seller.value
                    );
                  }
                  if (vals.trader && vals.trader.value) {
                    dat = dat.filter(
                      (option: any) => option.value !== vals.trader.value
                    );
                  }
                  return dat;
                }}
                disableClearable
                isOptionEqualToValue={(option: any, value: any) =>
                  option.value === value.value
                }
                onOpen={() =>
                  loadCustomers({
                    variables: {
                      where: {
                        tenent_id: {
                          _eq: localStorage.getItem('x-tenent-id'),
                        },
                      },
                      limit: 3000,
                    },
                  })
                }
                onInputChange={(_: any, v: any) => {
                  loadCustomers({
                    variables: {
                      where: {
                        _and: [
                          {
                            name: {
                              _like: `%${v}%`,
                            },
                          },
                          {
                            tenent_id: {
                              _eq: localStorage.getItem('x-tenent-id'),
                            },
                          },
                        ],
                      },
                      limit: 3000,
                    },
                  });
                }}
                options={customer}
                renderInput={(params: any) => <TF {...params} label="buyer" />}
                sx={{
                  margin: 2,
                  width: '90%',
                }}
              />
              <Field
                component={Autocomplete}
                name="seller"
                filterOptions={(options: any, state: any) => {
                  let dat: any[] = options;
                  const vals: any = values;
                  if (vals.buyer && vals.buyer.value) {
                    dat = dat.filter(
                      (option: any) => option.value !== vals.buyer.value
                    );
                  }
                  if (vals.trader && vals.trader.value) {
                    dat = dat.filter(
                      (option: any) => option.value !== vals.trader.value
                    );
                  }
                  return dat;
                }}
                loading={customerLoading}
                disableClearable
                isOptionEqualToValue={(option: any, value: any) =>
                  option.value === value.value
                }
                onOpen={() =>
                  loadCustomers({
                    variables: {
                      where: {
                        tenent_id: {
                          _eq: localStorage.getItem('x-tenent-id'),
                        },
                      },
                      limit: 3000,
                    },
                  })
                }
                onInputChange={(_: any, v: any) => {
                  loadCustomers({
                    variables: {
                      where: {
                        _and: [
                          {
                            name: {
                              _like: `%${v}%`,
                            },
                          },
                          {
                            tenent_id: {
                              _eq: localStorage.getItem('x-tenent-id'),
                            },
                          },
                        ],
                      },
                      limit: 3000,
                    },
                  });
                }}
                options={customer}
                renderInput={(params: any) => <TF {...params} label="seller" />}
                sx={{
                  margin: 2,
                  width: '90%',
                }}
              />
              <Field
                component={Autocomplete}
                name="trader"
                filterOptions={(options: any, state: any) => {
                  let dat: any[] = options;
                  const vals: any = values;
                  if (vals.buyer && vals.buyer.value) {
                    dat = dat.filter(
                      (option: any) => option.value !== vals.buyer.value
                    );
                  }
                  if (vals.seller && vals.seller.value) {
                    dat = dat.filter(
                      (option: any) => option.value !== vals.seller.value
                    );
                  }
                  return dat;
                }}
                loading={customerLoading}
                disableClearable
                isOptionEqualToValue={(option: any, value: any) =>
                  option.value === value.value
                }
                onOpen={() =>
                  loadCustomers({
                    variables: {
                      where: {
                        tenent_id: {
                          _eq: localStorage.getItem('x-tenent-id'),
                        },
                      },
                      limit: 3000,
                    },
                  })
                }
                onInputChange={(_: any, v: any) => {
                  loadCustomers({
                    variables: {
                      where: {
                        _and: [
                          {
                            name: {
                              _like: `%${v}%`,
                            },
                          },
                          {
                            tenent_id: {
                              _eq: localStorage.getItem('x-tenent-id'),
                            },
                          },
                        ],
                      },
                      limit: 3000,
                    },
                  });
                }}
                options={customer}
                renderInput={(params: any) => <TF {...params} label="trader" />}
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
                  {values.buyer && (
                    <FormControlLabel
                      value="buyer"
                      control={<Radio />}
                      label="buyer"
                    />
                  )}
                  {values.trader && (
                    <FormControlLabel
                      value="trader"
                      control={<Radio />}
                      label="trader"
                    />
                  )}
                  {values.seller && (
                    <FormControlLabel
                      value="seller"
                      control={<Radio />}
                      label="seller"
                    />
                  )}
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
              <Box display="flex" sx={{ width: '95%' }}>
                <Field
                  disabled
                  component={TextField}
                  name="scaleWeight"
                  label="scale weight"
                  sx={{ m: 2, width: '80%' }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">kg</InputAdornment>
                    ),
                  }}
                />
                <Button
                  onClick={async () => {
                    try {
                      setLoading(true);
                      const dat = await await (
                        await fetch('http://localhost:8000/weight')
                      ).json();
                      if (
                        dat &&
                        dat.weighbridge_id !==
                          localStorage.getItem('x-weighbridge-id')
                      ) {
                        throw new Error('not your weighbridge');
                      }
                      setFieldValue('scaleWeight', dat.weight || 0);
                      setLoading(false);
                      toast.success('weight fetched !');
                    } catch {
                      toast.error('can not fetch weight');
                      setLoading(false);
                    }
                  }}
                  sx={{ m: 2, width: '20%' }}
                  variant="outlined"
                  color="primary"
                >
                  capture
                </Button>
              </Box>
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
                    name="tareWeight"
                    sx={{ m: 1, width: '50%' }}
                  />
                </Box>
              )}
              <Field
                component={Autocomplete}
                name="vehicle"
                loading={vehicleLoading}
                disableClearable
                onChange={(_: any, v: any) => {
                  setFieldValue('vehicle', {
                    value: v.value,
                    label: v.label,
                  });
                }}
                isOptionEqualToValue={(option: any, value: any) =>
                  option.value === value.value
                }
                onOpen={() =>
                  loadVehicleData({
                    variables: {
                      limit: 3000,
                    },
                  })
                }
                onInputChange={(_: any, v: any) => {
                  loadVehicleData({
                    variables: {
                      where: {
                        name: {
                          _like: `%${v}%`,
                        },
                      },
                      limit: 3000,
                    },
                  });
                }}
                options={vehicle}
                renderInput={(params: any) => (
                  <TF {...params} label="Vehicle" />
                )}
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
