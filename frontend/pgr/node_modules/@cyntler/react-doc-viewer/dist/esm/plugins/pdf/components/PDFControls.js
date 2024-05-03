var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useContext } from "react";
import styled from "styled-components";
import { Button, LinkButton } from "../../../components/common";
import { PDFContext } from "../state";
import { setPDFPaginated, setZoomLevel } from "../state/actions";
import { useTranslation } from "../../../hooks/useTranslation";
import { DownloadPDFIcon, ResetZoomPDFIcon, TogglePaginationPDFIcon, ZoomInPDFIcon, ZoomOutPDFIcon, } from "./icons";
import PDFPagination from "./PDFPagination";
var PDFControls = function () {
    var t = useTranslation().t;
    var _a = useContext(PDFContext), _b = _a.state, mainState = _b.mainState, paginated = _b.paginated, zoomLevel = _b.zoomLevel, numPages = _b.numPages, zoomJump = _b.zoomJump, defaultZoomLevel = _b.defaultZoomLevel, dispatch = _a.dispatch;
    var currentDocument = (mainState === null || mainState === void 0 ? void 0 : mainState.currentDocument) || null;
    return (React.createElement(Container, { id: "pdf-controls" },
        paginated && numPages > 1 && React.createElement(PDFPagination, null),
        (currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.fileData) && (React.createElement(DownloadButton, { id: "pdf-download", href: currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.fileData, download: (currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.fileName) || (currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.uri), title: t("downloadButtonLabel") },
            React.createElement(DownloadPDFIcon, { color: "#000", size: "75%" }))),
        React.createElement(ControlButton, { id: "pdf-zoom-out", onMouseDown: function () { return dispatch(setZoomLevel(zoomLevel - zoomJump)); } },
            React.createElement(ZoomOutPDFIcon, { color: "#000", size: "80%" })),
        React.createElement(ControlButton, { id: "pdf-zoom-in", onMouseDown: function () { return dispatch(setZoomLevel(zoomLevel + zoomJump)); } },
            React.createElement(ZoomInPDFIcon, { color: "#000", size: "80%" })),
        React.createElement(ControlButton, { id: "pdf-zoom-reset", onMouseDown: function () { return dispatch(setZoomLevel(defaultZoomLevel)); }, disabled: zoomLevel === defaultZoomLevel },
            React.createElement(ResetZoomPDFIcon, { color: "#000", size: "70%" })),
        numPages > 1 && (React.createElement(ControlButton, { id: "pdf-toggle-pagination", onMouseDown: function () { return dispatch(setPDFPaginated(!paginated)); } },
            React.createElement(TogglePaginationPDFIcon, { color: "#000", size: "70%", reverse: paginated })))));
};
export default PDFControls;
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  position: sticky;\n  top: 0;\n  left: 0;\n  z-index: 1;\n  justify-content: flex-end;\n  padding: 8px;\n  background-color: ", ";\n  box-shadow: 0px 2px 3px #00000033;\n\n  @media (max-width: 768px) {\n    padding: 6px;\n  }\n"], ["\n  display: flex;\n  position: sticky;\n  top: 0;\n  left: 0;\n  z-index: 1;\n  justify-content: flex-end;\n  padding: 8px;\n  background-color: ", ";\n  box-shadow: 0px 2px 3px #00000033;\n\n  @media (max-width: 768px) {\n    padding: 6px;\n  }\n"])), function (props) { return props.theme.tertiary; });
var ControlButton = styled(Button)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 30px;\n  height: 30px;\n  @media (max-width: 768px) {\n    width: 25px;\n    height: 25px;\n  }\n"], ["\n  width: 30px;\n  height: 30px;\n  @media (max-width: 768px) {\n    width: 25px;\n    height: 25px;\n  }\n"])));
var DownloadButton = styled(LinkButton)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width: 30px;\n  height: 30px;\n  @media (max-width: 768px) {\n    width: 25px;\n    height: 25px;\n  }\n"], ["\n  width: 30px;\n  height: 30px;\n  @media (max-width: 768px) {\n    width: 25px;\n    height: 25px;\n  }\n"])));
var templateObject_1, templateObject_2, templateObject_3;
