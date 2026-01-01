import React from "react";
import "./Service.css";
import book from "../../../assets/book.png";
import ngo from "../../../assets/ngo.png";
import writer from "../../../assets/paper.png";
import spekar from "../../../assets/spekar.png";
const Service = () => {
  const data = [
    {
      title: "Passionate Reader",
      contant: "I am a lifelong reader with a deep love for literature. Books have shaped my thinking and continue to inspire my writing. Reading widely helps me stay connected with ideas, emotions, and the pulse of society.",
      img: book,
    },
    {
      title: "NGO & Social Work",
      contant: "As an author and IT professional, I work with groups like the UIS Cancer Foundation and Ramadas Seba Sangathan, helping 6,000+ people, 334 cancer survivors, and supporting education for families in need.",
      img: ngo,
    },
    {
      title: "Author & Writer ",
      contant: "I love connecting with people through words. As a speaker, I share thoughts on literature, social issues, and life lessons, aiming to inspire and guide others while creating a positive impact.",
      img: writer,
    },
    {
      title: "Speaker & Motivator",
      contant: "I love connecting with people through words. As a speaker, I share thoughts on literature, social issues, and life lessons, inspiring and guiding others while reaching hearts and creating a positive impact.",
      img: spekar,
    },
  ];
  return (
    <>
      <div className="service_contaner">
        <div className="service_maxwidth">
          <h5>SERVICE</h5>
          <h2>What I Do</h2>
          <div className="service_flex">
            {data.map((e, i) => {
              return (
                <>
                  <div className="service_box" key={i}>
                    <img src={e.img} width={60} height={60}/>
                    <h1>{e.title}</h1>
                    <p>{e.contant}</p>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default Service;
