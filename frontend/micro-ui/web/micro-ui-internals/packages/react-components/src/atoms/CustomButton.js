import React from "react";

const CustomButton = ({ text, onClick, selected }) => {
  return (
    <React.Fragment>
      <button tabIndex="0" type="button" className={selected ? "customBtn-selected" : "customBtn"} style={selected ? {backgroundColor:"#7a2829"}:{}}onClick={onClick}>
        {text}
      </button>
    </React.Fragment>
  );
};

export default CustomButton;
