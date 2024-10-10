import React, { useEffect } from 'react';
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
import { useSelector } from 'react-redux';
import { selectReporterArticles } from '../../store/slice/newsSlice';

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
  const data = useSelector(selectReporterArticles);
  const dateMap = new Map();
  const articleStatusMap = new Array(0, 0, 0); // 0 for accepted, 1 for rejected and 3 for draft(pending)
  data?.articles?.forEach(({updatedAt, status})=>{
    const date = new Date(updatedAt);
    const month = date.getMonth(); // 0 based
    const previousArticlesFrequency = dateMap.get(month);
    const newArticlesFrequency = previousArticlesFrequency ? previousArticlesFrequency + 1 : 1;
    dateMap.set(month, newArticlesFrequency);

    switch(status){
      case 'accepted' : articleStatusMap[0]++;
      break;
      case 'rejected' : articleStatusMap[1]++;
      break;
      case 'draft' : articleStatusMap[2]++;
      break;
    }

  })

  const monthlyPostsData = [ //to be changed
    { label: 'January', value: dateMap.get(0) || 0 },
    { label: 'February', value: dateMap.get(1) || 0 },
    { label: 'March', value: dateMap.get(2) || 0 },
    { label: 'April', value: dateMap.get(3) || 0 },
    { label: 'May', value: dateMap.get(4) || 0 },
    { label: 'June', value: dateMap.get(5) || 0 },
    { label: 'July', value: dateMap.get(6) || 0 },
    { label: 'August', value: dateMap.get(7) || 0 },
    { label: 'September', value: dateMap.get(8) || 0 },
    { label: 'October', value: dateMap.get(9) || 0 },
    { label: 'November', value: dateMap.get(10) || 0 },
    { label: 'December', value: dateMap.get(11) || 0 },
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
    labels: ['Accepted', 'Rejected', 'Draft'],
    datasets: [
      {
        label: 'News Status',
        data: [articleStatusMap[0], articleStatusMap[1], articleStatusMap[2]],
        backgroundColor: ['rgba(75, 192, 79, 0.7)', 'rgba(255, 99, 132, 0.7)', 'rgba(99, 232, 255, 0.7)'],
        borderColor: ['rgba(75, 192, 79, 0.7)', 'rgba(255, 99, 132, 1)', 'rgba(99, 232, 255, 0.7)'],
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
