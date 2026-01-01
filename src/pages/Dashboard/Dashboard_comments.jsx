import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { FaTrash, FaReply } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_URL;

const Dashboard_comments = () => {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Reply Modal States
  const [showModal, setShowModal] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${URL}/get_all_comments`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.status === 200) {
        setComments(data.data);
      } else if (data.text === "Invalid Token") {
        navigate("/login");
      } else {
        Swal.fire("Error", data.text || "Failed to fetch comments", "error");
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
      const res = await fetch(`${URL}/delete_comment/${id}`, {
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
        Swal.fire("Error", data.text || "Failed to delete comment", "error");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // 🟢 Open Reply Modal
  const handleReplyOpen = (id, existingReply) => {
    setSelectedId(id);
    setReplyText(existingReply || "");
    setShowModal(true);
  };

  // 🔵 Save Reply
  const handleSaveReply = async () => {
    if (!replyText.trim()) {
      Swal.fire("Error", "Please enter a reply before saving.", "error");
      return;
    }

    try {
      const res = await fetch(`${URL}/add_reply/${selectedId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ replyComment: replyText }),
      });

      const data = await res.json();

      if (data.status === 200) {
        console.log(data);
        Swal.fire(data.mess, data.text, data.mess);
        setShowModal(false);
        setReplyText("");
        fetchData();
      } else {
        Swal.fire("Error", data.text, "error");
      }
    } catch (error) {
      console.error("Reply error:", error);
      Swal.fire("Error", "Something went wrong while adding reply.", "error");
    }
  };

  return (
    <div className="dashbord_contaner">
      <div className="dashbord_maxwidth">
        <h4 className="text-success mb-3">Comments</h4>

        <div className="table-responsive">
          <table className="table table-bordered border border-success align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>Book Name</th>
                <th>Book Image</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Comments</th>
                <th>Reply</th>
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
              ) : comments.length > 0 ? (
                comments.map((e, i) => (
                  <tr key={e._id}>
                    <td>{i + 1}</td>
                    <td>{e?.bookId?.bookTitle}</td>
                    <td>
                      <img
                        src={e?.bookId?.bookImage}
                        width={100}
                        height={150}
                      />
                    </td>
                    <td>{e.commentsName}</td>
                    <td>{e.commentsEmail}</td>
                    <td
                      style={{
                        wordBreak: "break-word",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {e.comments}
                    </td>
                    <td
                      style={{
                        wordBreak: "break-word",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {e.replyComment ? e.replyComment : "No reply yet"}
                    </td>
                    <td className="d-flex gap-2">
                      <button
                        type="button"
                        className="btn btn-success btn-sm"
                        onClick={() => handleReplyOpen(e._id, e.replyComment)}
                      >
                        <FaReply /> Reply
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
                    <strong>Oops! 😞 No comments found.</strong>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 🟣 Reply Modal */}
        {showModal && (
          <div className="custom-modal">
            <div className="custom-modal-content">
              <h5 className="mb-3 text-success">Add / Edit Reply</h5>
              <textarea
                className="form-control mb-3"
                rows="4"
                placeholder="Type your reply here..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <div className="d-flex justify-content-end gap-2">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-success" onClick={handleSaveReply}>
                  Save Reply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard_comments;
