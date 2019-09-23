"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

require("./style.less");

var _antd = require("antd");

var _common = require("./common");

var _ImageModal = _interopRequireDefault(require("./ImageModal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var UploadImages =
/*#__PURE__*/
function (_Component) {
  _inherits(UploadImages, _Component);

  function UploadImages() {
    var _this;

    _classCallCheck(this, UploadImages);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UploadImages).apply(this, arguments));
    _this.state = {
      previewVisible: false,
      previewImage: null,
      uploadMess: _this.props.uploadMess || [],
      id: new Date().getTime() + (_this.props.id || "CC1")
    };

    _this.showMaodal = function (url, width) {
      _this.setState({
        previewVisible: true,
        previewImage: url,
        modalwiddth: width
      });
    };

    _this.deleteFile = function (url) {
      var file = document.getElementById(_this.state.id);

      if (file) {
        file.value = "";
      }

      if (_this.state.uploadMess && _this.state.uploadMess.length > 0) {
        _this.state.uploadMess.map(function (item, index) {
          if (item.url == url) {
            _this.state.uploadMess.splice(index, 1);

            _this.setState({
              uploadMess: _this.state.uploadMess
            }, function () {
              _this.props.onChange(null);
            });

            return;
          }
        });
      } //this.props.deleteFile(url)

    };

    _this.handleCancel = function () {
      _this.setState({
        previewVisible: false
      });
    };

    _this.changeV = function (preval, now) {
      if (!preval && now[0].aliurl) {
        _this.props.onChange(now);
      }

      if (preval && now) {
        if (preval[0] && now[0] && now[0].aliurl != preval[0].aliurl) {
          _this.props.onChange(now);
        }
      }
    };

    _this.handleFileChange = function (file) {
      if (file) {
        var fileReader = new FileReader();

        fileReader.onload = function (e) {
          var dataURL = e.target.result;

          _this.setState({
            imgSrc: dataURL
          }, function () {
            _this.setState({
              editImageModalVisible: true
            });
          });
        };

        fileReader.readAsDataURL(file);

        _this.setState({
          selectedImageFile: file
        });
      }
    };

    _this.uploadImags = function (event) {
      var uploadMess = _this.state.uploadMess;
      var file = event.target.files[0];
      console.log(uploadMess);
      console.log("filefilefilefilefile");
      console.log(file);

      if (!/\/(gif|jpg|jpeg|bmp|png)$/.test(file.type)) {
        _antd.message.error("只能上传图片");

        return;
      } // 添加判断条件 截图插件追加   cropper=true


      if (_this.props.cropper) {
        //截图上传逻辑
        _this.handleFileChange(file);

        return;
      }

      var url = (0, _common.getObjectURL)(file);
      var pRadio = _this.props.radio; //图片比例 可有可无  参数形式 '宽/高'

      if (pRadio) {
        var mess = "请上传比例为" + pRadio + "的图片！";
        var radio;

        if (pRadio == "square") {
          mess = "请上传比例为1:1的图片";
          radio = 1;
        } else if (pRadio == "wide") {
          mess = "请上传比例为16:9的图片";
          radio = (16 / 9).toFixed(2);
        } else {
          var datas = pRadio.split("/");

          if (datas && datas.length == 2) {
            var left = Number(datas[0]) * 1;
            var right = Number(datas[1]) * 1;
            radio = (left / right).toFixed(2);
          }
        }

        var img = new Image();

        img.onload = function () {
          var w = img.width;
          var h = img.height; //获取图片原始尺寸

          if ((w / h).toFixed(2) != radio) {
            _antd.message.error(mess);

            return;
          }

          if (url) {
            _this.startLoading(uploadMess, url);
          }

          if (file) {
            _this.uploadImagsAli(file, uploadMess);
          }
        };

        img.src = url;
      } else {
        if (url) {
          _this.startLoading(uploadMess, url);
        }

        if (file) {
          _this.uploadImagsAli(file, uploadMess);
        }
      }
    };

    _this.startLoading = function (uploadMess, url) {
      var data = [];

      if (uploadMess) {
        uploadMess.push({
          url: url,
          fail: "loading"
        });
        data = uploadMess;
      } else {
        data.push({
          url: url,
          fail: "loading"
        });
      }

      uploadMess = data;

      _this.setState({
        uploadMess: uploadMess
      }, function () {// this.props.onChange(uploadMess)
      });
    };

    _this.uploadImagsAli = function (file, uploadMess) {
      if (!_this.props.clientOss) {
        _antd.message.error("没有阿里上传的凭证,请先获取");

        return;
      }

      if (file) {
        var self = _assertThisInitialized(_this);

        var fileO = file.name.split(".");
        var ownName = fileO[fileO.length - 1];
        var key = _this.props.keyOss + "/" + new Date().getTime() + "." + ownName; //+file.name  随机名称
        //const key = this.props.keyOss+"/"+(new Date()).getTime()+file.name;

        console.log("上传啊");
        (0, _common.uploadFile)(file, _this.props.clientOss, key, uploadMess.length).then(function (res) {
          console.log(122222222222222222222);
          console.log(res);
          var resultAliUrl = res.res.requestUrls[0];
          var successIndex = res.successIndex;

          if (uploadMess && uploadMess.length > 0) {
            uploadMess.map(function (item, index) {
              if (index == successIndex - 1) {
                //上传成功
                uploadMess[index].fail = "false";
                uploadMess[index].aliurl = resultAliUrl;
                self.setState({
                  uploadMess: uploadMess
                });

                _this.props.onChange(uploadMess);

                return;
              }
            });
          }

          self.setState({
            uploadMess: uploadMess
          });
        }, function (error) {
          console.log("失败了？？？ ");
          console.log(error);
          var failIndex = error.failIndex; //第几个

          if (uploadMess && uploadMess.length > 0) {
            uploadMess.map(function (item, index) {
              if (index == failIndex - 1) {
                //上传失败
                uploadMess[index].fail = "true";
                self.setState({
                  uploadMess: uploadMess
                });
                return;
              }
            });
          }
        });
      } // uploadMess

    };

    _this.uploadImageElement = function (uploadMess) {
      console.log(uploadMess); /// this.props.onChange(uploadMess)

      if (uploadMess && uploadMess.length > 0) {
        return uploadMess.map(function (item, index) {
          console.log("itemitemitemitem");
          console.log(item);
          var img = new Image();
          var natureSizeWidth = img.width;
          var natureSizeHeight = img.height;

          img.onload = function () {
            natureSizeWidth = img.width;
            natureSizeHeight = img.height; //获取图片原始尺寸 　console.log(w + "  " + h)
          };

          img.src = item.url;
          var mess = "";

          if (item.fail == "loading") {
            mess = "上传中";
          }

          if (item.fail == "true") {
            mess = "上传失败";
          }

          return _react["default"].createElement("div", {
            key: index,
            className: "block",
            style: {
              borderColor: item.fail == "true" ? "red" : "#dfdfdf"
            }
          }, _react["default"].createElement("div", {
            className: "blockinner",
            style: {
              width: "100%",
              height: "100%",
              overflow: "hidden"
            }
          }, _react["default"].createElement("span", {
            className: "reporate"
          }, _react["default"].createElement("span", {
            className: "inconWrap"
          }, !_this.props.disabled && _react["default"].createElement(_antd.Icon, {
            className: "icons",
            type: "delete",
            onClick: function onClick() {
              _this.deleteFile(item.url);
            }
          }), _react["default"].createElement(_antd.Icon, {
            className: "icons",
            type: "eye-o",
            onClick: function onClick() {
              _this.showMaodal(item.url, natureSizeWidth);
            }
          }))), _react["default"].createElement("p", {
            className: " $\"uploadState} ".concat(item.fail == "true" ? "error" : "")
          }, mess), _react["default"].createElement("img", {
            style: {
              width: "100%",
              height: "auto"
            },
            src: item.url
          })));
        });
      }
    };

    return _this;
  }

  _createClass(UploadImages, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      // Should be a controlled component.
      console.log("nextProps");
      console.log(nextProps);

      if ("uploadMess" in nextProps && nextProps.uploadMess) {
        var value = nextProps.value ? nextProps.value.toString() : nextProps.value;
        this.setState({
          uploadMess: nextProps.uploadMess
        }); // this.changeV(this.state.uploadMess,nextProps.uploadMess)
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          previewVisible = _this$state.previewVisible,
          previewImage = _this$state.previewImage,
          modalwiddth = _this$state.modalwiddth;
      var showWidth = modalwiddth ? modalwiddth < 400 ? 500 : modalwiddth : 500;
      showWidth = showWidth > document.body.clientWidth ? document.body.clientWidth : showWidth;
      var limit = this.props.limit;
      var limituploadMess = this.state.uploadMess;
      var pRadio = this.props.radio;
      var aspectRatio = 1;

      if (pRadio) {
        if (pRadio == "square") {
          aspectRatio = 1;
        } else if (pRadio == "wide") {
          aspectRatio = 16 / 9;
        } else {
          var datas = pRadio.split("/");

          if (datas && datas.length == 2) {
            var left = Number(datas[0]) * 1;
            var right = Number(datas[1]) * 1;
            aspectRatio = left / right;
          }
        }
      }

      var modalProps = {
        aspectRatio: aspectRatio,
        modalVisible: this.state.editImageModalVisible,
        handleAdd: function handleAdd(fileCrop) {
          _this2.setState({
            fileCrop: fileCrop
          });

          console.log(fileCrop);
          console.log((0, _common.getObjectURL)(fileCrop)); // if (this.fileUp) {
          //   //this.fileUp.value = fileCrop;
          // }

          var urls = (0, _common.getObjectURL)(fileCrop);
          var uploadMess = _this2.state.uploadMess;

          _this2.setState({
            editImageModalVisible: false,
            coperurl: urls
          });

          if (urls) {
            _this2.startLoading(uploadMess, urls);
          }

          if (fileCrop) {
            _this2.uploadImagsAli(fileCrop, uploadMess);
          }
        },
        handleModalVisible: function handleModalVisible() {
          _this2.setState({
            editImageModalVisible: false
          });
        },
        imgSrc: this.state.imgSrc
      };
      return _react["default"].createElement("div", {
        className: "ali_upload"
      }, _react["default"].createElement(_ImageModal["default"], modalProps), this.props.tips && this.props.tips(), this.uploadImageElement(this.state.uploadMess), (limit && limituploadMess && limituploadMess.length < limit || !limit || !limituploadMess) && !this.props.disabled && _react["default"].createElement("a", {
        href: "javascript:;",
        className: "upload"
      }, _react["default"].createElement(_antd.Icon, {
        type: "plus"
      }), "\u4E0A\u4F20\u56FE\u7247", _react["default"].createElement("input", {
        type: "file",
        id: this.state.id,
        className: "change",
        onChange: this.uploadImags
      })), _react["default"].createElement(_antd.Modal, {
        width: showWidth,
        maskClosable: true,
        visible: previewVisible,
        footer: null,
        onCancel: this.handleCancel
      }, _react["default"].createElement("img", {
        alt: "example",
        style: {
          width: "100%",
          maxWidth: "100%"
        },
        src: previewImage
      })));
    }
  }]);

  return UploadImages;
}(_react.Component);

var _default = UploadImages;
exports["default"] = _default;
//# sourceMappingURL=uploadImage.js.map
