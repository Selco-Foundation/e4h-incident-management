"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingTimeout = void 0;
var react_1 = __importStar(require("react"));
var DocViewerProvider_1 = require("../store/DocViewerProvider");
var LoadingTimeout = function (_a) {
    var _b, _c;
    var children = _a.children;
    var state = (0, react_1.useContext)(DocViewerProvider_1.DocViewerContext).state;
    var config = state.config;
    var _d = (0, react_1.useState)(((_b = config === null || config === void 0 ? void 0 : config.loadingRenderer) === null || _b === void 0 ? void 0 : _b.showLoadingTimeout) === false), shouldLoadingRender = _d[0], setShouldLoadingRender = _d[1];
    (0, react_1.useEffect)(function () {
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
    return react_1.default.createElement(react_1.default.Fragment, null, children);
};
exports.LoadingTimeout = LoadingTimeout;
