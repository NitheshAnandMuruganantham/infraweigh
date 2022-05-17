import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import { Button, LinearProgress, TextField } from '@mui/material';
import AddNewWeighBridge from './addNewWeighBridge';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import EditWeighBridge from './editWeighbridge';
import {
  DeleteWeighbridgeDocument,
  useSubscribeWeighbridgeAdminSubscription,
  useWeighbridgesCountSubscription,
} from '@infra-weigh/generated';
import { apollo as gqlClient } from '@infra-weigh/client';

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'name',
    width: 150,
  },
  {
    field: 'address',
    headerName: 'Address',
    width: 300,
  },
  {
    field: 'display_name',
    headerName: 'display name',
    width: 300,
  },
  {
    field: 'phone',
    headerName: 'phone',
    width: 150,
  },
  {
    field: 'mail',
    headerName: 'mail',
    width: 180,
  },
  {
    field: 'edit',
    headerName: 'Edit',
    width: 75,
    sortable: false,
    filterable: false,
    renderCell: (params) => <EditWeighBridge id={params.row.id} />,
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
                  onClick: async () => {
                    gqlClient
                      .mutate({
                        mutation: DeleteWeighbridgeDocument,
                        variables: {
                          where: {
                            id: {
                              _eq: params.row.id,
                            },
                          },
                        },
                      })
                      .catch(() => {
                        alert(
                          'relation exists so remove the related resources to delete this resource !'
                        );
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
  {
    field: 'info',
    headerName: 'Info',
    width: 75,
    sortable: false,
    filterable: false,
    renderCell: (params) => {
      return (
        <Button
          variant="contained"
          color="info"
          size="small"
          onClick={() => {
            alert(`Edit ${params.row.id}`);
          }}
        >
          Info
        </Button>
      );
    },
  },
];
const WeighMentData = () => {
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const { data, loading } = useSubscribeWeighbridgeAdminSubscription({
    variables: {
      where: {
        _or: [
          {
            display_name: {
              _ilike: `%${search}%`,
            },
          },
          {
            name: {
              _ilike: `%${search}%`,
            },
          },
        ],
      },
      offset: (page - 1) * pageSize < 0 ? 0 : (page - 1) * pageSize,
      limit: pageSize,
    },
  });

  const { data: Count, loading: CountLoading } =
    useWeighbridgesCountSubscription({
      variables: {
        where: {
          _or: [
            {
              display_name: {
                _ilike: `%${search}%`,
              },
            },
            {
              name: {
                _ilike: `%${search}%`,
              },
            },
          ],
        },
      },
    });

  return (
    <Box>
      <AddNewWeighBridge />
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
      <LinearProgress
        sx={{
          visibility: CountLoading || loading ? 'visible' : 'hidden',
        }}
      />
      <Box height={500} width={'100%'} textAlign="center">
        {!CountLoading && (
          <DataGrid
            loading={loading}
            rows={data?.weighbridge || []}
            paginationMode="server"
            columns={columns}
            onPageChange={(page) => setPage(page)}
            onPageSizeChange={(pageSize) => setPageSize(pageSize)}
            autoPageSize
            rowCount={Count?.weighbridge_aggregate.aggregate?.count}
            checkboxSelection
            disableSelectionOnClick
          />
        )}
      </Box>
    </Box>
  );
};

export default WeighMentData;
