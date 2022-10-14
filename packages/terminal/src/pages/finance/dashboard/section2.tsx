import React, { FunctionComponent } from 'react';
import { useGetTotalCollectionLazyQuery } from '../../../generated';
import TopPerforming from './performing';
import RevenueChart from './revienuceChart';
import TopClients from './topClients';

interface DashboardProps {}

const data = [['Day', 'Collection']];

const FinanceDashboard: FunctionComponent<DashboardProps> = () => {
  const [loadData, { data, loading, error }] = useGetTotalCollectionLazyQuery();

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        marginTop: '20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
          height: '300px',
        }}
      >
        <TopPerforming />
        <RevenueChart />
        <TopClients />
      </div>
    </div>
  );
};

export default FinanceDashboard;
