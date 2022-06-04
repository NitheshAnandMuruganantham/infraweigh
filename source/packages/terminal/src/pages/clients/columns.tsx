import { GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'name',
    width: 300,
    editable: false,
    filterable: false,
    sortable: true,
  },

  {
    field: 'company_address',
    headerName: 'Address',
    sortable: true,
    filterable: false,
    width: 400,
  },

  {
    field: 'phone',
    headerName: 'phone',
    sortable: true,
    width: 150,
    filterable: false,
  },
  {
    field: 'email',
    headerName: 'e-mail id',
    sortable: true,
    filterable: false,
    width: 150,
  },
];
export default columns;
