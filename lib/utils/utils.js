const path = require('path')
const fs = require('fs')
const {promisify} = require('util')
const ejs = require('ejs')
// promisify将回调函数方式的异步函数转成Promise形式
const {vueRepo,reactRepo,angularRepo} = require('../config/repo-config')
const download = promisify(require('download-git-repo'))
const {commandSpawn} = require('../utils/terminal')
const pathConfig = require('../config/path-config.json')
// 编译模板函数 返回编译成功的模板
const compile = (templateName, data) => {
  const templatePosition = `../templates/${templateName}`
  const templatePath = path.resolve(__dirname, templatePosition)
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, {data}, (err, result) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

// 判断路径是否存在 创建文件夹 source/components/category
const createDirSync = (pathName) => {
  // 如果存在 直接返回
  if (fs.existsSync(pathName)) {
    return true
  } else {
    // 判断父路径是否存在
    if (createDirSync(path.dirname(pathName))) {
      fs.mkdirSync(pathName)
      return true
    }
  }
}

// 文件写入函数
const writeToFile = (targetPath, content) => {
  return fs.promises.writeFile(targetPath, content)
}

// 判断当前项目类型
const currentFramework = () => {
  // 获取当前执行路径下的package.json文件
  // console.log(process.cwd())
  const packagePath = path.resolve(process.cwd(), 'package.json')
  const {dependencies} = require(packagePath)
  // console.log(dependencies)
  let framework = ''
  if (dependencies.hasOwnProperty('vue')) {
    framework = 'vue'
  } else if (dependencies.hasOwnProperty('react')) {
    framework = 'react'
  } else if (dependencies.hasOwnProperty('@angular/core')) {
    framework = 'angular'
  }else{
    throw new Error('The current framework is not currently supported\n暂不支持当前框架')
  }
  return framework
}

// 匹配仓库地址
const switchRepoUrl = (framework) => {
  let repoUrl = ''
  if (framework === 'vue') {
    repoUrl = vueRepo
  } else if (framework === 'react') {
    repoUrl = reactRepo
  } else if (framework === 'angular') {
    repoUrl = angularRepo
  }else{
    throw new Error('The current framework is not currently supported\n暂不支持当前框架')
  }
  return repoUrl
}
// 下载项目模板
downloadProject = async (repo, projectName) => {
  console.log('yu-cli help create your project')
  // 1.clone项目
  await download(repo, projectName, {clone: true})
  console.log('yu-cli download project success')
  // 2.执行npm install
  console.log('yu-cli help start install modules')
  // 判断当前运行环境
  const command = process.platform === "win32" ? "npm.cmd" : "npm"
  await commandSpawn(command, ['install'], {cwd: `./${projectName}`})
  console.log('yu-cli install modules success')
  // 3.运行项目 npm run serve
  await commandSpawn(command, ['run', 'serve'], {cwd: `./${projectName}`})
}

// 检测是否为布尔值
const checkIsBoolean = (val) => {
  // 传递进来的都是string类型 进行转换
  if (val === 'true') {
    val = true
  } else if (val === 'false') {
    val = false
  }
  if (typeof val !== 'boolean') {
    throw new Error('Only Boolean values can be entered\n只能输入布尔类型的值')
  } else {
    return val
  }
}

// 写入修改配置
const writeConfig = (key, val) => {
  pathConfig[key] = val
  const configPath = path.resolve(__dirname, '../config/path-config.json')
  fs.writeFileSync(configPath, JSON.stringify(pathConfig))
  console.log(pathConfig)
}

module.exports = {
  currentFramework,
  createDirSync,
  compile,
  switchRepoUrl,
  downloadProject,
  checkIsBoolean,
  writeToFile,
  writeConfig
}
