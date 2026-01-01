import React, { useEffect, useState } from "react";
import Dashboard_header from "../../Dashboard/Header/Dashboard_header";
import "./Dashboard.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_URL;

const Dashboard_category = () => {
  const navigate = useNavigate();
  const [categorytitle, setcategorytitle] = useState("");

  const [category, setcategory] = useState([]);
  const [id, setid] = useState("");
  const [toggal, settoggal] = useState(false);
  const [loading, setloading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setloading(true);

      if (toggal) {
       
        fetch(`${URL}/update_category/${id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ categoryTitle: categorytitle }),
        })
          .then((res) => res.json())
          .then((data) => {
         
            if (data.status == 200) {
              setloading(false);
              setcategorytitle("");
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
       
        fetch(`${URL}/add_category`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ categoryTitle: categorytitle }),
        })
          .then((res) => res.json())
          .then((data) => {
          
            if (data.status == 200) {
              setloading(false);
              setcategorytitle("");
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
    fetch(`${URL}/get_category`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
      
        if (data.status === 200) {
          setcategory(data.data);
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
    setcategorytitle(data.categoryTitle);
  };

  const handleBack = () => {
    settoggal(false);
    setid("");
    setcategorytitle("");
  };

  return (
    <>
      {/* <Dashboard_header /> */}
      <div className="dashbord_contaner">
        <div className="dashbord_maxwidth">
          <h4 className="text-success">Category</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Category Title <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                placeholder="Title"
                aria-label="default input example"
                required
                value={categorytitle}
                onChange={(e) => {
                  setcategorytitle(e.target.value);
                }}
              />
            </div>

            {loading ? (
              <button className="btn btn-success" disabled>
                <div className="spinner-border text-light" role="status"></div>
              </button>
            ) : toggal ? (
              <>
                <button type="submit" className="btn btn-success me-2">
                  Update Category
                </button>
                <button className="btn btn-success" onClick={handleBack}>
                  Back
                </button>
              </>
            ) : (
              <button type="submit" className="btn btn-success">
                Submit Category
              </button>
            )}
          </form>
          <div className="table-responsive">
            <table className="table table-bordered mt-2 border-success">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Category Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      <div className="d-flex justify-content-center align-items-center">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : category.length > 0 ? (
                  category.map((e, i) => (
                    <tr key={i}>
                      <th>{i + 1}</th>
                      <td>{e.categoryTitle}</td>

                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => handleEdit(e)}
                          title="Edit"
                        >
                          <FaEdit className="me-1" /> Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-danger">
                      <strong>Oops! 😞 No category data found.</strong>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard_category;
