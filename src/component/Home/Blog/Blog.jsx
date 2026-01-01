import React, { useEffect, useState } from "react";
import aboutimg from "../../../assets/writer.png";
import "./Blog.css";
import { GoDiscussionOutdated } from "react-icons/go";
import { NavLink } from "react-router-dom";
const URL = import.meta.env.VITE_URL;
const Blog = () => {
  const [blog, setblog] = useState([]);
  const [loading, setloading] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  useEffect(() => {
    setloading(true);
    fetch(`${URL}/get_all_blog`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setblog(data.data);
          setloading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  }, []);

  return (
    <>
      {blog.length > 0 ? (
        <div className="blog_contaner">
          <div className="blog_maxwidth">
            <h5>My Journey</h5>
            <h2>The Author’s Corner</h2>
            {loading ? (
              <>
                <div className="d-flex justify-content-center">
                  <div
                    className="spinner-border text-success"
                    role="status"
                  ></div>
                </div>
              </>
            ) : (
              <div className="blog_flex">
                {blog.slice(0, 3).map((e, i) => {
                  return (
                    <>
                      <NavLink to={`/blogs-details/${e._id}`} key={i}>
                        <div className="card">
                          <div>
                            <img src={e.blogImage} className="card_image" />
                          </div>
                          <h3>{e.blogTitle.slice(0, 20)}...</h3>
                          <div className="blog_date">
                            <GoDiscussionOutdated className="date_icon" />
                            <i>{formatDate(e.Date)}</i>
                          </div>
                          <p>
                            {e.blogDescription.slice(0, 150)}{" "}
                            <strong>Read More...</strong>
                          </p>
                        </div>
                      </NavLink>
                    </>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Blog;
