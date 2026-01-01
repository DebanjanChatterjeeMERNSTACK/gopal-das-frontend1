import { BrowserRouter, Route, Routes } from "react-router-dom";
import Blog_details from "./pages/Blog_details";
import BlogAll from "./pages/BlogAll";
import Book from "./pages/Book";
import ContactUs from "./pages/ContactUs";
import Home from "./pages/Home";
import ImageGallery from "./pages/ImageGallery";
import VideoGallery from "./pages/VideoGallery";
import Error from "./pages/Error";
import Books_details from "./pages/Books_details";
import Admin_login from "./pages/Admin_login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Dashboard_book from "./pages/Dashboard/Dashboard_book";
import Dashboard_blog from "./pages/Dashboard/Dashboard_blog";
import Dashboard_contact from "./pages/Dashboard/Dashboard_contact";
import Dashboard_videogallery from "./pages/Dashboard/Dashboard_videogallery";
import Dashboard_imagegallery from "./pages/Dashboard/Dashboard_imagegallery";
import Layout from "./layout/Layout";
import Protected from "./utils/Protected";
import PdfFlipBook from "./component/ReadBook/Read_Book";
import ReadBook from "./pages/ReadBook";
import Dashboard_category from "./pages/Dashboard/Dashboard_category";
import Dashboard_comments from "./pages/Dashboard/Dashboard_comments";
import ShareStory from "./pages/ShareStory";
import Dashboard_story from "./pages/Dashboard/Dashboard_story";
import Story_details from "./component/Home/Story/Story_details";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<Book />} />
          <Route path="/book-details/:id" element={<Books_details />} />
          <Route path="/book-details/:id/readbook/:id" element={<ReadBook />} />
          <Route path="/image-gallery" element={<ImageGallery />} />
          <Route path="/video-gallery" element={<VideoGallery />} />
          <Route path="/blogs" element={<BlogAll />} />
          <Route path="/blogs-details/:id" element={<Blog_details />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/share-your-story" element={<ShareStory />} />
          <Route path="/story-details/:id" element={<Story_details />} />
          <Route path="/login" element={<Admin_login />} />


          <Route element={<Protected allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<Layout />}>
              <Route index element={<Dashboard_book />} />
               <Route path="category" element={<Dashboard_category />} />
              <Route path="blog" element={<Dashboard_blog />} />
              <Route path="contact" element={<Dashboard_contact />} />
               <Route path="comment" element={<Dashboard_comments />} />
               <Route path="story" element={<Dashboard_story />} />
              <Route
                path="video-gallery"
                element={<Dashboard_videogallery />}
              />
              <Route
                path="image-gallery"
                element={<Dashboard_imagegallery />}
              />
            </Route>
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
