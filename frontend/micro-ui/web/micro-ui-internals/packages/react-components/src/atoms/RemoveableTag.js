import React from "react";
import { Close } from "./svgindex";

const RemoveableTag = ({ text, onClick, extraStyles,disabled = false }) => (
  <div className="tag" style={{height:"auto"}} >
    <span className="text" style={{height:"auto"}}>{text}</span>
    <span onClick={disabled?null:onClick}>
      <Close className="close" style={extraStyles?extraStyles?.closeIconStyles:{}} />
    </span>
  </div>
);

export default RemoveableTag;
