import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { FaTrash, FaReply } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

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
        "success"
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
                <th>Full Nmae</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Story Title</th>
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
                    <td>{e?.fullName}</td>
                    <td>{e?.email}</td>
                    <td>{e?.phone}</td>
                    <td
                      style={{
                        wordBreak: "break-word",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {e.storyTitle}
                    </td>
                    <td
                      style={{
                        wordBreak: "break-word",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {e.storyDescription}
                    </td>
                    <td className="d-flex gap-2">
                      <button
                        className={`btn btn-sm ${
                          e.isPublished ? "btn-success" : "btn-warning"
                        }`}
                        onClick={() =>
                          handleTogglePublish(e._id, e.isPublished)
                        }
                      >
                        {e.isPublished ? "Unpublish" : "Publish"}
                      </button>

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
