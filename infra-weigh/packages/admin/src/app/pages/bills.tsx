import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useGetAllBillsSubscription } from '@infra-weigh/generated';
import BillInfo from './billInfo';

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
    sortable: true,
    width: 250,
    valueGetter: (params: GridValueGetterParams) => params.value.name,
  },
  {
    field: 'created_at',
    headerName: 'created At',
    sortable: true,
    width: 200,
    valueGetter: (params: GridValueGetterParams) =>
      (params.value && new Date(params.value).toLocaleString()) || '',
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
  const { data, loading } = useGetAllBillsSubscription();

  return (
    <Box>
      <Box height={600} width={'100%'} textAlign="center">
        <DataGrid
          loading={loading}
          disableColumnSelector
          rows={data?.bill || []}
          columns={columns}
          autoPageSize
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default Bills;
