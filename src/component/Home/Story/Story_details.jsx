import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Story_details.css";

const URL = import.meta.env.VITE_URL;

const Story_details = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStory = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${URL}/storyuser/${id}`);
      const data = await res.json();

      if (data.status === 200) {
        setStory(data.data);
      }
    } catch (error) {
      console.error("Story details error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStory();
  }, [id]);

  if (loading) {
    return (
      <div className="story-loader">
        <div className="spinner-border text-success" />
      </div>
    );
  }

  if (!story) {
    return (
      <p className="text-center text-danger mt-5">
        Story not found
      </p>
    );
  }

  return (
    <section className="story-details-section">
      <div className="container">
        <div className="story-details-card">
          {/* Header */}
          <div className="story-header">
            <div className="story-avatar">
              {story.fullName?.charAt(0)}
            </div>
            <div>
              <h3>{story.fullName}</h3>
              <p>{story.email}</p>
              {/* <span className="story-phone">{story.phone}</span> */}
            </div>
          </div>

          {/* Title */}
          <h4 className="story-title">
            {story.storyTitle}
          </h4>

          {/* Description */}
          <p className="story-description">
            {story.storyDescription}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Story_details;
