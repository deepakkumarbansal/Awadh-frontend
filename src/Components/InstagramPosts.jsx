import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const InstagramPosts = () => {
    const [posts, setPosts] = useState([]);
    const [nextUrl, setNextUrl] = useState();
    const [currentPost, setCurrentPost] = useState(0)

    const fetchPosts = async (url) => {
        try {
            const postsResponse = await axios(url);
            const posts = postsResponse?.data?.data; //all images, reels, carausel
            setPosts((prev)=>[...prev, ...posts]);
            setNextUrl(postsResponse?.data?.paging?.next || null);
            // setPrevUrl(postsResponse?.data?.paging?.previous || null);
        } catch (error) {
            console.log("error::instagram", error);
        }
    }
    useEffect(()=>{
        //url to fetch userId through the access_token
        // https://graph.instagram.com/me?fields=id,username&access_token=IGQWROWFJPY0llSzhRSjR0SDRNdV9xMVAzZAjR6RzQweVBadjdiU0RBRC1Hdl9XN1NwQnVBMS03MEFfdTNlLURWUDlZAN3dMV3AwczNJT2U5RU9xZAHhYWF9DWDk4cVhJcXZAfT2RXNjZAzUXFSWExvcjRqSGZAHVmdlbE0ZD
        const userId = '27096894979924306';
        const access_token = 'IGQWROWFJPY0llSzhRSjR0SDRNdV9xMVAzZAjR6RzQweVBadjdiU0RBRC1Hdl9XN1NwQnVBMS03MEFfdTNlLURWUDlZAN3dMV3AwczNJT2U5RU9xZAHhYWF9DWDk4cVhJcXZAfT2RXNjZAzUXFSWExvcjRqSGZAHVmdlbE0ZD';
        const url = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${access_token}`;
        fetchPosts(url);
    }, [])
    const nextPage = () => {
        fetchPosts(nextUrl);
    }

  return (
    <>
        {
            posts.length > 0 ? <div className='flex justify-center items-center border-2 border-red-100 h-[360px] w-1/2'>
            <button disabled={currentPost === 0} onClick={()=>setCurrentPost(currentPost-1)} className='border bg-gray-300 rounded-sm p-1'><FaAngleLeft /></button>
            <div className='h-full w-full'>
                <Link to={posts[currentPost]["permalink"]}>
                    {
                        (posts[currentPost]["media_type"] === "IMAGE" || "CAROUSEL_ALBUM") && <img src={posts[currentPost]["media_url"]} alt={posts[currentPost]["caption"]} className='h-full w-full object-cover'/>
                    }
                    {
                        (posts[currentPost]["media_type"] === "VIDEO") && <video src={posts[currentPost]["media_url"]} controls onMouseEnter={(e)=>e.target.play()} onMouseLeave={(e)=>e.target.pause()}></video>
                    }
                </Link>
            </div>
            <button disabled={currentPost === posts.length-1} onClick={()=>{
                if(nextUrl && posts.length-2 === currentPost){
                    nextPage();
                } else {
                    setCurrentPost(currentPost+1);
                }
            }}
            className='border bg-gray-300 rounded-sm p-1'
            ><FaAngleRight /></button>
        </div> : 'Loading'
        }
    </>
  )
}

export default InstagramPosts
