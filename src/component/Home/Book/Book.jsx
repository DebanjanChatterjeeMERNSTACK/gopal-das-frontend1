import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import arrow icons
import "./Book.css";
import { data, NavLink } from "react-router-dom";

const URL = import.meta.env.VITE_URL;
// Custom arrow components
const NextArrow = ({ onClick }) => {
  return (
    <div className="arrow next" onClick={onClick}>
      <FaChevronRight />
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div className="arrow prev" onClick={onClick}>
      <FaChevronLeft />
    </div>
  );
};

const Book = () => {
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

          data?.data?.forEach((cat) => {
            fetch(`${URL}/get_book/${cat.categoryTitle}`, {
              method: "GET",
            })
              .then((res) => res.json())
              .then((data) => {
                setloading(false);
                setbook((prev) => ({
                  ...prev,
                  [cat.categoryTitle]: data.data,
                }));
              });
          });

          
        }
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  }, []);



  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "20px",
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 722,
        settings: {
          slidesToShow: 3,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 666,
        settings: {
          slidesToShow: 2,
          centerPadding: "30px",
          centerMode: true,
        },
      },
      {
        breakpoint: 522,
        settings: {
          slidesToShow: 2,
          centerPadding: "10px",
          centerMode: true,
        },
      },
      {
        breakpoint: 468,
        settings: {
          slidesToShow: 2,
          centerPadding: "0px",
          //    centerMode: true,
        },
      },
      {
        breakpoint: 435,
        settings: {
          slidesToShow: 1.5,
          centerPadding: "0px",
          //    centerMode: true,
        },
      },
      {
        breakpoint: 333,
        settings: {
          slidesToShow: 1,
          //   centerPadding: "0px",
          //    centerMode: true,
        },
      },
    ],
  };

  return (
    <>
      {category?.map((e,i) => {
      
        return (
          <>
            <div className={`book_contaner ${(i+1)%2 ===0 ?"book_section" :""}`} key={e._id}>
              <div className="book_maxwidth">
                {/* <h5>BOOK</h5> */}
                <h2>{e.categoryTitle}</h2>
                {loading ? (
                  <div className="d-flex justify-content-center">
                    <div
                      className="spinner-border text-success"
                      role="status"
                    ></div>
                  </div>
                ) : book[e.categoryTitle]?.length >= 5 ? (
                  <Slider {...settings}>
                    {book[e.categoryTitle]?.map((item, index) => (
                      <div key={index} className="book_img">
                        <NavLink to={`/book-details/${item._id}`}>
                          <img
                            src={item.bookImage}
                            width={200}
                            height={300}
                            alt={`Book ${index}`}
                          />
                        </NavLink>
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className="book_flex">
                    {book[e.categoryTitle]?.map((item, index) => (
                      <div key={index} className="book_img">
                        <NavLink to={`/book-details/${item._id}`}>
                          <img
                            src={item.bookImage}
                            width={200}
                            height={300}
                            alt={`Book ${index}`}
                          />
                        </NavLink>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default Book;
