import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { articlesEndPoints } from "../../Services/apis";
import { apiConnector } from "../../Services/connector";
const { GET_ARTICLE_BY_ID } = articlesEndPoints;
const NewsDetails = () => {
  const { slug } = useParams();
  console.log(useParams(), "use details");
  
  const { GET_ARTICLE_BY_ID } = articlesEndPoints;
  const loaderRef = useRef(null);
  const [newsItem, setNewsItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNews() {
      loaderRef.current.continuousStart();
      try {
        const response = await apiConnector("GET", GET_ARTICLE_BY_ID(slug));
        console.log("news details", response.data?.article?.category);
        setNewsItem(response.data?.article);
        console.log(slug);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        loaderRef.current.complete();
      }
    }
    fetchNews();
  }, [slug]);
  return (
    <div className="bg-gray-50 min-h-screen">
      <LoadingBar color="#f11946" ref={loaderRef} />
      {error && <p className="text-red-500 font-bold">{error}</p>}
      {newsItem && (
        <div className="w-full mt-4 lg:flex lg:gap-2">
          <div className="w-full border-2 rounded-md lg:w-4/3 m-4 shadow-md p-10">
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-10">
              {newsItem?.title}
            </h2>
            <div className="my-10 border-green-200 flex justify-center">
              <img src={newsItem?.images[0]} alt="NewsImage" />{" "}
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
            <p className="border-l-2 pl-2 mt-10 border-gray-400 text-xl">
              {newsItem.content}
            </p>
          </div>
          <div className="w-1/4 mt-4">
            <p className="text-center w-full">Advertisement</p>
            <div className="advertismentContainer"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsDetails;
