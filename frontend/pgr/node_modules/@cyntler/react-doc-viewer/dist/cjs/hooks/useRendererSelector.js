"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRendererSelector = void 0;
var react_1 = require("react");
var DocViewerProvider_1 = require("../store/DocViewerProvider");
var useRendererSelector = function () {
    var _a = (0, react_1.useContext)(DocViewerProvider_1.DocViewerContext).state, currentDocument = _a.currentDocument, pluginRenderers = _a.pluginRenderers;
    var _b = (0, react_1.useState)(), CurrentRenderer = _b[0], setCurrentRenderer = _b[1];
    (0, react_1.useEffect)(function () {
        if (!currentDocument)
            return;
        if (!currentDocument.fileType) {
            setCurrentRenderer(undefined);
            return;
        }
        var matchingRenderers = [];
        pluginRenderers === null || pluginRenderers === void 0 ? void 0 : pluginRenderers.forEach(function (r) {
            if (currentDocument.fileType === undefined)
                return;
            if (r.fileTypes.indexOf(currentDocument.fileType) >= 0) {
                matchingRenderers.push(r);
            }
        });
        var SelectedRenderer = matchingRenderers.sort(function (a, b) { return b.weight - a.weight; })[0];
        if (SelectedRenderer && SelectedRenderer !== undefined) {
            setCurrentRenderer(function () { return SelectedRenderer; });
        }
        else {
            setCurrentRenderer(null);
        }
    }, [currentDocument, pluginRenderers]);
    return { CurrentRenderer: CurrentRenderer };
};
exports.useRendererSelector = useRendererSelector;
