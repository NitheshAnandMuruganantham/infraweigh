import * as React from "react";
import Button from "@mui/material/Button";
import SelectWeightGrid from "./selectWeightGrid";

const AddNewClient: React.FunctionComponent<{
  vehicleNumber: string;
  setLoading: (loading: boolean) => void;
  setWeight(weight: number): void;
  setBillRefId(id: string): void;
}> = ({ vehicleNumber, setWeight, setBillRefId, setLoading }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        sx={{ m: 1, width: "60%" }}
        onClick={() => {
          handleClickOpen();
        }}
      >
        select weight
      </Button>
      {open && (
        <SelectWeightGrid
          handleClose={handleClose}
          setBillRefId={setBillRefId}
          setWeight={setWeight}
          setLoading={setLoading}
          vehicleNumber={vehicleNumber}
        />
      )}
    </>
  );
};

export default AddNewClient;
