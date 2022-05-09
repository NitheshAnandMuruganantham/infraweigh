import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import { LinearProgress, TextField } from '@mui/material';
import AddNewClient from './addNewClient';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  useGetCustomersCountSubscription,
  useGetCustomersSubscription,
} from '@infra-weigh/generated';

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'name',
    width: 300,
    editable: false,
    sortable: true,
  },

  {
    field: 'company_address',
    headerName: 'Address',
    sortable: false,
    width: 300,
  },

  {
    field: 'company_name',
    headerName: 'company',
    sortable: false,
    width: 200,
  },

  {
    field: 'phone',
    headerName: 'phone',
    sortable: false,
    width: 150,
  },
  {
    field: 'email',
    headerName: 'e-mail id',
    sortable: false,
    width: 250,
  },
];
const Clients = () => {
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(1);
  const { data, loading } = useGetCustomersSubscription({
    variables: {
      where: {
        _and: [
          {
            _or: [
              {
                name: {
                  _like: `%${search}%`,
                },
              },
              {
                company_name: {
                  _like: `%${search}%`,
                },
              },
            ],
          },
          {
            tenent_id: {
              _eq: localStorage.getItem('x-tenent-id'),
            },
          },
        ],
      },
      offset: (page - 1) * pageSize < 0 ? 0 : (page - 1) * pageSize,
      limit: pageSize,
    },
  });
  const { data: customerCountData, loading: customerCountLoading } =
    useGetCustomersCountSubscription({
      variables: {
        where: {
          _and: [
            {
              name: {
                _like: `%${search}%`,
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
  return (
    <Box>
      <AddNewClient />
      <TextField
        fullWidth
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        sx={{
          width: '90%',
          my: 2,
        }}
        name="search"
        label="Search"
      />
      <Box height={500} width={'100%'} textAlign="center">
        <LinearProgress
          sx={{
            visibility: customerCountLoading || loading ? 'visible' : 'hidden',
          }}
        />
        {!customerCountLoading && (
          <DataGrid
            loading={loading}
            rows={data?.customer || []}
            columns={columns}
            rowCount={customerCountData?.customer_aggregate.aggregate?.count}
            paginationMode="server"
            onPageChange={(s) => setPage(s)}
            onPageSizeChange={(s) => setPageSize(s)}
            autoPageSize
            checkboxSelection
            disableSelectionOnClick
          />
        )}
      </Box>
    </Box>
  );
};

export default Clients;
