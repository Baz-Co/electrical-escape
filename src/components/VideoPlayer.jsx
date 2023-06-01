import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";

function VideoPlayer() {
  const queryParameters = new URLSearchParams(window.location.search);
  const url = queryParameters.get("url");

  return (
    <div>
      <Video
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
          src="https://www.youtube.com/embed/m80E1K75vDI"
          type="video/mp4"
        />
      </Video>
      <iframe
        width="600"
        height="591"
        src="https://www.youtube.com/embed/m80E1K75vDI"
        title="4 Hours of Music For Studying, Concentration And Work - Ambient Study Music to Concentrate"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
  );
}

export default VideoPlayer;
