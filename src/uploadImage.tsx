/**
 *
 * @authors zcy (1366969408@qq.com)
 * @date    2018-03-20 16:52:27
 * @version $Id$
 */
import React, { Component } from "react";
import { Modal, message, Icon, Input, Button } from "antd";
import "./style.less";

import { uploadFile, getObjectURL } from "./common";
import { ITEMT, UpProps } from "./interface";
import ImageModal from "./ImageModal";
interface BasicState {
  previewVisible: boolean;
  previewImage: string | null;
  uploadMess: ITEMT[];
  id: string;
  modalwiddth?: number;
  [propName: string]: any;
}

class UploadImages extends Component<UpProps, BasicState> {
  state: BasicState = {
    previewVisible: false,
    previewImage: null,
    uploadMess: this.props.uploadMess || [],
    id: new Date().getTime() + (this.props.id || "CC1")
  };
  componentDidMount() {}
  componentWillReceiveProps(nextProps: any) {
    // Should be a controlled component.
    console.log("nextProps");
    console.log(nextProps);
    if ("uploadMess" in nextProps && nextProps.uploadMess) {
      const value = nextProps.value
        ? nextProps.value.toString()
        : nextProps.value;
      this.setState({
        uploadMess: nextProps.uploadMess
      });
      // this.changeV(this.state.uploadMess,nextProps.uploadMess)
    }
  }
  showMaodal = (url: string, width: number) => {
    this.setState({
      previewVisible: true,
      previewImage: url,
      modalwiddth: width
    });
  };
  deleteFile = (url: string) => {
    var file: any = document.getElementById(this.state.id);
    if (file) {
      file.value = "";
    }
    if (this.state.uploadMess && this.state.uploadMess.length > 0) {
      this.state.uploadMess.map((item, index: number) => {
        if (item.url == url) {
          this.state.uploadMess.splice(index, 1);
          this.setState(
            {
              uploadMess: this.state.uploadMess
            },
            () => {
              this.props.onChange(null);
            }
          );
          return;
        }
      });
    }
    //this.props.deleteFile(url)
  };
  handleCancel = () => {
    this.setState({
      previewVisible: false
    });
  };
  changeV = (preval: any, now: any) => {
    if (!preval && now[0].aliurl) {
      this.props.onChange(now);
    }
    if (preval && now) {
      if (preval[0] && now[0] && now[0].aliurl != preval[0].aliurl) {
        this.props.onChange(now);
      }
    }
  };
  handleFileChange = (file: File) => {
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const dataURL = e.target.result;
        this.setState({ imgSrc: dataURL }, () => {
          this.setState({
            editImageModalVisible: true
          });
        });
      };

      fileReader.readAsDataURL(file);
      this.setState({
        selectedImageFile: file
      });
    }
  };
  uploadImags = (event: any) => {
    let uploadMess = this.state.uploadMess;
    var file = event.target.files[0];
    console.log(uploadMess);
    console.log("filefilefilefilefile");
    console.log(file);
    if (!/\/(gif|jpg|jpeg|bmp|png)$/.test(file.type)) {
      message.error("只能上传图片");
      return;
    }
    // 添加判断条件 截图插件追加   cropper=true
    if (this.props.cropper) {
      //截图上传逻辑
      this.handleFileChange(file);
      return;
    }
    let url = getObjectURL(file);
    let pRadio = this.props.radio;
    //图片比例 可有可无  参数形式 '宽/高'
    if (pRadio) {
      let mess = "请上传比例为" + pRadio + "的图片！";
      let radio: any;
      if (pRadio == "square") {
        mess = "请上传比例为1:1的图片";
        radio = 1;
      } else if (pRadio == "wide") {
        mess = "请上传比例为16:9的图片";
        radio = (16 / 9).toFixed(2);
      } else {
        let datas = pRadio.split("/");
        if (datas && datas.length == 2) {
          let left: number = Number(datas[0]) * 1;
          let right: number = Number(datas[1]) * 1;
          radio = (left / right).toFixed(2);
        }
      }
      let img = new Image();
      img.onload = () => {
        let w = img.width;
        let h = img.height; //获取图片原始尺寸
        if ((w / h).toFixed(2) != radio) {
          message.error(mess);
          return;
        }
        if (url) {
          this.startLoading(uploadMess, url);
        }
        if (file) {
          this.uploadImagsAli(file, uploadMess);
        }
      };
      img.src = url;
    } else {
      if (url) {
        this.startLoading(uploadMess, url);
      }
      if (file) {
        this.uploadImagsAli(file, uploadMess);
      }
    }
  };
  startLoading = (uploadMess: ITEMT[], url: string) => {
    let data = [];

    if (uploadMess) {
      uploadMess.push({ url: url, fail: "loading" });
      data = uploadMess;
    } else {
      data.push({ url: url, fail: "loading" });
    }
    uploadMess = data;
    this.setState(
      {
        uploadMess: uploadMess
      },
      () => {
        // this.props.onChange(uploadMess)
      }
    );
  };
  uploadImagsAli = (file: File, uploadMess: any[]) => {
    if (!this.props.clientOss) {
      message.error("没有阿里上传的凭证,请先获取");
      return;
    }
    if (file) {
      const self = this;
      const fileO = file.name.split(".");
      let ownName = fileO[fileO.length - 1];
      const key =
        this.props.keyOss + "/" + new Date().getTime() + "." + ownName; //+file.name  随机名称
      //const key = this.props.keyOss+"/"+(new Date()).getTime()+file.name;
      console.log("上传啊");
      uploadFile(file, this.props.clientOss, key, uploadMess.length).then(
        (res: any) => {
          console.log(122222222222222222222);
          console.log(res);
          let resultAliUrl = res.res.requestUrls[0];
          let successIndex = res.successIndex;
          if (uploadMess && uploadMess.length > 0) {
            uploadMess.map((item, index) => {
              if (index == successIndex - 1) {
                //上传成功
                uploadMess[index].fail = "false";
                uploadMess[index].aliurl = resultAliUrl;
                self.setState({
                  uploadMess: uploadMess
                });
                this.props.onChange(uploadMess);
                return;
              }
            });
          }
          self.setState({
            uploadMess: uploadMess
          });
        },
        function(error: any) {
          console.log("失败了？？？ ");
          console.log(error);
          let failIndex = error.failIndex; //第几个
          if (uploadMess && uploadMess.length > 0) {
            uploadMess.map((item, index) => {
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
        }
      );
    }

    // uploadMess
  };

  uploadImageElement = (uploadMess: ITEMT[]) => {
    console.log(uploadMess);
    /// this.props.onChange(uploadMess)
    if (uploadMess && uploadMess.length > 0) {
      return uploadMess.map((item, index: number) => {
        console.log("itemitemitemitem");
        console.log(item);
        let img: any = new Image();
        let natureSizeWidth = img.width;
        let natureSizeHeight = img.height;
        img.onload = function() {
          natureSizeWidth = img.width;
          natureSizeHeight = img.height; //获取图片原始尺寸 　console.log(w + "  " + h)
        };
        img.src = item.url;

        let mess = "";
        if (item.fail == "loading") {
          mess = "上传中";
        }
        if (item.fail == "true") {
          mess = "上传失败";
        }
        return (
          <div
            key={index}
            className="block"
            style={{
              borderColor: item.fail == "true" ? "red" : "#dfdfdf"
            }}
          >
            <div
              className="blockinner"
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden"
              }}
            >
              <span className="reporate">
                <span className="inconWrap">
                  {!this.props.disabled && (
                    <Icon
                      className="icons"
                      type="delete"
                      onClick={() => {
                        this.deleteFile(item.url);
                      }}
                    />
                  )}
                  <Icon
                    className="icons"
                    type="eye-o"
                    onClick={() => {
                      this.showMaodal(item.url, natureSizeWidth);
                    }}
                  />
                </span>
              </span>

              <p
                className={` $"uploadState} ${
                  item.fail == "true" ? "error" : ""
                }`}
              >
                {mess}
              </p>
              <img style={{ width: "100%", height: "auto" }} src={item.url} />
            </div>
          </div>
        );
      });
    }
  };

  render() {
    const { previewVisible, previewImage, modalwiddth } = this.state;
    let showWidth = modalwiddth ? (modalwiddth < 400 ? 500 : modalwiddth) : 500;
    showWidth =
      showWidth > document.body.clientWidth
        ? document.body.clientWidth
        : showWidth;
    const limit = this.props.limit;
    const limituploadMess = this.state.uploadMess;
    let pRadio = this.props.radio;
    let aspectRatio = 1;
    if (pRadio) {
      if (pRadio == "square") {
        aspectRatio = 1;
      } else if (pRadio == "wide") {
        aspectRatio = 16 / 9;
      } else {
        let datas = pRadio.split("/");
        if (datas && datas.length == 2) {
          let left: number = Number(datas[0]) * 1;
          let right: number = Number(datas[1]) * 1;
          aspectRatio = left / right;
        }
      }
    }

    const modalProps = {
      aspectRatio: aspectRatio,
      modalVisible: this.state.editImageModalVisible,
      handleAdd: (fileCrop: File) => {
        this.setState({
          fileCrop: fileCrop
        });
        console.log(fileCrop);
        console.log(getObjectURL(fileCrop));
        // if (this.fileUp) {
        //   //this.fileUp.value = fileCrop;
        // }
        let urls = getObjectURL(fileCrop);
        let uploadMess = this.state.uploadMess;
        this.setState({
          editImageModalVisible: false,
          coperurl: urls
        });

        if (urls) {
          this.startLoading(uploadMess, urls);
        }
        if (fileCrop) {
          this.uploadImagsAli(fileCrop, uploadMess);
        }
      },
      handleModalVisible: () => {
        this.setState({
          editImageModalVisible: false
        });
      },
      imgSrc: this.state.imgSrc
    };
    return (
      <div>
        <ImageModal {...modalProps} />
        {this.props.tips && this.props.tips()}
        {this.uploadImageElement(this.state.uploadMess)}
        {((limit && limituploadMess && limituploadMess.length < limit) ||
          !limit ||
          !limituploadMess) &&
          !this.props.disabled && (
            <a href="javascript:;" className="upload">
              <Icon type="plus" />
              上传图片
              <input
                type="file"
                id={this.state.id}
                className="change"
                onChange={this.uploadImags}
              />
            </a>
          )}

        <Modal
          width={showWidth}
          maskClosable={true}
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img
            alt="example"
            style={{ width: "100%", maxWidth: "100%" }}
            src={previewImage}
          />
        </Modal>
      </div>
    );
  }
}

export default UploadImages;
