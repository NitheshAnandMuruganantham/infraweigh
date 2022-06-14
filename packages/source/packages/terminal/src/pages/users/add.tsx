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
import { useGetAllTenentsDropDownLazyQuery } from '@infra-weigh/generated';
import MuiPhoneNumber from 'material-ui-phone-number';
import {
  useAddUsersMutation,
  useGetWeighbridgesDropDownLazyQuery,
} from '@infra-weigh/generated';
import { toast } from 'react-toastify';
import useRole from '../../hooks/role';
import { AutoCompleteComponent } from '@infra-weigh/shared-ui';

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
        NEW STAFF
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
            branch: {
              label: '',
              value: null,
            },
            tenent: {
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
              tenent: Yup.lazy(() => {
                if (role === 'admin' && role !== null) {
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
            });
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            let dt = {};
            console.log(role);
            if (role !== 'admin') {
              dt = {
                email: values.email,
                weighbridge_id: values.branch.value,
                profile: {
                  name: values.name,
                  phone: values.phone,
                  address: values.address,
                },
                role: 'terminal',
              };
            } else {
              dt = {
                tenent_id: values.tenent.value,
                email: values.email,
                weighbridge_id: values.branch.value,
                profile: {
                  name: values.name,
                  phone: values.phone,
                  address: values.address,
                },
                role: 'tenantAdmin',
              };
            }
            console.log(dt);
            addUser({
              variables: {
                objects: [dt],
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
                    {role === 'admin' && role !== null ? (
                      <>
                        <AutoCompleteComponent
                          sx={{
                            mt: 1,
                            width: '100%',
                          }}
                          name="tenent"
                          label="teneant"
                          serverName="tenents"
                          queryHook={useGetAllTenentsDropDownLazyQuery}
                        />
                        {values?.tenent?.value && (
                          <AutoCompleteComponent
                            sx={{
                              mt: 2,
                              width: '100%',
                            }}
                            name="branch"
                            label="branch"
                            queryVariables={{
                              where: {
                                tenent_id: {
                                  _eq: values.tenent.value,
                                },
                              },
                            }}
                            serverName="weighbridge"
                            queryHook={useGetWeighbridgesDropDownLazyQuery}
                          />
                        )}
                      </>
                    ) : (
                      <AutoCompleteComponent
                        sx={{
                          mt: 2,
                          width: '100%',
                        }}
                        name="branch"
                        label="branch"
                        serverName="weighbridge"
                        queryHook={useGetWeighbridgesDropDownLazyQuery}
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
