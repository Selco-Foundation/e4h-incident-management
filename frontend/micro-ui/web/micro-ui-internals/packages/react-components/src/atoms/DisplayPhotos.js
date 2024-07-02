import React from "react";
import PropTypes from "prop-types";
import {PDFSvg} from "./svgindex"

const ImageOrPDFIcon = ({source, index, last=false, onClick}) => {
 
  if(source.includes(".xlsx"))
  {
    console.log("source",source)
  }
  const svgString = `
<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M46.6667 6.6665H20C16.3334 6.6665 13.3667 9.6665 13.3667 13.3332L13.3334 66.6665C13.3334 70.3332 16.3 73.3332 19.9667 73.3332H60C63.6667 73.3332 66.6667 70.3332 66.6667 66.6665V26.6665L46.6667 6.6665ZM53.3334 59.9998H26.6667V53.3332H53.3334V59.9998ZM53.3334 46.6665H26.6667V39.9998H53.3334V46.6665ZM43.3334 29.9998V11.6665L61.6667 29.9998H43.3334Z"
    fill="#505A5F"
  />
</svg>
`;

const encodedSvg = encodeURIComponent(svgString);
const dataUrl = `data:image/svg+xml;charset=UTF-8,${encodedSvg}`;

  let type = Digit.Utils.getFileTypeFromFileStoreURL(source)
  return Digit.Utils.getFileTypeFromFileStoreURL(source) === "pdf" ?
  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start", alignContent: "center" }}>
    <a target="_blank" href={source} style={{ minWidth: "100px", marginRight: "10px", maxWidth: "100px", height: "auto" }} key={index}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <PDFSvg style={{ background: "#f6f6f6", padding: "8px", width:"100px" }} width="100px" height="100px" minWidth="100px" />
      </div>
    </a>
  </div>
  :
  <img key={index} src={source.includes(".xlsx") || source.includes(".docx") || source.includes(".doc")?dataUrl:source} style={{cursor:"pointer"}}{...last ? {className:"last"} : {}} alt="issue thumbnail" onClick={() => onClick(source, index)}></img>
}

const DisplayPhotos = (props) => {
  return (
    <div className="photos-wrap" style={props.style}>
      {props.srcs.map((source, index) => {
        return <ImageOrPDFIcon key={index} {...{source, index, ...props}} last={++index !== props.srcs.length ? false : true}/>
      })}
    </div>
  );
};

DisplayPhotos.propTypes = {
  /**
   * images
   */
  srcs: PropTypes.array,
  /**
   * optional click handler
   */
  onClick: PropTypes.func,
};

DisplayPhotos.defaultProps = {
  srcs: [],
};

export default DisplayPhotos;
