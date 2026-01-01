import React, { useEffect, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import "./Read_Book.css";
import { useParams } from "react-router-dom";

const URL = import.meta.env.VITE_URL;

const PdfFlipBook = () => {
  const id = useParams().id;
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(`${URL}/get_id_book/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setImages(data.data.bookPages);
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  return (
    <div className="flipbook-wrapper">
      {images.length === 0 ? (
        <p>Loading Book...</p>
      ) : (
        <HTMLFlipBook
          width={550}
          height={733}
          size="stretch"
          minWidth={300}
          maxWidth={800}
          minHeight={400}
          maxHeight={1000}
          mobileScrollSupport={true}
          className="flipbook"
          showCover={false}
          usePortrait={true}
          startPage={0}
          drawShadow={true}
          flippingTime={500}
          useMouseEvents={true}
        >
          {images.map((img, index) => (
            <div key={index + 1} className="page">
              <img
                src={img}
                alt={`Page ${index + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "fill" }}
              />
            </div>
          ))}
        </HTMLFlipBook>
      )}
    </div>
  );
};

export default PdfFlipBook;
