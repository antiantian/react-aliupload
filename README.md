### 阿里云上传图片插件说明 

说明：　基于阿里云实现前端上传图片到阿里云　需要通过后台接口获取阿里云上传凭证

####  Basic usage  基本使用

1.install SDK using npm  下载 

```
  npm install react-alioss
```

2.for example  引入

```
  import { UploadImage } from "react-alioss";  //组件引入
  import "react-alioss/dist/css/styles.css";   //样式引入

```

3. quick example

```
    import * as React from "react";
    import "./App.css";
    import logo from "./logo.svg";
    import { UploadImage } from "react-alioss";
    import "react-alioss/dist/css/styles.css";
    class App extends React.Component {
      public render() {
        return (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">
              To get started, edit <code>src/App.tsx</code> and save to reload.
            </p>
            <UploadImage
              clientOss={"2"}
              keyOss={"3"}
              radio={"690/300"}
              limit={1}
              tips={() => {
                return <p> 690*300像素或690/300，支持png、jpg、gif格式，小于5M </p>;
              }}
              onChange={this.imageChange}
              cropper={true}
            />
          </div>
        );
      }
      protected imageChange = (e: any) => {
        return e;
      };
    }
    
    export default App;
```

#### Props  属性说明
 

| Prop       | Type                                                     | Dafault | Description                                                                   |
| ---------- | -------------------------------------------------------- | ------- | ----------------------------------------------------------------------------- |
| clientOss  | object                                                   | null    | 阿里云上传需要的凭证  (必需)                                                  |
| keyOss     | string                                                   | null    | 阿里云上传路径 (必需)                                                         |
| radio      | string                                                   | ''      | 显示图片上传比例 (可选)                                                       |
| limit      | number                                                   | ''      | 限制图片上传个数 默认不限制 (可选)                                            |
| tips       | function                                                 | -       | 提示文案 (可选)                                                               |
| onChange   | function(uploadMess: ［］　)                             | -       | 文件发生变化的回调，发生在用户选择文件时  (必需)                              |
| cropper    | boolean                                                  | false   | 是否裁剪图片 (可选)                                                           |
| disabled   | boolean                                                  | false   | 是否禁用 (可选)                                                               |
| uploadMess | Array<{  aliurl?: string　url: string 　fail?: string }> | [ ]     | {aliurl：‘阿里云返回的图片链接’，url：‘本地图片路径’，＇fail：上传状态＇} |
　




　

　
　　　
　