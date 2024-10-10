import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { articlesEndPoints } from "../../Services/apis";
import { apiConnector } from "../../Services/connector";
import Loader from "../../Components/Loader/Loader";
const NewsDetails = () => {
  const { slug } = useParams();
  const { GET_ARTICLE_BY_ID } = articlesEndPoints;
  const [newsItem, setNewsItem] = useState(null);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    async function fetchNews() {
      try {
        setLoader(true);
        const response = await apiConnector("GET", GET_ARTICLE_BY_ID(slug));
        setNewsItem(response.data?.article);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally{
        setLoader(false);
      }
    }
    fetchNews();
  }, [slug]);
  return (
    <>
      {
        loader ? 
        <Loader/>
        : <div className="bg-gray-50 min-h-screen">
        {error && <p className="text-red-500 font-bold">{error}</p>}
        {newsItem && (
          <div className="w-full mt-4 lg:flex lg:gap-2">
            <div className="w-full border-2 rounded-md lg:w-4/3 shadow-md p-10">
              <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-10">
                {newsItem?.title}
              </h2>
              <div className="my-10 border-green-200 flex justify-center">
                <img src={newsItem?.images && newsItem?.images[0]} alt="NewsImage" />{" "}
                {/* I have to ask that only one image or array of image is given */}
              </div>
              <div className="flex items-center gap-4">
                <img
                  src={newsItem?.autherAvatar || "/images/author.jpg"}
                  // onError={()=>setAutherAvatar('/images/author.jpg')}
                  alt={"Author avatar"}
                  style={{ width: "100px", height: "100px", objectFit: "cover" }} // Adjust style as needed
                />
                <h3 className="underline decoration-red-500 font-bold text-lg">
                  -{newsItem.reporterId.name}
                </h3>
              </div>
              <p className="mt-3 text-lg">
                Last Updated At: {newsItem.updatedAt.toLocaleString()}
              </p>
              <div className="border-l-2 pl-2 mt-10 border-gray-400 text-xl">
                {
                  newsItem.content.includes('<') && newsItem.content.includes('>') ? <div dangerouslySetInnerHTML = {{__html: newsItem.content}}></div> : newsItem.content
                }
              </div>
            </div>
            <div className="w-1/4 mt-4">
              <p className="text-center w-full">Advertisement</p>
              <div className="advertismentContainer"></div>
            </div>
          </div>
        )}
      </div>
      }
    </>
  );
};

export default NewsDetails;
