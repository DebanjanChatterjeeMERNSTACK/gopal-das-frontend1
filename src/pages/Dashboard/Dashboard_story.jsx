import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { FaTrash, FaReply } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaFilePdf, FaBookOpen, FaExternalLinkAlt } from "react-icons/fa";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBirthdayCake,
  FaBriefcase,
  FaMapMarkerAlt,
} from "react-icons/fa";

const URL = import.meta.env.VITE_URL;

const Dashboard_story = () => {
  const navigate = useNavigate();
  const [Story, setStory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Reply Modal States
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${URL}/story`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.status === 200) {
        setStory(data.data);
        console.log(data.data);
      } else if (data.text === "Invalid Token") {
        navigate("/login");
      } else {
        Swal.fire("Error", data.text || "Failed to fetch Story", "error");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`${URL}/story/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.status === 200) {
        Swal.fire("Deleted!", data.text, "success");
        fetchData();
      } else {
        Swal.fire("Error", data.text || "Failed to delete Story", "error");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

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
          "success",
        );
        fetchData();
      } else {
        Swal.fire("Error", data.text, "error");
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <div className="dashbord_contaner">
      <div className="dashbord_maxwidth">
        <h4 className="text-success mb-3">Story</h4>

        <div className="table-responsive">
          <table className="table table-bordered border border-success align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>Writer Details</th>
                <th>Story Title</th>
                <th>Story Lang</th>
                <th>Story Genre</th>
                <th>Story Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : Story.length > 0 ? (
                Story.map((e, i) => (
                  <tr key={e._id}>
                    <td>{i + 1}</td>
                    <td style={{ minWidth: "250px" }}>
                      <div className="bg-light border rounded-3 p-3">
                        {/* Name */}
                        <div className="d-flex align-items-center gap-2 mb-3">
                          <div className="bg-primary text-white rounded-circle p-2">
                            <FaUser size={15} />
                          </div>

                          <div>
                            <div className="fw-bold text-dark">
                              {e?.fullName || "N/A"}
                            </div>
                            <small className="text-muted">Author</small>
                          </div>
                        </div>

                        <hr className="my-2" />

                        {/* Email */}
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <FaEnvelope className="text-primary" />
                          <span className="small text-break">
                            {e?.email || "N/A"}
                          </span>
                        </div>

                        {/* Phone */}
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <FaPhone className="text-success" />
                          <span className="small">{e?.phone || "N/A"}</span>
                        </div>

                        {/* Age */}
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <FaBirthdayCake className="text-warning" />
                          <span className="small">
                            {e?.age ? `${e.age} Years` : "N/A"}
                          </span>
                        </div>

                        {/* Occupation */}
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <FaBriefcase className="text-info" />
                          <span className="small">
                            {e?.occupation || "N/A"}
                          </span>
                        </div>

                        {/* Location */}
                        <div className="d-flex align-items-center gap-2">
                          <FaMapMarkerAlt className="text-danger" />
                          <span className="small">
                            {e?.city || "N/A"}, {e?.state || "N/A"}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td
                      style={{
                        wordBreak: "break-word",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {e.storyTitle}
                    </td>
                    <td>{e?.storyLang}</td>
                    <td>{e.storyGenre}</td>

                    <td style={{ minWidth: "220px" }}>
                      {e.storyDescription ? (
                        <p
                          style={{
                            whiteSpace: "pre-wrap",
                            overflowWrap: "anywhere",
                          }}
                        >
                          {e.storyDescription}
                        </p>
                      ) : e.storyLinkPdf ? (
                        <a
                          href={e.storyLinkPdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="d-inline-flex align-items-center gap-2 text-decoration-none border rounded-3 p-2 bg-danger-subtle text-danger"
                        >
                          <FaFilePdf size={22} />

                          <span className="fw-semibold small">View PDF</span>

                          <FaExternalLinkAlt size={12} />
                        </a>
                      ) : (
                        <span className="badge bg-secondary-subtle text-secondary rounded-pill p-2">
                          No Description / PDF
                        </span>
                      )}
                    </td>

                    <td className="d-flex gap-2">
                      {/* <button
                        className={`btn btn-sm ${
                          e.isPublished ? "btn-success" : "btn-warning"
                        }`}
                        onClick={() =>
                          handleTogglePublish(e._id, e.isPublished)
                        }
                      >
                        {e.isPublished ? "Unpublish" : "Publish"}
                      </button> */}

                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(e._id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-danger">
                    <strong>Oops! 😞 No Story found.</strong>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard_story;
