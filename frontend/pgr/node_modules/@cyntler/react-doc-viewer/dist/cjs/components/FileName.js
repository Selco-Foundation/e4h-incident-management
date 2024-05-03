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
exports.FileName = void 0;
var react_1 = __importStar(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var DocViewerProvider_1 = require("../store/DocViewerProvider");
var getFileName_1 = require("../utils/getFileName");
var FileName = function () {
    var _a, _b;
    var _c = (0, react_1.useContext)(DocViewerProvider_1.DocViewerContext).state, config = _c.config, currentDocument = _c.currentDocument;
    if (!currentDocument || ((_a = config === null || config === void 0 ? void 0 : config.header) === null || _a === void 0 ? void 0 : _a.disableFileName))
        return null;
    var fileName = (0, getFileName_1.getFileName)(currentDocument, ((_b = config === null || config === void 0 ? void 0 : config.header) === null || _b === void 0 ? void 0 : _b.retainURLParams) || false);
    return (react_1.default.createElement(Container, { id: "file-name", "data-testid": "file-name" }, fileName));
};
exports.FileName = FileName;
var Container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  flex: 1;\n  text-align: left;\n  color: ", ";\n  font-weight: bold;\n  margin: 0 10px;\n  overflow: hidden;\n"], ["\n  flex: 1;\n  text-align: left;\n  color: ", ";\n  font-weight: bold;\n  margin: 0 10px;\n  overflow: hidden;\n"])), function (props) { return props.theme.textPrimary; });
var templateObject_1;
