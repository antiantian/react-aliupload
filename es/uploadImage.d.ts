/**
 *
 * @authors zcy (1366969408@qq.com)
 * @date    2018-03-20 16:52:27
 * @version $Id$
 */
import { Component } from "react";
import "./style.less";
import { ITEMT, UpProps } from "./interface";
interface BasicState {
    previewVisible: boolean;
    previewImage: string | null;
    uploadMess: ITEMT[];
    id: string;
    modalwiddth?: number;
    [propName: string]: any;
}
declare class UploadImages extends Component<UpProps, BasicState> {
    state: BasicState;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    showMaodal: (url: string, width: number) => void;
    deleteFile: (url: string) => void;
    handleCancel: () => void;
    changeV: (preval: any, now: any) => void;
    handleFileChange: (file: File) => void;
    uploadImags: (event: any) => void;
    startLoading: (uploadMess: ITEMT[], url: string) => void;
    uploadImagsAli: (file: File, uploadMess: any[]) => void;
    uploadImageElement: (uploadMess: ITEMT[]) => JSX.Element[];
    render(): JSX.Element;
}
export default UploadImages;
