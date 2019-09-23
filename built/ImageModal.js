var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
import React from "react";
import { Modal } from "antd";
import "cropperjs/dist/cropper.css";
import Cropper from "react-cropper";
import "./copper.less";
var CreateForm = function (props) {
    var Modalcropper = null;
    var modalVisible = props.modalVisible, handleAdd = props.handleAdd, handleModalVisible = props.handleModalVisible, imgSrc = props.imgSrc, aspectRatio = props.aspectRatio;
    var submit = function () {
        if (Modalcropper) {
            var croppedCanvas = Modalcropper.getCroppedCanvas();
            croppedCanvas.toBlob(function (blob) { return __awaiter(_this, void 0, void 0, function () {
                var filedata, file;
                return __generator(this, function (_a) {
                    // 图片name添加到blob对象里
                    blob.name = "athen";
                    filedata = new FormData();
                    // 添加要上传的文件
                    filedata.append("file", blob, blob.name);
                    file = new File([blob], "filename", {
                        type: "image/jpeg",
                        lastModified: Date.now()
                    });
                    handleAdd(file);
                    return [2 /*return*/];
                });
            }); }, "image/jpeg");
        }
    };
    var cropW = function (e) {
        var data = e.detail;
        // this.setState({
        //   dataWidth: Math.round(data.width),
        //   dataHeight: Math.round(data.height),
        // });
        var dataHeight = document.getElementById("dataHeight");
        var dataWidth = document.getElementById("dataWidth");
        if (dataHeight) {
            dataHeight.innerText = Math.round(data.height);
        }
        if (dataWidth) {
            dataWidth.innerText = Math.round(data.width);
        }
        /*
        console.log(e.type);
        dataX.value = Math.round(data.x);
        dataY.value = Math.round(data.y);
        dataHeight.value = Math.round(data.height);
        dataWidth.value = Math.round(data.width);
        dataRotate.value = typeof data.rotate !== 'undefined' ? data.rotate : '';
        dataScaleX.value = typeof data.scaleX !== 'undefined' ? data.scaleX : '';
        dataScaleY.value = typeof data.scaleY !== 'undefined' ? data.scaleY : '';
         */
    };
    var reset = function () {
        Modalcropper.reset();
    };
    return (React.createElement(Modal, { width: 800, destroyOnClose: true, maskClosable: false, title: "裁剪图片", visible: modalVisible, onOk: submit, onCancel: function () { return handleModalVisible(); } },
        React.createElement("div", { className: "preview-parent" },
            React.createElement(Cropper, { style: { width: 450, height: 450 }, src: imgSrc, className: "company-logo-cropper", ref: function (cropper) { return (Modalcropper = cropper); }, 
                // Cropper.js options
                zoomable: true, cropBoxMovable: false, cropBoxResizable: false, aspectRatio: aspectRatio, guides: true, dragMode: "move", minCropBoxWidth: 300, minCropBoxHeight: 300, toggleDragModeOnDblclick: false, autoCropArea: 1, crop: cropW, preview: ".cropper-preview", viewMode: 1 }),
            React.createElement("div", { className: "preview-container" },
                React.createElement("div", { className: "cropper-preview" }),
                React.createElement("div", { className: "docs-data" },
                    React.createElement("div", { className: "input-group input-group-sm" },
                        React.createElement("span", { className: "input-group-prepend" },
                            React.createElement("label", { className: "input-group-text" }, "\u5BBD\u5EA6\uFF1A")),
                        React.createElement("span", { className: "form-control", id: "dataWidth" }),
                        React.createElement("span", { className: "input-group-append" },
                            React.createElement("span", { className: "input-group-text" }, "px"))),
                    React.createElement("div", { className: "input-group input-group-sm" },
                        React.createElement("span", { className: "input-group-prepend" },
                            React.createElement("label", { className: "input-group-text" }, "\u9AD8\u5EA6\uFF1A")),
                        React.createElement("span", { className: "form-control", id: "dataHeight" }),
                        React.createElement("span", { className: "input-group-append" },
                            React.createElement("span", { className: "input-group-text" }, "px")))),
                React.createElement("div", { className: "resetBtn", onClick: reset }, "\u6E05\u7A7A\u64CD\u4F5C")),
            Modalcropper && Modalcropper.getCroppedCanvas())));
};
/*
 style={{ width: '100%', height: 400 }}
        minCropBoxWidth={300}
        minCropBoxHeight={300}
*/
export default CreateForm;
//# sourceMappingURL=ImageModal.js.map