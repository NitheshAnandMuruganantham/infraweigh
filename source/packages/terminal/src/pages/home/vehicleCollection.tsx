import { useGetVehicleByCollectionsQuery } from '@infra-weigh/generated';
import { ResponsivePie } from '@nivo/pie';
import * as React from 'react';

const VehicleCollection: React.FunctionComponent = () => {
  const { data: VehicleByBill } = useGetVehicleByCollectionsQuery();

  const [vehicleByCollection, setVehicleByCollection] = React.useState<
    {
      id: string;
      label: string;
      value: number;
    }[]
  >([]);

  React.useEffect(() => {
    // eslint-disable-next-line array-callback-return
    VehicleByBill?.vehicle_aggregate.nodes.map((v: any) => {
      const amt = v?.bills_aggregate?.aggregate?.sum?.charges || '0';
      setVehicleByCollection((prv) => [
        ...prv,
        {
          id: v.name,
          label: v.name,
          value: Number(amt.replace(/[^0-9.-]+/g, '')),
        },
      ]);
    });
    console.log(vehicleByCollection);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [VehicleByBill]);
  return (
    <div
      style={{
        display: 'flex',
        height: '500px',
        width: '100%',
      }}
    >
      <ResponsivePie
        data={vehicleByCollection}
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
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [['darker', 2]],
        }}
      />
    </div>
  );
};

export default VehicleCollection;
