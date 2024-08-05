
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: { label: string; value: number }[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.label),
    datasets: [
      {
        label: 'Tasks',
        data: data.map(d => d.value),
        backgroundColor: 'rgba(99, 102, 241, 0.6)', 
        borderColor: 'rgba(99, 102, 241, 1)', 
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#4a5568', 
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)', 
        titleColor: '#fff', 
        bodyColor: '#fff', 
      },
    },
    scales: {
      x: {
        grid: {
          display: false, 
        },
        ticks: {
          color: '#4a5568', 
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)', 
        },
        ticks: {
          color: '#4a5568', 
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Task Distribution</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
