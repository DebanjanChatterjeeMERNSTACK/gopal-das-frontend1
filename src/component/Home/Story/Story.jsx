import React, { useEffect, useState } from "react";
import "./Story.css";
import { NavLink } from "react-router-dom";

const URL = import.meta.env.VITE_URL;

const Story = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStories = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${URL}/storyuser`);
      const data = await res.json();

      if (data.status === 200) {
        setStories(data.data);
      }
    } catch (error) {
      console.error("Story fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <>
      {stories.length > 0 && (
        <section className="testimonial-section">
          <div className="container">
            <h2 className="section-title">What Story User Say</h2>
            <p className="section-subtitle">
              Real stories from our happy users
            </p>

            {loading ? (
              <div className="text-center">
                <div className="spinner-border text-success" />
              </div>
            ) : (
              <div className="testimonial-grid">
                {stories.map((item) => (
                  <NavLink
                    to={`/story-details/${item._id}`}
                    key={item._id}
                    className="text-decoration-none text-dark"
                  >
                    <div className="testimonial-card">
                      <div className="testimonial-header">
                        <div className="avatar">{item.fullName?.charAt(0)}</div>
                        <div>
                          <h5>{item.fullName}</h5>
                          <small>{item.email}</small>
                        </div>
                      </div>

                      <h6 className="story-title">{item.storyTitle}</h6>

                      <p className="story-desc">
                        “
                        {item.storyDescription
                          ?.split(" ")
                          .slice(0, 50)
                          .join(" ")}
                        ...”
                      </p>
                    </div>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Story;
