import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
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
  useGetCustomerDropdownOptionsQuery,
  useGetMaterialDropDownListQuery,
  useGetTotalBillsSubscription,
  useGetVehiclesDropDownListQuery,
} from '@infra-weigh/generated';
import BillInfo from './billInfo';
import { Formik, Field, FormikProps } from 'formik';
import { Autocomplete, TextField } from 'formik-mui';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const columns: GridColDef[] = [
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
    valueGetter: (params: GridValueGetterParams) => params.value.name,
  },
  {
    field: 'weighbridge',
    headerName: 'weighbridge',
    width: 100,
    valueGetter: (params: GridValueGetterParams) => params.value.name,
  },
  {
    field: 'customer',
    headerName: 'customer',
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      params.value && params.value.name ? params.value.name : 'null',
  },
  {
    field: 'customer_2',
    headerName: 'customer 2',
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      params.value && params.value.name ? params.value.name : 'null',
  },
  {
    field: 'customer_3',
    headerName: 'customer 3',
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      params.value && params.value.name ? params.value.name : 'null',
  },
  {
    field: 'vehicle',
    headerName: 'vehicle',
    sortable: true,
    width: 150,
    valueGetter: (params: GridValueGetterParams) => params.value.name,
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
        parseInt(params.row.scale_weight, 10) -
          parseInt(params.row.tare_weight || '0', 10) || 0
      ),
  },
  {
    field: 'info',
    headerName: 'info',
    sortable: false,
    width: 120,
    renderCell: (params) => <BillInfo name="info" id={params.row.id} />,
  },
];
const Bills = () => {
  const [pageSize, setPageSize] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [filter, setFilter] = React.useState<any>([]);
  const [sort, setSort] = React.useState<any>({});
  const [filterByDateTime, setFilterByDateTime] =
    React.useState<boolean>(false);
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
  const { data: customerData, loading: customerLoading } =
    useGetCustomerDropdownOptionsQuery({
      variables: {
        where: {
          _and: [
            {
              tenent_id: {
                _eq: localStorage.getItem('x-tenent-id'),
              },
            },
          ],
        },
      },
    });
  const { data: materialData, loading: materialLoading } =
    useGetMaterialDropDownListQuery();
  const { data: vehicleData, loading: vehicleLoading } =
    useGetVehiclesDropDownListQuery();
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
              customerLoading ||
              vehicleLoading ||
              materialLoading ||
              loading ||
              totalRowsLoading
                ? 'visible'
                : 'hidden',
          }}
        />
        <Formik
          innerRef={FormikRef}
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
            if (values.vehicle.value && values.vehicle.value.length > 0) {
              dat = [
                ...dat,
                {
                  vehicle_id: {
                    _eq: values.vehicle.value,
                  },
                },
              ];
            }
            if (values.customer.value && values.customer.value.length > 0) {
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
            if (values.material.value && values.material.value.length > 0) {
              dat = [
                ...dat,
                {
                  material_id: {
                    _eq: values.material.value,
                  },
                },
              ];
            }
            setFilter(dat);
            setSubmitting(false);
          }}
          initialValues={{
            vehicle_number: '',
            material: {
              label: '',
              value: '',
            },
            vehicle: {
              label: '',
              value: '',
            },
            customer: {
              label: '',
              value: '',
            },
            from: '',
            to: '',
          }}
        >
          {({ handleSubmit, setFieldValue, values }) => (
            <form onSubmit={handleSubmit}>
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
                  options={materialData?.material || []}
                  renderInput={(params: any) => (
                    <TF {...params} label="Material" />
                  )}
                  id="outlined-required"
                  sx={{
                    margin: 2,
                    width: '40%',
                  }}
                />
                <Field
                  component={Autocomplete}
                  name="customer"
                  options={customerData?.customer || []}
                  renderInput={(params: any) => (
                    <TF {...params} label="Customer" />
                  )}
                  id="outlined-required"
                  sx={{
                    margin: 2,
                    width: '40%',
                  }}
                />
                <Field
                  component={Autocomplete}
                  name="vehicle"
                  options={vehicleData?.vehicle || []}
                  renderInput={(params: any) => (
                    <TF {...params} label="vehicle" />
                  )}
                  id="outlined-required"
                  sx={{
                    margin: 2,
                    width: '40%',
                  }}
                />
              </Box>
              <Box display="flex" alignItems="flex-start" sx={{ ml: 1 }}>
                <Checkbox
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

        {!totalRowsLoading &&
        !customerLoading &&
        !vehicleLoading &&
        !materialLoading ? (
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
            columns={columns}
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
