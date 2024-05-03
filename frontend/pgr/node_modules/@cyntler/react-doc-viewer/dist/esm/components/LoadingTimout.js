import React, { useContext, useEffect, useState, } from "react";
import { DocViewerContext } from "../store/DocViewerProvider";
export var LoadingTimeout = function (_a) {
    var _b, _c;
    var children = _a.children;
    var state = useContext(DocViewerContext).state;
    var config = state.config;
    var _d = useState(((_b = config === null || config === void 0 ? void 0 : config.loadingRenderer) === null || _b === void 0 ? void 0 : _b.showLoadingTimeout) === false), shouldLoadingRender = _d[0], setShouldLoadingRender = _d[1];
    useEffect(function () {
        var _a;
        setTimeout(function () {
            setShouldLoadingRender(true);
        }, typeof ((_a = config === null || config === void 0 ? void 0 : config.loadingRenderer) === null || _a === void 0 ? void 0 : _a.showLoadingTimeout) === "number"
            ? config.loadingRenderer.showLoadingTimeout
            : 500);
    }, [(_c = config === null || config === void 0 ? void 0 : config.loadingRenderer) === null || _c === void 0 ? void 0 : _c.showLoadingTimeout]);
    if (!shouldLoadingRender) {
        return null;
    }
    return React.createElement(React.Fragment, null, children);
};
