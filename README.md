# fc-express-nodejs8
<a name="WNjE0"></a>
## 背景

目前有很多 web 应用是基于 express 框架写的，这样的 web 应用按照传统的部署方式可能部署在云主机上，用户可能不想购买云主机，也不想在运维上投入太多成本，函数计算是一个不错的选择，函数计算的入口方法如何高保真的适配 express 是一个相当复杂的问题，我们需要适配 http trigger 和 API 网关这两种类型的触发，但是这两种类型的函数方法签名是不一样的，我们需要分别做适配，比如 API 网关方式触发函数，需要把 event 映射到 express 的 request 对象上，而 express 的 response 对象需要映射到 callback 的数据参数上。具体细节可以参考另一篇文章：[Express ](https://yuque.antfin-inc.com/docs/share/215a9a49-4588-48e3-80eb-3f429d89f975)[接入函数计算手册](https://yuque.antfin-inc.com/docs/share/215a9a49-4588-48e3-80eb-3f429d89f975)。

现在，我们提供了一个模板，通过该模板，可以快速将 express 项目接入函数计算，不管你的函数希望通过 http trigger，还是 API 网关触发。并且，该模板还支持 es6 代码编译成 es5，并且剪切打包压缩成一个 js 文件。

<a name="j8nW7"></a>
## 快速开始

<a name="f0WMI"></a>
#### 1. 安装 node

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash
nvm install 8
```

<a name="akT1c"></a>
#### 2. 安装 fun 工具

```bash
npm install @alicloud/fun -g
```

fun 工具的某些子命令可能会用到 docker，所以你需要安装好 docker，具体参考文档：[Fun 安装教程](https://github.com/aliyun/fun/blob/master/docs/usage/installation-zh.md)。

<a name="buYgl"></a>
#### 3. 通过 fun 模板生成项目

```bash
fun init -n demo https://github.com/muxiangqiu/fc-express-nodejs8.git
```

项目生成好后，在根目录下有个 README.md 文件，阅读该文件可以帮你快速了解项目骨架为你做了什么，以及相关的命令。具体详情：[README.md](https://github.com/muxiangqiu/fc-express-nodejs8/blob/master/%7B%7B%20projectName%20%7D%7D/README.md)。

<a name="7UWYu"></a>
#### 4. 安装依赖

```bash
cd demo # 切换到项目根下面，后面的所有命令，都是在项目根下面执行
npm install
```
注意：有少数特殊 npm 模块的安装可能会依赖当前系统环境，为了能正确安装函数运行时的系统环境的 npm 模块，可以通过 `fun install` 命令来实现，比如 puppeteer，具体参考：[开发函数计算的正确姿势 —— 安装第三方依赖](https://yq.aliyun.com/articles/688062)。

<a name="A5hhg"></a>
#### 5. 编译

```bash
# 生产编译
npm run build
# 开发编译（这种编译方式不会进行代码混淆，并且生成 source map 信息，方便开发调试）
npm run dev
```

<a name="5nJzC"></a>
#### 6. 本地运行函数

```bash
fun local start
```

<a name="b9JQo"></a>
#### 7. 运行调试函数

运行调试之前，请先用 `npm run dev`  命令编译源码，然后以调试的方式运行函数：

```bash
fun local start -d 3000
```

如下图所示：
![debug-fc-http.gif](https://i.loli.net/2019/05/21/5ce357e0c411644090.gif)


<a name="LVQl9"></a>
#### 8. 部署函数到云端

部署函数的时候需要用到 AK 等下信息，可以通过 `fun config` 来配置，如果配置过请忽略，部署函数命令如下：
```bash
fun deploy
```


<a name="87qCK"></a>
## 小结

通过该模板，我们可以快速让 express 在函数计算上运行起来，你的原生请求的 headers 或者 body 都会透传给你的 express 应用，你不用关心是如何透传过去的，这些对你来说都是透明的，你只需要按照 express 标准方式写你的业务代码即可。如果你想要了解更多底层实现原理，可以参考另一篇文章：[Express 如何优雅的在函数计算中运行]()。

<a name="MsAnv"></a>
## 相关链接

- [Fun Init 自定义模板](https://yq.aliyun.com/articles/674364)
- [Express 如何优雅的在函数计算中运行](https://yuque.antfin-inc.com/subo.ysb/scene/qag4cm/edit)
- [开发函数计算的正确姿势 —— 支持 es6 语法和 webpack 压缩 ](https://yq.aliyun.com/articles/701714)
- [开发函数计算的正确姿势 —— 使用 Fun Init 初始化项目](https://yq.aliyun.com/articles/674363)
- [开发函数计算的正确姿势 —— 使用 Fun Local 本地运行与调试](https://yq.aliyun.com/articles/672623)
- [开发函数计算的正确姿势 —— 安装第三方依赖](https://yq.aliyun.com/articles/688062)
- [webpack 文档](https://webpack.docschina.org/api/)


