import React, { useEffect, useState } from 'react'

const Youtube = ({ ytVideos }) => {
    const [youtubeVideos, setYoutubeVideos] = useState(ytVideos);
    useEffect(() => {
        function handleYTVideosLength() {
            if (window.innerWidth <= 1024) {
                setYoutubeVideos(youtubeVideos.slice(0, 5));
            } else {
                setYoutubeVideos(youtubeVideos);
            }
        }
        window.addEventListener("resize", handleYTVideosLength);
        handleYTVideosLength()
        return () => {
            window.removeEventListener("resize", handleYTVideosLength);
        };
    }, [ytVideos]);
    return (
        <div className="flex flex-col gap-5">
            {youtubeVideos.length > 0 && youtubeVideos.map((item, index) => (
                <div key={index}>{item}</div>
            ))}
        </div>
    )
}

export default Youtube
