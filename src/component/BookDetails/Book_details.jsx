import React, { useEffect, useState } from "react";
import "./Book_details.css";
import { MdDateRange } from "react-icons/md";
import { FaRegFilePdf } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { NavLink, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { FaRegComments } from "react-icons/fa6";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const URL = import.meta.env.VITE_URL;

const Book_details = () => {
  const id = useParams().id;
  const [bookdetails, setbookdetails] = useState(null);
  const [loading, setloading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [allComments, setallComments] = useState([]);

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  // Fetch book details
  useEffect(() => {
    setloading(true);
    fetch(`${URL}/get_id_book/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setbookdetails(data.data);
        }
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  }, [id]);

  // Fetch comments
  const fetchComments = () => {
    setloading(true);
    fetch(`${URL}/get_comment/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setallComments(data.data);
        }
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  // Submit comment
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    const newComment = {
      commentsName: fullname,
      commentsEmail: email,
      comments: comments,
    };

    fetch(`${URL}/add_comment/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    })
      .then((data) => data.json())
      .then((json) => {
        setFullname("");
        setEmail("");
        setComments("");
        Swal.fire({
          title: json.text,
          icon: json.mess,
          confirmButtonText: "Ok",
        });
        fetchComments();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="bookdel_contaner">
      <div className="bgimage">{/* <h3>Book Details</h3> */}</div>

      <div className="bookdel_maxwidth">
        {/* Loader */}
        {loading && (
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {!loading && bookdetails && (
          <>
            {/* Book Info */}
            <div className="bookdel_grid">
              <div className="bookdel_img">
                <img
                  src={bookdetails?.bookImage}
                  alt="Book Cover"
                  width={200}
                  height={300}
                />
              </div>

              <div className="bookdel_contant">
                <h2>{bookdetails?.bookTitle}</h2>
                <div>
                  <div>
                    <MdDateRange />
                    <span>{formatDate(bookdetails?.Date)}</span>
                  </div>
                  <div>
                    <FaRegFilePdf />
                    <span>{bookdetails?.bookPages?.length} pages</span>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <NavLink to={`/book-details/${id}/readbook/${id}`}>
                    <button className="btn2">Read Me</button>
                  </NavLink>
                  <NavLink to={`/book`}>
                    <button className="btn2">Back</button>
                  </NavLink>
                </div>

                <div className="mt-3">
                  <div className="d-flex gap-2">
                    <FacebookShareButton
                      url={window.location.href}
                      quote={`Check out this amazing book: ${bookdetails?.bookTitle}`}
                    >
                      <FacebookIcon size={40} round />
                    </FacebookShareButton>

                    <TwitterShareButton
                      url={window.location.href}
                      title={`Check out this amazing book: ${bookdetails?.bookTitle}`}
                    >
                      <TwitterIcon size={40} round />
                    </TwitterShareButton>

                    <WhatsappShareButton
                      url={window.location.href}
                      title={`Check out this amazing book: ${bookdetails?.bookTitle}`}
                    >
                      <WhatsappIcon size={40} round />
                    </WhatsappShareButton>

                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="book-summary-box">
              <h3>Short Summary</h3>
              <p>{bookdetails?.bookDescription}</p>
            </div>

            {/* Comment Form */}
            <div className="comment-section mt-4 bg-white p-4 rounded shadow-sm">
              <h3>Leave a Comment</h3>
              <form onSubmit={handleCommentSubmit} className="comment-form">
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Comments</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    required
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Write your comment here..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={submitting}
                >
                  {submitting ? (
                    <div
                      className="spinner-border spinner-border-sm text-light"
                      role="status"
                    />
                  ) : (
                    "Submit Comment"
                  )}
                </button>
              </form>
            </div>

            {/* Show Comments & Replies */}
            <div className="all-comments mt-4">
              <h3>All Comments</h3>
              {allComments.length > 0 ? (
                allComments.map((c, idx) => (
                  <div
                    key={idx}
                    className="comment-card bg-white p-3 rounded shadow-sm mb-3"
                  >
                    <FaRegComments
                      size={"30"}
                      style={{
                        backgroundColor: "#b4fbff",
                        color: "#008d94",
                        padding: "4px",
                        borderRadius: "50%",
                        marginBottom: "2px",
                      }}
                    />
                    {/* Main Comment */}
                    <div className="d-flex align-items-center">
                      <div className="ms-2">
                        <h5 className="fs-6 mb-1">
                          {c.commentsName}{" "}
                          <small
                            className="text-muted"
                            style={{
                              wordBreak: "break-word",
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            ({c.commentsEmail})
                          </small>
                        </h5>
                        <p
                          className="mb-1"
                          style={{
                            wordBreak: "break-word",
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {c.comments}
                        </p>

                        <small className="text-muted">
                          {c.createdAt ? formatDate(c.createdAt) : ""}
                        </small>
                      </div>
                    </div>

                    {/* Admin Reply */}
                    {c.replyComment &&
                      (Array.isArray(c.replyComment)
                        ? c.replyComment.length > 0
                        : true) && (
                        <div className="reply-box mt-3 ms-4 p-2 border-start border-2 border-primary">
                          <h6 className="text-success mb-2">
                            Author Gopal Das Reply:
                          </h6>
                          {Array.isArray(c.replyComment) ? (
                            c.replyComment.map((reply, rIndex) => (
                              <div
                                key={rIndex}
                                className="bg-light rounded p-2 mb-2 shadow-sm"
                              >
                                <p
                                  className="mb-1"
                                  style={{
                                    wordBreak: "break-word",
                                    whiteSpace: "pre-wrap",
                                  }}
                                >
                                  {reply}
                                </p>
                              </div>
                            ))
                          ) : (
                            <div className="bg-light rounded p-2 shadow-sm">
                              <p
                                className="mb-1"
                                style={{
                                  wordBreak: "break-word",
                                  whiteSpace: "pre-wrap",
                                }}
                              >
                                {c.replyComment}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                  </div>
                ))
              ) : (
                <p className="text-muted">No comments yet. Be the first one!</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Book_details;
