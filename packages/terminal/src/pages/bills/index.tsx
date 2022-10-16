import { Field, Formik, FormikProps } from 'formik';
import { TextField } from 'formik-mui';
import * as React from 'react';

import {
  Box,
  Button,
  Checkbox,
  Chip,
  LinearProgress,
  TextField as TF,
  Typography,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import AutoComTextField from '../../components/autoComplete';
import Grid from '../../components/dataGrid';
import {
  useGetAllBillsSubscription,
  useGetCustomerDropdownOptionsLazyQuery,
  useGetMaterialDropDownListLazyQuery,
  useGetTotalAmountQuery,
  useGetTotalBillsSubscription,
  useGetVehiclesDropDownListLazyQuery,
  useGetWeighbridgesDropDownLazyQuery,
} from '../../generated';
import useRole from '../../hooks/role';
import { displayRazorpay } from '../../utils/razorPay';
import Columns from './columns';

const Bills = () => {
  const [pageSize, setPageSize] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [role, loadingRole] = useRole();
  const [filter, setFilter] = React.useState<any[]>([]);
  const [sort, setSort] = React.useState<any[]>([]);
  const [filterByDateTime, setFilterByDateTime] =
    React.useState<boolean>(false);
  const { data: collection } = useGetTotalAmountQuery({
    variables: {
      where: {
        _and:
          filter && filter.length > 0
            ? filter
            : [
                {
                  created_at: {
                    _gte: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}T00:00:00:000Z`,
                  },
                },
              ],
      },
    },
  });
  const { data, loading } = useGetAllBillsSubscription({
    variables: {
      orderBy: [
        ...sort,
        {
          created_at: 'desc',
        },
      ],
      where: {
        _and: filter,
      },
      offset: (page - 1) * pageSize,
      limit: pageSize,
    },
  });
  const { data: totalRows, loading: totalRowsLoading } =
    useGetTotalBillsSubscription({
      variables: {
        orderBy: [
          ...sort,
          {
            created_at: 'desc',
          },
        ],
        where: {
          _and: filter,
        },
      },
    });

  const FormikRef = React.useRef<FormikProps<any>>(null);

  React.useEffect(() => {
    if (!filterByDateTime) {
      FormikRef.current?.setFieldValue('from', '', false);
      FormikRef.current?.setFieldValue('to', '', false);
    }
  }, [filterByDateTime]);

  return (
    <Box>
      <Box width={'100%'} textAlign="center">
        <LinearProgress
          sx={{
            visibility:
              totalRowsLoading || loading || totalRowsLoading
                ? 'visible'
                : 'hidden',
          }}
        />
        <Formik
          innerRef={FormikRef}
          onReset={() => {
            setFilter([]);
            setFilterByDateTime(false);
            setPage(1);
          }}
          onSubmit={(values, { setSubmitting }) => {
            let dat: any = [];
            if (values.vehicle_number && values.vehicle_number.length > 0) {
              dat = [
                ...dat,
                {
                  vehicle_number: {
                    _ilike: `%${values.vehicle_number}%`,
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
              role !== 'terminal' &&
              values.weighbridge &&
              values.weighbridge.value &&
              values.weighbridge.value.length > 0
            ) {
              dat = [
                ...dat,
                {
                  weighbridge_id: {
                    _eq: values.weighbridge.value,
                  },
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
            weighbridge: null,
            vehicle: null,
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
                <AutoComTextField
                  label="material"
                  serverName="material"
                  name="material"
                  queryHook={useGetMaterialDropDownListLazyQuery}
                />
                <AutoComTextField
                  label="customer"
                  serverName="customer"
                  name="customer"
                  queryHook={useGetCustomerDropdownOptionsLazyQuery}
                />
                <AutoComTextField
                  label="vehicle"
                  serverName="vehicle"
                  name="vehicle"
                  queryHook={useGetVehiclesDropDownListLazyQuery}
                />
                {role !== 'terminal' && (
                  <AutoComTextField
                    label="weighbridge"
                    serverName="weighbridge"
                    name="weighbridge"
                    queryHook={useGetWeighbridgesDropDownLazyQuery}
                  />
                )}
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
        <div
          style={{
            margin: '10px',
            textAlign: 'right',
          }}
        >
          collection :{' '}
          {collection?.bill_aggregate.aggregate?.sum?.charges || '$ 0'}
        </div>
        <Grid
          data={data?.bill}
          pageSize={pageSize}
          setPage={setPage}
          setSort={setSort}
          rowCount={totalRows?.bill_aggregate?.aggregate?.count || 0}
          setFilter={() => null}
          setPageSize={setPageSize}
          loading={totalRowsLoading || loading || loadingRole}
          columns={
            role !== 'terminal'
              ? [
                  {
                    field: 'weighbridge',
                    headerName: 'weighbridge',
                    width: 150,
                    sortable: false,
                    filterable: false,
                    editable: false,
                    valueGetter: (params) => params.value.name,
                  },
                  ...Columns,
                  ...GetCols(),
                ]
              : [...Columns, ...GetCols()]
          }
        />
      </Box>
    </Box>
  );
};

const GetCols = () => {
  if (import.meta.env['VITE_ENABLE_PAYMENTS'] === 'true') {
    return [
      {
        field: 'paid',
        headerName: 'status',
        sortable: true,
        width: 120,
        renderCell: (params: any) =>
          params.value ? (
            <Chip color="success" label="paid" />
          ) : (
            <Chip color="error" label="on due" />
          ),
      },
      {
        field: 'pay now',
        headerName: 'pay now',
        sortable: false,
        width: 120,
        renderCell: (params: any) => (
          <Button
            disabled={!params.row.order_id || params.row.paid ? true : false}
            onClick={() => {
              displayRazorpay({
                amount: parseInt(`${params.row.charges}`.split('$')[1]) * 100,
                currency: 'INR',
                order_id: params.row.order_id || '',
              });
            }}
          >
            Pay now
          </Button>
        ),
      },
    ];
  } else {
    return [];
  }
};

export default Bills;
