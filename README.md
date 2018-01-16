# 前言

最近在入坑react，撸完文档后发现没啥项目可练手，所以只好拿之前用vue做的[音乐播放器](https://github.com/snow-imprint/vue-music-player)来改版了。由于是react的初学者，在很多方面都还是个小菜鸟，组件设计上可能也有很多不规范的地方，如果你已经是个react的大神了，觉得项目有任何不规范的代码或是设计，记得联系我哦！当然如果你和我一样也是个初学者，希望这个项目能帮到你一点，记得点颗星O(∩_∩)O。移动端的一个小项目，**chrome浏览器下请切换至手机模式查看**
>**注意：**该项目使用了koa2，所以node的版本需在7.6以上，windows的小伙伴需要升级node可去官网下载最新的安装包后直接覆盖安装，由于本人没有用过mac，所以说用mac的小伙伴百度下如何升级node吧

# 项目简介

## 技术栈

react + react-router-dom + redux + react-redux + axios + antd-mobile + es6 + less

## 将要实现的功能

* 搜索功能，包括搜索歌曲和歌手
* 歌曲的播放，暂停功能
* 切歌，歌曲的前进和后退
* 歌词滚动，悬浮框歌词
* 歌词颜色切换，顺序、逆序、随机播放
* 滚动加载等（该功能只在搜索歌曲后的页面有效）

## Build Setup

``` bash
# git clone https://github.com/snow-imprint/react-music-player.git

# install dependencies
npm i（cnpm i）

# serve with hot reload at localhost:8080
npm run dev

```

## 其他说明
由于接口调用的是酷狗官方的接口，需要跨域，所以项目中使用了代理，配置在config目录和build目录下的dev-server.js中，注意*请不要频繁访问请求，很有可能被酷狗封死接口*