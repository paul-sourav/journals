import React from "react";

const Footer = () => {
  const style = {
    width: "100%",
    height: "10vh",
    textAlign: "center",

    backgroundColor: "golden",
    // background:" #fceabb",  /* fallback for old browsers */
    color: "#333",
  };
  return (
    <>
      <div style={style} className="footer">
        <p>Footer</p>
        Features Curved text generator Photo effects Image enhancer Add frames
        to photos Add text to photos Online video recorder Video trimmer Convert
        videos to MP4 See more features
      </div>
    </>
  );
};

export default Footer;
