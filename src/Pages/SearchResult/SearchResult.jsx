import React, { useEffect, useState } from 'react'
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';
import { Link, useLocation } from 'react-router-dom'
import { TextNewsCard } from '../../Components';
import { seachArticles } from '../../Services/Operations/article';
import Loader from '../../Components/Loader/Loader';

const SearchResult = () => {
    const location = useLocation();
    const {query : searchedQuery} = location?.state;  
    const [loading, setLoading] = useState(false);
    
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0)
    const limit = 10;
    const totalPages = Math.ceil(totalCount/limit);
    const [message, setMessage] = useState("");
    useEffect(()=>{
      (async()=>{
        setLoading(true);
        const {page:currentPage, articles, totalCount, message} = await seachArticles(searchedQuery, limit, page);
        setPage(currentPage);
        setData(articles);
        setTotalCount(totalCount)
        setLoading(false);
        setMessage(message);
        console.log(message);
        })()
    }, [page, searchedQuery])

    if(!data?.length > 0){
      return (
        <div className='h-[50vh] w-full flex justify-center items-center font-bold text-2xl'>{message}</div>
      )
    }

  return (
    <div>
      {
        loading ? <Loader/>
        :
        <>
          {data?.length > 0 && (
            <div>
              {/* Articles cards */}
              <ul className="md:grid md:grid-cols-2 lg:grid-cols-3 md:justify-between gap-10">
                {data.map((article, index) => (
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
          )}
        </>
      }
    </div>
  )
}

export default SearchResult
