import { Field, Formik } from "formik";
import { RadioGroup, Switch, TextField } from "formik-mui";
import MuiPhoneNumber from "material-ui-phone-number";
import { FunctionComponent, useEffect, useState } from "react";

import { Box, Button, FormLabel, InputAdornment } from "@mui/material";

import AutoCompleteComponent from "../../components/autoComplete";
import Loader from "../../components/loading";
import RadioListComponent from "../../components/radio";
import {
  useAddBillMutation,
  useGetConfigrationQuery,
  useGetCustomerDropdownOptionsLazyQuery,
  useGetMaterialDropDownListLazyQuery,
  useGetVehiclesDropDownListLazyQuery,
} from "../../generated";
import { db } from "../../utils/db";
import BillInfo from "./printBill";
import pullConfig from "./pullConfig";
import SelectWeight from "./selectWeight";
import submitHandler from "./submitHandler";
import validation from "./validation";

const Weigh: FunctionComponent = () => {
  const [BillRefId, SetBillRefId] = useState<string | null>(null);
  const [open, SetOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, SetData] = useState<any>(null);
  const [addBill] = useAddBillMutation();
  const configQuery = useGetConfigrationQuery();
  useEffect(() => {
    pullConfig(configQuery);
  }, [configQuery.data, configQuery.loading === false]);

  return (
    <>
      <Loader open={loading || configQuery.loading} setOpen={setLoading} />

      <Formik
        initialValues={{
          vehicleNumber: "",
          material: null,
          vehicle: null,
          buyer: null,
          seller: null,
          driver_phone: "",
          trader: null,
          secondWeight: false,
          charges: 0,
          scaleWeight: 0,
          tareWeight: 0,
          paidBy: "other",
        }}
        validationSchema={validation}
        onSubmit={(values, helpers) =>
          submitHandler(values, helpers, {
            setLoading,
            addBill,
            SetData,
            SetOpen,
            BillRefId,
          })
        }
        onReset={() => {
          SetBillRefId(null);
          setLoading(false);
        }}
      >
        {({
          handleReset,
          handleSubmit,
          errors,
          isSubmitting,
          setFieldValue,
          values,
          handleBlur,
          touched,
          isValid,
        }) => (
          <Box
            component="form"
            onSubmit={handleSubmit}
            onReset={handleReset}
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
            noValidate
            autoComplete="off"
          >
            <Box
              sx={{
                flexDirection: "column",
                width: "50%",
                display: "flex",
                height: "100%",
              }}
            >
              <Field
                component={TextField}
                autoFocus
                name="vehicleNumber"
                onChange={(e: any) =>
                  setFieldValue(
                    "vehicleNumber",
                    e.target.value.replace(" ", "").toUpperCase()
                  )
                }
                label="vehicle number"
                sx={{
                  margin: 2,
                  width: "90%",
                }}
              />
              <AutoCompleteComponent
                label="material"
                serverName="material"
                name="material"
                queryHook={useGetMaterialDropDownListLazyQuery}
              />
              <AutoCompleteComponent
                label="buyer"
                serverName="customer"
                name="buyer"
                filterOptions={(options: any, state: any) => {
                  let dat: any[] = options;
                  const vals: any = values;
                  if (vals?.seller?.value) {
                    dat = dat.filter(
                      (option: any) => option.value !== vals.seller.value
                    );
                  }
                  if (vals?.trader?.value) {
                    dat = dat.filter(
                      (option: any) => option.value !== vals.trader.value
                    );
                  }
                  return dat;
                }}
                queryHook={useGetCustomerDropdownOptionsLazyQuery}
              />
              <AutoCompleteComponent
                label="seller"
                serverName="customer"
                name="seller"
                filterOptions={(options: any, state: any) => {
                  let dat: any[] = options;
                  const vals: any = values;
                  if (vals?.seller?.value) {
                    dat = dat.filter(
                      (option: any) => option.value !== vals.seller.value
                    );
                  }
                  if (vals?.buyer?.value) {
                    dat = dat.filter(
                      (option: any) => option.value !== vals.buyer.value
                    );
                  }
                  return dat;
                }}
                queryHook={useGetCustomerDropdownOptionsLazyQuery}
              />
              <AutoCompleteComponent
                label="trader"
                serverName="customer"
                name="trader"
                filterOptions={(options: any, state: any) => {
                  let dat: any[] = options;
                  const vals: any = values;
                  if (vals?.buyer?.value) {
                    dat = dat.filter(
                      (option: any) => option.value !== vals.buyer.value
                    );
                  }
                  if (vals?.seller?.value) {
                    dat = dat.filter(
                      (option: any) => option.value !== vals.seller.value
                    );
                  }
                  return dat;
                }}
                queryHook={useGetCustomerDropdownOptionsLazyQuery}
              />

              <Box>
                <FormLabel>second weight or tare weight</FormLabel>
                <Field component={Switch} type="checkbox" name="secondWeight" />
              </Box>
              <Box
                sx={{
                  margin: 2,
                  width: "90%",
                }}
              >
                <FormLabel>paid by</FormLabel>
                <Field component={RadioGroup} row name="paidBy">
                  {[
                    {
                      name: "buyer",
                      show: values.buyer,
                    },
                    {
                      name: "seller",
                      show: values.seller,
                    },
                    {
                      name: "trader",
                      show: values.trader,
                    },
                    {
                      name: "driver",
                      show: true,
                    },
                    {
                      name: "other",
                      show: true,
                    },
                  ].map(({ name, show }) => (
                    <RadioListComponent key={name} name={name} show={show} />
                  ))}
                </Field>
              </Box>
            </Box>
            <Box
              sx={{
                width: "50%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {values.secondWeight && (
                <Box sx={{ m: 1, width: "90%", display: "flex" }}>
                  <SelectWeight
                    setLoading={(loading: boolean) => setLoading(loading)}
                    setWeight={(val) => {
                      setFieldValue("tareWeight", val);
                    }}
                    setBillRefId={(val) => {
                      SetBillRefId(val);
                    }}
                    vehicleNumber={values.vehicleNumber}
                  />
                  <Field
                    component={TextField}
                    label="Tare weight"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">kg</InputAdornment>
                      ),
                    }}
                    disabled={BillRefId ? true : false}
                    name="tareWeight"
                    sx={{ m: 1, width: "50%" }}
                  />
                </Box>
              )}
              <AutoCompleteComponent
                name="vehicle"
                label="vehicle"
                serverName="vehicle"
                queryHook={useGetVehiclesDropDownListLazyQuery}
              />
              <MuiPhoneNumber
                label="driver phone"
                variant="outlined"
                countryCodeEditable={false}
                defaultCountry={"in"}
                onBlur={handleBlur}
                autoComplete="off"
                disabled={isSubmitting}
                error={
                  touched.driver_phone && errors.driver_phone ? true : false
                }
                value={values.driver_phone}
                onChange={(e) => setFieldValue("driver_phone", e.toString())}
                name="driver_phone"
                sx={{
                  margin: 2,
                  width: "90%",
                }}
              />
              <Field
                component={TextField}
                name="charges"
                type="number"
                sx={{
                  margin: 2,
                  width: "90%",
                }}
              />
              <Box
                sx={{
                  margin: 2,
                  width: "90%",
                  justifyContent: "end",
                  display: "flex",
                }}
              >
                {isValid && (
                  <Button
                    sx={{ marginRight: 2 }}
                    type="submit"
                    variant="contained"
                    color="success"
                  >
                    ACCEPT
                  </Button>
                )}
                <Button variant="contained" type="reset" color="error">
                  RESET
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Formik>
      <BillInfo data={data} open={open} setOpen={SetOpen} />
    </>
  );
};

export default Weigh;
