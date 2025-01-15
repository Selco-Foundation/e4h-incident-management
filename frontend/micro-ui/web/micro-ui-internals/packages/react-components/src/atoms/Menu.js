import React from "react";
import PropTypes from "prop-types";

const Menu = (props) => {
  const keyPrefix = props.localeKeyPrefix || "CS_ACTION";
  return (
    <div className="menu-wrap" style={{ ...props.style, height: "auto" }}>
         <style>{`
        *, :after, :before {
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          border: 0 solid;
          margin-top: 0px;
        }
        .menu-wrap {
          height: 6rem;
        }
        .menu-item {
          margin-top: 1px;
        }
        .menu-item p {
          margin-top: 0px !important;
        }
        *, :after, :before {
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          border: 0 solid;
          margin-top: 0px;
         }
      `}</style>
      {props.options.map((option, index) => {
        return (
          <div style={{ marginTop: "1px" }} key={index} onClick={() => props.onSelect(option)}>
            <p className="custom-p">{props.t ? props.t(Digit.Utils.locale.getTransformedLocale(option.forcedName || `${keyPrefix}_${props.optionKey ? option[props.optionKey] : option}`)) : option}</p>
          </div>
        );
      })}
    </div>
  );
};

Menu.propTypes = {
  options: PropTypes.array,
  onSelect: PropTypes.func,
};

Menu.defaultProps = {
  options: [],
  onSelect: () => {},
};

export default Menu;
