import React, { useEffect, useState } from "react";
import "./Book.css";
import bookimage from "../../assets/book.png";
import { NavLink } from "react-router-dom";

const URL = import.meta.env.VITE_URL;
const Book = () => {
  const [search, setsearch] = useState("");
  const [category, setcategory] = useState([]);
  const [book, setbook] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    fetch(`${URL}/get_all_category`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setcategory(data.data);
          setloading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  }, []);

  useEffect(() => {
    setloading(true);
    fetch(`${URL}/get_search_book?s=${search}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setbook(data.data);
          setloading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  }, [search]);

  const handleClick = (id="all") => {
    setloading(true);
    if (id === "all") {
      fetch(`${URL}/get_all_book`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setbook(data.data);
            setloading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setloading(false);
        });
    } else {
      fetch(`${URL}/get_book/${id}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setbook(data.data);
            setloading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setloading(false);
        });
    }
  };

  return (
    <>
      <div className="bookall_contaner">
        <div className="bgimage">
          {/* <h3>Book</h3> */}
        </div>
        <div className="bookall_maxwidth">
          {/* <input
            className="form-control"
            type="text"
            placeholder="Search Your Favourite Books...."
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          /> */}

          <div className="bookall_category">
            {/* <button onClick={() => handleClick("all")}>All</button> */}
            {category.map((e) => {
              return (
                <>
                  <button onClick={() => handleClick(e.categoryTitle)}>
                    {e.categoryTitle}
                  </button>
                </>
              );
            })}
          </div>
          <div className="book_flex">
            {loading ? (
              <>
                <div className="loader-wrapper">
                  <div className="spinner-border text-success" role="status" />
                </div>
              </>
            ) : book.length > 0 ? (
              book?.map((e, i) => {
                return (
                  <>
                    <div>
                      <NavLink to={`/book-details/${e?._id}`}>
                        <img
                          src={e?.bookImage}
                          width={200}
                          height={300}
                          alt={`Book ${i}`}
                        />
                      </NavLink>
                    </div>
                  </>
                );
              })
            ) : (
              <div className="text-center w-100 mt-5">
                <h2 className="text-danger">Oops! 😞</h2>
                <p className="fw-semibold">No book found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Book;
