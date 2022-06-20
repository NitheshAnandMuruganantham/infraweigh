import { useBillsByCustomerQuery } from "../../generated";
import { ResponsivePie } from "@nivo/pie";
import * as React from "react";

const CustomerCollection: React.FunctionComponent = () => {
  const [customerByCollection, setCustomerByCollection] = React.useState<
    {
      id: string;
      label: string;
      value: number;
    }[]
  >([]);
  const { data: getBillsByCustomer } = useBillsByCustomerQuery();
  React.useEffect(() => {
    // eslint-disable-next-line array-callback-return
    getBillsByCustomer?.customer_aggregate.nodes.map((v) => {
      const amt = v?.bills_id_aggregate?.aggregate?.sum?.charges || "0";
      setCustomerByCollection((prv) => [
        ...prv,
        {
          id: v.name,
          label: v.name,
          value: Number(amt.replace(/[^0-9.-]+/g, "")),
        },
      ]);
    });
  }, [getBillsByCustomer]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "500px",
        width: "100%",
      }}
    >
      <ResponsivePie
        data={customerByCollection}
        margin={{ top: 30, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        animate={false}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        colors={{
          scheme: "orange_red",
        }}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
      />
    </div>
  );
};

export default CustomerCollection;
