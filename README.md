# 说明文档

## ovo-cli: 一个帮助你快速搭建和开发前端项目的CLI

如何安装？

```shell
npm install ovo-cli -g
```

## 创建项目

目前仅支持Vue，不过React，Angular的实现代码已经写好 缺少合适的项目与模板 所以暂时不能使用 如果有合适的模板请提issues


Vue项目模块已经帮你配置：

* 常用的目录结构（你可以在此基础上修改）
* vue-router（router的安装和配置，另外有路由的动态加载，后面详细说明）

创建项目

```shell
ovo create your_project_name
ovo create your_project_name -f react # 默认为创建vue项目 可以通过-f 配置项目框架 目前仅支持Vue
```

自动拉取项目模板、安装项目依赖、打开浏览器 `http://localhost:8080/`、自动启动项目



## 项目开发

项目开发目前提供二个功能：

* 创建Vue组件
* 创建Vue页面，并配置路由



### 创建Vue组件：

````shell
ovo addcpn YourComponentName # 例如ovo addcpn NavBar，默认会存放到src/components文件夹中
ovo addcpn YourComponentName -d src/pages/home # 也可以指定存放的具体文件夹
ovo addcpn YourComponentName -d src/pages/home -mk # -mk代表本次添加时创建同名文件夹并在文件夹内生成index  src/pages/home/YourComponentName/index
````



### 创建Vue页面，并配置路由

```shell
ovo addpage YourPageName # 例如ovo addpage Home，默认会放到src/pages/home/Home.vue中，并且会创建src/page/home/router.js
ovo addpage YourPageName -d src/views # 也可以指定文件夹，但需要手动集成路由
```

为什么会创建router.js文件：

* `router.js`文件是路由的其中一个配置；
* 创建该文件中 `src/router/index.js`中会自动加载到路由的 `routes`配置中，不需要手动配置了（如果是自己配置的文件夹需要手动配置）

`src/router/index.js`中已经完成如下操作：

```js
// 动态加载pages中所有的路由文件
const files = require.context('@/pages', true, /router\.js$/);
const routes = files.keys().map(key => {
  const page = require('@/pages' + key.replace('.', ''));
  return page.default;
})
```

## 配置
目前支持五项配置：

* 配置创建项目默认框架（默认Vue,目前仅支持Vue）
* 配置组件的默认添加路径（默认src/components）
* 配置添加组件时是否创建同名文件夹（默认false）
* 配置页面的默认添加路径（默认src/pages）
* 配置添加页面时是否创建同名文件夹（默认true）

### 配置创建项目默认框架

````shell
ovo setf frameworkName # ovo setf vue 则使用 ovo create是默认创建vue项目
````

### 配置组件的默认添加路径

````shell
ovo setcpn componentPath # ovo setcpn src/components 则src/components为组件的默认添加路径
````

### 配置添加组件时是否创建同名文件夹

````shell
ovo setcpnmk booolean # ovo setcpnmk true 则添加组件时创建同名文件夹
````

### 配置页面的默认添加路径

````shell
ovo setpage pagePath # ovo setpage src/pages 则src/pages为页面的默认添加路径
````

### 配置添加页面时是否创建同名文件夹

````shell
ovo setpagemk booolean # ovo setpagemk true 则添加页面时创建同名文件夹
````



# documentation

## ovo-cli: A CLI that helps you quickly build and develop front-end projects

How to install？

```shell
npm install ovo-cli -g
```

## Create a project

Currently, only Vue is supported. However, the React and Angular implementation code has been written and lacks appropriate project and template, so it cannot be used temporarily. If there is a suitable template, please raise issues


The Vue project module has been configured for you：

* Common directory structure（You can modify it based on that）
* vue-router（router installation and configuration，There is also dynamic loading for routing，More on that later）

Create a project

```shell
ovo create your_project_name
ovo create your_project_name -f react # The default is to create a VUE project. You can set the project framework to only support VUE with -f
```

Automatically pulls the project template, installs the project dependencies, and opens the browser `http://localhost:8080/`、Auto start project



## Project development

Project development currently provides two functions：

* Create the Vue component
* Create the VUE page and configure the routing



### Create the Vue component：

````shell
ovo addcpn YourComponentName # such:ovo addcpn NavBar，he default is to putsrc/components folder
ovo addcpn YourComponentName -d src/pages/home # You can also specify a specific folder for storage
ovo addcpn YourComponentName -d src/pages/home -mk # -mk On behalf of this add to create a folder of the same name and generate index in the folder  src/pages/home/YourComponentName/index
````



### Create the VUE page and configure the routing

```shell
ovo addpage YourPageName # such:ovo addpage Home，The default is to put src/pages/home/Home.vue，And it will create src/page/home/router.js
ovo addpage YourPageName -d src/views # Folders can also be specified, but you need to manually integrate the routes
```

Why is the router.js file created：

* `router.js`The file is one of the routing configurations;
* Create the file `src/router/index.js`will be automatically loaded into the routing `routes`configuration, do not need to manually configured (if it is to configure their own folder requires manual configuration)

`src/router/index.js`The following operations have been completed in:

```js
// Dynamically load all routing files in pages 
const files = require.context('@/pages', true, /router\.js$/);
const routes = files.keys().map(key => {
  const page = require('@/pages' + key.replace('.', ''));
  return page.default;
})
```

## configuration
Five configurations are currently supported：

* Configure the create project default framework（Default VUE, currently only supported by VUE）
* Configure the default add path for the component（Default src/components）
* Configure whether to create a folder with the same name when adding components（Default false）
* Configure the default add path for the page（Default src/pages）
* Configure whether to create a folder with the same name when adding pages（Default true）

### Configure the create project default framework

````shell
ovo setf frameworkName # ovo setf vue  use ovo create The Vue project is created by default
````

### Configure the default add path for the component

````shell
ovo setcpn componentPath # ovo setcpn src/components src/components Is the default add path for the component
````

### Configure whether to create a folder with the same name when adding components

````shell
ovo setcpnmk booolean # ovo setcpnmk true A folder with the same name is created when a component is added
````

### Configure the default add path for the page

````shell
ovo setpage pagePath # ovo setpage src/pages src/pages Is the default add path for the page
````

### Configure whether to create a folder with the same name when adding pages

````shell
ovo setpagemk booolean # ovo setpagemk true The folder with the same name is created when the page is added
````