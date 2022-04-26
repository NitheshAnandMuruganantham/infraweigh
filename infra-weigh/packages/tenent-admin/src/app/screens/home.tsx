import { Box } from '@mui/system';
import {
  useBillsByCustomerQuery,
  useGetTotalCollectionLazyQuery,
  useGetVehicleByCollectionsQuery,
} from '@infra-weigh/generated';
import { FunctionComponent, useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';

const Home: FunctionComponent = () => {
  const { data: VehicleByBill } = useGetVehicleByCollectionsQuery({
    variables: {
      where: {
        tenent_id: {
          _eq: localStorage.getItem('x-tenent-id'),
        },
      },
    },
  });
  const [collection, setCollection] = useState<
    {
      amount: number;
      day: number;
    }[]
  >([]);

  const [getCollection] = useGetTotalCollectionLazyQuery();
  const [vehicleByCollection, setVehicleByCollection] = useState<
    {
      id: string;
      label: string;
      value: number;
    }[]
  >([]);
  const [customerByCollection, setCustomerByCollection] = useState<
    {
      id: string;
      label: string;
      value: number;
    }[]
  >([]);

  const getChart1Data = async () => {
    const getCollectionData = async (day: number) => {
      const { data } = await getCollection({
        variables: {
          where: {
            tenent_id: {
              _eq: localStorage.getItem('x-tenent-id'),
            },
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
        const amt = data?.bill_aggregate.aggregate?.sum?.charges || '0';
        return [
          ...prv,
          {
            amount: Number(amt.replace(/[^0-9.-]+/g, '')),
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

  const { data: getBillsByCustomer } = useBillsByCustomerQuery({
    variables: {
      where: {
        tenent_id: {
          _eq: localStorage.getItem('x-tenent-id'),
        },
      },
    },
  });

  useEffect(() => {
    getChart1Data().then(() => null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
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

  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    getBillsByCustomer?.customer_aggregate.nodes.map((v) => {
      const amt = v?.bills_id_aggregate?.aggregate?.sum?.charges || '0';
      setCustomerByCollection((prv) => [
        ...prv,
        {
          id: v.name,
          label: v.name,
          value: Number(amt.replace(/[^0-9.-]+/g, '')),
        },
      ]);
    });
  }, [getBillsByCustomer]);

  return (
    <Box sx={{ h: '100vh', w: '100%', p: 10 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '500px',
          width: '100%',
        }}
      >
        <h2>daily collection report</h2>
        <ResponsiveBar
          data={[...collection]}
          keys={['amount']}
          indexBy="day"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          colors={{ scheme: 'dark2' }}
          borderColor="black"
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'last seven days',
            legendPosition: 'middle',
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'collection',
            legendPosition: 'middle',
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: 'color',
            modifiers: [['darker', 1.6]],
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: '150px',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '100%',
          marginBottom: '30px',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
          }}
        >
          vehicle collection report
        </h2>
        <h2>customer collection report</h2>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '500px',
          width: '100%',
        }}
      >
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
        <ResponsivePie
          data={customerByCollection}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 0.2]],
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          colors={{
            scheme: 'pastel1',
          }}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: 'color',
            modifiers: [['darker', 2]],
          }}
          animate={false}
        />
      </div>
    </Box>
  );
};

export default Home;
