/**
 *
 * @authors zcy (1366969408@qq.com)
 * @date    2018-03-28 09:51:18
 * @version $Id$
 */
import { UploadFile } from "./interface";
declare const uploadFile: (
  file: File,
  client: any,
  key: string,
  index: number
) => Promise<unknown>;
declare const getObjectURL: (file: File) => any;
declare const isImageUrl: (file: UploadFile) => boolean;
export { uploadFile, getObjectURL, isImageUrl };
