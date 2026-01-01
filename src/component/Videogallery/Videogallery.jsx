import { useEffect, useState } from "react";
import "./Videogallery.css";

const URL = import.meta.env.VITE_URL;

const Videogallery = () => {
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${URL}/get_all_video`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setVideo(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Load Twitter script once and re-parse when video changes
  useEffect(() => {
    if (video.length > 0) {
      if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load();
      } else {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, [video]);

  return (
    <div className="videogallery_container">
      <div className="bgimage">
        <h3>Video Gallery</h3>
      </div>

      <div className="videogallery_maxwidth">
        <div className="video_grid">
          {loading ? (
            <div className="loader-wrapper">
              <div className="spinner-border text-success" role="status" />
            </div>
          ) : video.length > 0 ? (
            video.map((e, index) => (
              <div className="video_size" key={index}>
                <div
                  className="video_wrapper"
                  dangerouslySetInnerHTML={{ __html: e.link }}
                />
              </div>
            ))
          ) : (
            <div className="text-center w-100 mt-5">
              <h2 className="text-danger">Oops! 😞</h2>
              <p className="fw-semibold">No video found in the gallery.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Videogallery;
