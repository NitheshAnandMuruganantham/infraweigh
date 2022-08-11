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
import { useGetTenetLazyQuery, EditTenentDocument } from '../../generated';
import gqlClient from '../../utils/client';

const EditClient: React.FunctionComponent<{
  id: string;
}> = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  const [getData, { data }] = useGetTenetLazyQuery({
    variables: { tenentsByPkId: id },
  });

  const handleClickOpen = async () => {
    await getData();
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
        <DialogTitle>Edit Request</DialogTitle>
        <Formik
          initialValues={{
            name: data?.tenents_by_pk?.name,
            address: data?.tenents_by_pk?.metadata?.address || '',
            email: data?.tenents_by_pk?.email,
            phone: data?.tenents_by_pk?.phone,
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
            console.log(id);
            await gqlClient
              .mutate({
                mutation: EditTenentDocument,
                variables: {
                  pkColumns: {
                    id,
                  },
                  set: {
                    name: values.name,
                    email: values.email,
                    phone: values.phone,
                    metadata: {
                      address: values.address,
                    },
                  },
                },
              })
              .catch(() => {
                alert(
                  'realted resourses exists delete those resource to continue'
                );
              });
            setSubmitting(true);
            handleClose();
          }}
        >
          {({
            submitForm,
            isSubmitting,
            setFieldValue,
            setSubmitting,
            values,
          }) => (
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
                      type="email"
                      label="email"
                      name="email"
                      sx={{
                        my: 1,
                      }}
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
                    <MuiPhoneNumber
                      label="phone"
                      variant="outlined"
                      value={values.phone}
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
                    submitForm().then(() => {
                      setSubmitting(false);
                    });
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

export default EditClient;
