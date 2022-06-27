import React, { FunctionComponent, useEffect, useState } from "react";
import NoInterNet from "./noInternetPage";
import SettingsSvg from "./settings.svg";

const App: FunctionComponent = () => {
  const [isOnline, setOnline] = useState(false);
  useEffect(() => {
    setOnline(navigator.onLine);
  }, [navigator.onLine]);
  if (isOnline)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "100vw",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "5vh",
            display: "flex",
            backgroundColor: "black",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <SettingsSvg />
        </div>
        <webview
          style={{
            width: "100%",
            height: "100%",
          }}
          src={process.env["URL"]}
        />
      </div>
    );
  return (
    <>
      <NoInterNet />
    </>
  );
};

export default App;
