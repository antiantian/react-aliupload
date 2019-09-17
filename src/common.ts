/**
 *
 * @authors zcy (1366969408@qq.com)
 * @date    2018-03-28 09:51:18
 * @version $Id$
 */

//上传图片到阿里云
import { Modal, message, Icon, Input, Button } from 'antd';
import {
  RcFile,
  UploadProps,
  UploadState,
  UploadFile,
  UploadLocale,
  UploadChangeParam,
  UploadType,
  UploadListType,
} from './interface';
/*
  file: { [propsName: string]: any }; //上传文件
  client: any; //上传凭证
  key: string; //文件名称
  index: number; //上传文件数组长度
*/
interface donePartsT {
  etag: string;
  number: number;
}
interface optionsT {
  doneParts: donePartsT[];
  file: File;
  fileSize: number;
  name: string;
  partSize: number;
  uploadId: string;
  [propsName: string]: any;
}
let current_checkpoint: any;
const progress = (p: number, checkpoint: optionsT) => {
  return function(done: Function) {
    current_checkpoint = checkpoint;
    done();
  };
};

const uploadFile = (file: File, client: any, key: string, index: number) => {
  let uploadFileClient = client;
  var options: { [propsName: string]: any } = {
    progress: progress,
    partSize: 100 * 1024,
    meta: {
      year: 2017,
      people: 'test',
    },
  };
  if (current_checkpoint) {
    options.checkpoint = current_checkpoint;
  }
  return new Promise((resolve, reject) => {
    const nowindex = index;
    uploadFileClient
      .multipartUpload(key, file, options)
      .then((res: any) => {
        console.log('upload success: %j', res);
        current_checkpoint = null;
        uploadFileClient = null;
        res.successIndex = nowindex;
        resolve(res);
      })
      .catch((err: any) => {
        console.log(err);
        reject({ error: 'error', failIndex: nowindex });
        if (uploadFileClient && uploadFileClient.isCancel()) {
          message.error('stop-upload!');
        } else {
          message.error('error');
        }
      });
  });
}; //上传图片初始化信息

//获取图片路径
const getObjectURL = (file: File) => {
  var url = null;
  if ((window as any).createObjectURL != undefined) {
    // basic
    url = (window as any).createObjectURL(file);
  } else if ((window as any).URL != undefined) {
    // mozilla(firefox)
    url = (window as any).URL.createObjectURL(file);
  } else if ((window as any).webkitURL != undefined) {
    // webkit or chrome
    url = (window as any).webkitURL.createObjectURL(file);
  }
  return url;
};
var extname = function extname(url?: string) {
  if (!url) {
    return '';
  }

  var temp = url.split('/');
  var filename = temp[temp.length - 1];
  var filenameWithoutSuffix = filename.split(/#|\?/)[0];
  return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0];
};
const isImageFileType = function isImageFileType(type) {
  return !!type && type.indexOf('image/') === 0;
};

const isImageUrl = function isImageUrl(file: UploadFile) {
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
