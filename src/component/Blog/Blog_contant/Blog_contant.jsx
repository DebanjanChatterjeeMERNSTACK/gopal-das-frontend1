import "./Blog_contant.css";


const Blog_contant = ({data}) => {
  return (
    <>
      <div className="Blog_contant_contaner">
        <div className="Blog_contant_maxwidth">
          <div className="Blog_contant_contant">
            <div>
            <h1>The Pleasure</h1>
            <p>
             {data}
            </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Blog_contant;