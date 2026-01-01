import React, { use, useEffect, useRef, useState } from "react";
import Dashboard_header from "../../Dashboard/Header/Dashboard_header";
import "./Dashboard.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_URL;

const Dashboard_imagegallery = () => {
  const navigate = useNavigate();
  const [galleryimage, setgalleryimage] = useState([]);
  const [previewFiles, setPreviewFiles] = useState([]);
  const [loading, setloading] = useState(false);
  const [deteteloading, setdeleteloading] = useState(false);

  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageposition,setimageposition]=useState("")

  const fileInputRef = useRef();

  const handleCheckboxChange = (id) => {
    setSelectedImages((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const deleteFile = (indexToRemove) => {
    const updated = previewFiles.filter((_, index) => index !== indexToRemove);
    setPreviewFiles(updated);
    const deleteimages = galleryimage.filter(
      (item, index) => index !== indexToRemove
    );
    setgalleryimage(deleteimages);

    if (updated.length === 0 && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const formdata = new FormData();
      formdata.append("imagePosition",imageposition)
      galleryimage.forEach((e) => {
        formdata.append("gallery_Image", e);
      });

      fetch(`${URL}/add_galleryimage`, {
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
            setPreviewFiles([]);
            setgalleryimage([]);
            fileInputRef.current.value = "";
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
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  const fetchdata = () => {
    setloading(true);
    fetch(`${URL}/get_galleryimage`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
       
        if (data.status === 200) {
          console.log(data)
          setImages(data.data);
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

  const handleDelete = () => {
    setdeleteloading(true);
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
        fetch(`${URL}/bulk_delete`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            ids: selectedImages,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status === 200) {
              setdeleteloading(false);
              setSelectedImages([]);
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
            setdeleteloading(false);
          });
      }else{
        setdeleteloading(false)
      }
    });
  };

  return (
    <>
      {/* <Dashboard_header /> */}
      <div className="dashbord_contaner">
        <div className="dashbord_maxwidth">
          <h4 className="text-success">Image Gallery</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Gallery Image <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                type="file"
                ref={fileInputRef}
                id="formFile"
                required
                multiple
               
                onChange={(e) => {
                  const selectedFiles = Array.from(e.target.files);

                  if (selectedFiles.length > 5) {
                    Swal.fire({
                      title: "You can only upload up to 5 images.",
                      icon: "warning",
                      confirmButtonText: "Ok",
                    });
                    fileInputRef.current.value = ""; // reset file input
                    return;
                  }

                  const validFiles = selectedFiles.filter(
                    (file) => file instanceof File
                  );
                  setgalleryimage(validFiles); // keep this updated

                  const previewFileData = [];

                  validFiles.forEach((file) => {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      previewFileData.push({
                        file,
                        previewUrl: event.target.result,
                      });
                      if (previewFileData.length === validFiles.length) {
                        setPreviewFiles(previewFileData);
                      }
                    };
                    reader.readAsDataURL(file);
                  });
                }}
                disabled={galleryimage.length > 5}
              />
            </div>
            {previewFiles.length > 0 && (
              <div className="mb-3">
                <label className="form-label">Preview Gallery Image</label>
                <div className="d-flex gap-2 flex-wrap">
                  {previewFiles.map((item, id) => (
                    <div className="position-relative" key={id}>
                      <img
                        src={item.previewUrl}
                        width={150}
                        height={100}
                        alt="preview"
                      />
                      <div
                        role="button"
                        className="position-absolute top-0 end-0 text-white bg-danger px-2 py-1 rounded-circle"
                        onClick={() => deleteFile(id)}
                      >
                        <RxCross2 />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
             <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Image Position <span className="text-danger">*</span>
              </label>
              <select
                className="form-select form-control"
                value={imageposition}
                onChange={(e) => setimageposition(e.target.value)}
              >
                <option defaultValue={""}>Open this select Image Position</option>
                 <option value={"Portrait Images"}>Portrait Images</option>
                  <option value={"Landscape Images"}>Landscape Images</option>
              </select>
            </div>

            {loading ? (
              <button className="btn btn-success" disabled>
                <div className="spinner-border text-light" role="status"></div>
              </button>
            ) : (
              <button type="submit" className="btn btn-success">
                Submit Image
              </button>
            )}
          </form>

          <div className="mt-3 ">
            {deteteloading ? (
              <button className="btn btn-success mb-3" disabled>
                <div className="spinner-border text-light" role="status"></div>
              </button>
            ) : selectedImages.length > 0 ? (
              <button
                className="btn btn-danger mb-3"
                onClick={handleDelete}
                hidden={selectedImages.length <= 0}
              >
                Delete Selected
              </button>
            ) : null}

            <div className="row">
              {loading ? (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "50vh", width: "100%" }}
                >
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : images.length > 0 ? (
                images.map((img) => (
                  <div
                    className="col-sm-6 col-md-6 col-lg-4 mb-4"
                    key={img._id}
                  >
                    <div className="shadow-lg border-0 gallery-card h-100 bg-light">
                      <div className="img-hover-zoom">
                        <img
                          src={img.galleryImage}
                          className="card-img-top rounded-top"
                          alt="gallery"
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                      </div>
                      <div className="card-body d-flex justify-content-between align-items-center">
                        <div className="form-check d-flex align-items-center">
                          <input
                            type="checkbox"
                            className="form-check-input me-2"
                            id={`checkbox-${img._id}`}
                            checked={selectedImages.includes(img._id)}
                            onChange={() => handleCheckboxChange(img._id)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`checkbox-${img._id}`}
                          >
                            Select
                          </label>
                        </div>
                        <div>
                          {img.imagePosition} 
                          </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center mt-5 w-100">
                  <h2 className="text-danger">Oops! 😞</h2>
                  <p className="fw-semibold">No image found in the gallery.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard_imagegallery;
