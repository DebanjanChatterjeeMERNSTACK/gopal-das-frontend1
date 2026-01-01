import React, { useState } from "react";
import "./Contact.css";
import { FaPhoneAlt } from "react-icons/fa";
import { SiMinutemailer } from "react-icons/si";
import { IoHome } from "react-icons/io5";
import Swal from "sweetalert2";

const URL = import.meta.env.VITE_URL;
const Contact = () => {
  const [loading, setloading] = useState(false);

  const [formdata, setformdata] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    message: "",
  });

  const handleChange = (name, value) => {
    setformdata((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      setloading(true);
      fetch(`${URL}/add_contact`, {
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
            Swal.fire({
              title: data.text,
              icon: data.mess, // 'success', 'error', 'warning', 'info', or 'question'
              confirmButtonText: "Ok",
            });
            setformdata({
              fullName: "",
              phoneNumber: "",
              email: "",
              message: "",
            });
          } else {
            Swal.fire({
              title: data.text,
              icon: data.mess, // 'success', 'error', 'warning', 'info', or 'question'
              confirmButtonText: "Ok",
            });
            setloading(false);
             setformdata({
              fullName: "",
              phoneNumber: "",
              email: "",
              message: "",
            });
          }
        });
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  return (
    <>
      <div className="contact_contaner">
        <div className="bgimage">
          <h3>Contact Me</h3>
        </div>
        <div className="contact_maxwidth">
          <div className="contact-info">
            <h4>» STAY CONNECTED</h4>
            <h2>Let’s Work Together!</h2>

            <div className="contact-item">
              <div className="icon-circle">
                <FaPhoneAlt />
              </div>
              <div>
                <p className="label">Phone</p>
                <p>+91 8117002658</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="icon-circle">
                <SiMinutemailer />
              </div>
              <div>
                <p className="label">Email</p>
                <p>gkdasmca@gmail.com</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="icon-circle">
                <IoHome />
              </div>
              <div>
                <p className="label">Address</p>
                <p>
                 1/201, Mason Height, Nandanvihar, 
                  <br />
                  Patia, Bhubaneswar, Odisha 
                </p>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formdata.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={formdata.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
              <div className="input-group">
                <input
                  type="tel"
                  placeholder="Your Phone Number"
                  required
                  value={formdata.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                />
              </div>
              <textarea
                placeholder="Write Your Message"
                rows="5"
                className="textareacolor"
                value={formdata.message}
                onChange={(e) => handleChange("message", e.target.value)}
              ></textarea>

              {loading ? (
                <button type="submit" className="btn5" disabled>
                  <div
                    className="spinner-border text-light"
                    role="status"
                  ></div>
                </button>
              ) : (
                <button type="submit" className="btn5">
                  SEND MESSAGE
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Contact;
