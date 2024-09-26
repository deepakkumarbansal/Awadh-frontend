import React, { lazy, Suspense, useEffect, useState } from "react";
import {
  Epaper,
  FollowUs,
  SamacharSangrah,
  Health,
  Hero,
  Rajya,
  PopularNews,
  Section,
  SectionCatagory,
  Videsh,
  Rajnetic,
  TrendingNews,
  Desh,
  InstaPost,
} from "../../Components/index";
import { catagories } from "../../utility/categories";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import {
  fetchAllNewsAction,
  fetchHomeNewsByCatagoriesAction,
  selectAllNews,
  selectCategoryLoader,
  selectGeneralLoader,
  selectHomeNewsByCatagories,
} from "../../store/slice/newsSlice";
import Youtube from "../../Components/Youtube/Youtube";
import InstagramPosts from "../../Components/InstagramPosts";
import Loader from "../../Components/Loader/Loader";
const Home = () => {
  useEffect(()=>{
    fetch('http://localhost:8400/api/X/tweets').then((data)=>data.json()).then((data)=>{console.log(data);
    })
  },[])
  
  const latestNewsLoader = useSelector(selectGeneralLoader);
  const categoryLoader = useSelector(selectCategoryLoader);
  const dispatch = useDispatch();
  const latestNews = useSelector(selectAllNews);
  const databyCatagory = useSelector(selectHomeNewsByCatagories);
  console.log(latestNews, "latest");

  // fetching all the articles by catagory
  useEffect(() => {
    async function fetchArticles() {
      dispatch(fetchAllNewsAction(4)); //limit is 4
      dispatch(fetchHomeNewsByCatagoriesAction(catagories));
    }
    fetchArticles();
  }, []);

  return (
    <div>
      <Section id="hero">
        {latestNewsLoader ? <Loader /> : <Hero newsData={latestNews} />}
      </Section>
      {
        categoryLoader ? <Loader/> :
        <div id="container1">
        <div className="w-full">
          <Section id="desh" className="w-full">
            <Desh newsData={databyCatagory?.देश} />
          </Section>
          <Section id="videsh">
            <Videsh newsData={databyCatagory?.विदेश} />
          </Section>
          <Section id="Rajya">
            <Rajya newsData={databyCatagory?.राज्य} />
          </Section>
          <Section>
            <SectionCatagory name="Social Media" />
              <InstagramPosts />
          </Section>
          <Section id="rajnetic">
            <Rajnetic newsData={databyCatagory?.राजनैतिक} />
          </Section>
          <Section id="health">
            <Health newsData={databyCatagory?.स्वास्त} />
          </Section>
          <Section id="SamacharSangrah">
            <SamacharSangrah newsData={databyCatagory?.अन्य} />
          </Section>
        </div>
        <div>
          {/* <Section id="popular"><PopularNews newsData={popularNewsData} /></Section>
          <div className='bg-gray-400 h-[300px] w-full my-10'>Ad</div>
          <Section id="trending"><TrendingNews newsData={trendingNewsData} /></Section> */}
          <Section>
            <SectionCatagory name="Youtube videos" />
              <Youtube/>
          </Section>
        </div>
      </div>
      }
      {/* <div id='container2'>
        <Section id="travel"><Travel newsData={travelNewsData} /></Section>
        <Section id="gadgets"><Gagets newsData={gadgetsNewsData} /></Section>
        <Section id="health"><Health newsData={healthNewsData} /></Section>
      </div> */}
    </div>
  );
};

export default Home;
