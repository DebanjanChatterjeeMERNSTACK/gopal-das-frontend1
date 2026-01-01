import React from "react";

import "./Hero.css";
import mainimage from "../../../assets/writer.png";
import TextLoop from "react-text-loop";
import { NavLink, useNavigate } from "react-router-dom";
import image from "../../../assets/image.png";
import image1 from "../../../assets/sign.png"
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
  FaCodepen,
} from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

const HeroSection = () => {
  const navigate = useNavigate();
  const handleShareStory = () => {
    navigate("/book"); // ✅ Navigate to your story page route
  };
  return (
    <>
      <div className="hero_contaner">
        <div className="hero_maxwidth">
          <div className="hero_contant">
            <h1>I'm Gopal Krushna Das</h1>
            <TextLoop
              interval={2000}
              springConfig={{ stiffness: 180, damping: 8 }}
              fade={true}
            >
              <h2>An Eminent Author</h2>
              <h2>IT Professional</h2>
              <h2>Social Worker</h2>
            </TextLoop>
           
            <i
              style={{
                color: "#004094",
                marginTop: "20px",
                // paddingRight:"20px",
                fontSize: "20px",
                fontWeight: "normal",
                width:318
              }}
            >
             “An eminent author measures success not by fame, but by the impact his words leave on human conscience.”
            </i>
              <div className="">
              {/* <button className="get-started-btn">
                <span className="icon-circle1">
                  <svg width="25" height="25" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12h14M13 5l6 7-6 7"
                      stroke="#0B2C9F"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="btn-text">Get Started</span>
              </button> */}
              <img src={image1} width={320} height={100} />

            </div>
            <div className="social-buttons">
              <a
                href="https://www.facebook.com/people/Authorgopalkrushnadas/61579239047506/?sk=reels_tab"
                className="social-buttons__button social-button social-button--facebook"
                aria-label="Facebook"
                target="_blank"
              >
                <span className="social-button__inner">
                  <FaFacebookF />
                </span>
              </a>

              <a
                href="https://www.youtube.com/@Author.Gopalkrushnadas"
                target="_blank"
                className="social-buttons__button social-button social-button--linkedin"
                aria-label="LinkedIn"
              >
                <span className="social-button__inner">
                  <FiYoutube />
                </span>
              </a>

              <a
                href="https://www.instagram.com/author.gopalkrushnadas?igsh=bWVyOTY3bngxejI0"
                target="_blank"
                rel="noreferrer"
                className="social-buttons__button social-button social-button--instagram"
                aria-label="Instagram"
              >
                <span className="social-button__inner">
                  <FaInstagram />
                </span>
              </a>

              <a
                href="https://x.com/authorgopaldas"
                target="_blank"
                rel="noreferrer"
                className="social-buttons__button social-button social-button--codepen"
                aria-label="CodePen"
              >
                <span className="social-button__inner">
                  <FaXTwitter />
                </span>
              </a>
            </div>
          </div>
          <div className="hero_image">
            <img src={mainimage} />
            <div className="round_exp">
              <img src={image} style={{ width: "180px", height: "180px" }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HeroSection;
