import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import isEqual from "lodash/isEqual";
import { useTranslation } from "react-i18next";

const RadioButtons = (props) => {
  const { t } = useTranslation();
  var selected = props.selectedOption;
  function selectOption(value) {
    //selected = value;
    props.onSelect(value);
  }

  return (
    <div style={props.style} className={`radio-wrap ${props?.additionalWrapperClass}`}>
         <style>
        {`
          .radio-wrap .radio-btn-wrap input:checked ~ .radio-btn-checkmark:after,
          .radio-wrap .radio-btn-wrap .checkbox-wrap .input-emp:checked ~ .radio-btn-checkmark:after,
          .checkbox-wrap .radio-wrap .radio-btn-wrap .input-emp:checked ~ .radio-btn-checkmark:after {
            display: block;
            --bg-opacity: 1;
            background-color: #7a2829;
            background-color: #7a2829;
            height: 1.25rem;
            width: 1.25rem;
            border-radius: 9999px;
            position: absolute;
            top: 10px;
            left: 10px;
          }

          .radio-wrap .radio-btn-wrap input:checked ~ .radio-btn-checkmark,
          .radio-wrap .radio-btn-wrap .checkbox-wrap .input-emp:checked ~ .radio-btn-checkmark,
          .checkbox-wrap .radio-wrap .radio-btn-wrap .input-emp:checked ~ .radio-btn-checkmark {
            border-width: 1px;
            --border-opacity: 1;
            border-color:  #7a2829;
            border-color:  #7a2829;
          }
        `}
      </style>
      {props?.options?.map((option, ind) => {
        if (props?.optionsKey && !props?.isDependent) {
          return (
            <div style={props.innerStyles} key={ind}>
              <span className="radio-btn-wrap">
                <input
                  className="radio-btn"
                  type="radio"
                  value={option}
                  checked={(props.isPTFlow && selected?.code === option.code) || isEqual(selected, option) ? 1 : 0}
                  onChange={() => selectOption(option)}
                  disabled={props?.disabled}
                  name={props.name}
                  ref={props.inputRef}
                />
                <span className="radio-btn-checkmark"></span>
              </span>
              <label style={props.inputStyle}>{t(option[props.optionsKey])}</label>
            </div>
          );
        } else if (props?.optionsKey && props?.isDependent) {
          return (
            <div style={props.innerStyles} key={ind}>
              <span className="radio-btn-wrap">
                <input
                  className="radio-btn"
                  type="radio"
                  value={option}
                  checked={props?.isTLFlow ? (selected?.code === option.code || selected?.i18nKey === option.i18nKey) : selected?.code === option.code ? 1 : 0}
                  onChange={() => selectOption(option)}
                  disabled={props?.disabled}
                  name={props.name}
                  ref={props.inputRef}
                />
                <span className="radio-btn-checkmark"></span>
              </span>
              <label style={props.inputStyle}>{t(props.labelKey ? `${props.labelKey}_${option.code}` : option.code)}</label>
            </div>
          );
        } else {
          return (
            <div style={props.innerStyles} key={ind}>
              <span className="radio-btn-wrap">
                <input
                  className="radio-btn"
                  type="radio"
                  value={option}
                  checked={selected === option ? 1 : 0}
                  onChange={() => selectOption(option)}
                  disabled={props?.disabled}
                  name={props.name}
                  ref={props.inputRef}
                />
                <span className="radio-btn-checkmark"></span>
              </span>
              <label style={props.inputStyle}>{t(option)}</label>
            </div>
          );
        }
      })}
    </div>
  );
};

RadioButtons.propTypes = {
  selectedOption: PropTypes.any,
  onSelect: PropTypes.func,
  options: PropTypes.any,
  optionsKey: PropTypes.string,
  innerStyles: PropTypes.any,
  style: PropTypes.any,
};

RadioButtons.defaultProps = {};

export default RadioButtons;
