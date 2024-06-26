import React from "react";
import PropTypes from "prop-types";

const HeaderBar = (props) => {
  const isMobile = window.Digit.Utils.browser.isMobile();
  return (
    <div className="header-wrap" style={props?.style ? isMobile? {...props?.style,marginBottom:"0px"}: props.style : {}}>
      {props.start ? <div className="header-start">{props.start}</div> : null}
      {props.main ? <div className="header-content popup-header-fix">{props.main}</div> : null}
      {props.end ? <div className="header-end">{props.end}</div> : null}
    </div>
  );
};

HeaderBar.propTypes = {
  start: PropTypes.any,
  main: PropTypes.any,
  end: PropTypes.any,
};

HeaderBar.defaultProps = {
  start: "",
  main: "",
  end: "",
};

export default HeaderBar;
