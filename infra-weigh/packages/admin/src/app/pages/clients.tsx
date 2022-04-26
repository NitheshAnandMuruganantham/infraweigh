import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/system';

import 'react-confirm-alert/src/react-confirm-alert.css';
import EditClient from './editClient';
import { useGetAllTenentsSubscription } from '@infra-weigh/generated';
import AddNewTenent from './addNewTenent';
import { useEffect } from 'react';

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'name',
    width: 300,
    editable: false,
    sortable: true,
  },

  {
    field: 'email',
    headerName: 'e-mail id',
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
    field: 'activate',
    headerName: 'active',
    sortable: false,
    width: 150,
    valueGetter: (params) => (params.value ? 'active' : 'in-active'),
  },
  {
    field: 'edit',
    headerName: 'Edit',
    width: 130,
    sortable: false,
    filterable: false,
    renderCell: (params) => <EditClient id={params.row.id} />,
  },
];
const Clients = () => {
  const { data, loading } = useGetAllTenentsSubscription();
  useEffect(() => {
    console.log(data);
  }, [data, loading]);

  return (
    <Box>
      <AddNewTenent />
      <Box height={500} width={'100%'} textAlign="center">
        <DataGrid
          loading={loading}
          rows={data?.tenents || []}
          columns={columns}
          autoPageSize
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default Clients;
