import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const URL = import.meta.env.VITE_URL;

const Dashboard_videogallery = () => {
  const navigate = useNavigate();
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [videodata, setVideodata] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // Fetch all videos
  const fetchData = () => {
    setLoading(true);
    fetch(`${URL}/get_video`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setVideodata(data.data);
        } else if (data.text === "Invalid Token") {
          navigate("/login");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Load Twitter widgets script once
  useEffect(() => {
    if (videodata.length > 0) {
      if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load();
      } else {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, [videodata]);

  // Add new video
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    fetch(`${URL}/add_video`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ link }),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          title: data.text,
          icon: data.mess,
          confirmButtonText: "Ok",
        });
        if (data.status === 200) {
          setLink("");
          fetchData();
        }
        setSubmitting(false);
      })
      .catch((err) => {
        console.error(err);
        setSubmitting(false);
      });
  };

  // Delete video
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This video will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${URL}/delete_video/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            Swal.fire({
              title: data.text,
              icon: data.mess,
              confirmButtonText: "Ok",
            });
            if (data.status === 200) {
              fetchData();
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  };

  return (
    <div className="dashbord_contaner">
      <div className="dashbord_maxwidth">
        <h4 className="text-success">Video Gallery</h4>

        {/* Add Video Form */}
        <form onSubmit={handleSubmit} className="mb-4">
          <label className="form-label">
            Embed Video Code (Twitter){" "}
            <span className="text-danger">*</span>
          </label>
          <textarea
            className="form-control"
            required
            placeholder="Paste Embed Code Here"
            rows="3"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          ></textarea>

          <div className="mt-3">
            {submitting ? (
              <button className="btn btn-success" disabled>
                <div className="spinner-border text-light" role="status"></div>
              </button>
            ) : (
              <button type="submit" className="btn btn-success">
                Submit Link
              </button>
            )}
          </div>
        </form>

        {/* Video List */}
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "50vh", width: "100%" }}
          >
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : videodata.length > 0 ? (
          <div className="row mt-3">
            {videodata.map((e, index) => (
              <div
                key={index}
                className="col-sm-6 col-md-6 col-lg-6 mb-4 position-relative"
              >
                <div
                  className="video_wrapper"
                  dangerouslySetInnerHTML={{ __html: e.link }}
                 
                ></div>

                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 20,
                  }}
                >
                  <button
                    type="button"
                    className="btn btn-danger rounded-circle"
                    onClick={() => handleDelete(e._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-5 w-100">
            <h2 className="text-danger">Oops! 😞</h2>
            <p className="fw-semibold">No videos found in the gallery.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard_videogallery;
