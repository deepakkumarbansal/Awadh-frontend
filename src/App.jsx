import { useEffect, useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import { Header, Footer } from './Components'

function App() {
  const [latestNewsData, setLatestNewsData] = useState([]);
  const [popularNewsData, setPopularNewsData] = useState([]);
  const [technologyNewsData, setTechnologyNewsData] = useState([]);
  const [lifeStyleNewsData, setLifeStyleNewsData] = useState([]);
  const [trendingNewsData, setTrendingNewsData] = useState([]);
  const [travelNewsData, setTravelNewsData] = useState([]);
  const [healthNewsData, setHealthNewsData] = useState([]);
  const [gadgetsNewsData, setGadgetsNewsData] = useState([]);
  const url = 'https://google-news13.p.rapidapi.com/?lr=hi-IN';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'f86b29b5f3mshcc34b8de96e06f4p10b7b9jsned4f133ee9ac',
      'x-rapidapi-host': 'google-news13.p.rapidapi.com'
    }
  };
  useEffect(()=>{
    async function fetchNews(){
      try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }
    fetchNews();
  }, []);

  return (
    <>
      <div className='px-2 lg:px-24'>
        <Header />
        <Outlet />
      </div>
      <Footer className='px-2 lg:px-24'/>
    </>
  )
}

export default App
