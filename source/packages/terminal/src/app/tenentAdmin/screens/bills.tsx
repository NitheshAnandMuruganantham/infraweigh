import * as React from 'react';
import { DataGrid, GridValueGetterParams } from '@mui/x-data-grid';
import {
  Box,
  Button,
  Checkbox,
  LinearProgress,
  TextField as TF,
  Typography,
} from '@mui/material';
import {
  useGetAllBillsSubscription,
  useGetCustomerDropdownOptionsLazyQuery,
  useGetMaterialDropDownListLazyQuery,
  useGetTotalBillsSubscription,
  useGetVehiclesDropDownListLazyQuery,
} from '@infra-weigh/generated';
import BillInfo from './billInfo';
import { Formik, Field, FormikProps } from 'formik';
import { Autocomplete, TextField } from 'formik-mui';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const Bills = () => {
  const [pageSize, setPageSize] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [filter, setFilter] = React.useState<any>([]);
  const [sort, setSort] = React.useState<any>({});
  const [materials, setMaterials] = React.useState<any[]>([]);
  const [customer, setCustomer] = React.useState<any[]>([]);
  const [vehicle, setVehicle] = React.useState<any[]>([]);
  const [filterByDateTime, setFilterByDateTime] =
    React.useState<boolean>(false);
  const [showLoading, setShowLoading] = React.useState<boolean>(false);
  const { data, loading } = useGetAllBillsSubscription({
    variables: {
      orderBy: sort,
      where: {
        _and: [
          {
            tenent_id: {
              _eq: localStorage.getItem('x-tenent-id'),
            },
          },

          ...filter,
        ],
      },
      offset: (page - 1) * pageSize < 0 ? 0 : (page - 1) * pageSize,
      limit: pageSize,
    },
  });
  const { data: totalRows, loading: totalRowsLoading } =
    useGetTotalBillsSubscription({
      variables: {
        where: {
          _and: [
            {
              tenent_id: {
                _eq: localStorage.getItem('x-tenent-id'),
              },
            },
            ...filter,
          ],
        },
      },
    });
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

  const [loadMaterialData, { data: materialData, loading: materialLoading }] =
    useGetMaterialDropDownListLazyQuery();
  const [loadVehicleData, { data: vehicleData, loading: vehicleLoading }] =
    useGetVehiclesDropDownListLazyQuery();

  React.useEffect(() => {
    if (materialData) {
      setMaterials(materialData.material);
    }
  }, [materialData]);

  React.useEffect(() => {
    if (customerData) {
      setCustomer(customerData.customer);
    }
  }, [customerData]);

  React.useEffect(() => {
    if (vehicleData) {
      setVehicle(vehicleData.vehicle);
    }
  }, [vehicleData]);

  const FormikRef = React.useRef<FormikProps<any>>(null);

  React.useEffect(() => {
    if (!filterByDateTime) {
      FormikRef.current?.setFieldValue('from', '', false);
      FormikRef.current?.setFieldValue('to', '', false);
    }
  }, [filterByDateTime]);

  return (
    <Box>
      <Box height={600} width={'100%'} textAlign="center">
        <LinearProgress
          sx={{
            visibility:
              totalRowsLoading ||
              loading ||
              showLoading ||
              totalRowsLoading ||
              materialLoading ||
              customerLoading ||
              vehicleLoading
                ? 'visible'
                : 'hidden',
          }}
        />
        <Formik
          innerRef={FormikRef}
          onReset={() => {
            setFilter([]);
            setFilterByDateTime(false);
            setSort({});
            setPage(1);
          }}
          onSubmit={(values, { setSubmitting }) => {
            let dat: any = [];
            if (values.vehicle_number && values.vehicle_number.length > 0) {
              dat = [
                ...dat,
                {
                  vehicle_number: {
                    _like: `%${values.vehicle_number}%`,
                  },
                },
              ];
            }
            if (
              values.vehicle &&
              values.vehicle.value &&
              values.vehicle.value.length > 0
            ) {
              dat = [
                ...dat,
                {
                  vehicle_id: {
                    _eq: values.vehicle.value,
                  },
                },
              ];
            }
            if (
              values.customer &&
              values.customer.value &&
              values.customer.value.length > 0
            ) {
              dat = [
                ...dat,
                {
                  _or: [
                    {
                      customer_id: {
                        _eq: values.customer.value,
                      },
                    },
                    {
                      customer_2_id: {
                        _eq: values.customer.value,
                      },
                    },
                    {
                      customer_3_id: {
                        _eq: values.customer.value,
                      },
                    },
                  ],
                },
              ];
            }
            if (
              values.from &&
              values.from.length > 0 &&
              values.to &&
              values.to.length > 0
            ) {
              dat = [
                ...dat,
                {
                  created_at: {
                    _gte: new Date(values.from).toISOString(),
                    _lte: new Date(values.to).toISOString(),
                  },
                },
              ];
            }
            if (
              values.material &&
              values.material.value &&
              values.material.value.length > 0
            ) {
              dat = [
                ...dat,
                {
                  material_id: {
                    _eq: values.material.value,
                  },
                },
              ];
            }
            setSubmitting(false);
            setFilter(dat);
          }}
          initialValues={{
            vehicle_number: '',
            material: null,
            vehicle: null,
            customer: null,
            from: '',
            to: '',
          }}
        >
          {({ handleSubmit, handleReset, setFieldValue, values }) => (
            <form onSubmit={handleSubmit} onReset={handleReset}>
              <Box display="flex" flexDirection={'row'}>
                <Field
                  component={TextField}
                  name="vehicle_number"
                  onChange={(e: any) =>
                    setFieldValue(
                      'vehicle_number',
                      e.target.value.replace(' ', '').toUpperCase()
                    )
                  }
                  label="vehicle number"
                  sx={{
                    margin: 2,
                    width: '40%',
                  }}
                />
                <Field
                  component={Autocomplete}
                  name="material"
                  onChange={(_: any, v: any) => setFieldValue('material', v)}
                  loading={materialLoading}
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
                    width: '40%',
                  }}
                />
                <Field
                  component={Autocomplete}
                  name="customer"
                  onChange={(_: any, v: any) => setFieldValue('customer', v)}
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
                      },
                    });
                  }}
                  options={customer}
                  renderInput={(params: any) => (
                    <TF {...params} label="customer" />
                  )}
                  sx={{
                    margin: 2,
                    width: '40%',
                  }}
                />
                <Field
                  component={Autocomplete}
                  name="vehicle"
                  loading={vehicleLoading}
                  disableClearable
                  onChange={(_: any, v: any) => {
                    setFieldValue('vehicle', v.value);
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
                    width: '40%',
                  }}
                />
              </Box>
              <Box display="flex" alignItems="flex-start" sx={{ ml: 1 }}>
                <Checkbox
                  checked={filterByDateTime}
                  onChange={(e) => setFilterByDateTime(e.target.checked)}
                />
                <Typography variant="body2" sx={{ ml: 1, my: 'auto' }}>
                  filter by time
                </Typography>
              </Box>
              {filterByDateTime && (
                <Box
                  display="flex"
                  gap={'10px'}
                  sx={{ mt: 2, ml: 2 }}
                  flexDirection="row"
                >
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => <TF {...props} />}
                      disableFuture
                      label="from date"
                      value={new Date(values.from)}
                      onChange={(newValue) => {
                        setFieldValue('from', newValue?.toISOString() || '');
                      }}
                    />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => <TF {...props} />}
                      label="to date"
                      minDateTime={new Date(values.from)}
                      disableFuture
                      value={values.to}
                      onChange={(newValue) => {
                        setFieldValue('to', newValue?.toISOString() || '');
                      }}
                    />
                  </LocalizationProvider>
                </Box>
              )}
              <Box display="flex" m={1} alignItems="flex-start">
                <Button type="submit">submit</Button>
                <Button type="reset">reset</Button>
              </Box>
            </form>
          )}
        </Formik>

        {!totalRowsLoading ? (
          <DataGrid
            loading={loading || totalRowsLoading}
            onPageChange={(p) => setPage(p)}
            disableColumnFilter
            disableColumnMenu
            onPageSizeChange={(s) => setPageSize(s)}
            disableColumnSelector
            rows={data?.bill || []}
            paginationMode="server"
            rowCount={totalRows?.bill_aggregate.aggregate?.count}
            columns={[
              {
                field: 'vehicle_number',
                headerName: 'vehicle number',
                width: 150,
                editable: false,
              },
              {
                field: 'material',
                headerName: 'material',
                width: 100,
                valueGetter: (params: GridValueGetterParams) =>
                  params.value.name,
              },
              {
                field: 'customer',
                headerName: 'customer',
                width: 150,
                valueGetter: (params: GridValueGetterParams) =>
                  params.value && params.value.name
                    ? params.value.name
                    : 'null',
              },
              {
                field: 'customer_2',
                headerName: 'customer 2',
                width: 150,
                valueGetter: (params: GridValueGetterParams) =>
                  params.value && params.value.name
                    ? params.value.name
                    : 'null',
              },
              {
                field: 'customer_3',
                headerName: 'customer 3',
                width: 150,
                valueGetter: (params: GridValueGetterParams) =>
                  params.value && params.value.name
                    ? params.value.name
                    : 'null',
              },
              {
                field: 'vehicle',
                headerName: 'vehicle',
                sortable: true,
                width: 150,
                valueGetter: (params: GridValueGetterParams) =>
                  params.value.name,
              },
              {
                field: 'created_at',
                headerName: 'created At',
                sortable: true,
                width: 250,
                valueGetter: (params: GridValueGetterParams) =>
                  (params.value &&
                    new Date(params.value).toLocaleString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      hour12: true,
                      hour: 'numeric',
                      minute: 'numeric',
                      second: 'numeric',
                      day: 'numeric',
                    })) ||
                  '',
              },

              {
                field: 'second_weight',
                headerName: 'second weight',
                sortable: true,
                width: 110,
                valueGetter: (params: GridValueGetterParams) =>
                  params.value ? 'scale weight' : 'tare weight',
              },
              {
                field: 'scale_weight',
                headerName: 'scaleWeight',
                sortable: true,
                width: 120,
              },
              {
                field: 'tare_weight',
                headerName: 'tareWeight',
                sortable: true,
                width: 120,
              },
              {
                field: 'netWeight',
                headerName: 'netWeight',
                sortable: true,
                width: 120,
                valueGetter: (params) =>
                  Math.abs(
                    parseInt(`${params.row.scale_weight}`, 10) -
                      parseInt(`${params.row.tare_weight}` || '0', 10) || 0
                  ),
              },
              {
                field: 'info',
                headerName: 'info',
                sortable: false,
                width: 120,
                renderCell: (params) => (
                  <BillInfo
                    setLoading={(l) => setShowLoading(l)}
                    name="info"
                    id={params.row.id}
                  />
                ),
              },
            ]}
            autoPageSize
            filterMode="server"
            onFilterModelChange={(f) => setFilter(f)}
            onSortModelChange={(s) => setSort(s)}
            disableSelectionOnClick
          />
        ) : null}
      </Box>
    </Box>
  );
};

export default Bills;
