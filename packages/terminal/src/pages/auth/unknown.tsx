import { signOut } from "firebase/auth";
import * as React from "react";
import { auth } from "../../utils/firebase";

interface AnonimusProps {}

const Unknown: React.FunctionComponent<AnonimusProps> = () => {
  React.useEffect(() => {
    signOut(auth);
  }, []);

  return (
    <h1>
      the user is un registered go to nearest inraweigh powered weighbirdge for
      activation
    </h1>
  );
};

export default Unknown;
