import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { LinearProgress } from '@mui/material';
import { Box } from '@mui/system';
import * as Yup from 'yup';
import { Role_Enum, useGetAllTenentsDropDownLazyQuery } from '../../generated';
import MuiPhoneNumber from 'material-ui-phone-number';
import {
  useAddUsersMutation,
  useGetWeighbridgesDropDownLazyQuery,
} from '../../generated';
import { toast } from 'react-toastify';
import useRole from '../../hooks/role';
import AutoCompleteComponent from '../../components/autoComplete';

const AddNewWeighBridge: React.FunctionComponent = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [addUser, { loading }] = useAddUsersMutation();
  const [role, RoleLoading] = useRole();
  return (
    <div>
      <Button variant="outlined" sx={{ m: 1 }} onClick={handleClickOpen}>
        new maintainer
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        {(loading || RoleLoading) && <LinearProgress />}
        <DialogTitle>New User</DialogTitle>
        <Formik
          initialValues={{
            name: '',
            address: '',
            email: '',
            phone: '',
          }}
          validationSchema={() => {
            return Yup.object().shape({
              name: Yup.string().required('Required'),
              address: Yup.string().required('Required'),
              email: Yup.string().required('Required'),
              phone: Yup.string().required('Required'),
            });
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);

            addUser({
              variables: {
                objects: [
                  {
                    role: Role_Enum.Maintainer,
                    email: values.email,
                    profile: {
                      name: values.name,
                      phone: values.phone,
                      address: values.address,
                    },
                  },
                ],
              },
            })
              .then(() => {
                toast.success('user created successfully exist');
                setSubmitting(false);
                handleClose();
              })
              .catch(() => {
                toast.error('user already exist');
                handleClose();
                setSubmitting(false);
              });
          }}
        >
          {({ submitForm, isSubmitting, setFieldValue, values }) => (
            <>
              <DialogContent>
                <Form>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Field
                      component={TextField}
                      sx={{
                        my: 1,
                      }}
                      name="name"
                      type="text"
                      label="name"
                    />
                    <Field
                      component={TextField}
                      sx={{
                        my: 1,
                      }}
                      name="address"
                      type="text"
                      label="address"
                    />
                    <Field
                      component={TextField}
                      type="email"
                      label="email"
                      name="email"
                      sx={{
                        my: 1,
                      }}
                    />
                    <MuiPhoneNumber
                      label="phone"
                      variant="outlined"
                      sx={{
                        my: 1,
                      }}
                      defaultCountry={'in'}
                      onChange={(e) => setFieldValue('phone', e.toString())}
                    />

                    {isSubmitting && <LinearProgress />}
                  </Box>
                </Form>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                  onClick={() => {
                    submitForm();
                  }}
                >
                  Add
                </Button>
              </DialogActions>
            </>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default AddNewWeighBridge;
