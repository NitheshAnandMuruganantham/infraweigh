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
    field: 'weighbridge',
    headerName: 'weighbridge',
    width: 150,
    sortable: false,
    filterable: false,
    editable: false,
    valueGetter: (params) => params.value.name,
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
      params.value ? 'tare weight' : 'scale weight',
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
