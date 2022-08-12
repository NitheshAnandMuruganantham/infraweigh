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
import MuiPhoneNumber from 'material-ui-phone-number';
import {
  useGetUserLazyQuery,
  useGetWeighbridgesDropDownLazyQuery,
  useUpdateUserMutation,
} from '../../generated';
import { toast } from 'react-toastify';
import AutoCompleteComponent from '../../components/autoComplete';
import useRole from '../../hooks/role';
import Loader from '../../components/loading';

const EditUser: React.FunctionComponent<{
  id: string;
}> = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  const [updateUser, { loading: l2 }] = useUpdateUserMutation();
  const [role, roleLoading] = useRole();
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
      <Loader open={roleLoading || l2 || l1} setOpen={() => null} />
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Edit user</DialogTitle>
        <Formik
          initialValues={{
            name: data?.user[0].profile.name || '',
            address: data?.user[0].profile.address || '',
            email: data?.user[0].email || '',
            phone: data?.user[0].profile.phone || '',
            branch: {
              label: data?.user[0].weighbridge?.name || '',
              value: data?.user[0].weighbridge_id || '',
            },
          }}
          validationSchema={() => {
            return Yup.object().shape({
              name: Yup.string().required('Required'),
              address: Yup.string().required('Required'),
              phone: Yup.string().required('Required'),
              branch: Yup.lazy(() => {
                if (role === 'tenantAdmin') {
                  return Yup.object()
                    .shape({
                      label: Yup.string().required('Required'),
                      value: Yup.string().required('Required'),
                    })
                    .required();
                } else {
                  return Yup.object().notRequired();
                }
              }),
            });
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            let submitData;
            if (role !== 'tenantAdmin') {
              submitData = {
                profile: {
                  name: values.name,
                  phone: values.phone,
                  address: values.address,
                },
              };
            } else {
              submitData = {
                weighbridge_id: values.branch.value,
                profile: {
                  name: values.name,
                  phone: values.phone,
                  address: values.address,
                },
              };
            }
            updateUser({
              variables: {
                where: {
                  id: {
                    _eq: id,
                  },
                },
                set: submitData,
              },
            })
              .then((dat) => dat && toast.success('user updated successfully'))
              .catch(() => toast.error('user already exist'));
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
                    {role === 'tenantAdmin' && (
                      <AutoCompleteComponent
                        name="branch"
                        sx={{
                          mt: 2,
                          width: '100%',
                        }}
                        queryHook={useGetWeighbridgesDropDownLazyQuery}
                        serverName="weighbridge"
                        label="weighbridge"
                      />
                    )}
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
                  save
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
