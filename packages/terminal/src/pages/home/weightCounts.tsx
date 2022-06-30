import { useBillAggregateLazyQuery } from "../../generated";
import { ResponsiveBar } from "@nivo/bar";
import * as React from "react";

const WeightCount: React.FunctionComponent = () => {
  const [getCollection] = useBillAggregateLazyQuery();
  const [collection, setCollection] = React.useState<
    {
      count: number;
      day: number;
    }[]
  >([]);

  const getChart1Data = async () => {
    const getCollectionData = async (day: number) => {
      const { data } = await getCollection({
        variables: {
          where: {
            created_at: {
              _gte: new Date(
                new Date(new Date().setHours(0, 0, 0, 0)).setDate(
                  new Date().getDate() - (day + 1)
                )
              ),
              _lte: new Date(
                new Date(new Date().setHours(0, 0, 0, 0)).setDate(
                  new Date().getDate() - day
                )
              ),
            },
          },
        },
      });

      setCollection((prv) => {
        const amt = data?.bill_aggregate.aggregate?.count || "0";
        return [
          ...prv,
          {
            count: parseInt(`${amt}`, 10),
            day,
          },
        ];
      });
    };
    await getCollectionData(0);
    await getCollectionData(1);
    await getCollectionData(2);
    await getCollectionData(3);
    await getCollectionData(4);
    await getCollectionData(5);
    await getCollectionData(6);
  };

  React.useEffect(() => {
    getChart1Data().then(() => null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "100px",
        flexDirection: "column",
        height: "500px",
        width: "100%",
      }}
    >
      <h2>entries</h2>
      <ResponsiveBar
        data={[...collection]}
        keys={["count"]}
        indexBy="day"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={{ scheme: "pastel1" }}
        borderColor="black"
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "last seven days",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "collection",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
      />
    </div>
  );
};

export default WeightCount;
