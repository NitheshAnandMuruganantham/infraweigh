import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Formik, Form, Field } from 'formik';
import { Autocomplete, TextField } from 'formik-mui';
import { LinearProgress } from '@mui/material';
import { Box } from '@mui/system';
import * as Yup from 'yup';
import MuiPhoneNumber from 'material-ui-phone-number';
import TextF from '@mui/material/TextField';
import {
  useGetUserLazyQuery,
  useGetWeighbridgeQuery,
  useUpdateUserMutation,
} from '@infra-weigh/generated';
import { toast } from 'react-toastify';

const EditUser: React.FunctionComponent<{
  id: string;
}> = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  const { data: weighbridge } = useGetWeighbridgeQuery();
  const [updateUser, { loading: l2 }] = useUpdateUserMutation();
  const [poolInitialValues, { data, loading: l1 }] = useGetUserLazyQuery({
    variables: {
      where: {
        id: {
          _eq: id,
        },
      },
    },
  });
  const handleClickOpen = async () => {
    await poolInitialValues();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        onClick={handleClickOpen}
      >
        Edit
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Edit user</DialogTitle>
        <Formik
          initialValues={{
            name: data?.user[0].profile.name || '',
            address: data?.user[0].profile.address || '',
            password: '*****************',
            email: data?.user[0].email || '',
            phone: data?.user[0].profile.phone || '',
            branch: {
              label:
                `${data?.user[0].weighbridge?.name} - ${data?.user[0].weighbridge?.address}` ||
                '',
              value: data?.user[0].weighbridge_id || '',
            },
          }}
          validationSchema={() => {
            return Yup.object().shape({
              name: Yup.string().required('Required'),
              address: Yup.string().required('Required'),
              phone: Yup.string().required('Required'),
              branch: Yup.object()
                .shape({
                  label: Yup.string().required('Required'),
                  value: Yup.string().required('Required'),
                })
                .required(),
            });
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            updateUser({
              variables: {
                where: {
                  id: {
                    _eq: id,
                  },
                },
                set: {
                  weighbridge_id: values.branch.value,
                  profile: {
                    name: values.name,
                    phone: values.phone,
                    address: values.address,
                  },
                },
              },
            })
              .catch(() => toast.error('user already exist'))
              .then((dat) => dat && toast.success('user updated successfully'));
            setSubmitting(true);
            handleClose();
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
                      disabled
                      type="password"
                      label="password"
                      name="password"
                      sx={{
                        my: 1,
                      }}
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
                      disabled
                      type="email"
                      label="email"
                      name="email"
                      sx={{
                        my: 1,
                      }}
                    />
                    <MuiPhoneNumber
                      label="phone"
                      value={values.phone}
                      variant="outlined"
                      sx={{
                        my: 1,
                      }}
                      defaultCountry={'in'}
                      onChange={(e) => setFieldValue('phone', e.toString())}
                    />

                    <Field
                      component={Autocomplete}
                      disablePortal
                      sx={{
                        my: 1,
                        mb: 3,
                      }}
                      name="branch"
                      options={
                        weighbridge?.weighbridge.map((d) => {
                          return {
                            label: d.name + ' - ' + d.address,
                            value: d.id,
                          };
                        }) || []
                      }
                      renderInput={(params: any) => (
                        <TextF {...params} label="Branch" />
                      )}
                    />

                    {(isSubmitting || l2 || l1) && <LinearProgress />}
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
    </>
  );
};

export default EditUser;
