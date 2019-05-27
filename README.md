# 小程序服务端
>node-express-mongodb-阿里云服务器

## 项目运行
```
git clone git@github.com:977106024/node-express-mongodb.git   //克隆项目 

cd node-express-mongodb   //进入目录  

cnpm i                    //安装依赖

npm run dev              //运行
```

## 项目介绍
```
后端采用`node+express`框架，数据库使用`mongodb`，部署在`阿里云`服务器。  

使用`es6、es7`语法，`Promise async await`等  

使用`mongoose`来操作mongodb数据库  

使用`百度AI`的SDK完成`语音文字图片识别`功能。  

实现`小程序登录`流程，以及`token生成验证`等。 

使用`ffmpeg`完成音频格式转码。  

支持`https`
```

前端小程序代码库：https://github.com/977106024/note-wechat-app

# reacr-admin服务端

* 使用`qrcode`生成二维码




# 项目整体布局
```
|-- api                     // 接口方法
|   |-- admin               // admin接口
|   |-- file                // 图片语音文件
|   |-- hall                // 游戏大厅接口hall
|-- modle                   // mongodb数据库表模块
|   |-- admin               // admin表
|   |--其他文件              // 小程序表
|-- routes                  // 路由
|-- utils                   //公共方法
|-- mongoose.js             // 连接数据库
|-- app.js                  // 启动
|-- README.md               // 说明
```
