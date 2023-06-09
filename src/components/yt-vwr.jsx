import { DefaultPlayer as Video } from "react-html5video";
import VideoSearch from "./VideoSearch";

import KathosVID from "../data/kathodosdotcom.json"

import "react-html5video/dist/styles.css";

function PlayVideo({ vID = `0ZvtTRtnRAU` }) {
  const vidUrl = `http://shitopia.ddns.net:4321/@kathodosdotcom/${vID}/${vID}.mp4`;
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

function YTVwr() {
  return (
    <main>
      <VideoSearch data={KathosVID} />
      <PlayVideo />
    </main>
  );
}

export default YTVwr;
