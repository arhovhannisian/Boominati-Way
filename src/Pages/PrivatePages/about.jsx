import React, {useEffect, useRef, useState} from 'react';

const About = () => {
    // const videoRef = useRef(null);
    const YoutubeRef = useRef(null);
    // const [isPlaying, setIsPlaying] = useState(false);
    const [currentVideo, setCurrentVideo] = useState('drnBMAEA3AM');
    const videos = [
        {
            title: 'arrrrrj',
           src: 'WtuEDKXvJho'
        },
        {
            title: 'vagr',
            src: 'drnBMAEA3AM'
        },
        {
            title: 'arj',
            src: '2NEdES5ewbM'
    }
    ]

    //
    // function togglePlay() {
    //     if (!isPlaying) {
    //         videoRef.current.play();
    //     } else {
    //         videoRef.current.pause();
    //
    //     }
    // }

    return (
        <div>
            <input type="text"
                   onChange={(e) => {
                       const found = videos.find(v => v.title.includes(e.target.value) );
                       if (found) {
                           setCurrentVideo(found.src);
                       }
                   }}
            />
            <iframe
                ref={YoutubeRef}
                width="656" height="369" src={`https://www.youtube.com/embed/${currentVideo}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen></iframe>

            <button
                onClick={() => {
                    YoutubeRef.current.src = `https://www.youtube.com/embed/${videos[0]}`
                }}
            >
                Change Video
            </button>


            {/*<input type="text"*/}
            {/*       onChange={(e) => {*/}
            {/*           videoRef.current.src = e.target.value;*/}
            {/*       }}*/}
            {/*/>*/}
            {/*<video*/}
            {/*    ref={videoRef}*/}
            {/*    width='500px'*/}
            {/*    height='300px'*/}

            {/*    src="../../../public/videos/1%20Minute%20Timer.mp4"*/}
            {/*    // src='http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_stereo_abl.mp4'*/}
            {/*>*/}

            {/*</video>*/}


            {/*<button*/}
            {/*    onClick={() => {*/}
            {/*        setIsPlaying(!isPlaying);*/}
            {/*        togglePlay()*/}
            {/*    }}*/}
            {/*>*/}
            {/*    {*/}
            {/*        isPlaying ? 'Pause' : 'Play'*/}
            {/*    }*/}
            {/*</button>*/}

            {/*<button*/}
            {/*    onClick={() => {*/}
            {/*        videoRef.current.src = 'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_stereo_abl.mp4'*/}
            {/*    }}*/}
            {/*>*/}
            {/*    Change Video*/}
            {/*</button>*/}
            {/*/!*<button*!/*/}
            {/*    onClick={()=>{*/}
            {/*        setIsPlaying(!isPlaying);*/}
            {/*        togglePlay()*/}
            {/*    }}*/}
            {/*>*/}
            {/*    {*/}
            {/*        isPlaying ? 'Pause' : 'Play'*/}
            {/*    }*/}
            {/*</button>*/}

            {/*<button*/}
            {/*    onClick={()=>{*/}
            {/*        videoRef.current.pause();*/}
            {/*    }}*/}
            {/*>*/}
            {/*    pause*/}
            {/*</button>*/}


        </div>
    );
};

export default About;