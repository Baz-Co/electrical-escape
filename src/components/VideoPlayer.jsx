import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";

export default function PlayVideo({ user="@kathodosdotcom", vID = `0ZvtTRtnRAU` }) {
    const vidUrl = `http://shitopia.ddns.net:4321/${user}/${vID}/${vID}.mp4`;
    return (
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
        <source src={vidUrl} type="video/mp4" />
      </Video>
    );
  }
