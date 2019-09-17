import { Form, Input, Modal, Select, Switch } from "antd";
import { FormComponentProps } from "antd/es/form";
import React from "react";

import "cropperjs/dist/cropper.css";
import Cropper from "react-cropper";
import "./copper.less";
interface CreateFormProps {
  [propsname: string]: any;
}
const CreateForm: React.FC<CreateFormProps> = props => {
  let Modalcropper: any = null;
  const {
    modalVisible,
    handleAdd,
    handleModalVisible,
    imgSrc,
    aspectRatio
  } = props;

  const submit = () => {
    if (Modalcropper) {
      let croppedCanvas = Modalcropper.getCroppedCanvas();
      croppedCanvas.toBlob(async blob => {
        // 图片name添加到blob对象里
        blob.name = "athen";
        // 创建提交表单数据对象
        const filedata = new FormData();
        // 添加要上传的文件
        filedata.append("file", blob, blob.name);

        var file = new File([blob], "filename", {
          type: "image/jpeg",
          lastModified: Date.now()
        });
        handleAdd(file);
        // try {
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
      }, "image/jpeg");
    }
  };
  const cropW = e => {
    var data = e.detail;
    // this.setState({
    //   dataWidth: Math.round(data.width),
    //   dataHeight: Math.round(data.height),
    // });
    var dataHeight: any = document.getElementById("dataHeight");
    var dataWidth: any = document.getElementById("dataWidth");
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
  const reset = () => {
    Modalcropper.reset();
  };
  return (
    <Modal
      width={800}
      destroyOnClose
      maskClosable={false}
      title={"裁剪图片"}
      visible={modalVisible}
      onOk={submit}
      onCancel={() => handleModalVisible()}
    >
      <div className="preview-parent">
        <Cropper
          style={{ width: 450, height: 450 }}
          src={imgSrc}
          className="company-logo-cropper"
          ref={(cropper: any) => (Modalcropper = cropper)}
          // Cropper.js options

          zoomable={true}
          cropBoxMovable={false}
          cropBoxResizable={false}
          aspectRatio={aspectRatio} // 这个是设置比例的参数 我这里设置的1:1
          guides={true}
          dragMode={"move"}
          minCropBoxWidth={300}
          minCropBoxHeight={300}
          toggleDragModeOnDblclick={false}
          autoCropArea={1}
          crop={cropW}
          preview=".cropper-preview"
          viewMode={1}
        />
        <div className="preview-container">
          <div className="cropper-preview" />
          <div className="docs-data">
            <div className="input-group input-group-sm">
              <span className="input-group-prepend">
                <label className="input-group-text">宽度：</label>
              </span>
              <span className="form-control" id="dataWidth" />
              <span className="input-group-append">
                <span className="input-group-text">px</span>
              </span>
            </div>
            <div className="input-group input-group-sm">
              <span className="input-group-prepend">
                <label className="input-group-text">高度：</label>
              </span>
              <span className="form-control" id="dataHeight" />
              <span className="input-group-append">
                <span className="input-group-text">px</span>
              </span>
            </div>
          </div>
          <div className="resetBtn" onClick={reset}>
            清空操作
          </div>
        </div>
        {Modalcropper && Modalcropper.getCroppedCanvas()}
      </div>
    </Modal>
  );
};
/*
 style={{ width: '100%', height: 400 }}
        minCropBoxWidth={300}
        minCropBoxHeight={300}
*/
export default CreateForm;
