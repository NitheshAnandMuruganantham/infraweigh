import * as React from 'react';
import {
  useGetTotalEntriesQuery,
  useGetTotalAmountQuery,
  useGetTotalWeighbridgesQuery,
} from '../../generated';
import CounterCard from './countCard';

interface SectionOneProps {}

const SectionOne: React.FunctionComponent<SectionOneProps> = () => {
  const { data: d1, loading: l1 } = useGetTotalEntriesQuery();
  const { data: d2, loading: l2 } = useGetTotalWeighbridgesQuery();
  const { data: d3, loading: l3 } = useGetTotalAmountQuery({
    variables: {
      where: {
        paid: {
          _eq: false,
        },
      },
    },
  });
  const { data: d4, loading: l4 } = useGetTotalAmountQuery({
    variables: {
      where: {
        _and: [
          {
            created_at: {
              _gte: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}T00:00:00.000Z`,
            },
          },
          {
            created_at: {
              _lte: `${new Date().getFullYear()}-${new Date().getMonth()}-${
                new Date().getDate() + 1
              }T00:00:00.000Z`,
            },
          },
        ],
      },
    },
  });

  const { data: d5, loading: l5 } = useGetTotalEntriesQuery({
    variables: {
      where: {
        _and: [
          {
            created_at: {
              _gte: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}T00:00:00.000Z`,
            },
          },
          {
            created_at: {
              _lte: `${new Date().getFullYear()}-${new Date().getMonth()}-${
                new Date().getDate() + 1
              }T00:00:00.000Z`,
            },
          },
        ],
      },
    },
  });
  const { data: d6, loading: l6 } = useGetTotalEntriesQuery({
    variables: {
      where: {
        paid: {
          _eq: false,
        },
      },
    },
  });

  return (
    <div
      style={{
        height: 'auto',
        width: '98.5%',
        marginBottom: '10px',
        display: 'flex',
        rowGap: '10px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        columnGap: '10px',
        flexDirection: 'row',
      }}
    >
      <CounterCard
        label="total entires"
        count={d1?.bill_aggregate.aggregate?.count}
        loading={l1}
      />
      <CounterCard
        label="unpaid entries"
        count={d6?.bill_aggregate.aggregate?.count}
        loading={l6}
      />
      <CounterCard
        label="weighbridges"
        count={d2?.weighbridge_aggregate.aggregate?.count}
        loading={l2}
      />
      <CounterCard
        label="total debit"
        count={d3?.bill_aggregate.aggregate?.sum?.charges}
        loading={l3}
      />
      <CounterCard
        label="day charges"
        count={d4?.bill_aggregate.aggregate?.sum?.charges || 0}
        loading={l4}
      />
      <CounterCard
        label="today entries"
        count={d5?.bill_aggregate.aggregate?.count || 0}
        loading={l5}
      />
    </div>
  );
};

export default SectionOne;
