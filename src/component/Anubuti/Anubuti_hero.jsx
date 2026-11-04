import "../Blog/Blog_hero/Blog_hero.css";
import img from "../../assets/writer.png";
import Anubuti_contant from "../Anubuti/Anubuti_contant";
import { useParams } from "react-router-dom";
import { FaRegComments } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
const URL = import.meta.env.VITE_URL;
const Anubuti_hero = () => {
  const id = useParams().id;

  const [anubuti, setanubuti] = useState([]);
  const [loading, setloading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState("");
  const [allComments, setallComments] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  useEffect(() => {
    setloading(true);
    fetch(`${URL}/get_id_anubuti/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setanubuti(data.data);
          setloading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  }, []);

  const fetchComments = () => {
    setloading(true);
    fetch(`${URL}/get_comment_anubuti/${id}`)
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

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    const newComment = {
      commentsName: fullname,
      commentsEmail: email,
      comments: comments,
    };

    fetch(`${URL}/add_comment_anubuti/${id}`, {
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
    <>
      <div className="Blog_hero_container py-4 py-md-5">
        {loading ? (
          <div className="container">
            <div className="row ">
              {/* Loading Skeleton for Text Content */}
              <div className="col-lg-6 order-2 order-lg-1 mt-4 mt-lg-0">
                <div className="pe-lg-4">
                  <div
                    className="skeleton-loader"
                    style={{
                      height: "50px",
                      width: "100%",
                      marginBottom: "20px",
                    }}
                  ></div>

                  <div className="d-flex align-items-center mt-4">
                    <div className="flex-shrink-0">
                      <div
                        className="skeleton-loader rounded-circle"
                        style={{ width: "50px", height: "50px" }}
                      ></div>
                    </div>
                    <div className="ms-3">
                      <div
                        className="skeleton-loader"
                        style={{
                          width: "150px",
                          height: "20px",
                          marginBottom: "5px",
                        }}
                      ></div>
                      <div
                        className="skeleton-loader"
                        style={{ width: "100px", height: "15px" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Loading Skeleton for Image */}
              <div className="col-lg-6 order-1 order-lg-2">
                <div
                  className="skeleton-loader"
                  style={{ height: "400px", borderRadius: "8px" }}
                ></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="container">
            <div className="row ">
              {/* Text Content */}
              <div className="col-lg-6 order-2 order-lg-1 mt-4 mt-lg-0">
                <div className="pe-lg-4">
                  <h1
                    className="display-5 fw-bold mb-3"
                    style={{ wordBreak: "break-word" }}
                  >
                    {anubuti?.anubutiTitle || "Anubuti Title"}
                  </h1>

                  <div className="d-flex align-items-center mt-4">
                    <div className="flex-shrink-0">
                      <img
                        src={img}
                        className="rounded-circle"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                        alt="Author"
                      />
                    </div>
                    <div className="ms-3">
                      <h5 className="mb-0">Gopal Krushna Das</h5>
                      <p className="text-muted mb-0 small">
                        {formatDate(anubuti?.Date)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="col-lg-6 order-1 order-lg-2">
                <div className="blog_img_wrapper">
                  <img
                    src={anubuti?.anubutiImage}
                    className="img-fluid rounded shadow"
                    alt="Anubuti Featured"
                    style={{
                      maxHeight: "400px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Anubuti_contant data={anubuti.anubutiDescription} />

      {/* Comment Form */}
      <div className="Blog_contant_contaner">
        <div className="Blog_contant_maxwidth">
          <div className="Blog_contant_contant">
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
      

          </div>
        </div>
      </div>
    </>
  );
};
export default Anubuti_hero;
