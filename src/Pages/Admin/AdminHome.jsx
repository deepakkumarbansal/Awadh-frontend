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
import { selectAllArticlesData, selectAllUsersData } from '../../store/slice/adminSlice';
import { useSelector } from 'react-redux';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminHome = () => {
  const data = useSelector(selectAllArticlesData);
  const usersData = useSelector(selectAllUsersData);
  const dateMapOfUsers = new Map();
  const dateMap = new Map();
  const articleStatusMap = new Array(0, 0, 0); // 0 for accepted, 1 for rejected and 3 for draft(pending)
  usersData?.users?.forEach(({updatedAt})=>{
    const date = new Date(updatedAt);
    const month = date.getMonth();
    const previousUsersFrequencyOfCurrentMonth = dateMapOfUsers.get(month);
    const newUsersFrequencyOfCurrentMonth = previousUsersFrequencyOfCurrentMonth ? previousUsersFrequencyOfCurrentMonth + 1 : 1;
    dateMapOfUsers.set(month, newUsersFrequencyOfCurrentMonth); // to be handled as only 10 users come at a time.
  })
  data?.articles?.forEach(({updatedAt, status})=>{
    const date = new Date(updatedAt);
    const month = date.getMonth(); // 0 based
    const previousArticlesFrequency = dateMap.get(month);
    const newArticlesFrequency = previousArticlesFrequency ? previousArticlesFrequency + 1 : 1;
    dateMap.set(month, newArticlesFrequency); // to be handled as only 10 articles come at a time.

    switch(status){
      case 'accepted' : articleStatusMap[0]++;
      break;
      case 'rejected' : articleStatusMap[1]++;
      break;
      case 'draft' : articleStatusMap[2]++;
      break;
    }

  })
  const monthlyPostsData = [
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
  const monthlyUsersData = [
    { label: 'January', value: dateMapOfUsers.get(0) || 0 },
    { label: 'February', value: dateMapOfUsers.get(1) || 0 },
    { label: 'March', value: dateMapOfUsers.get(2) || 0 },
    { label: 'April', value: dateMapOfUsers.get(3) || 0 },
    { label: 'May', value: dateMapOfUsers.get(4) || 0 },
    { label: 'June', value: dateMapOfUsers.get(5) || 0 },
    { label: 'July', value: dateMapOfUsers.get(6) || 0 },
    { label: 'August', value: dateMapOfUsers.get(7) || 0 },
    { label: 'September', value: dateMapOfUsers.get(8) || 0 },
    { label: 'October', value: dateMapOfUsers.get(9) || 0 },
    { label: 'November', value: dateMapOfUsers.get(10) || 0 },
    { label: 'December', value: dateMapOfUsers.get(11) || 0 },
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
  const totalUsersPerMonth = {
    labels: monthlyPostsData.map(entry => entry.label),
    datasets: [
      {
        label: 'Users',
        data: monthlyUsersData.map(entry => entry.value),
        backgroundColor: [
          'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)', 
          'rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 
          'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)', 'rgba(255, 99, 132, 0.6)',
          'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)', 
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
        <h2>Dashboard</h2>
      </div>
      <div className='mt-10 max-h-[430px]'>
        <h3 className='font-bold uppercase'>Total Users per month</h3>
        <Bar data={totalUsersPerMonth} options={chartOptions} />
      </div>
      <div className='mt-20 max-h-[430px]'>
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

export default AdminHome;

