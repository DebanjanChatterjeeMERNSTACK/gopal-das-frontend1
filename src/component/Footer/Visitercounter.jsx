import React, { useEffect, useState } from "react";

const URL = import.meta.env.VITE_URL;

const VisitorCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateVisitor = async () => {
      try {
        const res = await fetch(`${URL}/visitor`);
        const data = await res.json();

        if (data.status === 200) {
          setCount(data.count);
        }
      } catch (error) {
        console.error("Visitor error:", error);
      }
    };

    updateVisitor();
  }, []);

  return (
    <div style={styles.box}>
      <p>Total Visitors: {count}</p>
    </div>
  );
};

const styles = {
  box: {
    fontSize:"12px",
    // textAlign: "center",
    paddingTop: "20px",
    paddingBottom: "20px",
    paddingLeft:"30px",
  },
};

export default VisitorCounter;
