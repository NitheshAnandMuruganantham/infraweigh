import React, { Component, useEffect } from "react";
import bwipjs from "bwip-js";

const Barcode: React.FunctionComponent<{ value: string }> = ({ value }) => {
  useEffect(() => {
    try {
      bwipjs.toCanvas("mycanvas", {
        bcid: "code128",
        text: value,
        scale: 2,
        height: 3,
        includetext: false,
      });
    } catch (e) {}
  }, []);

  return (
    <canvas
      style={{
        position: "absolute",
        bottom: "0px",
        left: "0px",
        margin: "5px",
        marginLeft: "10px",
      }}
      id="mycanvas"
    ></canvas>
  );
};

export default Barcode;
