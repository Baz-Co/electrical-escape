import React, { useState } from "react";

function VideoSearch({ data }) {
    const [searchTerm, setSearchTerm] = useState("");

    return (
    <div>
      {/* <h1>VideoSearch</h1> */}
      <input type="text" placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      {searchTerm}
      {data.slice(0, 5).map((item, index) => {
        return (
          <div key={`video-${index}`}>
            <span>{item.key}</span> - <span>{item.date_time}</span>
          </div>
        );
      })}
    </div>
  );
}

export default VideoSearch;
