import { useState } from "react";
import VideoPlay from "./VideoPlayer";

function YTVwr() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <main>
      <input
        id="input_search"
        type="text"
        placeholder="Manual Video ID..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <></>
      {searchTerm && <VideoPlay user="@kathodosdotcom" vID={searchTerm} />}
    </main>
  );
}

export default YTVwr;
