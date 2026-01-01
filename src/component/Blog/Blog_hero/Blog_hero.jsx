import "./Blog_hero.css";
import img from "../../../assets/writer.png";
import img1 from "../../../assets/writer.png";
import Blog_contant from "../Blog_contant/Blog_contant";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const URL = import.meta.env.VITE_URL;
const Blog_hero = () => {
  const id = useParams().id;

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
    fetch(`${URL}/get_id_blog/${id}`, {
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
                    {blog?.blogTitle || "Blog Title"}
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
                        {formatDate(blog?.Date)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="col-lg-6 order-1 order-lg-2">
                <div className="blog_img_wrapper">
                  <img
                    src={blog?.blogImage}
                    className="img-fluid rounded shadow"
                    alt="Blog Featured"
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
      <Blog_contant data={blog.blogDescription} />
    </>
  );
};
export default Blog_hero;
