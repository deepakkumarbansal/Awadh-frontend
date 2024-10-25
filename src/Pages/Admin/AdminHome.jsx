import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { fetchArticlesPerMonth, fetchUsersPerMonth } from "../../Services/Operations/admin";

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
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const [requiredYear, setRequiredYear] = useState(currentYear);
  const [requiredMonth, setRequiredMonth] = useState(currentMonth);
  const months = [
    { name: "January", number: 1 },
    { name: "February", number: 2 },
    { name: "March", number: 3 },
    { name: "April", number: 4 },
    { name: "May", number: 5 },
    { name: "June", number: 6 },
    { name: "July", number: 7 },
    { name: "August", number: 8 },
    { name: "September", number: 9 },
    { name: "October", number: 10 },
    { name: "November", number: 11 },
    { name: "December", number: 12 },
  ];

  const [years, setYears] = useState([]);

  const [
    usersPerMonthDataOfMultipleYears,
    setUsersPerMonthDataOfMultipleYears,
  ] = useState([]);
  const [articlesPerMonthOfMultipleYears, setArticlesPerMonthOfMultipleYears] =
    useState([]);
  const [
    userRegistrationsPerMonthInRequiredYear,
    setUserRegistrationsPerMonthInRequiredYear,
  ] = useState(new Map());
  const [articlesPerMonthInRequiredYear, setArticlesPerMonthInRequiredYear] =
    useState(new Map());
  const [
    articlesStatusOfPerticularMonthInPerticularYear,
    setArticlesStatusOfPerticularMonthInPerticularYear,
  ] = useState(new Array(0, 0, 0)); // 0 for accepted, 1 for rejected and 2 for draft(pending)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUsersPerMonth();
        const articlesData = await fetchArticlesPerMonth();

        setUsersPerMonthDataOfMultipleYears(userData);
        setArticlesPerMonthOfMultipleYears(articlesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const requiredYearUserRegistrationsData =
      usersPerMonthDataOfMultipleYears?.find(
        ({ year }) => year === requiredYear
      );
    const map = new Map();

    if (requiredYearUserRegistrationsData) {
      requiredYearUserRegistrationsData?.userRegistrationsPerMonth?.forEach(
        ({ month, registrations }) => {
          map.set(month, registrations);
        }
      );
    }
    if (map.size > 0) {
      setUserRegistrationsPerMonthInRequiredYear(map);
    }
  }, [requiredYear, usersPerMonthDataOfMultipleYears]);

  useEffect(() => {
    const requiredYearArticlesData = articlesPerMonthOfMultipleYears?.find(
      ({ year }) => year === requiredYear
    );
    console.log("data changes", requiredYearArticlesData);

    const map = new Map();
    if (requiredYearArticlesData) {
      requiredYearArticlesData?.months?.forEach(
        ({
          month,
          totalAriticlesInAMonth,
          acceptedArticles,
          rejectedArticles,
          draftArticles,
        }) => {
          map.set(month, {
            t: totalAriticlesInAMonth,
            a: acceptedArticles,
            r: rejectedArticles,
            d: draftArticles,
          });
        }
      );
    }

    if (map.size > 0) {
      setArticlesPerMonthInRequiredYear(map);
    } else {
      setArticlesPerMonthInRequiredYear(new Map());
    }
  }, [requiredYear, articlesPerMonthOfMultipleYears]);

  useEffect(() => {
    const statusArray = new Array(0, 0, 0);
    console.log("Hanji", articlesPerMonthInRequiredYear);

    statusArray[0] = articlesPerMonthInRequiredYear?.get(requiredMonth)?.a;
    statusArray[1] = articlesPerMonthInRequiredYear?.get(requiredMonth)?.r;
    statusArray[2] = articlesPerMonthInRequiredYear?.get(requiredMonth)?.d;
    setArticlesStatusOfPerticularMonthInPerticularYear(statusArray);
  }, [requiredMonth, articlesPerMonthInRequiredYear]);

  useEffect(() => {
    setYears((prev) => {
      const array = [];
      usersPerMonthDataOfMultipleYears.forEach(({ year }) => {
        array.push(year);
      });
      array.push(...prev);
      array.sort((a, b) => a - b);
      const set = new Set(array)
      return Array.from(set);
    });
  }, [usersPerMonthDataOfMultipleYears]);

  useEffect(() => {
    setYears((prev) => {
      const array = [];
      articlesPerMonthOfMultipleYears.forEach(({ year }) => {
        array.push(year);
      });
      array.push(...prev);
      array.sort((a, b) => a - b);
      const set = new Set(array)
      return Array.from(set);
    });
  }, [articlesPerMonthOfMultipleYears]);


  const monthlyPostsData = [
    { label: "January", value: articlesPerMonthInRequiredYear?.get(1)?.t || 0 },
    {
      label: "February",
      value: articlesPerMonthInRequiredYear?.get(2)?.t || 0,
    },
    { label: "March", value: articlesPerMonthInRequiredYear?.get(3)?.t || 0 },
    { label: "April", value: articlesPerMonthInRequiredYear?.get(4)?.t || 0 },
    { label: "May", value: articlesPerMonthInRequiredYear?.get(5)?.t || 0 },
    { label: "June", value: articlesPerMonthInRequiredYear?.get(6)?.t || 0 },
    { label: "July", value: articlesPerMonthInRequiredYear?.get(7)?.t || 0 },
    { label: "August", value: articlesPerMonthInRequiredYear?.get(8)?.t || 0 },
    {
      label: "September",
      value: articlesPerMonthInRequiredYear?.get(9)?.t || 0,
    },
    {
      label: "October",
      value: articlesPerMonthInRequiredYear?.get(10)?.t || 0,
    },
    {
      label: "November",
      value: articlesPerMonthInRequiredYear?.get(11)?.t || 0,
    },
    {
      label: "December",
      value: articlesPerMonthInRequiredYear?.get(12)?.t || 0,
    },
  ];

  const monthlyUsersData = [
    {
      label: "January",
      value: userRegistrationsPerMonthInRequiredYear.get(1) || 0,
    },
    {
      label: "February",
      value: userRegistrationsPerMonthInRequiredYear.get(2) || 0,
    },
    {
      label: "March",
      value: userRegistrationsPerMonthInRequiredYear.get(3) || 0,
    },
    {
      label: "April",
      value: userRegistrationsPerMonthInRequiredYear.get(4) || 0,
    },
    {
      label: "May",
      value: userRegistrationsPerMonthInRequiredYear.get(5) || 0,
    },
    {
      label: "June",
      value: userRegistrationsPerMonthInRequiredYear.get(6) || 0,
    },
    {
      label: "July",
      value: userRegistrationsPerMonthInRequiredYear.get(7) || 0,
    },
    {
      label: "August",
      value: userRegistrationsPerMonthInRequiredYear.get(8) || 0,
    },
    {
      label: "September",
      value: userRegistrationsPerMonthInRequiredYear.get(9) || 0,
    },
    {
      label: "October",
      value: userRegistrationsPerMonthInRequiredYear.get(10) || 0,
    },
    {
      label: "November",
      value: userRegistrationsPerMonthInRequiredYear.get(11) || 0,
    },
    {
      label: "December",
      value: userRegistrationsPerMonthInRequiredYear.get(12) || 0,
    },
  ];

  const PostPerMonthData = {
    labels: monthlyPostsData.map((entry) => entry.label),
    datasets: [
      {
        label: "Posted News",
        data: monthlyPostsData.map((entry) => entry.value),
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  const totalUsersPerMonth = {
    labels: monthlyPostsData.map((entry) => entry.label),
    datasets: [
      {
        label: "Users",
        data: monthlyUsersData.map((entry) => entry.value),
        backgroundColor: [
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const acceptedRejectedData = {
    labels: ["Accepted", "Rejected", "Draft"],
    datasets: [
      {
        label: "News Status",
        data: [
          articlesStatusOfPerticularMonthInPerticularYear[0],
          articlesStatusOfPerticularMonthInPerticularYear[1],
          articlesStatusOfPerticularMonthInPerticularYear[2],
        ],
        backgroundColor: [
          "rgba(75, 192, 79, 0.7)",
          "rgba(255, 99, 132, 0.7)",
          "rgba(99, 232, 255, 0.7)",
        ],
        borderColor: [
          "rgba(75, 192, 79, 0.7)",
          "rgba(255, 99, 132, 1)",
          "rgba(99, 232, 255, 0.7)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    animation: {
      duration: 1500,
      easing: "easeOutBounce",
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Dashboard</h2>

      <div className="flex flex-wrap space-x-2 mb-6">
        {years.map((year) => (
          <Button
            key={year}
            number={year}
            handleClick={setRequiredYear}
            isActive={year === requiredYear}
          />
        ))}
      </div>

      <div className="mt-6 shadow-lg rounded-lg overflow-hidden bg-white p-4 mb-6">
        <h3 className="font-bold text-lg sm:text-xl text-gray-700 uppercase mb-2">Total Users per Month</h3>
        <Bar data={totalUsersPerMonth} options={chartOptions} height={150} />
      </div>

      <div className="mt-6 shadow-lg rounded-lg overflow-hidden bg-white p-4 mb-6">
        <h3 className="font-bold text-lg sm:text-xl text-gray-700 uppercase mb-2">Total PUBLISHED ARTICLES Per Month</h3>
        <Bar data={PostPerMonthData} options={chartOptions} height={150} /> 
      </div>

      <div className="lg:flex lg:items-center lg:gap-10 mt-6 flex-wrap">
        <div className="my-6 shadow-lg rounded-lg overflow-hidden bg-white p-4 lg:flex-1 lg:mr-4">
          <h3 className="font-bold text-lg sm:text-xl text-gray-700 uppercase mb-2">Accepted, Rejected and Draft Articles</h3>
          <Pie data={acceptedRejectedData} options={chartOptions} height={150} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4 lg:mt-0 lg:flex-1">
          {months.map(({ name, number }) => (
            <Button
              isActive={requiredMonth === number}
              name={name}
              number={number}
              key={number}
              handleClick={setRequiredMonth}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Button = ({ name, number, handleClick, isActive }) => {
  return (
    <button
      onClick={() => handleClick(number)}
      className={`shadow-md border-2 font-bold px-3 py-1 rounded-lg transition-all duration-300 ${
        isActive ? 'bg-green-600 text-white border-green-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-green-100 hover:border-green-400'
      }`}
      style={{ minWidth: '70px' }}  
    >
      {name || number}
    </button>
  );
};

export default AdminHome;