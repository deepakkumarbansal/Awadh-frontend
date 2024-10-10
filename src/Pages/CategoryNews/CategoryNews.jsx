import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  fetchNewsByCategoryAction,
  selectGeneralLoader,
  selectNewsByCategory,
} from "../../store/slice/newsSlice";
import { TextNewsCard } from "../../Components";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
import Loader from "../../Components/Loader/Loader";

const CategoryNews = () => {
  const { slug } = useParams();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch();
  const data = useSelector(selectNewsByCategory);
  const loading = useSelector(selectGeneralLoader);

  useEffect(() => {
    setTotalPages(Math.ceil(data?.totalCount / data?.limit));
  }, [data]);
  
  useEffect(() => {
    dispatch(fetchNewsByCategoryAction({slug, page, limit:12})); //12 is the limit
  }, [slug, page]);
  return (
    <div className="mt-12 pt-10 border-t-2">
      {loading ? 
      <Loader/>
      : (
        <>
          {data?.articles?.length > 0 ? (
            <div>
              {/* Articles cards */}
              <ul className="md:grid md:grid-cols-2 lg:grid-cols-3 md:justify-between gap-10">
                {data.articles.map((article, index) => (
                  <li
                    key={index}
                    className="rounded-lg  shadow-lg p-4 mt-10 md:mt-0"
                  >
                    <Link to={`/news/${article._id}`}>
                      <TextNewsCard
                        image={article?.images?.[0]}
                        content={article.content}
                        date={article.updatedAt}
                        heading={article.title}
                        author={article.reporterId.name}
                        className={""}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
              {/* Pagination */}
              <div className="mt-10 border-t-2 pt-5 flex justify-around">
                <button
                  disabled={page == 1}
                  className={`px-5 py-2 rounded font-bold ${page == 1 ? 'bg-gray-500 ' : 'bg-orange-500 hover:bg-orange-600'} shadow-md text-white cursor-pointer flex justify-center gap-3 items-center`}
                  onClick={() => {
                    setPage(page - 1);
                  }}
                >
                  <GrLinkPrevious />
                  <p>Previous</p>
                </button>
                <button
                  disabled={page == totalPages}
                  className={`px-5 py-2 rounded font-bold ${page == totalPages ? 'bg-gray-500 ' : 'bg-green-600 hover:bg-green-700'} shadow-md text-white cursor-pointer flex justify-center gap-3 items-center`}
                  onClick={() => {
                    setPage(page + 1);
                  }}
                >
                  <p>Next</p>
                  <GrLinkNext />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center w-full h-screen">
              No data found with {slug} category
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CategoryNews;
