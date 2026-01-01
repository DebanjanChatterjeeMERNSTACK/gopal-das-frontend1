import React, { useState, useEffect } from "react";
import "./ImageGallery.css";
import { RxCross2 } from "react-icons/rx";
import bgimg from "../../assets/bgimg.jpg";

const URL = import.meta.env.VITE_URL;

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [portraitImages, setPortraitImages] = useState([]);
  const [landscapeImages, setLandscapeImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${URL}/get_all_galleryimage`);
        const data = await res.json();

        if (data.status === 200) {
          setPortraitImages(
            data.data.filter((e) => e.imagePosition === "Portrait Images")
          );
          setLandscapeImages(
            data.data.filter((e) => e.imagePosition === "Landscape Images")
          );
        }
      } catch (error) {
        console.log("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="imggallery_container">
      {/* Header Section */}
       <div className="bgimage">
          <h3>Image Gallery</h3>
        </div>

      <div className="imggallery_maxwidth">
        {loading ? (
          <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border text-success" role="status"></div>
          </div>
        ) : (
          <>
            {/* Portrait Section */}
            <section className="gallery-section">
              {portraitImages.length > 0 ? (
                <div className="gallery-grid">
                  {portraitImages.map((img, index) => (
                    <img
                      key={index}
                      src={img.galleryImage}
                      alt={`portrait-${index}`}
                      onClick={() => setSelectedImage(img.galleryImage)}
                      className="thumbnail"
                    />
                  ))}
                </div>
              ) : (null)}
            </section>

            {/* Landscape Section */}
            <section className="gallery-section mt-3"> 
              {landscapeImages.length > 0 ? (
                <div className="gallery-grid">
                  {landscapeImages.map((img, index) => (
                    <img
                      key={index}
                      src={img.galleryImage}
                      alt={`landscape-${index}`}
                      onClick={() => setSelectedImage(img.galleryImage)}
                      className="thumbnail2"
                    />
                  ))}
                </div>
              ) : (
                null
              )}
            </section>
          </>
        )}

        {/* Modal View */}
        {selectedImage && (
          <div className="modal" onClick={() => setSelectedImage(null)}>
            <span className="close">
              <RxCross2 />
            </span>
            <img src={selectedImage} alt="Full view" className="modal_image" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
