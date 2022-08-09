import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Formik, Form, Field } from "formik";
import {  TextField } from "formik-mui";
import { LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import * as Yup from "yup";
import MuiPhoneNumber from "material-ui-phone-number";
import { UpdateClientDocument, useGetCustomerLazyQuery } from "../../generated";
import gqlClient from "../../utils/client";
import { toast } from "react-toastify";

const EditClient: React.FunctionComponent<{
  id: string;
}> = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  const [getData, { data }] = useGetCustomerLazyQuery({
    variables: { customerByPkId: id },
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
        <DialogTitle>Edit user</DialogTitle>
        <Formik
          initialValues={{
            name: data?.customer_by_pk?.name,
            address: data?.customer_by_pk?.company_address,
            email: data?.customer_by_pk?.email,
            phone: data?.customer_by_pk?.phone,
            gst_in: data?.customer_by_pk?.gst_in,
            company_name: data?.customer_by_pk?.company_name,
          }}
          validationSchema={() => {
            return Yup.object().shape({
              name: Yup.string().required("Required"),
              address: Yup.string().required("Required"),
              email: Yup.string().required("Required"),
              phone: Yup.string().required("Required"),
              company_name: Yup.string().required("Required"),
            });
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            await gqlClient
              .mutate({
                mutation: UpdateClientDocument,
                variables: {
                  pkColumns: { id },
                  set: {
                    name: values.name,
                    email: values.email,
                    phone: values.phone,
                    gst_in: values.gst_in,
                    blocked: false,
                    company_name: values.company_name,
                    company_address: values.address
                  },
                },
              })
              .catch(() => {
                toast.error("can not update client");
              })
              .then((dat) => {
                if (dat) {
                  toast.success("client updated");
                }
              });

            setSubmitting(false);
            handleClose();
          }}
        >
          {({ submitForm, isSubmitting, setFieldValue, values }) => (
            <>
              <DialogContent>
                <Form>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
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
                      value={values.phone}
                      countryCodeEditable={false}
                      sx={{
                        my: 1,
                      }}
                      defaultCountry={"in"}
                      onChange={(e) => setFieldValue("phone", e.toString())}
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
                  save
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
