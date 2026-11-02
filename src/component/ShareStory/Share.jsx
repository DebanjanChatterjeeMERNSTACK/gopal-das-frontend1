import React, { useState } from "react";
import Swal from "sweetalert2";

const URL = import.meta.env.VITE_URL;

const Share = () => {
  const [fullName, setfullname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [age, setage] = useState(null);
  const [occupation, setoccupation] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [storyTitle, setstorytitle] = useState("");
  const [storylang, setstorylang] = useState("");
  const [storyfile, setstoryfile] = useState(null);
  const [storygenre, setstorygenre] = useState("");
  const [storyDescription, setstorydescription] = useState("");
  const [uploadfile, setuploadfile] = useState(true);
  const [loading, setloading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setloading(true);

      const formDatas = new FormData();
      formDatas.append("fullName", fullName);
      formDatas.append("phone", phone);
      formDatas.append("email", email);
      formDatas.append("occupation", occupation);
      formDatas.append("city", city);
      formDatas.append("state", state);
      formDatas.append("age", age);
      formDatas.append("storyTitle", storyTitle);
      formDatas.append("storyDescription", storyDescription);
      formDatas.append("storyGenre", storygenre);
      formDatas.append("storyLang", storylang);
      formDatas.append("storyLinkPdf", storyfile);

      fetch(`${URL}/story`, {
        method: "POST",
        body: formDatas,
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
            setage(null)
            setoccupation("")
            setstorygenre("")
            setstorylang("")
            setcity("")
            setstate("")
            setstoryfile(null)
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
            <div className="row g-3 mb-3">
              {/* Age  */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Age <span className="text-danger"></span>
                </label>

                <input
                  className="form-control"
                  type="number"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setage(e.target.value)}
                />
              </div>

              {/* occupation */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Occupation <span className="text-danger"></span>
                </label>

                <input
                  className="form-control"
                  type="text"
                  placeholder="Occupation"
                  value={occupation}
                  onChange={(e) => setoccupation(e.target.value)}
                />
              </div>
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
            <div className="row g-3 mb-3">
              {/* city  */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  City <span className="text-danger"></span>
                </label>

                <input
                  className="form-control"
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setcity(e.target.value)}
                />
              </div>

              {/* State */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  State <span className="text-danger"></span>
                </label>

                <input
                  className="form-control"
                  type="text"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setstate(e.target.value)}
                />
              </div>
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
            <div className="row g-3 mb-3">
              {/* Lang  */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Story Language <span className="text-danger">*</span>
                </label>

                <input
                  className="form-control"
                  type="text"
                  placeholder="Story Language"
                  required
                  value={storylang}
                  onChange={(e) => setstorylang(e.target.value)}
                />
              </div>

              {/* genra */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Story Genre <span className="text-danger"></span>
                </label>

                <input
                  className="form-control"
                  type="text"
                  placeholder="Story Genre"
                  value={storygenre}
                  onChange={(e) => setstorygenre(e.target.value)}
                />
              </div>
            </div>
            <div className="row g-3 mb-3 mt-3">
              <div className="col-md-6">
                <button
                  type="button"
                  className={`btn ${uploadfile ? "btn-info" : "btn-outline-info"} w-100`}
                  onClick={() => {setuploadfile(true)
                  setstoryfile(null)
                   }
                  }
                >
                  Write Your Story
                </button>
              </div>

              <div className="col-md-6">
                <button
                  type="button"
                  className={`btn ${!uploadfile ? "btn-success" : "btn-outline-success"} w-100`}
                  onClick={() => {setuploadfile(false)
                   setstorydescription("")
                   }
                   }
                >
                  Upload File (PDF)
                </button>
              </div>
            </div>
            {uploadfile ? (
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
            ) : (
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Story Description <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="file"
                  placeholder="Description"
                  required
                  accept="application/pdf"
                  id="formFile"
                  onChange={(e) => setstoryfile(e.target.files[0])}
                />
              </div>
            )}

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
