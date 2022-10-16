import * as React from 'react';

import { LinearProgress, TextField } from '@mui/material';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';

import DataGridComponent from '../../components/dataGrid';
import {
  useEditIssueMutation,
  useGetAllUsersCountSubscription,
  useGetIssuesAggregateSubscriptionSubscription,
  useGetIssuesSubscription,
} from '../../generated';
import Chip from '@mui/material/Chip';
import toast from 'react-toastify';

const Users = () => {
  const [sort, SetSort] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [editIssue] = useEditIssueMutation();
  const { data, loading } = useGetIssuesSubscription({
    variables: {
      where: {
        _and: [
          {
            _or: [
              {
                title: {
                  _ilike: `%${search}%`,
                },
              },
              {
                message: {
                  _ilike: `%${search}%`,
                },
              },
            ],
          },
          {
            resolved: {
              _neq: true,
            },
          },
        ],
      },
      offset: (page - 1) * pageSize,
      limit: pageSize,
    },
  });
  const { data: Count, loading: CountLoading } =
    useGetIssuesAggregateSubscriptionSubscription({
      variables: {
        where: {
          _and: [
            {
              _or: [
                {
                  title: {
                    _ilike: `%${search}%`,
                  },
                },
                {
                  message: {
                    _ilike: `%${search}%`,
                  },
                },
              ],
            },
            {
              resolved: {
                _neq: true,
              },
            },
          ],
        },
      },
    });

  return (
    <Box>
      <TextField
        fullWidth
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        sx={{
          my: 2,
        }}
        name="search"
        label="Search"
      />
      <Box width={'100%'} textAlign="center">
        <LinearProgress
          sx={{
            visibility: CountLoading || loading ? 'visible' : 'hidden',
          }}
        />
        <DataGridComponent
          loading={loading || CountLoading}
          data={data?.issues || []}
          pageSize={pageSize}
          setPage={setPage}
          setFilter={() => null}
          setPageSize={setPageSize}
          setSort={SetSort}
          columns={[
            {
              field: 'created_at',
              headerName: 'message',
              sortable: false,
              filterable: false,
              minWidth: 200,
              flex: 1,
              valueFormatter: (e) => new Date(e.value).toLocaleString(),
            },
            {
              field: 'severity',
              headerName: 'severity',
              sortable: false,
              filterable: false,
              minWidth: 200,
              flex: 1,
              renderCell: (props) => (
                <Chip
                  label={props.value}
                  color={
                    props.value == 'high' || props.value == 'block of service'
                      ? 'error'
                      : 'warning'
                  }
                />
              ),
            },
            {
              field: 'title',
              headerName: 'title',
              sortable: false,
              filterable: false,
              minWidth: 400,
              flex: 1,
            },
            {
              field: 'message',
              headerName: 'message',
              sortable: false,
              filterable: false,
              minWidth: 600,
              flex: 1,
            },
            {
              field: 'resolved',
              headerName: '',
              sortable: false,
              filterable: false,
              minWidth: 100,
              flex: 1,
              renderCell: (e) => (
                <Button
                  variant="text"
                  onClick={() => {
                    editIssue({
                      variables: {
                        where: {
                          id: {
                            _eq: e.row.id,
                          },
                        },
                        _set: {
                          resolved: true,
                        },
                      },
                    });
                  }}
                >
                  resolve
                </Button>
              ),
            },
          ]}
          rowCount={Count?.issues_aggregate?.aggregate?.count || 0}
        />
      </Box>
    </Box>
  );
};

export default Users;
