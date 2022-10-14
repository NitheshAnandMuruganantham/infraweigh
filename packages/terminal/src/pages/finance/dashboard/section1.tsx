import * as React from 'react';
import {
  useGetTotalEntriesQuery,
  useGetTotalWeighbridgesQuery,
  useGetTotalAmountQuery,
  useGetTotalCustomersQuery,
  useGetTotalEmployeesQuery,
  useGetIssuesAggregateQuery,
} from '../../../generated';
import CounterCard from './countCard';

interface SectionOneProps {}

const SectionOne: React.FunctionComponent<SectionOneProps> = () => {
  const { data: d1, loading: l1 } = useGetTotalCustomersQuery();
  const { data: d2, loading: l2 } = useGetTotalEmployeesQuery();
  const { data: d3, loading: l3 } = useGetTotalWeighbridgesQuery();
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
  const { data: d6, loading: l6 } = useGetIssuesAggregateQuery({
    variables: {
      where: {
        severity: {
          _eq: 'service blockage',
        },
      },
    },
  });
  const { data: d7, loading: l7 } = useGetIssuesAggregateQuery();
  return (
    <div
      style={{
        height: '300px',
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
        label="total customers"
        count={d1?.customer_aggregate.aggregate?.count}
        loading={l1}
      />
      <CounterCard
        label="total employees"
        count={d2?.user_aggregate.aggregate?.count}
        loading={l2}
      />
      <CounterCard
        label="total weighbridges"
        count={d3?.weighbridge_aggregate.aggregate?.count}
        loading={l3}
      />
      <CounterCard
        label="today's collection"
        count={d4?.bill_aggregate.aggregate?.sum?.charges || 0}
        loading={l4}
      />
      <CounterCard
        label="today's total entires"
        count={d5?.bill_aggregate.aggregate?.count || 0}
        loading={l5}
      />
      <CounterCard
        label="total unpaid bills"
        count={d5?.bill_aggregate.aggregate?.count || 0}
        loading={l5}
      />
      <CounterCard
        label="service blockage"
        count={d6?.issues_aggregate.aggregate?.count || 0}
        loading={l6}
      />
      <CounterCard
        label="un resolved issues"
        count={d7?.issues_aggregate.aggregate?.count || 0}
        loading={l7}
      />
    </div>
  );
};

export default SectionOne;
