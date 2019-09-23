/**
 *
 * @authors zcy (1366969408@qq.com)
 * @date    2018-03-28 09:51:18
 * @version $Id$
 */
//上传图片到阿里云
import { message } from "antd";

var OSS = require("ali-oss");

var current_checkpoint;

var progress = function progress(p, checkpoint) {
  return function (done) {
    current_checkpoint = checkpoint;
    done();
  };
};

var uploadFile = function uploadFile(file, client, key, index) {
  var uploadFileClient = new OSS(client);
  var options = {
    progress: progress,
    partSize: 100 * 1024,
    meta: {
      year: 2017,
      people: "test"
    }
  };

  if (current_checkpoint) {
    options.checkpoint = current_checkpoint;
  }

  return new Promise(function (resolve, reject) {
    var nowindex = index;
    uploadFileClient.multipartUpload(key, file, options).then(function (res) {
      console.log("upload success: %j", res);
      current_checkpoint = null;
      uploadFileClient = null;
      res.successIndex = nowindex;
      resolve(res);
    })["catch"](function (err) {
      console.log(err);
      reject({
        error: "error",
        failIndex: nowindex
      });

      if (uploadFileClient && uploadFileClient.isCancel()) {
        message.error("stop-upload!");
      } else {
        message.error("error");
      }
    });
  });
}; //上传图片初始化信息
//获取图片路径


var getObjectURL = function getObjectURL(file) {
  var url = null;

  if (window.createObjectURL != undefined) {
    // basic
    url = window.createObjectURL(file);
  } else if (window.URL != undefined) {
    // mozilla(firefox)
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL != undefined) {
    // webkit or chrome
    url = window.webkitURL.createObjectURL(file);
  }

  return url;
};

var extname = function extname(url) {
  if (!url) {
    return "";
  }

  var temp = url.split("/");
  var filename = temp[temp.length - 1];
  var filenameWithoutSuffix = filename.split(/#|\?/)[0];
  return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [""])[0];
};

var isImageFileType = function isImageFileType(type) {
  return !!type && type.indexOf("image/") === 0;
};

var isImageUrl = function isImageUrl(file) {
  if (isImageFileType(file.type)) {
    return true;
  }

  var url = file.thumbUrl || file.url;

  if (!url) {
    return false;
  }

  var extension = extname(url);

  if (/^data:image\//.test(url) || /(webp|svg|png|gif|jpg|jpeg|bmp|dpg)$/i.test(extension)) {
    return true;
  } else if (/^data:/.test(url)) {
    // other file types of base64
    return false;
  } else if (extension) {
    // other file types which have extension
    return false;
  }

  return true;
};

export { uploadFile, getObjectURL, isImageUrl };
//# sourceMappingURL=common.js.map
