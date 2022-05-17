import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Formik, Form, Field } from 'formik';
import { TextField, Autocomplete } from 'formik-mui';
import TextF from '@mui/material/TextField';
import { LinearProgress } from '@mui/material';
import { Box } from '@mui/system';
import * as Yup from 'yup';
import Loader from '@infra-weigh/loading';
import MuiPhoneNumber from 'material-ui-phone-number';
import {
  useAddUsersMutation,
  useGetWeighbridgesDropDownQuery,
} from '@infra-weigh/generated';

const AddNewWeighBridge: React.FunctionComponent = () => {
  const [open, setOpen] = React.useState(false);
  const { data: weighbridge, loading: dataToLoad1 } =
    useGetWeighbridgesDropDownQuery();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [addUser, { loading }] = useAddUsersMutation();
  return (
    <div>
      <Loader open={loading || dataToLoad1} setOpen={() => null} />
      <Button variant="outlined" sx={{ m: 1 }} onClick={handleClickOpen}>
        NEW STAFF
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>New User</DialogTitle>
        <Formik
          initialValues={{
            name: '',
            address: '',
            email: '',
            phone: '',
            branch: {
              label: '',
              value: null,
            },
            role: 'terminal',
          }}
          validationSchema={() => {
            return Yup.object().shape({
              name: Yup.string().required('Required'),
              address: Yup.string().required('Required'),
              email: Yup.string().required('Required'),
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
            addUser({
              variables: {
                objects: [
                  {
                    email: values.email,
                    weighbridge_id: values.branch.value,
                    tenent_id: weighbridge?.weighbridge.filter(
                      (d) => d.value === values.branch.value
                    )[0].tenent_id,
                    profile: {
                      name: values.name,
                      phone: values.phone,
                      address: values.address,
                    },
                    role: 'tenantAdmin',
                  },
                ],
              },
            })
              .then(() => setSubmitting(false))
              .catch(() => {
                alert('user already exist');
                setSubmitting(false);
              });

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

                    <Field
                      component={Autocomplete}
                      disablePortal
                      sx={{
                        my: 1,
                        mb: 3,
                      }}
                      name="branch"
                      options={weighbridge?.weighbridge || []}
                      renderInput={(params: any) => (
                        <TextF {...params} label="Branch" />
                      )}
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