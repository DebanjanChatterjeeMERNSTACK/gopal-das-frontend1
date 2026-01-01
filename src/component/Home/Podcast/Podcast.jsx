import React from "react";

import "./Podcast.css";

const Podcast = () => {
  return (
    <>
      <div className="podcast_contaner">
        <div className="podcast_maxwidth">
          <h5>PODCAST</h5>
          <h2>The Author’s Journey</h2>
          <div className="podcat_video">
            <iframe
              
              src="https://www.youtube.com/embed/OVnIB_NbXOE?si=IarySFR0aA3K2J7s"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};
export default Podcast;
