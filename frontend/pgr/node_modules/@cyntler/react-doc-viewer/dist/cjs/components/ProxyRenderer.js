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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyRenderer = void 0;
var react_1 = __importStar(require("react"));
var styled_components_1 = __importStar(require("styled-components"));
var actions_1 = require("../store/actions");
var getFileName_1 = require("../utils/getFileName");
var useDocumentLoader_1 = require("../hooks/useDocumentLoader");
var useWindowSize_1 = require("../hooks/useWindowSize");
var common_1 = require("./common");
var icons_1 = require("./icons");
var LoadingTimout_1 = require("./LoadingTimout");
var useTranslation_1 = require("../hooks/useTranslation");
var ProxyRenderer = function () {
    var _a;
    var _b = (0, useDocumentLoader_1.useDocumentLoader)(), state = _b.state, dispatch = _b.dispatch, CurrentRenderer = _b.CurrentRenderer;
    var documents = state.documents, documentLoading = state.documentLoading, currentDocument = state.currentDocument, config = state.config;
    var size = (0, useWindowSize_1.useWindowSize)();
    var t = (0, useTranslation_1.useTranslation)().t;
    var containerRef = (0, react_1.useCallback)(function (node) {
        node && dispatch((0, actions_1.setRendererRect)(node === null || node === void 0 ? void 0 : node.getBoundingClientRect()));
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [size]);
    var fileName = (0, getFileName_1.getFileName)(currentDocument, ((_a = config === null || config === void 0 ? void 0 : config.header) === null || _a === void 0 ? void 0 : _a.retainURLParams) || false);
    var Contents = function () {
        var _a, _b, _c;
        if (!documents.length) {
            return react_1.default.createElement("div", { id: "no-documents" });
        }
        else if (documentLoading) {
            if (config && ((_a = config === null || config === void 0 ? void 0 : config.loadingRenderer) === null || _a === void 0 ? void 0 : _a.overrideComponent)) {
                var OverrideComponent = config.loadingRenderer.overrideComponent;
                return (react_1.default.createElement(LoadingTimout_1.LoadingTimeout, null,
                    react_1.default.createElement(OverrideComponent, { document: currentDocument, fileName: fileName })));
            }
            return (react_1.default.createElement(LoadingTimout_1.LoadingTimeout, null,
                react_1.default.createElement(LoadingContainer, { id: "loading-renderer", "data-testid": "loading-renderer" },
                    react_1.default.createElement(LoadingIconContainer, null,
                        react_1.default.createElement(icons_1.LoadingIcon, { color: "#444", size: 40 })))));
        }
        else {
            if (CurrentRenderer) {
                return react_1.default.createElement(CurrentRenderer, { mainState: state });
            }
            else if (CurrentRenderer === undefined) {
                return null;
            }
            else {
                if (config && ((_b = config === null || config === void 0 ? void 0 : config.noRenderer) === null || _b === void 0 ? void 0 : _b.overrideComponent)) {
                    var OverrideComponent = config.noRenderer.overrideComponent;
                    return (react_1.default.createElement(OverrideComponent, { document: currentDocument, fileName: fileName }));
                }
                return (react_1.default.createElement("div", { id: "no-renderer", "data-testid": "no-renderer" },
                    t("noRendererMessage", {
                        fileType: (_c = currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.fileType) !== null && _c !== void 0 ? _c : "",
                    }),
                    react_1.default.createElement(DownloadButton, { id: "no-renderer-download", href: currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.uri, download: currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.uri }, t("downloadButtonLabel"))));
            }
        }
    };
    return (react_1.default.createElement(Container, { id: "proxy-renderer", "data-testid": "proxy-renderer", ref: containerRef },
        react_1.default.createElement(Contents, null)));
};
exports.ProxyRenderer = ProxyRenderer;
var Container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex: 1;\n  overflow-y: auto;\n"], ["\n  display: flex;\n  flex: 1;\n  overflow-y: auto;\n"])));
var LoadingContainer = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  flex: 1;\n  height: 75px;\n  align-items: center;\n  justify-content: center;\n"], ["\n  display: flex;\n  flex: 1;\n  height: 75px;\n  align-items: center;\n  justify-content: center;\n"])));
var spinAnim = (0, styled_components_1.keyframes)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n"], ["\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n"])));
var LoadingIconContainer = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  animation-name: ", ";\n  animation-duration: 4s;\n  animation-timing-function: linear;\n  animation-iteration-count: infinite;\n"], ["\n  animation-name: ", ";\n  animation-duration: 4s;\n  animation-timing-function: linear;\n  animation-iteration-count: infinite;\n"])), spinAnim);
var DownloadButton = (0, styled_components_1.default)(common_1.LinkButton)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  width: 130px;\n  height: 30px;\n  background-color: ", ";\n  @media (max-width: 768px) {\n    width: 125px;\n    height: 25px;\n  }\n"], ["\n  width: 130px;\n  height: 30px;\n  background-color: ", ";\n  @media (max-width: 768px) {\n    width: 125px;\n    height: 25px;\n  }\n"])), function (props) { return props.theme.primary; });
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
