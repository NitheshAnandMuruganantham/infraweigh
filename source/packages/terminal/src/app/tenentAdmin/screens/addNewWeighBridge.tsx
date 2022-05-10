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

import { useAddNewWeighbridgeMutation } from '@infra-weigh/generated';
import { toast } from 'react-toastify';

export default function AddNewWeighBridge() {
  const [open, setOpen] = React.useState(false);
  const [addNewWeighbridge, { loading }] = useAddNewWeighbridgeMutation();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            pin_code: '',
            phone: '',
            mail: '',
          }}
          validationSchema={() => {
            return Yup.object().shape({
              name: Yup.string().required('Required'),
              address: Yup.string().required('Required'),
              display_name: Yup.string().required('Required'),
              pin_code: Yup.string().required('Required'),
              phone: Yup.string().required('Required'),
              mail: Yup.string().required('Required'),
            });
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            await addNewWeighbridge({
              variables: {
                object: {
                  address: values.address,
                  display_name: values.display_name,
                  pin_code: values.pin_code,
                  name: values.name,
                  phone: values.phone,
                  mail: values.mail,
                },
              },
            })
              .catch((e) => {
                toast.error('can not add new WeighBridge');
              })
              .then(
                (d) => d && toast.success('WeighBridge added successfully')
              );
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
