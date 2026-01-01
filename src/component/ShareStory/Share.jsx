import React, { useState } from "react";

import Swal from "sweetalert2";

const URL = import.meta.env.VITE_URL;

const Share = () => {
  const [fullName, setfullname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [storyTitle, setstorytitle] = useState("");
  const [storyDescription, setstorydescription] = useState("");
  const [loading, setloading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const formdata = {
        fullName: fullName,
        phone: phone,
        email: email,
        storyTitle: storyTitle,
        storyDescription: storyDescription,
      };

      console.log(formdata)

      fetch(`${URL}/story`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == 200) {
            setloading(false);
            setstorydescription("");
            setstorytitle("");
            setfullname("");
            setphone("");
            setemail("");
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <Dashboard_header /> */}
      <div className="dashbord_contaner">
        <div className="dashbord_maxwidth">
          <h4 className="text-success">Story</h4>
          <form onSubmit={handleSubmit}>
             <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Full Name <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                placeholder="Full Name"
                aria-label="default input example"
                required
                value={fullName}
                onChange={(e) => {
                  setfullname(e.target.value);
                }}
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                 Phone Number <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                type="tel"
                placeholder="Phone Number"
                aria-label="default input example"
                required
                value={phone}
                onChange={(e) => {
                  setphone(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
               Email Id <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                type="email"
                placeholder="Email"
                aria-label="default input example"
                required
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
            </div>
           <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Story Title <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                placeholder="Title"
                aria-label="default input example"
                required
                value={storyTitle}
                onChange={(e) => {
                  setstorytitle(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Story Description <span className="text-danger">*</span>
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                placeholder="Description"
                rows="3"
                required
                value={storyDescription}
                onChange={(e) => setstorydescription(e.target.value)}
              ></textarea>
            </div>
            {loading ? (
              <button className="btn btn-success" disabled>
                <div className="spinner-border text-light" role="status"></div>
              </button>
            ) : (
              <button type="submit" className="btn btn-success">
                Submit Your Story
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Share;
