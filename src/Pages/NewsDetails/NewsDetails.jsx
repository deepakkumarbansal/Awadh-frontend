import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { articlesEndPoints } from "../../Services/apis";
import { apiConnector } from "../../Services/connector";
import Loader from "../../Components/Loader/Loader";
import NestedCommentsSection from "../../Components/NestedCommentsSection/NestedCommentsSection";

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
      } finally {
        setLoader(false);
      }
    }
    fetchNews();
  }, [slug]);

  const comments = [
    {
      id: 1,
      name: "Amit Sharma",
      avatar: "",
      time: "2 hours ago",
      comment: "HEllo jio!",
      replies: [
        {
          id: 11,
          name: "Amit Gupta",
          avatar: "",
          time: "1 hour ago",
          comment: "I agree...",
        },
      ],
    },
    {
      id: 2,
      name: "Deepak Bansal",
      avatar: "",
      time: "2 hours ago",
      comment: "Thanks. Hello Jio....",
      replies: [
        {
          id: 11,
          name: "Amritanshu",
          avatar: "",
          time: "1 hour ago",
          comment: "JIO JIO JIO",
          replies: [
            {
              id: 11,
              name: "Ayush",
              avatar: "",
              time: "1 hour ago",
              comment: "Good. the topic is good.",
            },
            {
              id: 11,
              name: "Amritanshu",
              avatar: "",
              time: "1 hour ago",
              comment: "I agree! ",
              replies: [
                {
                  id: 11,
                  name: "Amritanshu",
                  avatar: "",
                  time: "1 hour ago",
                  comment: "the topic is so good",
                },
                {
                  id: 11,
                  name: "Amritanshu",
                  avatar: "",
                  time: "1 hour ago",
                  comment: "The author did a great job on  the topic.",
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="bg-gray-100 min-h-screen p-4 lg:p-10">
          {error && <p className="text-red-500 font-bold">{error}</p>}
          {newsItem && (
            <div>
              <div className="w-full lg:flex lg:gap-6 lg:justify-between">
                <div className="w-full lg:w-3/4 bg-white rounded-md shadow-lg p-6">
                  <h1 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-6">
                    {newsItem?.title}
                  </h1>

                  {/* News Image */}
                  <div className="w-full rounded-lg overflow-hidden mb-6">
                    <img
                      src={newsItem?.images && newsItem?.images[0]}
                      alt="News"
                      className="w-full h-64 md:h-96 object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex items-center mb-6">
                    <img
                      src={newsItem?.autherAvatar || "/images/author.jpg"}
                      alt="Author"
                      className="w-16 h-16 md:w-24 md:h-24 rounded-full object-cover shadow-md"
                    />
                    <div className="ml-4">
                      <h3 className="text-xl md:text-2xl font-semibold text-gray-700">
                        {newsItem?.reporterId?.name}
                      </h3>
                      <p className="text-gray-500">
                        Last Updated:{" "}
                        {new Date(newsItem?.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="leading-8 text-lg text-gray-700 mt-6 space-y-4 border-l-4 border-indigo-500 pl-4">
                    {newsItem?.content.includes("<") &&
                    newsItem?.content.includes(">") ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: newsItem.content }}
                      ></div>
                    ) : (
                      newsItem?.content
                    )}
                  </div>
                </div>

                {/* Advertisement */}
                <div className="w-full lg:w-1/4 mt-8 lg:mt-0 bg-white p-4 lg:p-6 rounded-md shadow-lg">
                  <h3 className="text-center text-xl font-semibold mb-4 text-gray-600">
                    Advertisement
                  </h3>
                  <div className="bg-gray-200 h-64 rounded-md flex items-center justify-center text-gray-500">
                    <p className="text-lg">Ad Space</p>
                  </div>
                </div>
              </div>
              <div className="w-full bg-white rounded-md shadow-lg p-3 md:p-6 mt-6">
                <NestedCommentsSection articleId={slug}/>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default NewsDetails;
