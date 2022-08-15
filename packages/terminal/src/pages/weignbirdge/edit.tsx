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
  useGetWeighbridgeLazyQuery,
  useUpdateWeighBridgeMutation,
} from '../../generated';
import { toast } from 'react-toastify';
const EditWeighBridge: React.FunctionComponent<{
  id: string;
}> = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  const [update, { loading: l1 }] = useUpdateWeighBridgeMutation();
  const [getWeighbridge, { data, loading: l2 }] = useGetWeighbridgeLazyQuery({
    variables: {
      where: {
        id: {
          _eq: id,
        },
      },
    },
  });
  const handleClickOpen = async () => {
    await getWeighbridge();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        onClick={handleClickOpen}
      >
        Edit
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Edit WeighBridge</DialogTitle>
        <Formik
          initialValues={{
            name: data?.weighbridge[0].name || '',
            address: data?.weighbridge[0].address || '',
            display_name: data?.weighbridge[0].display_name || '',
            pin_code: data?.weighbridge[0].pin_code || '',
            phone: data?.weighbridge[0].phone || '',
            mail: data?.weighbridge[0].mail || '',
            url: data?.weighbridge[0]?.local_server_url || '',
            camera_url_1: data?.weighbridge[0]?.camera_url_1 || '',
            camera_url_2: data?.weighbridge[0]?.camera_url_2 || '',
            camera_url_3: data?.weighbridge[0]?.camera_url_3 || '',
            camera_url_4: data?.weighbridge[0]?.camera_url_4 || '',
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
            update({
              variables: {
                pkColumns: {
                  id,
                },
                _set: {
                  address: values.address,
                  display_name: values.display_name,
                  pin_code: values.pin_code,
                  name: values.name,
                  phone: values.phone,
                  mail: values.mail,
                  local_server_url: values.url,
                  camera_url_1: values.camera_url_1,
                  camera_url_2: values.camera_url_2,
                  camera_url_3: values.camera_url_3,
                  camera_url_4: values.camera_url_4,
                },
              },
            })
              .catch(() => toast.error('Something went wrong'))
              .then(
                (d) => d && toast.success('WeighBridge updated successfully')
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
                      value={data?.weighbridge[0].phone}
                      variant="outlined"
                      sx={{
                        my: 1,
                      }}
                      defaultCountry={'in'}
                      onChange={(e) => setFieldValue('phone', e.toString())}
                    />

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
                    {(isSubmitting || l1 || l2) && <LinearProgress />}
                  </Box>
                </Form>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={submitForm}>save</Button>
              </DialogActions>
            </>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default EditWeighBridge;
