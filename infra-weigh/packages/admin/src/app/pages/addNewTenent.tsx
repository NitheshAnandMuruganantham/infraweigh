import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Formik, Form, Field } from 'formik';
import { Switch, TextField } from 'formik-mui';
import { FormLabel, LinearProgress } from '@mui/material';
import { Box } from '@mui/system';
import * as Yup from 'yup';
import MuiPhoneNumber from 'material-ui-phone-number';
import { useAddTenentMutation } from '@infra-weigh/generated';
import Loading from '@infra-weigh/loading';

const AddNewTenent: React.FunctionComponent = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [addNewClient, { loading }] = useAddTenentMutation();
  return (
    <div>
      <Loading open={loading} setOpen={() => null} />
      <Button variant="outlined" sx={{ m: 1 }} onClick={handleClickOpen}>
        new client
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>New Client</DialogTitle>
        <Formik
          initialValues={{
            name: '',
            address: '',
            email: '',
            phone: '',
            activate: true,
          }}
          validationSchema={() => {
            return Yup.object().shape({
              name: Yup.string().required('Required'),
              address: Yup.string().required('Required'),
              email: Yup.string().required('Required'),
              phone: Yup.string().required('Required'),
              activate: Yup.boolean().required('Required'),
            });
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            addNewClient({
              variables: {
                object: {
                  name: values.name,
                  email: values.email,
                  phone: values.phone,
                  activate: values.activate,
                  metadata: {
                    address: values.address,
                  },
                },
              },
            }).catch(() => {
              alert('can not create new client');
              setSubmitting(false);
            });
            setSubmitting(false);
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

                    <Box>
                      <FormLabel>activate facility</FormLabel>
                      <Field
                        component={Switch}
                        type="checkbox"
                        name="activate"
                      />
                    </Box>

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
                      countryCodeEditable={false}
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
                    submitForm().then(() => null);
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

export default AddNewTenent;
