export var SET_ZOOM_LEVEL = "SET_ZOOM_LEVEL";
export var setZoomLevel = function (value) { return ({
    type: SET_ZOOM_LEVEL,
    value: value,
}); };
export var SET_PDF_PAGINATED = "SET_PDF_PAGINATED";
export var setPDFPaginated = function (value) { return ({
    type: SET_PDF_PAGINATED,
    value: value,
}); };
export var SET_NUM_PAGES = "SET_NUM_PAGES";
export var setNumPages = function (value) { return ({
    type: SET_NUM_PAGES,
    value: value,
}); };
export var SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export var setCurrentPage = function (value) { return ({
    type: SET_CURRENT_PAGE,
    value: value,
}); };
