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
import TF from '@mui/material/textField';
import MuiPhoneNumber from 'material-ui-phone-number';
import {
  useAddNewWeighbridgeMutation,
  useGetAllTenentsDropDownSubscription,
} from '@infra-weigh/generated';
import Loader from '@infra-weigh/loading';

export default function AddNewWeighBridge() {
  const [open, setOpen] = React.useState(false);
  const [addNewWeighbridge, { loading }] = useAddNewWeighbridgeMutation();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const { data: tenents } = useGetAllTenentsDropDownSubscription();
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Loader open={loading} setOpen={() => null} />
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
            tenent: {
              label: '',
              value: null,
            },
          }}
          validationSchema={() => {
            return Yup.object().shape({
              name: Yup.string().required('Required'),
              address: Yup.string().required('Required'),
              display_name: Yup.string().required('Required'),
              pin_code: Yup.string().required('Required'),
              phone: Yup.string().required('Required'),
              mail: Yup.string().required('Required'),
              tenent: Yup.object()
                .shape({
                  label: Yup.string().required('Required'),
                  value: Yup.string().required('Required'),
                })
                .required(),
            });
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            await addNewWeighbridge({
              variables: {
                object: {
                  tenent_id: values.tenent.value,
                  address: values.address,
                  display_name: values.display_name,
                  pin_code: values.pin_code,
                  name: values.name,
                  phone: values.phone,
                  mail: values.mail,
                },
              },
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

                    <Field
                      component={Autocomplete}
                      disablePortal
                      sx={{
                        my: 1,
                        mb: 3,
                      }}
                      name="tenent"
                      options={tenents?.tenents || []}
                      renderInput={(params: any) => (
                        <TF {...params} label="tenent" />
                      )}
                    />
                    {isSubmitting && <LinearProgress />}
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
