import { GridColumns, GridValueGetterParams } from '@mui/x-data-grid';
import BillInfo from './billInfo';
import decode from 'jwt-decode';

const Columns: GridColumns = [
  {
    field: 'vehicle_number',
    headerName: 'vehicle number',
    minWidth: 150,
    flex: 1,
    sortable: false,
    filterable: false,
    editable: false,
  },

  {
    field: 'material',
    headerName: 'material',
    minWidth: 100,
    flex: 1,
    sortable: false,
    filterable: false,
    editable: false,
    valueGetter: (params: GridValueGetterParams) => params.value.name,
  },
  {
    field: 'customer',
    headerName: 'customer',
    minWidth: 150,
    flex: 1,
    sortable: false,
    filterable: false,
    editable: false,
    valueGetter: (params: GridValueGetterParams) =>
      params.value && params.value.name ? params.value.name : 'null',
  },
  {
    field: 'customer_2',
    headerName: 'customer 2',
    minWidth: 150,
    flex: 1,
    sortable: false,
    filterable: false,
    editable: false,
    valueGetter: (params: GridValueGetterParams) =>
      params.value && params.value.name ? params.value.name : 'null',
  },
  {
    field: 'customer_3',
    headerName: 'customer 3',
    minWidth: 150,
    flex: 1,
    sortable: false,
    filterable: false,
    editable: false,
    valueGetter: (params: GridValueGetterParams) =>
      params.value && params.value.name ? params.value.name : 'null',
  },
  {
    field: 'vehicle',
    headerName: 'vehicle',
    minWidth: 150,
    flex: 1,
    sortable: false,
    filterable: false,
    editable: false,
    valueGetter: (params: GridValueGetterParams) => params.value.name,
  },
  {
    field: 'created_at',
    headerName: 'created At',
    sortable: true,
    minWidth: 300,
    flex: 1,
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
    minWidth: 150,
    flex: 1,
    valueGetter: (params: GridValueGetterParams) =>
      params.value ? 'tare weight' : 'scale weight',
  },
  {
    field: 'scale_weight',
    headerName: 'scaleWeight',
    sortable: true,
    minWidth: 150,
    flex: 1,
  },
  {
    field: 'tare_weight',
    headerName: 'tareWeight',
    sortable: true,
    minWidth: 150,
    flex: 1,
  },
  {
    field: 'netWeight',
    headerName: 'netWeight',
    sortable: true,
    minWidth: 150,
    flex: 1,
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
    minWidth: 120,
    flex: 1,
    renderCell: (params) => (
      <BillInfo setLoading={() => null} name="info" id={params.row.id} />
    ),
  },
];

export default Columns;
