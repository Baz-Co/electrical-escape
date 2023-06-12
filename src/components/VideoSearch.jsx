import { useState } from "react";
import "./VideoSearch.css";

function VideoSearch({ data }) {
    const [searchTerm, setSearchTerm] = useState("");
    return (
    <div>
      <input id="input_search" type="text" placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      {/* <button disabled={searchTerm == ""} onClick={() => console.log(searchTerm)}>Add To Queue</button> */}
      {/* {searchTerm && data.filter((item) => { if(item.key.toLowerCase().includes(searchTerm.toLowerCase())) return item }).map((item, index) => { */}
      {data.filter((item) => { if(item.key.toLowerCase().includes(searchTerm.toLowerCase())) return item }).map((item, index) => {
        return (
          <div key={`video-${index}`}>
            <a href={`/yt-vwr/videos/${item.key}`}><span>{item.key}</span> - <span>{item.date_time}</span></a>
          </div>
        );
      })}
    </div>
  );
}

export default VideoSearch;
