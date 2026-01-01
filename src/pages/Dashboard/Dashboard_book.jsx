import React, { useEffect, useState } from "react";
import Dashboard_header from "../../Dashboard/Header/Dashboard_header";
import "./Dashboard.css";
import { FaEdit, FaFilePdf, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_URL;
const FILE_URL = import.meta.env.VITE_FILE_URL;

const Dashboard_book = () => {
  const navigate = useNavigate();
  const [bookimage, setbookimage] = useState("");
  const [booktitle, setbooktitle] = useState("");
  const [bookpdf, setbookpdf] = useState("");
  const [bookdesceiption, setbookdescription] = useState("");
  const [category, setcategory] = useState("");
  const [book, setbook] = useState([]);
  const [categorydata,setcategorydata]=useState([])
  const [id, setid] = useState("");
  const [key, setkey] = useState(Date.now());
  const [preview, setpreview] = useState("");
  const [toggal, settoggal] = useState(false);
  const [loading, setloading] = useState(false);

  const fetchdata = () => {
    setloading(true);
    fetch(`${URL}/get_book`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
      
        if (data.status === 200) {
          setbook(data.data);
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

  const fetchcategory = () => {
    setloading(true);
    fetch(`${URL}/get_category`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
      
        if (data.status === 200) {
          setcategorydata(data.data);
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
    fetchcategory()
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const formdata = new FormData();
      formdata.append("book_image", bookimage);
      formdata.append("bookTitle", booktitle);
      formdata.append("book_pdf", bookpdf);
      formdata.append("bookDescription", bookdesceiption);
      formdata.append("categoryName", category);
      if (toggal) {
    
        fetch(`${FILE_URL}/update_book/${id}`, {
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
              Swal.fire({
                title: data.text,
                icon: data.mess, // 'success', 'error', 'warning', 'info', or 'question'
                confirmButtonText: "Ok",
              });
              setpreview("");
              setbookimage("");
              setbookdescription("");
              setcategory("");
              setbooktitle("");
              setbookpdf("");
              setkey(Date.now());
              settoggal(false);
              fetchdata();
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
       
        fetch(`${FILE_URL}/add_book`, {
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
              setbookimage("");
              setbookdescription("");
              setcategory("");
              setbooktitle("");
              setbookpdf("");
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (data) => {
    settoggal(true);
    setid(data._id);
    setpreview(data.bookImage);
    setbooktitle(data.bookTitle);
    setbookdescription(data.bookDescription);
    setcategory(data.categoryName);
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
        fetch(`${URL}/delete_book/${id}`, {
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
  const handleBack = () => {
    settoggal(false);
    setid("");
    setpreview("");
    setbookpdf("");
    setbooktitle("");
    setbookdescription("");
    setcategory("");
  };

  return (
    <div>
      {/* <Dashboard_header /> */}
      <div className="dashbord_contaner">
        <div className="dashbord_maxwidth">
          <h4 className="text-success">Book</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Book Image <span className="text-danger">*</span>
              </label>
              <input
                key={key}
                className="form-control"
                type="file"
                id="formFile"
                accept=".jpg, .jpeg"
                required={toggal === false}
                onChange={(e) => {
                  const file = e.target.files[0];
                  setbookimage(file);
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
                  Preview Book Image
                </label>
                <div>
                  <img src={preview} width={150} height={200} />
                </div>
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Book Title <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                placeholder="Title"
                aria-label="default input example"
                required
                value={booktitle}
                onChange={(e) => {
                  setbooktitle(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Book Category <span className="text-danger">*</span>
              </label>
              <select
                className="form-select form-control"
                value={category}
                onChange={(e) => setcategory(e.target.value)}
              >
                <option defaultValue={""}>Open this select category</option>
                
               {
                categorydata && categorydata.map((e)=>{
                  return <option value={e.categoryTitle}>{e.categoryTitle}</option>
                })
               }
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Book PDF <span className="text-danger">*</span>
              </label>
              <input
                key={key}
                className="form-control"
                type="file"
                id="formFile"
                required={toggal === false}
                accept=".pdf"
                onChange={(e) => setbookpdf(e.target.files[0])}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Book Summery <span className="text-danger">*</span>
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                placeholder="Short Summery"
                required
                value={bookdesceiption}
                onChange={(e) => {
                  setbookdescription(e.target.value);
                }}
                rows="3"
              ></textarea>
            </div>
            {loading ? (
              <button className="btn btn-success" disabled>
                <div className="spinner-border text-light" role="status"></div>
              </button>
            ) : toggal ? (
              <>
                <button type="submit" className="btn btn-success me-2">
                  Update Book
                </button>
                <button className="btn btn-success" onClick={handleBack}>
                  Back
                </button>
              </>
            ) : (
              <button type="submit" className="btn btn-success">
                Submit Book
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
            ) : book.length > 0 ? (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {book.map((e, i) => (
                  <div className="col" key={i}>
                    <div className="card h-100 border-success">
                      <div className="card-header bg-transparent border-success">
                        <h5 className="card-title text-center">
                          {e.bookTitle}-({e.categoryName})
                        </h5>
                      </div>
                      <div className="card-body text-center">
                        <img
                          src={e.bookImage}
                          className="card-img-top mb-3"
                          alt={e.bookTitle}
                          style={{
                            width: "150px",
                            height: "200px",
                            objectFit: "fit",
                          }}
                        />
                        <p className="card-text text-muted">
                          {e.bookDescription.length > 100
                            ? `${e.bookDescription.substring(0, 100)}...`
                            : e.bookDescription}
                        </p>
                      </div>
                      <div className="card-footer bg-transparent border-success d-flex justify-content-between align-items-center">
                        <a
                          href={e.bookPdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-success"
                        >
                          <FaFilePdf className="me-2" />
                          View PDF
                        </a>
                        <div>
                          <button
                            type="button"
                            className="btn btn-outline-primary me-2"
                            onClick={() => handleEdit(e)}
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => handleDelete(e._id)}
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center w-100 mt-5">
                <h2 className="text-danger">Oops! 😞</h2>
                <p className="fw-semibold">No book found .</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard_book;
