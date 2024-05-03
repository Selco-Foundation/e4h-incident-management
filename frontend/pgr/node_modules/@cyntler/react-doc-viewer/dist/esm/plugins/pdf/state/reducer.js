var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { SET_CURRENT_PAGE, SET_NUM_PAGES, SET_PDF_PAGINATED, SET_ZOOM_LEVEL, } from "./actions";
export var initialPDFState = {
    defaultZoomLevel: 1,
    zoomLevel: 1,
    zoomJump: 0.1,
    paginated: true,
    numPages: 0,
    currentPage: 1,
};
export var reducer = function (state, action) {
    if (state === void 0) { state = initialPDFState; }
    switch (action.type) {
        case SET_ZOOM_LEVEL: {
            var value = action.value;
            return __assign(__assign({}, state), { zoomLevel: value });
        }
        case SET_PDF_PAGINATED: {
            var value = action.value;
            return __assign(__assign({}, state), { paginated: value });
        }
        case SET_NUM_PAGES: {
            var value = action.value;
            return __assign(__assign({}, state), { numPages: value });
        }
        case SET_CURRENT_PAGE: {
            var value = action.value;
            return __assign(__assign({}, state), { currentPage: value });
        }
        default:
            return state;
    }
};
