import { useState, useEffect } from "react";
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";

function VideoPlayer() {
  const [vidUrl, setvidUrl] = useState("0ZvtTRtnRAU");
    let src = `http://shitopia.ddns.net:4321/@kathodosdotcom/${vidUrl}/${vidUrl}.mp4`
//   const queryParameters = new URLSearchParams(window.location.search);
//   const url = queryParameters.get("url");
useEffect(() => {
    // src = `http://shitopia.ddns.net:4321/@kathodosdotcom/${vidUrl}/${vidUrl}.mp4`
    console.log(src)
}, [vidUrl]);

    function PlayVideo({ vidUrl }) {
        return (<Video
            autoPlay
            loop
            muted
            controls={["PlayPause", "Seek", "Time", "Volume", "Fullscreen"]}
            poster="https://www.youtube.com/embed/m80E1K75vDI"
            onCanPlayThrough={() => {
              // Do stuff
            }}
          >
            <source
              src={vidUrl}
              type="video/mp4"
            />
          </Video>)
    }

  return (
    <div>
      <input value={vidUrl} onChange={(e) => setvidUrl(e.target.value)} />
      {/* <button onClick={() => playVideo()}>submit</button> */}
      <p>{vidUrl}</p>
      {/* {playVideo()} */}
      <PlayVideo vidUrl={src} />
      {/* <Video
        autoPlay
        loop
        muted
        controls={["PlayPause", "Seek", "Time", "Volume", "Fullscreen"]}
        poster="https://www.youtube.com/embed/m80E1K75vDI"
        onCanPlayThrough={() => {
          // Do stuff
        }}
      >
        <source
          src={src}
          type="video/mp4"
        />
      </Video> */}
      {/* <iframe
        width="1904"
        height="806"
        src="https://www.youtube.com/embed/XhWiONJvsHQ"
        title="Music For Studying, Concentration And Work - Ambient Study Music to Concentrate"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe> */}
    </div>
  );
}

export default VideoPlayer;
