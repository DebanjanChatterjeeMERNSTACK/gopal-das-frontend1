import React, { useEffect, useState } from "react";
import { GoDiscussionOutdated } from "react-icons/go";
// import aboutimg from "../../../assets/writer.jpg";
import { NavLink } from "react-router-dom";
const URL = import.meta.env.VITE_URL;
const Anubutiall = () => {
  const [search, setsearch] = useState("");

  const [anubuti, setanubuti] = useState([]);
  const [loading, setloading] = useState(false);


  const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
};



  useEffect(() => {
    setloading(true);
    fetch(`${URL}/get_search_anubuti?s=${search}`, {
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
  }, [search]);

  return (
    <>
      <div className="bookall_contaner">
        <div className="bgimage">
          <h3>My Anubhuti</h3>
        </div>
        <div className="bookall_maxwidth">
          <input
            className="form-control"
            type="text"
            placeholder="Search Your Favourite My Anubhuti...."
            value={search}
            onChange={(e)=>setsearch(e.target.value)}
          />
          <div className="">
            <div className="blog_flex">
              {loading ? (
                <>
                  <div className="loader-wrapper">
                    <div
                      className="spinner-border text-success"
                      role="status"
                    />
                  </div>
                </>
              ) : anubuti.length > 0 ? (
                anubuti.map((e,i) => {
                  return (
                    <>
                      <NavLink to={`/anubutis-details/${e._id}`} key={i}>
                        <div className="card">
                          <div>
                            <img src={e.anubutiImage} className="card_image" />
                          </div>
                          <h3>{e.anubutiTitle.slice(0,20)}...</h3>
                          <div className="blog_date">
                            <GoDiscussionOutdated className="date_icon" />
                            <i>{formatDate(e.Date)}</i>
                          </div>
                          <p>
                            {e.anubutiDescription.slice(0,150)}{" "}
                            <strong>Read More...</strong>
                          </p>
                        </div>
                      </NavLink>
                    </>
                  );
                })
              ) : (
                <div className="text-center w-100 mt-5">
                  <h2 className="text-danger">Oops! 😞</h2>
                  <p className="fw-semibold">No Anubhuti found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Anubutiall;
