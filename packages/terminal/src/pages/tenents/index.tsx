import 'react-confirm-alert/src/react-confirm-alert.css';

import * as React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';

import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { GridColDef } from '@mui/x-data-grid';

import DataGridComponent from '../../components/dataGrid';
import {
  DeleteTenantDocument,
  useGetAllTenantsSubscription,
  useGetTenantsCountSubscription,
} from '../../generated';
import gqlClient from '../../utils/client';
import AddNewTenent from './add';
import EditClient from './edit';
import useRoles from '../../hooks/role';

const Clients = () => {
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [sort, SetSort] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(10);
  const [role] = useRoles();
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
      field: 'edit',
      headerName: 'Edit',
      width: 130,
      sortable: false,
      filterable: false,
      renderCell: (params) => <EditClient id={params.row.id} />,
    },
    {
      field: 'delete',
      headerName: 'Delete',
      hide: role !== 'admin',
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
                          mutation: DeleteTenantDocument,
                          variables: {
                            deleteTenentsByPkId: params.row.id,
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

  const { data, loading } = useGetAllTenantsSubscription({
    variables: {
      orderBy: sort,
      where: {
        _or: [
          {
            name: {
              _like: `%${search}%`,
            },
          },
          {
            email: {
              _like: `%${search}%`,
            },
          },
        ],
      },
      offset: (page - 1) * pageSize,
      limit: pageSize,
    },
  });
  const { data: count, loading: countLoading } = useGetTenantsCountSubscription(
    {
      variables: {
        orderBy: sort,
        where: {
          _or: [
            {
              name: {
                _ilike: `%${search}%`,
              },
            },
            {
              email: {
                _ilike: `%${search}%`,
              },
            },
          ],
        },
      },
    }
  );

  return (
    <Box>
      {role !== 'maintainer' && <AddNewTenent />}
      <TextField
        fullWidth
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        sx={{
          width: '100%',
          my: 2,
        }}
        name="search"
        label="Search"
      />
      <Box width={'100%'} textAlign="center">
        <DataGridComponent
          data={data?.tenents || []}
          pageSize={pageSize}
          setPageSize={setPageSize}
          setFilter={() => null}
          setPage={setPage}
          setSort={SetSort}
          loading={loading || countLoading}
          rowCount={count?.tenents_aggregate.aggregate?.count || 0}
          columns={
            role === 'maintainer'
              ? columns
              : [
                  {
                    field: 'maintainer',
                    headerName: 'maintainer',
                    width: 300,
                    editable: false,
                    sortable: true,
                    valueGetter: (params) => params?.value?.email || '',
                  },
                  ...columns,
                ]
          }
        />
      </Box>
    </Box>
  );
};

export default Clients;
