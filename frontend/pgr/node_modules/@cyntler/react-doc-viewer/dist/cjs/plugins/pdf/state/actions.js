"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCurrentPage = exports.SET_CURRENT_PAGE = exports.setNumPages = exports.SET_NUM_PAGES = exports.setPDFPaginated = exports.SET_PDF_PAGINATED = exports.setZoomLevel = exports.SET_ZOOM_LEVEL = void 0;
exports.SET_ZOOM_LEVEL = "SET_ZOOM_LEVEL";
var setZoomLevel = function (value) { return ({
    type: exports.SET_ZOOM_LEVEL,
    value: value,
}); };
exports.setZoomLevel = setZoomLevel;
exports.SET_PDF_PAGINATED = "SET_PDF_PAGINATED";
var setPDFPaginated = function (value) { return ({
    type: exports.SET_PDF_PAGINATED,
    value: value,
}); };
exports.setPDFPaginated = setPDFPaginated;
exports.SET_NUM_PAGES = "SET_NUM_PAGES";
var setNumPages = function (value) { return ({
    type: exports.SET_NUM_PAGES,
    value: value,
}); };
exports.setNumPages = setNumPages;
exports.SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
var setCurrentPage = function (value) { return ({
    type: exports.SET_CURRENT_PAGE,
    value: value,
}); };
exports.setCurrentPage = setCurrentPage;
