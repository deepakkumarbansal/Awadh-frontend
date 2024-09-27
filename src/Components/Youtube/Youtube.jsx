import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { envConfig } from "../../config/envConfig";

const Youtube = () => {
  const [loading, setLoading] = useState(false);
  const [videoIds, setVideoIds] = useState([]);
  const fetchVideos = async () => {
    setLoading(true);
    const YOUTUBE_API_KEY = envConfig.youtubeApiKey;
    const channelID = envConfig.channelId;
    const url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${channelID}&part=snippet,id&order=date&maxResults=10`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("failed to fetch youtube videos");
      }

      const data = await response.json();
      const information = data?.items;
      const videoIds = information?.map((item) => item.id.videoId);
      setVideoIds(videoIds);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchVideos();
  }, []);
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
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex sm:flex-col md:flex-row lg:flex-col gap-5 flex-wrap justify-center items-center">
          {youtubeVideos.length > 0 &&
            youtubeVideos.map((videoId, index) => (
              <Video key={index} videoId={videoId} />
            ))}
        </div>
      )}
    </>
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
