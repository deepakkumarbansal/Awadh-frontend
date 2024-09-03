import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar';
import { apiConnector } from '../../Services/connector';
import {articlesEndPoints} from '../../Services/apis'
const NewsDetails = () => {
    const { slug } = useParams();
    const {GET_ARTICLE_BY_ID} = articlesEndPoints;
    const loaderRef = useRef(null);
    const [newsItem, setNewsItem] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchNews() {
            loaderRef.current.continuousStart();
            try {
                console.log(slug);
                
                const response = await apiConnector('GET', GET_ARTICLE_BY_ID)
                console.log(response);
                
                if (!response.ok) throw new Error('News item not found');
                const data = await response.json();
                setNewsItem(data);
            } catch (error) {
                setError(error.message);
            } finally {
                loaderRef.current.complete();
            }
        }
        fetchNews();
    }, [slug])
    return (
        <div className='bg-gray-300 min-h-screen'>
            <LoadingBar color='#f11946' ref={loaderRef} />
            {error && <p className='text-red-500 font-bold'>{error}</p>}
            {newsItem &&
                <div className='m-2 lg:flex lg:gap-2'>
                    <div className='rounded-md lg:w-[75%]'>
                        <h1>{newsItem.title}</h1>
                        <div>
                            <img src={newsItem.image} alt="NewsImage" /> {/* I have to ask that only one image or array of image is given */}
                        </div>
                        <div>
                            <img src={newsItem.authorAvatar} onError={(e) => { e.target.src = '/images/author.jpg'; }} alt="AuthorImage" /> {/* I am giving default image if error */}
                            <h3>{newsItem.authorName}</h3>
                        </div>
                        <p>{newsItem.date}</p>
                        <p>{newsItem.content}</p>
                    </div>
                    <div>
                        <p>Advertisement</p>
                        <div className='advertismentContainer'>

                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default NewsDetails
