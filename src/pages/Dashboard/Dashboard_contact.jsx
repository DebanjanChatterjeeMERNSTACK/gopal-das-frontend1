import React, { useEffect, useState } from "react";

import "./Dashboard.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_URL;

const Dashboard_contact = () => {
  const navigate = useNavigate();
  const [contact, setcontact] = useState([]);
  const [loading, setloading] = useState(true);

  const fetchdata = () => {
    setloading(false);
    fetch(`${URL}/get_contact`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
      
        if (data.status === 200) {
          setcontact(data.data);
          setloading(true);
        } else if (data.text === "Invalid Token") {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        setloading(true);
      });
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const handleDelete = (id) => {
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
        fetch(`${URL}/delete_contact/${id}`, {
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
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <>
      {/* <Dashboard_header /> */}
      <div className="dashbord_contaner">
        <div className="dashbord_maxwidth">
          <h4 className="text-success">Contact</h4>
          <div className="table-responsive">
            <table className="table table-bordered mt-2 border-success">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Contact Full Name</th>
                  <th scope="col">Contact Email</th>
                  <th scope="col">Contact Phone Number</th>
                  <th scope="col">Contact Message</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {!loading ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      <div className="d-flex justify-content-center align-items-center">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : contact.length > 0 ? (
                  contact.map((e, i) => (
                    <tr key={i}>
                      <th>{i + 1}</th>
                      <td>{e.fullName}</td>
                      <td>{e.email}</td>
                      <td>{e.phoneNumber}</td>
                      <td>{e.message}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleDelete(e._id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-danger">
                      <strong>Oops! 😞 No contact data found.</strong>
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

export default Dashboard_contact;
