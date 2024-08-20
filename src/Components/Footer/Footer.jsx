import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaTwitter } from "react-icons/fa";
import { Logo, TextNewsCard } from '../index';
import { MdEmail } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";

const Footer = ({ className = '' }) => {
    //Sample
    const hotCatagoryData = [
        { name: 'Robotics', slug: '/robotics' },
        { name: 'Games', slug: '/games' },
        { name: 'Gadgets', slug: '/gadgets' },
        { name: 'Travel', slug: '/travel' },
        { name: 'Health', slug: '/health' },
        { name: 'Architecture', slug: '/architecture' },
        { name: 'Food', slug: '/food' }
    ];
    const tweets = [
        { date: 'About 13 days ago', content: 'Please, Wait for the next version of our templates to update #Joomla 3.7', slug: 'https://t.co/LlEv8HgokN' },
        { date: 'About 15 days ago', content: '#WordPress 4.8 is here!', slug: 'https://t.co/uDjRH4Gya9' },
        { date: 'About 1 month ago', content: 'Please, Wait for the next version of our templates to update #Joomla 3.7', slug: 'https://t.co/LlEv8HgokN' }
    ];
    const postImages = [
        { img: 'https://via.placeholder.com/150?text=Image+1', slug: '/image1' },
        { img: 'https://via.placeholder.com/150?text=Image+2', slug: '/image2' },
        { img: 'https://via.placeholder.com/150?text=Image+3', slug: '/image3' },
        { img: 'https://via.placeholder.com/150?text=Image+4', slug: '/image4' },
        { img: 'https://via.placeholder.com/150?text=Image+5', slug: '/image5' },
        { img: 'https://via.placeholder.com/150?text=Image+6', slug: '/image6' },
        { img: 'https://via.placeholder.com/150?text=Image+7', slug: '/image7' },
        { img: 'https://via.placeholder.com/150?text=Image+8', slug: '/image8' },
        { img: 'https://via.placeholder.com/150?text=Image+9', slug: '/image9' }
    ];

    const tranding = [
        {
            image: 'https://via.placeholder.com/600x400?text=Article+1',
            heading: 'Exploring the Future of AI',
            date: 'August 14, 2024',
            slug: '/exploring-future-of-ai'
        },
        {
            image: 'https://via.placeholder.com/600x400?text=Article+2',
            heading: 'The Rise of Quantum Computing',
            date: 'August 13, 2024',
            slug: '/rise-of-quantum-computing'
        },
        {
            image: 'https://via.placeholder.com/600x400?text=Article+3',
            heading: 'Advancements in Renewable Energy',
            date: 'August 12, 2024',
            slug: '/advancements-renewable-energy'
        }
    ];

    const [hotCatagories, setHotCatagories] = useState(hotCatagoryData.slice(0, 7));
    const [latestTweetes, setLatestTweets] = useState(tweets.slice(0, 3));
    const [postGalaryImages, setPostGalaryImages] = useState(postImages.slice(0, 9)); // slice to avoid represent more than 9
    const [trandingPosts, setTrandingPosts] = useState(tranding.slice(0, 3));

    return (
        <div className={`min-h-[100vh] bg-gray-950 text-gray-50  ${className} py-4 mt-10`}>
            <div className='md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                <div className='mb-7 md:justify-self-center'>
                    <h2 className='text-lg'>TRENDING NOW</h2>
                    <div>
                        {
                            trandingPosts.map((post, index) => (
                                <TextNewsCard key={index} image={post.image} date={post.date} heading={post.heading} slug={post.slug} imageHeight={'90px'} imageWidth={'100px'} className='flex gap-3 mb-3 text-gray-300 text-sm' dateClasses={'text-gray-400 text-xs'} />
                            ))
                        }
                    </div>
                </div>
                <div className='mb-7 md:justify-self-center'>
                    <h2 className='text-lg'>HOT CATEGORIES</h2>
                    <ul>
                        {
                            hotCatagories.map((catagory, index) => (
                                <li key={index} className='text-sm mb-3'><Link to={catagory.slug}>{catagory.name}</Link></li>
                            ))
                        }
                    </ul>
                </div>
                <div className='mb-7 md:justify-self-center'>
                    <h2 className='text-lg'>LATEST TWEETS</h2>
                    <ul>
                        {latestTweetes.map((tweet, index) => (
                            <li key={index} className='flex mb-3 gap-4 text-sm'>
                                <span className='mt-[5.5px] text-gray-400'><FaTwitter /></span>
                                <div>
                                    <p className='text-xs text-gray-500'>{tweet.date}</p>
                                    <p className='text-gray-300'>{tweet.content}</p>
                                    <Link to={tweet.slug} className='text-red-500'>View Tweet</Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='md:justify-self-center'>
                    <h2 className='text-lg'>POST GALLERY</h2>
                    <ul className='w-[307px] h-[304px] grid grid-cols-3 gap-[2px]'>
                        {
                            postGalaryImages.map((image, index) => (
                                <li key={index}>
                                    <Link to={image.slug}><img src={image.img} alt="postImage" className='w-[100px] h-[100px]' /></Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div className='bg-gray-400 h-[2px] mx:2 md:mx-10'></div>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus modi repellat illum fuga quas. Ipsam dignissimos, a aliquam nobis non quasi distinctio corporis, quis beatae dolorum laboriosam totam architecto qui sequi eius doloremque. Aliquid nam iste voluptate praesentium. Quis similique, eveniet minima ut minus earum eligendi fugit placeat fugiat repudiandae vero impedit culpa porro eaque libero qui sapiente maxime eum praesentium. Ullam hic obcaecati repudiandae esse tenetur iste reiciendis velit! Cupiditate dolorum recusandae soluta voluptas eum deserunt eligendi praesentium dicta, rerum nesciunt labore fugit temporibus provident? Delectus asperiores cum atque eveniet perspiciatis impedit, at corrupti maxime dolorem vitae eaque reiciendis.</div>
            <div className='bg-gray-400 h-[2px] my-1 mx:2 md:mx-10'></div>
            <Logo className='flex justify-center mt-4' image='/images/LogoWithNoBg.png'/>
            <p>News247 Worldwide is a popular online newsportal and going source for technical and digital content for its influential audience around the globe. You can reach us via email or phone.</p>
            <div className='flex gap-10 justify-center relative'>
                <p className='flex items-center gap-2'><MdLocalPhone /><span>99999999999</span></p>
                <p className='flex items-center gap-2'><MdEmail /><span>sample@gmail.com</span></p>
            </div>
        </div>
    )
}

export default Footer
