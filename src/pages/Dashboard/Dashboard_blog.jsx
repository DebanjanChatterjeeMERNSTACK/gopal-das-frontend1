import React, { useEffect, useState } from "react";
import Dashboard_header from "../../Dashboard/Header/Dashboard_header";
import "./Dashboard.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_URL;

const Dashboard_blog = () => {
  const navigate = useNavigate();
  const [blogimage, setblogimage] = useState("");
  const [blogtitle, setblogtitle] = useState("");
  const [blogdesceiption, setblogdescription] = useState("");
  const [blog, setblog] = useState([]);
  const [id, setid] = useState("");
  const [key, setkey] = useState(Date.now());
  const [preview, setpreview] = useState("");
  const [toggal, settoggal] = useState(false);
  const [loading, setloading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const formdata = new FormData();
      formdata.append("blog_Image", blogimage);
      formdata.append("blogTitle", blogtitle);
      formdata.append("blogDescription", blogdesceiption);
      if (toggal) {
      
        fetch(`${URL}/update_blog/${id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            // "Content-Type": "multipart/form-data",
          },
          body: formdata,
        })
          .then((res) => res.json())
          .then((data) => {
           
            if (data.status == 200) {
              setloading(false);
              setpreview("");
              setblogimage("");
              setblogdescription("");
              setblogtitle("");
              setkey(Date.now());
              settoggal(false);
              fetchdata();
              Swal.fire({
                title: data.text,
                icon: data.mess, // 'success', 'error', 'warning', 'info', or 'question'
                confirmButtonText: "Ok",
              });
            } else {
              Swal.fire({
                title: data.text,
                icon: data.mess, // 'success', 'error', 'warning', 'info', or 'question'
                confirmButtonText: "Ok",
              });
              setloading(false);
            }
          });
      } else {
       
        fetch(`${URL}/add_blog`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            // "Content-Type": "multipart/form-data",
          },
          body: formdata,
        })
          .then((res) => res.json())
          .then((data) => {
         
            if (data.status == 200) {
              setloading(false);
              setpreview("");
              setblogimage("");
              setblogdescription("");
              setblogtitle("");
              setkey(Date.now());
              fetchdata();
              Swal.fire({
                title: data.text,
                icon: data.mess, // 'success', 'error', 'warning', 'info', or 'question'
                confirmButtonText: "Ok",
              });
            } else {
              Swal.fire({
                title: data.text,
                icon: data.mess, // 'success', 'error', 'warning', 'info', or 'question'
                confirmButtonText: "Ok",
              });
              setloading(false);
            }
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchdata = () => {
    setloading(true);
    fetch(`${URL}/get_blog`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
       
        if (data.status === 200) {
          setblog(data.data);
          setloading(false);
        } else if (data.text === "Invalid Token") {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const handleEdit = (data) => {
   
    settoggal(true);
    setid(data._id);
    setpreview(data.blogImage);
    setblogtitle(data.blogTitle);
    setblogdescription(data.blogDescription);
  };

  const handleBack = () => {
    settoggal(false);
    setid("");
    setpreview("");
    setblogtitle("");
    setblogdescription("");
  };

  const handleDelete = (id) => {
    setloading(true);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${URL}/delete_blog/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status === 200) {
              Swal.fire({
                title: data.text,
                icon: data.mess, // 'success', 'error', 'warning', 'info', or 'question'
                confirmButtonText: "Ok",
              });
              fetchdata();
              setloading(false);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setloading(false);
      }
    });
  };

  return (
    <>
      {/* <Dashboard_header /> */}
      <div className="dashbord_contaner">
        <div className="dashbord_maxwidth">
          <h4 className="text-success">Journey</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Journey Title <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                placeholder="Title"
                aria-label="default input example"
                required
                value={blogtitle}
                onChange={(e) => {
                  setblogtitle(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Journey Image <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                key={key}
                type="file"
                id="formFile"
                accept=".jpg, .jpeg"
                required={toggal === false}
                onChange={(e) => {
                  const file = e.target.files[0];
                  setblogimage(file);
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    setpreview(event.target.result); // set preview image URL
                  };
                  reader.readAsDataURL(file); // read file
                }}
              />
            </div>
            {preview && (
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Preview Journey Image
                </label>
                <div>
                  <img src={preview} width={200} height={100} />
                </div>
              </div>
            )}
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Journey Description <span className="text-danger">*</span>
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                placeholder="Description"
                rows="3"
                required
                value={blogdesceiption}
                onChange={(e) => setblogdescription(e.target.value)}
              ></textarea>
            </div>
            {loading ? (
              <button className="btn btn-success" disabled>
                <div className="spinner-border text-light" role="status"></div>
              </button>
            ) : toggal ? (
              <>
                <button type="submit" className="btn btn-success me-2">
                  Update Journey
                </button>
                <button className="btn btn-success" onClick={handleBack}>
                  Back
                </button>
              </>
            ) : (
              <button type="submit" className="btn btn-success">
                Submit Journey
              </button>
            )}
          </form>
          <div className="container mt-5">
            {loading ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "200px" }}
              >
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : blog.length > 0 ? (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {blog.map((e, i) => (
                  <div className="col" key={i}>
                    <div className="card h-100 border-success shadow-sm">
                      <div className="position-relative">
                        <img
                          src={e.blogImage}
                          className="card-img-top"
                          alt={e.blogTitle}
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                        <span className="position-absolute top-0 start-0 bg-success text-white px-2 py-1">
                          #{i + 1}
                        </span>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title"> {e.blogTitle.length > 20
                            ? `${e.blogTitle.substring(0, 20)}...`
                            : e.blogTitle}</h5>
                        <p className="card-text text-muted">
                          {e.blogDescription.length > 100
                            ? `${e.blogDescription.substring(0, 100)}...`
                            : e.blogDescription}
                        </p>
                      </div>
                      <div className="card-footer bg-transparent d-flex justify-content-between">
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => handleEdit(e)}
                          title="Edit"
                        >
                          <FaEdit className="me-1" /> Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => handleDelete(e._id)}
                          title="Delete"
                        >
                          <FaTrash className="me-1" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center w-100 mt-5">
                <h2 className="text-danger">Oops! 😞</h2>
                <p className="fw-semibold">No Journey found .</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard_blog;
