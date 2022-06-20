import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { FunctionComponent } from "react";

const ChooseOptions: FunctionComponent<{
  name: string;
  show?: boolean | null;
}> = ({ name, show }) => {
  return show ? (
    <FormControlLabel value={name} control={<Radio />} label={name} />
  ) : null;
};

export default ChooseOptions;
