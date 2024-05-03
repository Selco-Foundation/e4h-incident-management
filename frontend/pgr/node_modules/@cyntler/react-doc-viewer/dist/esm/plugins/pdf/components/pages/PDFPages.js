var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
/* eslint-disable */
import React, { useContext, useEffect } from "react";
import { Document } from "react-pdf";
import styled from "styled-components";
import { useTranslation } from "../../../../hooks/useTranslation";
import { PDFContext } from "../../state";
import { setNumPages } from "../../state/actions";
import { initialPDFState } from "../../state/reducer";
import { PDFAllPages } from "./PDFAllPages";
import PDFSinglePage from "./PDFSinglePage";
var PDFPages = function () {
    var _a = useContext(PDFContext), _b = _a.state, mainState = _b.mainState, paginated = _b.paginated, dispatch = _a.dispatch;
    var t = useTranslation().t;
    var currentDocument = (mainState === null || mainState === void 0 ? void 0 : mainState.currentDocument) || null;
    useEffect(function () {
        dispatch(setNumPages(initialPDFState.numPages));
    }, [currentDocument]);
    if (!currentDocument || currentDocument.fileData === undefined)
        return null;
    return (React.createElement(DocumentPDF, { file: currentDocument.fileData, onLoadSuccess: function (_a) {
            var numPages = _a.numPages;
            return dispatch(setNumPages(numPages));
        }, loading: React.createElement("span", null, t("pdfPluginLoading")) }, paginated ? React.createElement(PDFSinglePage, null) : React.createElement(PDFAllPages, null)));
};
var DocumentPDF = styled(Document)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  margin: 0 auto;\n"], ["\n  display: flex;\n  flex-direction: column;\n  margin: 0 auto;\n"])));
export default PDFPages;
var templateObject_1;
