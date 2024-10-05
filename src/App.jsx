import { useEffect, useState } from 'react'
import './App.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Header, Footer, ReportersHome, ArticleForm } from './Components'
import { FaAngleUp } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { MdOutlineAccountCircle } from "react-icons/md";
import InstagramPosts from './Components/InstagramPosts';
import { ToastContainer } from 'react-toastify';

function App() {
  const [latestNewsData, setLatestNewsData] = useState([]);
  const [popularNewsData, setPopularNewsData] = useState([]);
  const [technologyNewsData, setTechnologyNewsData] = useState([]);
  const [lifeStyleNewsData, setLifeStyleNewsData] = useState([]);
  const [trendingNewsData, setTrendingNewsData] = useState([]);
  const [travelNewsData, setTravelNewsData] = useState([]);
  const [healthNewsData, setHealthNewsData] = useState([]);
  const [gadgetsNewsData, setGadgetsNewsData] = useState([]);
  const [enableScroll, setEnableScroll] = useState(false);
  const isLogin = useSelector((state)=>state.auth.isLogin);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchNews() {
      try {

      } catch (error) {
        console.error(error);
      }
    }
    fetchNews();

    function handleScroll() {
      if (window.scrollY > 150) {
        setEnableScroll(true);
      } else {
        setEnableScroll(false);
      }
    }
    window.addEventListener('scroll', handleScroll)

  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  const scrollContainerItems = [
    {text: "heldsadkbakjdkabsasdjkasksdjbkdaksblo", href:"bsdjsd"},
    {text: "heldsadkbakjdkabsasdjkasksdjbkdaksblo", href:"bsdjsd"},
    {text: "heldsadkbakjdkabsasdjkasksdjbkdaksblo", href:"bsdjsd"},
    {text: "heldsadkbakjdkabsasdjkasksdjbkdaksblo", href:"bsdjsd"},
    {text: "heldsadkbakjdkabsasdjkasksdjbkdaksblo", href:"bsdjsd"},
    {text: "heldsadkbakjdkabsasdjkasksdjbkdaksblo", href:"bsdjsd"},
    {text: "heldsadkbakjdkabsasdjkasksdjbkdaksblo", href:"bsdjsd"},
  ]

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className='px-2 xl:px-10'>
        <Header scrollContainerItems={scrollContainerItems}/>
        <Outlet />
      </div>
      <Footer className='px-2 lg:px-24' />
      <div className={`border-[3px] bg-white fixed bottom-5 right-5 hover:border-red-500 transition-all duration-300 h-10 w-10 text-2xl flex items-center justify-center shadow-lg ${enableScroll ? 'opacity-1' : 'opacity-0'} transition-all duration-300`} onClick={scrollToTop}><FaAngleUp /></div>
      {/* <InstagramPosts/> */}
    </div>
  )
}

export default App