import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'revenue vs credit',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'revenue',
      data: labels.map(() =>
        faker.datatype.number({ min: 100000, max: 200000 })
      ),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'credit',
      data: labels.map(() =>
        faker.datatype.number({ min: 30000, max: 200000 })
      ),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

function App() {
  return (
    <div
      style={{
        padding: '10px',
        marginLeft: '10px',
        width: '600px',
        height: 'auto',
        aspectRatio: 'auto',
        backgroundColor: 'whitesmoke',
        borderRadius: '10px',
      }}
    >
      <Bar options={options} data={data} />
    </div>
  );
}

export default App;
