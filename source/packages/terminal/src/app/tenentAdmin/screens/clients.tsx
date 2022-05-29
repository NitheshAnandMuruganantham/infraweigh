import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import { Button, LinearProgress, TextField } from '@mui/material';
import AddNewClient from './addNewClient';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import EditClient from './editClient';
import {
  DeleteCustomerDocument,
  useGetCustomersCountSubscription,
  useGetCustomersSubscription,
} from '@infra-weigh/generated';
import { apollo as gqlClient } from '@infra-weigh/client';
import { toast } from 'react-toastify';

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
  {
    field: 'edit',
    headerName: 'Edit',
    width: 75,
    sortable: false,
    filterable: false,
    renderCell: (params) => <EditClient id={params.row.id} />,
  },
  {
    field: 'delete',
    headerName: 'Delete',
    width: 75,
    sortable: false,
    filterable: false,
    renderCell: (params) => {
      return (
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => {
            confirmAlert({
              title: 'Confirm to Delete',
              message: 'Are you sure want to delete this.',
              buttons: [
                {
                  label: 'Yes',
                  onClick: () => {
                    gqlClient
                      .mutate({
                        mutation: DeleteCustomerDocument,
                        variables: {
                          deleteCustomerByPkId: params.row.id,
                        },
                      })
                      .catch(() => {
                        toast.error('bills are linked to this client');
                      })
                      .then((dat) => {
                        dat &&
                          dat.data &&
                          toast.success('client deleted successfully');
                      });
                  },
                },
                {
                  label: 'No',
                  onClick: () => null,
                },
              ],
            });
          }}
        >
          Delete
        </Button>
      );
    },
  },
];
const Clients = () => {
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [sort, SetSort] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(1);
  const { data, loading } = useGetCustomersSubscription({
    variables: {
      orderBy: sort,
      where: {
        _and: [
          {
            _or: [
              {
                name: {
                  _like: `%${search}%`,
                },
                company_name: {
                  _like: `%${search}%`,
                },
                phone: {
                  _like: `%${search}%`,
                },
                email: {
                  _like: `%${search}`,
                },
                company_address: {
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
        orderBy: sort,
        where: {
          _and: [
            {
              _or: [
                {
                  name: {
                    _like: `%${search}%`,
                  },
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
            sortingMode="server"
            onSortModelChange={(s) => {
              // eslint-disable-next-line prefer-const
              let dt: any = [];
              s.forEach((s) => {
                dt.push({
                  [s.field]: s.sort,
                });
              });
              SetSort(dt);
            }}
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
