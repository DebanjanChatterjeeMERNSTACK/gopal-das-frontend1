import React, { useEffect, useState } from "react";
import Dashboard_header from "../../Dashboard/Header/Dashboard_header";
import "./Dashboard.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  Editor,
  EditorProvider,
  Toolbar,
  BtnBold,
  BtnItalic,
  BtnUnderline,
  BtnStrikeThrough,
  BtnNumberedList,
  BtnBulletList,
  BtnLink,
  BtnClearFormatting,
  BtnStyles,
  BtnRedo,
  BtnUndo,
} from "react-simple-wysiwyg";

const URL = import.meta.env.VITE_URL;

const Dashboard_anubuti = () => {
  const navigate = useNavigate();
  const [anubutiimage, setanubutiimage] = useState("");
  const [anubutititle, setanubutititle] = useState("");
  const [anubutidesceiption, setanubutidescription] = useState("");
  const [anubuti, setanubuti] = useState([]);
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
      formdata.append("anubuti_Image", anubutiimage);
      formdata.append("anubutiTitle", anubutititle);
      formdata.append("anubutiDescription", anubutidesceiption);
      if (toggal) {
        fetch(`${URL}/update_anubuti/${id}`, {
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
              setanubutiimage("");
              setanubutidescription("");
              setanubutititle("");
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
        fetch(`${URL}/add_anubuti`, {
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
              setanubutiimage("");
              setanubutidescription("");
              setanubutititle("");
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
    fetch(`${URL}/get_anubuti`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setanubuti(data.data);
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
    setpreview(data.anubutiImage);
    setanubutititle(data.anubutiTitle);
    setanubutidescription(data.anubutiDescription);
  };

  const handleBack = () => {
    settoggal(false);
    setid("");
    setpreview("");
    setanubutititle("");
    setanubutidescription("");
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
        fetch(`${URL}/delete_anubuti/${id}`, {
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
          <h4 className="text-success">Anubuti</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Anubuti Title <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                placeholder="Title"
                aria-label="default input example"
                required
                value={anubutititle}
                onChange={(e) => {
                  setanubutititle(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Anubuti Image <span className="text-danger">*</span>
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
                  setanubutiimage(file);
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
                  Preview Anubuti Image
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
                Anubuti Description <span className="text-danger">*</span>
              </label>
              <EditorProvider>
                <Editor
                  value={anubutidesceiption}
                  onChange={(e) => setanubutidescription(e.target.value)}
                >
                  <Toolbar>
                    {/* Text formatting */}
                    <BtnBold />
                    <BtnItalic />
                    <BtnUnderline />
                    <BtnStrikeThrough />

                    {/* Lists */}
                    <BtnNumberedList />
                    <BtnBulletList />

                    {/* Headings and styles */}
                    <BtnStyles />

                    {/* Links and images */}
                    <BtnLink />
                    
                    {/* History */}
                    <BtnUndo />
                    <BtnRedo />

                    {/* Clear formatting */}
                    <BtnClearFormatting />
                  </Toolbar>
                </Editor>
              </EditorProvider>
            </div>
            {loading ? (
              <button className="btn btn-success" disabled>
                <div className="spinner-border text-light" role="status"></div>
              </button>
            ) : toggal ? (
              <>
                <button type="submit" className="btn btn-success me-2">
                  Update Anubuti
                </button>
                <button className="btn btn-success" onClick={handleBack}>
                  Back
                </button>
              </>
            ) : (
              <button type="submit" className="btn btn-success">
                Submit Anubuti
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
            ) : anubuti.length > 0 ? (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {anubuti.map((e, i) => (
                  <div className="col" key={i}>
                    <div className="card h-100 border-success shadow-sm">
                      <div className="position-relative">
                        <img
                          src={e.anubutiImage}
                          className="card-img-top"
                          alt={e.anubutiTitle}
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                        <span className="position-absolute top-0 start-0 bg-success text-white px-2 py-1">
                          #{i + 1}
                        </span>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">
                          {" "}
                          {e.anubutiTitle.length > 20
                            ? `${e.anubutiTitle.substring(0, 20)}...`
                            : e.anubutiTitle}
                        </h5>
                        <p
                          className="card-text text-muted"
                          dangerouslySetInnerHTML={{
                            __html:
                              e.anubutiDescription.length > 100
                                ? e.anubutiDescription.substring(0, 100) + "..."
                                : e.anubutiDescription,
                          }}
                        />
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
                <p className="fw-semibold">No Anubuti found .</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard_anubuti;
