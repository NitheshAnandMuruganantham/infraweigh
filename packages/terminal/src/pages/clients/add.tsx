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
import { useCreateCustomerMutation } from '../../generated';
import { toast } from 'react-toastify';
import AutoCompleteComponent from '../../components/autoComplete';
import { useGetAllTenentsDropDownLazyQuery } from '../../generated';
import useRole from '../../hooks/role';
const AddNewClient: React.FunctionComponent = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [role] = useRole();

  const [addNewClient, { loading }] = useCreateCustomerMutation();

  return (
    <div>
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
            gst_in: '',
            company_name: '',
            tenant: {
              label: '',
              value: null,
            },
          }}
          validationSchema={() => {
            return Yup.object().shape({
              name: Yup.string().required('Required'),
              address: Yup.string().required('Required'),
              email: Yup.string().required('Required'),
              phone: Yup.string().required('Required'),
              tenant: Yup.lazy(() => {
                if (role === 'terminal' || role === 'tenantAdmin') {
                  return Yup.object().notRequired();
                } else {
                  return Yup.object()
                    .shape({
                      label: Yup.string().required('Required'),
                      value: Yup.string().required('Required'),
                    })
                    .required('Required');
                }
              }),
              company_name: Yup.string().required('Required'),
            });
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            let additionalKeys = {};
            if (role !== 'terminal' && role !== 'tenantAdmin') {
              additionalKeys = {
                tenent_id: values?.tenant?.value || '',
              };
            }
            addNewClient({
              variables: {
                object: {
                  name: values.name,
                  email: values.email,
                  phone: values.phone,
                  ...additionalKeys,
                  gst_in: values.gst_in,
                  blocked: false,
                  company_name: values.company_name,
                  company_address: values.address,
                },
              },
            })
              .catch(() => {
                toast.error('can not create new client');
              })
              .then((dt) => {
                dt && dt.data && toast.success('client created successfully');
                setSubmitting(false);
                handleClose();
              });
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
                      sx={{
                        my: 1,
                      }}
                      name="company_name"
                      type="text"
                      label="company name"
                    />
                    <Field
                      component={TextField}
                      sx={{
                        my: 1,
                      }}
                      name="gst_in"
                      type="text"
                      label="gst number"
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
                    {role !== 'tenantAdmin' &&
                      role !== 'terminal' &&
                      role !== null && (
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
                    {(isSubmitting || loading) && <LinearProgress />}
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

export default AddNewClient;
