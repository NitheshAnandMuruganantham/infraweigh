// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useGetAllWeighbridgeRealtimeSubscription } from '@infra-weigh/generated';
import { Box } from '@mui/material';

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'name',
    width: 300,
    editable: false,
    sortable: true,
  },

  {
    field: 'display_name',
    headerName: 'display name',
    sortable: false,
    width: 400,
  },
  {
    field: 'phone',
    headerName: 'phone',
    sortable: false,
    width: 150,
  },
  {
    field: 'address',
    headerName: 'address',
    sortable: false,
    width: 300,
  },
];
const Weighbridges = () => {
  const { data, loading } = useGetAllWeighbridgeRealtimeSubscription();
  return (
    <Box>
      <Box height={500} width={'100%'} textAlign="center">
        <DataGrid
          loading={loading}
          rows={data?.weighbridge || []}
          columns={columns}
          autoPageSize
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default Weighbridges;
