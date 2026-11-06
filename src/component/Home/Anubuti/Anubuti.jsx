import React, { useEffect, useState } from "react";
import aboutimg from "../../../assets/writer.png";
import "./Anubuti.css";
import { GoDiscussionOutdated } from "react-icons/go";
import { NavLink } from "react-router-dom";
const URL = import.meta.env.VITE_URL;
const Anubuti = () => {
  const [anubuti, setanubuti] = useState([]);
  const [loading, setloading] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  useEffect(() => {
    setloading(true);
    fetch(`${URL}/get_all_anubuti`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setanubuti(data.data);
          setloading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  }, []);

  return (
    <>
      {anubuti.length > 0 ? (
        <div className="blog_contaner">
          <div className="blog_maxwidth">
            <h5>ANUBHUTI</h5>
            <h2>The Author’s Experience</h2>
            {loading ? (
              <>
                <div className="d-flex justify-content-center">
                  <div
                    className="spinner-border text-success"
                    role="status"
                  ></div>
                </div>
              </>
            ) : (
              <div className="blog_flex">
                {anubuti.slice(0, 3).map((e, i) => {
                  return (
                    <>
                      <NavLink to={`/anubutis-details/${e._id}`} key={i}>
                        <div className="card">
                          <div>
                            <img src={e.anubutiImage} className="card_image" />
                          </div>
                          <h3>{e.anubutiTitle.slice(0, 20)}...</h3>
                          <div className="blog_date">
                            <GoDiscussionOutdated className="date_icon" />
                            <i>{formatDate(e.Date)}</i>
                          </div>
                            <p
                           
                            dangerouslySetInnerHTML={{
                              __html:
                                e.anubutiDescription.length > 150
                                  ? e.anubutiDescription.substring(0, 150) +
                                    " <strong>Read More...</strong>"
                                  : e.anubutiDescription,
                            }}
                          />
                        </div>
                      </NavLink>
                    </>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Anubuti;
