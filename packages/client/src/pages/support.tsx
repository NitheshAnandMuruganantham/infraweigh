import React, { FunctionComponent } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Formik, Form, Field } from 'formik';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import { TextField } from 'formik-mui';
import * as Yup from 'yup';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useAddSupportTicketMutation } from '../../../terminal/src/generated';
import { toast } from 'react-toastify';
import LinearProgress from '@mui/material/LinearProgress';

interface SupportProps {
  open: boolean;
  setOpen: (state: boolean) => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Support: FunctionComponent<SupportProps> = ({ open, setOpen }) => {
  const [addTicket, { data, loading, error }] = useAddSupportTicketMutation();
  return (
    <Dialog
      TransitionComponent={Transition}
      fullWidth
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle>support assistance</DialogTitle>
      <Formik
        initialValues={{
          title: '',
          message: '',
          severity: 'high',
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string().required('Required'),
          message: Yup.string().required('Required'),
          severity: Yup.string().required('Required'),
        })}
        onSubmit={async (data, { setSubmitting }) => {
          setSubmitting(true);
          addTicket({
            variables: {
              objects: [
                {
                  message: data.message,
                  title: data.title,
                  severity: data.severity,
                },
              ],
            },
          })
            .then(() => {
              toast.success('ticket created successfully');
              setSubmitting(false);
              setOpen(false);
            })
            .catch(() => {
              toast.error('support ticket creation failed');
              setOpen(false);
              setSubmitting(false);
            });
          setSubmitting(false);
        }}
      >
        {({ submitForm, isSubmitting, setFieldValue, values }) => (
          <>
            <DialogContent>
              <form style={{ display: 'flex', flexDirection: 'column' }}>
                {loading || (isSubmitting && <LinearProgress />)}
                <Field
                  component={TextField}
                  type="text"
                  label="title"
                  name="title"
                  sx={{
                    my: 1,
                  }}
                />
                <Field
                  component={TextField}
                  type="text"
                  multiline={true}
                  label="message"
                  name="message"
                  sx={{
                    my: 1,
                  }}
                />

                <div style={{ marginLeft: '3px' }}>severity</div>
                <RadioGroup
                  name="severity"
                  row
                  value={values.severity}
                  onChange={(e) => setFieldValue('severity', e.target.value)}
                >
                  <FormControlLabel
                    value="service blockage"
                    control={<Radio />}
                    label="service blockage"
                  />
                  <FormControlLabel
                    value="severe"
                    control={<Radio />}
                    label="severe"
                  />
                  <FormControlLabel
                    value="high"
                    control={<Radio />}
                    label="high"
                  />
                  <FormControlLabel
                    value="low"
                    control={<Radio />}
                    label="low"
                  />
                </RadioGroup>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>close</Button>
              {!loading && <Button onClick={submitForm}>Add</Button>}
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  );
};

export default Support;
