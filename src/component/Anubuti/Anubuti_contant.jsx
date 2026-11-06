import "../Blog/Blog_contant/Blog_contant.css";


const Anubuti_contant = ({data}) => {
  return (
    <>
      <div className="Blog_contant_contaner">
        <div className="Blog_contant_maxwidth">
          <div className="Blog_contant_contant">
            <div>
            <h1>The Pleasure</h1>
              <p
                           
                            dangerouslySetInnerHTML={{
                              __html: data
                            }}
                          />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Anubuti_contant;