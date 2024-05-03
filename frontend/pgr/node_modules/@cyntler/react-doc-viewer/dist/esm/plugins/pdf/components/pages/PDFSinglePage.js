var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useContext } from "react";
import { Page } from "react-pdf";
import styled from "styled-components";
import { useTranslation } from "../../../../hooks/useTranslation";
import { PDFContext } from "../../state";
var PDFSinglePage = function (_a) {
    var pageNum = _a.pageNum;
    var _b = useContext(PDFContext).state, mainState = _b.mainState, paginated = _b.paginated, zoomLevel = _b.zoomLevel, numPages = _b.numPages, currentPage = _b.currentPage;
    var t = useTranslation().t;
    var rendererRect = (mainState === null || mainState === void 0 ? void 0 : mainState.rendererRect) || null;
    var _pageNum = pageNum || currentPage;
    return (React.createElement(PageWrapper, { id: "pdf-page-wrapper", last: _pageNum >= numPages },
        !paginated && (React.createElement(PageTag, { id: "pdf-page-info" }, t("pdfPluginPageNumber", {
            currentPage: _pageNum,
            allPagesCount: numPages,
        }))),
        React.createElement(Page, { pageNumber: _pageNum || currentPage, scale: zoomLevel, height: ((rendererRect === null || rendererRect === void 0 ? void 0 : rendererRect.height) || 100) - 100, width: ((rendererRect === null || rendererRect === void 0 ? void 0 : rendererRect.width) || 100) - 100, loading: t("pdfPluginLoading") })));
};
export default PDFSinglePage;
var PageWrapper = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin: 20px 0;\n"], ["\n  margin: 20px 0;\n"])));
var PageTag = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  padding: 0 0 10px 10px;\n  color: ", ";\n  font-size: 14px;\n  text-align: left;\n\n  @media (max-width: 768px) {\n    font-size: 10px;\n  }\n"], ["\n  padding: 0 0 10px 10px;\n  color: ", ";\n  font-size: 14px;\n  text-align: left;\n\n  @media (max-width: 768px) {\n    font-size: 10px;\n  }\n"])), function (props) { return props.theme.textTertiary; });
var templateObject_1, templateObject_2;
