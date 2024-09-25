import React, { useEffect, useState } from "react";
import axios from "axios";
const Youtube = ({ videoIds = [] }) => {

  useEffect(()=>{
    fetch('http://localhost:8400/api/X/tweets').then((data)=>data.json()).then((data)=>{console.log(data);
    })
  },[])

  const [youtubeVideos, setYoutubeVideos] = useState([]);
  useEffect(() => {
    function handleYTVideosLength() {
      if (window.innerWidth <= 1024) {
        setYoutubeVideos(videoIds.slice(0, 6));
      } else {
        setYoutubeVideos(videoIds);
      }
    }
    window.addEventListener("resize", handleYTVideosLength);
    handleYTVideosLength();
    return () => {
      window.removeEventListener("resize", handleYTVideosLength);
    };
  }, [videoIds]);

  return (
    <div className="flex sm:flex-col md:flex-row lg:flex-col gap-5 flex-wrap justify-center items-center">
      {youtubeVideos.length > 0 &&
        youtubeVideos.map((videoId, index) => (
          <Video key={index} videoId={videoId} />
        ))}
    </div>
  );
};

export default Youtube;

const Video = ({ videoId }) => {
  const [hovered, setIsHovered] = useState(0);
  const mouseEnter = () => setIsHovered(1);
  const mouseOut = () => setIsHovered(0);

  return (
    <iframe
      onMouseEnter={mouseEnter}
      onMouseOut={mouseOut}
      max-width="460"
      height="215"
      src={`https://www.youtube.com/embed/${videoId}?autoplay=${
        hovered ? 1 : 0
      }&controls=0&loop=1`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  );
};
