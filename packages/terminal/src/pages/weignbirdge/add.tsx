import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import MuiPhoneNumber from 'material-ui-phone-number';
import * as React from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { LinearProgress } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';

import AutoCompleteComponent from '../../components/autoComplete';
import {
  useAddNewWeighbridgeMutation,
  useGetAllTenentsDropDownLazyQuery,
} from '../../generated';
import useRole from '../../hooks/role';

export default function AddNewWeighBridge() {
  const [open, setOpen] = React.useState(false);
  const [addNewWeighbridge, { loading }] = useAddNewWeighbridgeMutation();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [role] = useRole();
  return (
    <div>
      <Button variant="outlined" sx={{ m: 1 }} onClick={handleClickOpen}>
        new WeighBridge
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>New WeighBridge</DialogTitle>
        <Formik
          initialValues={{
            name: '',
            address: '',
            display_name: '',
            tenant: {
              label: '',
              value: null,
            },
            pin_code: '',
            phone: '',
            mail: '',
            url: '',
            camera_url_1: '',
            camera_url_2: '',
            camera_url_3: '',
            camera_url_4: '',
            local_server_url: '',
          }}
          validationSchema={() => {
            return Yup.object().shape({
              name: Yup.string().required('Required'),
              address: Yup.string().required('Required'),
              tenant: Yup.lazy(() => {
                if (role !== 'tenantAdmin') {
                  return Yup.object()
                    .shape({
                      label: Yup.string().required('Required'),
                      value: Yup.string().required('Required'),
                    })
                    .required('Required');
                } else {
                  return Yup.object().notRequired();
                }
              }),
              display_name: Yup.string().required('Required'),
              pin_code: Yup.string().required('Required'),
              phone: Yup.string().required('Required'),
              mail: Yup.string().required('Required'),
            });
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            let dt = {};
            if (role !== 'tenantAdmin') {
              dt = {
                tenent_id: values.tenant.value,
              };
            }
            await addNewWeighbridge({
              variables: {
                object: {
                  ...dt,
                  address: values.address,
                  display_name: values.display_name,
                  pin_code: values.pin_code,
                  name: values.name,
                  phone: values.phone,
                  mail: values.mail,
                },
              },
            })
              .then(() => {
                toast.success('WeighBridge added successfully');
              })
              .catch(() => {
                toast.error('can not add new WeighBridge');
              });
            setSubmitting(true);
            handleClose();
          }}
        >
          {({ submitForm, isSubmitting, setFieldValue }) => (
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
                      type="text"
                      label="address"
                      name="address"
                      sx={{
                        my: 1,
                      }}
                    />
                    <Field
                      component={TextField}
                      type="text"
                      label="pin code"
                      name="pin_code"
                      sx={{
                        my: 1,
                      }}
                    />
                    <Field
                      component={TextField}
                      sx={{
                        my: 1,
                      }}
                      name="display_name"
                      type="text"
                      label="display name"
                    />
                    <Field
                      component={TextField}
                      sx={{
                        my: 1,
                      }}
                      name="mail"
                      type="email"
                      label="mail"
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
                    {role !== 'tenantAdmin' && (
                      <AutoCompleteComponent
                        sx={{
                          width: '100%',
                        }}
                        name="tenant"
                        label="tenant"
                        serverName="tenents"
                        queryHook={useGetAllTenentsDropDownLazyQuery}
                      />
                    )}
                    <Field
                      component={TextField}
                      sx={{
                        my: 1,
                      }}
                      name="url"
                      type="text"
                      label="local server url"
                    />
                    <Field
                      component={TextField}
                      sx={{
                        my: 1,
                      }}
                      name="camera_url_1"
                      type="text"
                      label="camera url 1"
                    />
                    <Field
                      component={TextField}
                      sx={{
                        my: 1,
                      }}
                      name="camera_url_2"
                      type="text"
                      label="camera url 2"
                    />
                    <Field
                      component={TextField}
                      sx={{
                        my: 1,
                      }}
                      name="camera_url_3"
                      type="text"
                      label="camera url 3"
                    />
                    <Field
                      component={TextField}
                      sx={{
                        my: 1,
                      }}
                      name="camera_url_4"
                      type="text"
                      label="camera url 4"
                    />
                    {(isSubmitting || loading) && <LinearProgress />}
                  </Box>
                </Form>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={submitForm}>Add</Button>
              </DialogActions>
            </>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}
