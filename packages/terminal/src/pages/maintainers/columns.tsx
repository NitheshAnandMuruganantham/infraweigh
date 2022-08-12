import { Button } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { confirmAlert } from 'react-confirm-alert';
import EditUser from './edit';
import gqlClient from '../../utils/client';
import { toast } from 'react-toastify';

import { DeleteUserDocument } from '../../generated';

const columns: GridColDef[] = [
  {
    field: 'email',
    headerName: 'Email Address',
    sortable: true,
    filterable: false,
    width: 400,
  },
  {
    field: 'edit',
    headerName: 'Edit',
    width: 75,
    sortable: false,
    filterable: false,
    renderCell: (params) => <EditUser id={params.row.id} />,
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
                        mutation: DeleteUserDocument,
                        variables: {
                          deleteUserByPkId: params.row.id,
                        },
                      })
                      .catch((e) =>
                        toast.error(
                          'relations exists remove the related resources to delete this resource'
                        )
                      )
                      .then((d) => {
                        d && toast.success('user deleted successfully');
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

export default columns;
