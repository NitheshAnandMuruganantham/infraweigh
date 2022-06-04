import { auth } from '@infra-weigh/firebase';
import { Button, Chip } from '@mui/material';
import { GridColumns, GridValueGetterParams } from '@mui/x-data-grid';
import { displayRazorpay } from '../../utils/razorPay';
import BillInfo from './billInfo';

const Columns: GridColumns = [
  {
    field: 'vehicle_number',
    headerName: 'vehicle number',
    width: 150,
    sortable: false,
    filterable: false,
    editable: false,
  },

  {
    field: 'material',
    headerName: 'material',
    width: 100,
    sortable: false,
    filterable: false,
    editable: false,
    valueGetter: (params: GridValueGetterParams) => params.value.name,
  },
  {
    field: 'customer',
    headerName: 'customer',
    width: 150,
    sortable: false,
    filterable: false,
    editable: false,
    valueGetter: (params: GridValueGetterParams) =>
      params.value && params.value.name ? params.value.name : 'null',
  },
  {
    field: 'customer_2',
    headerName: 'customer 2',
    width: 150,
    sortable: false,
    filterable: false,
    editable: false,
    valueGetter: (params: GridValueGetterParams) =>
      params.value && params.value.name ? params.value.name : 'null',
  },
  {
    field: 'customer_3',
    headerName: 'customer 3',
    width: 150,
    sortable: false,
    filterable: false,
    editable: false,
    valueGetter: (params: GridValueGetterParams) =>
      params.value && params.value.name ? params.value.name : 'null',
  },
  {
    field: 'vehicle',
    headerName: 'vehicle',
    width: 150,
    sortable: false,
    filterable: false,
    editable: false,
    valueGetter: (params: GridValueGetterParams) => params.value.name,
  },
  {
    field: 'created_at',
    headerName: 'created At',
    sortable: true,
    width: 250,
    filterable: false,
    editable: false,
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
    field: 'paid',
    headerName: 'status',
    sortable: true,
    width: 120,
    renderCell: (params) =>
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
    renderCell: (params) => (
      <Button
        disabled={!params.row.order_id || params.row.paid ? true : false}
        onClick={() => {
          const phone = (): any => {
            if (auth.currentUser?.email === params.row.customer?.email) {
              return params.row.customer?.phone;
            } else if (
              auth.currentUser?.email === params.row.customer_2?.email
            ) {
              return params.row.customer_2?.phone;
            } else if (
              auth.currentUser?.email === params.row.customer_3?.email
            ) {
              return params.row.customer_3?.phone;
            } else {
              return null;
            }
          };
          displayRazorpay({
            amount: parseInt(`${5000}`),
            currency: 'INR',
            name: auth.currentUser?.displayName || '',
            mail: auth.currentUser?.email || '',
            order_id: params.row.order_id || '',
            phone: phone(),
          });
        }}
      >
        Pay now
      </Button>
    ),
  },
  {
    field: 'info',
    headerName: 'info',
    sortable: false,
    width: 120,
    renderCell: (params) => (
      <BillInfo setLoading={() => null} name="info" id={params.row.id} />
    ),
  },
];

export default Columns;
