import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ReportersHome = () => {
  const monthlyPostsData = [ //to be changed
    { label: 'January', value: 12 },
    { label: 'February', value: 8 },
    { label: 'March', value: 15 },
    { label: 'April', value: 10 },
    { label: 'May', value: 14 },
    { label: 'June', value: 9 },
    { label: 'July', value: 7 },
    { label: 'August', value: 13 },
    { label: 'September', value: 11 },
    { label: 'October', value: 16 },
    { label: 'November', value: 10 },
    { label: 'December', value: 12 },
  ];

  const PostPerMonthData = {
    labels: monthlyPostsData.map(entry => entry.label),
    datasets: [
      {
        label: 'Posted News',
        data: monthlyPostsData.map(entry => entry.value),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 
          'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)', 
          'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)', 
          'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)', 'rgba(255, 99, 132, 0.6)'
        ],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const acceptedRejectedData = {
    labels: ['Accepted', 'Rejected'],
    datasets: [
      {
        label: 'News Status',
        data: [85, 15], // to be changed
        backgroundColor: ['rgba(75, 192, 192, 0.7)', 'rgba(255, 99, 132, 0.7)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    animation: {
      duration: 1500,
      easing: 'easeOutBounce',
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <div>
        <h2>Analytics</h2>
      </div>
      <div className='mt-10 max-h-[430px]'>
        <h3 className='font-bold uppercase'>Total Posts per month</h3>
        <Bar data={PostPerMonthData} options={chartOptions} />
      </div>
      <div className='my-20 max-h-[430px]'>
        <h3 className='font-bold uppercase'>Accepted and Rejected Posts</h3>
        <Pie data={acceptedRejectedData} options={chartOptions} />
      </div>
    </>
  );
}

export default ReportersHome;
