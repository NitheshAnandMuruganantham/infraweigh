import React, { FunctionComponent } from 'react';
import { useGetTotalCollectionLazyQuery } from '../../../generated';
import TopIssues from './TopIssues';
import RevenueChart from './creditRevenueComparison';
import TopDebtors from './topDebtors';

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
        <TopIssues />
        <RevenueChart />
        <TopDebtors />
      </div>
    </div>
  );
};

export default FinanceDashboard;
