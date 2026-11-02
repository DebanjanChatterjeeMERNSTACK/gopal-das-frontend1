
import React, { useEffect, useState } from "react";
import {
  FaBookOpen,
  FaCalendarAlt,
  FaCheck,
  FaClock,
  FaEnvelope,
  FaEye,
  FaFilePdf,
  FaMapMarkerAlt,
  FaPhone,
  FaSearch,
  FaTimes,
  FaTrash,
  FaUserCircle,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./Dashboard_story.css";

const URL = import.meta.env.VITE_URL;

const Dashboard_story = () => {
  const navigate = useNavigate();

  const [Story, setStory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch Story
  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${URL}/story`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      if (data.status === 200) {
        setStory(data.data);
      } else if (data.text === "Invalid Token") {
        navigate("/login");
      } else {
        Swal.fire("Error", data.text, "error");
      }
    } catch {
      Swal.fire(
        "Error",
        "Unable to load story submissions. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedStory) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelectedStory(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedStory]);

  // Delete Story
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`${URL}/story/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      if (data.status === 200) {
        Swal.fire("Deleted!", data.text, "success");
        setSelectedStory(null);
        fetchData();
      } else {
        Swal.fire("Error", data.text, "error");
      }
    } catch {
      Swal.fire(
        "Error",
        "Unable to delete the story. Please try again.",
        "error"
      );
    }
  };

  // Publish / Unpublish
  const handleTogglePublish = async (id, currentStatus) => {
    try {
      const res = await fetch(`${URL}/story/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isPublished: !currentStatus,
        }),
      });

      const data = await res.json();

      if (data.status === 200) {
        Swal.fire(
          "Success",
          `Story ${!currentStatus ? "Published" : "Unpublished"} successfully`,
          "success"
        );
        fetchData();
      } else {
        Swal.fire("Error", data.text, "error");
      }
    } catch {
      Swal.fire(
        "Error",
        "Unable to update the story. Please try again.",
        "error"
      );
    }
  };

  // Date Format
  const formatDate = (date) => {
    if (!date) return "N/A";

    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) return "N/A";

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const publishedCount = Story.filter((story) => story.isPublished).length;
  const pendingCount = Story.length - publishedCount;
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const visibleStories = Story.filter((story) => {
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "published" && story.isPublished) ||
      (statusFilter === "pending" && !story.isPublished);
    const searchableFields = [
      story.fullName,
      story.email,
      story.phone,
      story.storyTitle,
      story.storyDescription,
      story.storyGenre,
      story.storyLang,
      story.city,
      story.state,
    ];
    const matchesSearch =
      !normalizedSearch ||
      searchableFields.some((value) =>
        String(value || "").toLowerCase().includes(normalizedSearch)
      );

    return matchesStatus && matchesSearch;
  });

  return (
    <main className="story-dashboard">
      <div className="story-dashboard__inner">
      

       
        <section className="story-library">
          <div className="story-library__header">
            {/* <div>
              <span className="story-section-kicker">The collection</span>
              <h2>Submitted stories</h2>
              <p>Browse each story and the person behind it.</p>
            </div> */}
            {/* <div className="story-controls">
              <label className="story-search">
                <FaSearch aria-hidden="true" />
                <span className="story-sr-only">Search submissions</span>
                <input
                  type="search"
                  placeholder="Search stories or authors"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </label>
              <select
                className="story-filter"
                aria-label="Filter stories by publication status"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="all">All stories</option>
                <option value="published">Published</option>
                <option value="pending">Awaiting review</option>
              </select>
            </div> */}
          </div>

          {loading ? (
            <div className="story-state" role="status">
              <span className="story-loader" aria-hidden="true" />
              <strong>Gathering the stories...</strong>
              <span>Just a moment while the collection loads.</span>
            </div>
          ) : visibleStories.length > 0 ? (
            <div className="story-list">
              {visibleStories.map((story, index) => (
                <article className="story-card" key={story._id}>
                  <div className="story-card__topline">
                    <span className="story-card__number">
                      Submission {String(index + 1).padStart(2, "0")}
                    </span>
                    {/* <span
                      className={`story-status ${
                        story.isPublished
                          ? "story-status--published"
                          : "story-status--pending"
                      }`}
                    >
                      <span aria-hidden="true" />
                      {story.isPublished ? "Published" : "Awaiting review"}
                    </span> */}
                  </div>

                  <div className="story-card__body">
                    <div className="story-card__content">
                      <span className="story-field-label">Story title</span>
                      <h3>{story.storyTitle || "Untitled story"}</h3>
                      <div className="story-description-block">
                        <span className="story-field-label">
                          Story description
                        </span>
                        <p className="story-card__description">
                          {story.storyDescription?.trim() ||
                            "The author hasn’t added a description yet."}
                        </p>
                      </div>
                      <div className="story-tags">
                        <div className="story-tag">
                          <span className="story-field-label">Genre</span>
                          <span className="story-tag__value">
                            {story.storyGenre || "Not specified"}
                          </span>
                        </div>
                        <div className="story-tag">
                          <span className="story-field-label">Language</span>
                          <span className="story-tag__value">
                            {story.storyLang || "Not specified"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="story-author">
                      <span className="story-author__avatar" aria-hidden="true">
                        {story.fullName?.trim()?.charAt(0)?.toUpperCase() || (
                          <FaUserCircle />
                        )}
                      </span>
                      <div className="story-author__info">
                        <span className="story-author__label">Written by</span>
                        <strong>{story.fullName || "Unknown author"}</strong>
                        {story.email && (
                          <a href={`mailto:${story.email}`} title={story.email}>
                            <FaEnvelope aria-hidden="true" />
                            <span>{story.email}</span>
                          </a>
                        )}
                        {story.phone && (
                          <a href={`tel:${story.phone}`}>
                            <FaPhone aria-hidden="true" />
                            <span>{story.phone}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="story-card__footer">
                    <div className="story-meta">
                      <span>
                        <FaMapMarkerAlt aria-hidden="true" />
                        {[story.city, story.state].filter(Boolean).join(", ") ||
                          "Location not provided"}
                      </span>
                      <span>
                        <FaCalendarAlt aria-hidden="true" />
                        {formatDate(story.createdAt)}
                      </span>
                      {story.storyLinkPdf ? (
                        <a
                          className="story-pdf-link"
                          href={story.storyLinkPdf}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaFilePdf aria-hidden="true" /> Read PDF
                        </a>
                      ) : (
                        <span className="story-meta__muted">
                          <FaFilePdf aria-hidden="true" /> No PDF attached
                        </span>
                      )}
                    </div>
                    <div className="story-actions">
                      <button
                        type="button"
                        className="story-button story-button--quiet"
                        onClick={() => setSelectedStory(story)}
                      >
                        <FaEye aria-hidden="true" /> Details
                      </button>
                      {/* <button
                        type="button"
                        className={`story-button ${
                          story.isPublished
                            ? "story-button--unpublish"
                            : "story-button--publish"
                        }`}
                        onClick={() =>
                          handleTogglePublish(story._id, story.isPublished)
                        }
                      >
                        {story.isPublished ? "Unpublish" : "Publish"}
                      </button> */}
                      <button
                        type="button"
                        className="story-icon-button"
                        aria-label={`Delete ${story.storyTitle || "story"}`}
                        onClick={() => handleDelete(story._id)}
                      >
                        <FaTrash aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="story-state story-state--empty">
              <span className="story-state__icon">
                <FaBookOpen aria-hidden="true" />
              </span>
              <strong>
                {Story.length
                  ? "No stories match your search"
                  : "Your collection is waiting"}
              </strong>
              <span>
                {Story.length
                  ? "Try another search or choose a different status filter."
                  : "New submissions will appear here when authors share their work."}
              </span>
              {Story.length > 0 && (
                <button
                  type="button"
                  className="story-button story-button--quiet"
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                  }}
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </section>
      </div>

      {selectedStory && (
        <div
          className="story-modal-backdrop"
          onClick={() => setSelectedStory(null)}
        >
          <section
            className="story-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="story-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="story-modal__header">
              <div>
                <span className="story-section-kicker">Submission details</span>
                <h2 id="story-modal-title">
                  {selectedStory.storyTitle || "Untitled story"}
                </h2>
               
              </div>
              <button
                type="button"
                className="story-modal__close"
                aria-label="Close story details"
                onClick={() => setSelectedStory(null)}
              >
                <FaTimes aria-hidden="true" />
              </button>
            </header>

            <div className="story-modal__body">
              <section className="story-detail-section">
                <h3><FaBookOpen aria-hidden="true" /> About the story</h3>
                <p className="story-detail-description">
                  {selectedStory.storyDescription?.trim() ||
                    "No description provided."}
                </p>
                <div className="story-detail-grid">
                  <div>
                    <span>Genre</span>
                    <strong>{selectedStory.storyGenre || "Not specified"}</strong>
                  </div>
                  <div>
                    <span>Language</span>
                    <strong>{selectedStory.storyLang || "Not specified"}</strong>
                  </div>
                  <div>
                    <span>Submitted</span>
                    <strong>{formatDate(selectedStory.createdAt)}</strong>
                  </div>
                </div>
              </section>

              <section className="story-detail-section">
                <h3><FaUserCircle aria-hidden="true" /> About the author</h3>
                <div className="story-detail-grid">
                  <div>
                    <span>Full name</span>
                    <strong>{selectedStory.fullName || "Not provided"}</strong>
                  </div>
                  <div>
                    <span>Age</span>
                    <strong>{selectedStory.age ?? "Not provided"}</strong>
                  </div>
                  <div>
                    <span>Email</span>
                    <strong className="story-detail-grid__break">
                      {selectedStory.email || "Not provided"}
                    </strong>
                  </div>
                  <div>
                    <span>Phone</span>
                    <strong>{selectedStory.phone || "Not provided"}</strong>
                  </div>
                  <div>
                    <span>Occupation</span>
                    <strong>{selectedStory.occupation || "Not provided"}</strong>
                  </div>
                  <div>
                    <span>Location</span>
                    <strong>
                      {[selectedStory.city, selectedStory.state]
                        .filter(Boolean)
                        .join(", ") || "Not provided"}
                    </strong>
                  </div>
                </div>
              </section>

              <section className="story-detail-section story-detail-document">
                <div>
                  <h3><FaFilePdf aria-hidden="true" /> Story manuscript</h3>
                  <p>
                    {selectedStory.storyLinkPdf
                      ? "Open the author's submitted PDF."
                      : "No PDF was attached to this submission."}
                  </p>
                </div>
                {selectedStory.storyLinkPdf && (
                  <a
                    className="story-button story-button--publish"
                    href={selectedStory.storyLinkPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFilePdf aria-hidden="true" /> Open PDF
                  </a>
                )}
              </section>
            </div>

            <footer className="story-modal__footer">
              <button
                type="button"
                className="story-button story-button--quiet"
                onClick={() => setSelectedStory(null)}
              >
                Close details
              </button>
              <button
                type="button"
                className="story-button story-button--delete"
                onClick={() => handleDelete(selectedStory._id)}
              >
                <FaTrash aria-hidden="true" /> Delete story
              </button>
            </footer>
          </section>
        </div>
      )}
    </main>
  );
};

export default Dashboard_story;
