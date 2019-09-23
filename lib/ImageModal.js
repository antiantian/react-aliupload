"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

require("cropperjs/dist/cropper.css");

var _reactCropper = _interopRequireDefault(require("react-cropper"));

require("./copper.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var CreateForm = function CreateForm(props) {
  var Modalcropper = null;
  var modalVisible = props.modalVisible,
      handleAdd = props.handleAdd,
      handleModalVisible = props.handleModalVisible,
      imgSrc = props.imgSrc,
      aspectRatio = props.aspectRatio;

  var submit = function submit() {
    if (Modalcropper) {
      var croppedCanvas = Modalcropper.getCroppedCanvas();
      croppedCanvas.toBlob(function (blob) {
        return __awaiter(void 0, void 0, void 0,
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee() {
          var filedata, file;
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  // 图片name添加到blob对象里
                  blob.name = "athen"; // 创建提交表单数据对象

                  filedata = new FormData(); // 添加要上传的文件

                  filedata.append("file", blob, blob.name);
                  file = new File([blob], "filename", {
                    type: "image/jpeg",
                    lastModified: Date.now()
                  });
                  handleAdd(file); // try {
                  //   // 接口
                  //   let res = await upload(filedata, token);
                  //   if (res.errCode === 0) {
                  //     // 上传成功
                  //   } else {
                  //     // 上传失败
                  //   }
                  // } catch (err) {
                  //   console.log(err);
                  // }

                case 5:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));
      }, "image/jpeg");
    }
  };

  var cropW = function cropW(e) {
    var data = e.detail; // this.setState({
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

  var reset = function reset() {
    Modalcropper.reset();
  };

  return _react["default"].createElement(_antd.Modal, {
    width: 800,
    destroyOnClose: true,
    maskClosable: false,
    title: "裁剪图片",
    visible: modalVisible,
    onOk: submit,
    onCancel: function onCancel() {
      return handleModalVisible();
    }
  }, _react["default"].createElement("div", {
    className: "preview-parent"
  }, _react["default"].createElement(_reactCropper["default"], {
    style: {
      width: 450,
      height: 450
    },
    src: imgSrc,
    className: "company-logo-cropper",
    ref: function ref(cropper) {
      return Modalcropper = cropper;
    } // Cropper.js options
    ,
    zoomable: true,
    cropBoxMovable: false,
    cropBoxResizable: false,
    aspectRatio: aspectRatio // 这个是设置比例的参数 我这里设置的1:1
    ,
    guides: true,
    dragMode: "move",
    minCropBoxWidth: 300,
    minCropBoxHeight: 300,
    toggleDragModeOnDblclick: false,
    autoCropArea: 1,
    crop: cropW,
    preview: ".cropper-preview",
    viewMode: 1
  }), _react["default"].createElement("div", {
    className: "preview-container"
  }, _react["default"].createElement("div", {
    className: "cropper-preview"
  }), _react["default"].createElement("div", {
    className: "docs-data"
  }, _react["default"].createElement("div", {
    className: "input-group input-group-sm"
  }, _react["default"].createElement("span", {
    className: "input-group-prepend"
  }, _react["default"].createElement("label", {
    className: "input-group-text"
  }, "\u5BBD\u5EA6\uFF1A")), _react["default"].createElement("span", {
    className: "form-control",
    id: "dataWidth"
  }), _react["default"].createElement("span", {
    className: "input-group-append"
  }, _react["default"].createElement("span", {
    className: "input-group-text"
  }, "px"))), _react["default"].createElement("div", {
    className: "input-group input-group-sm"
  }, _react["default"].createElement("span", {
    className: "input-group-prepend"
  }, _react["default"].createElement("label", {
    className: "input-group-text"
  }, "\u9AD8\u5EA6\uFF1A")), _react["default"].createElement("span", {
    className: "form-control",
    id: "dataHeight"
  }), _react["default"].createElement("span", {
    className: "input-group-append"
  }, _react["default"].createElement("span", {
    className: "input-group-text"
  }, "px")))), _react["default"].createElement("div", {
    className: "resetBtn",
    onClick: reset
  }, "\u6E05\u7A7A\u64CD\u4F5C")), Modalcropper && Modalcropper.getCroppedCanvas()));
};
/*
 style={{ width: '100%', height: 400 }}
        minCropBoxWidth={300}
        minCropBoxHeight={300}
*/


var _default = CreateForm;
exports["default"] = _default;
//# sourceMappingURL=ImageModal.js.map
