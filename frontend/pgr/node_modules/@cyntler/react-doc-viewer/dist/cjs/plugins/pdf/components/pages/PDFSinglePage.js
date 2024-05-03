"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_pdf_1 = require("react-pdf");
var styled_components_1 = __importDefault(require("styled-components"));
var useTranslation_1 = require("../../../../hooks/useTranslation");
var state_1 = require("../../state");
var PDFSinglePage = function (_a) {
    var pageNum = _a.pageNum;
    var _b = (0, react_1.useContext)(state_1.PDFContext).state, mainState = _b.mainState, paginated = _b.paginated, zoomLevel = _b.zoomLevel, numPages = _b.numPages, currentPage = _b.currentPage;
    var t = (0, useTranslation_1.useTranslation)().t;
    var rendererRect = (mainState === null || mainState === void 0 ? void 0 : mainState.rendererRect) || null;
    var _pageNum = pageNum || currentPage;
    return (react_1.default.createElement(PageWrapper, { id: "pdf-page-wrapper", last: _pageNum >= numPages },
        !paginated && (react_1.default.createElement(PageTag, { id: "pdf-page-info" }, t("pdfPluginPageNumber", {
            currentPage: _pageNum,
            allPagesCount: numPages,
        }))),
        react_1.default.createElement(react_pdf_1.Page, { pageNumber: _pageNum || currentPage, scale: zoomLevel, height: ((rendererRect === null || rendererRect === void 0 ? void 0 : rendererRect.height) || 100) - 100, width: ((rendererRect === null || rendererRect === void 0 ? void 0 : rendererRect.width) || 100) - 100, loading: t("pdfPluginLoading") })));
};
exports.default = PDFSinglePage;
var PageWrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin: 20px 0;\n"], ["\n  margin: 20px 0;\n"])));
var PageTag = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  padding: 0 0 10px 10px;\n  color: ", ";\n  font-size: 14px;\n  text-align: left;\n\n  @media (max-width: 768px) {\n    font-size: 10px;\n  }\n"], ["\n  padding: 0 0 10px 10px;\n  color: ", ";\n  font-size: 14px;\n  text-align: left;\n\n  @media (max-width: 768px) {\n    font-size: 10px;\n  }\n"])), function (props) { return props.theme.textTertiary; });
var templateObject_1, templateObject_2;
