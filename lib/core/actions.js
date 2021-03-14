const path = require('path')
const inquirer = require('inquirer')
const promptList = require('../config/prompt-config')
const {
  currentFramework,
  createDirSync,
  compile,
  switchRepoUrl,
  downloadProject,
  checkIsBoolean,
  writeToFile,
  writeConfig
} = require('../utils/utils')
const pathConfig = require('../config/path-config.json')

// 初始化项目
const createProjectAction = async (projectName, framework) => {
  if (projectName.trim().length === 0) {
    throw new Error('请输入正确项目名')
  }
  const repoUrl = switchRepoUrl(framework)
  await downloadProject(repoUrl, projectName)
}

// 初始化项目
const initProjectAction = async () => {
  const answer = await inquirer.prompt(promptList)
  const {projectName, framework} = answer
  const repoUrl = switchRepoUrl(framework)
  await downloadProject(repoUrl, projectName)
}

// 添加页面
const addPageAction = async (pageName, dest, mkNewDir) => {
  // 判断当前框架类型 Vue or React or Angular
  const framework = currentFramework()
  console.log(pageName, dest)
  switch (framework) {
    case 'vue':
      const result = await compile('vue-component.ejs', {name: pageName, lowerName: pageName.toLowerCase()})
      const routerResult = await compile('vue-router.ejs', {name: pageName, lowerName: pageName.toLowerCase()})
      // 获取模板编译后的result
      let targetPathParent = ''
      let pageTargetPath = ''
      // 路由路径
      let routerTargetPath = ''
      // 如果创建同名目录
      if (mkNewDir || pathConfig.addPageMkdir) {
        // 上级添加同名目录
        targetPathParent = path.resolve(dest, pageName)
      } else {
        // 直接添加
        targetPathParent = path.resolve(dest)
      }
      pageTargetPath = path.resolve(targetPathParent, `${pageName}.vue`)
      routerTargetPath = path.resolve(targetPathParent, 'router.js')
      console.log(pageTargetPath)
      console.log(routerTargetPath)
      // 如果目录不存在 先创建目录 再将result写入到对应的文件
      if (createDirSync(targetPathParent)) {
        const p1 = writeToFile(pageTargetPath, result)
        const p2 = writeToFile(routerTargetPath, routerResult)
        Promise.all([p1, p2]).then(() => {
          console.log(`page ${pageName} Creating success`)
        })
      }
      break
    case 'react':
      console.log('The current framework is not currently supported\n暂不支持当前框架')
      break
    case 'angular':
      console.log('The current framework is not currently supported\n暂不支持当前框架')
      break
  }
}

// 添加组件
const addComponentAction = async (componentName, dest, mkNewDir) => {
  // 判断当前框架类型 Vue or React or Angular
  const framework = currentFramework()
  console.log(componentName, dest)
  switch (framework) {
    case 'vue':
      const result = await compile('vue-component.ejs', {name: componentName, lowerName: componentName.toLowerCase()})
      // 获取模板编译后的result
      // console.log(result)
      let targetPathParent = ''
      let targetPath = ''
      // 如果创建同名目录
      if (mkNewDir || pathConfig.addComponentMkdir) {
        // 上级添加同名目录
        targetPathParent = path.resolve(dest, componentName)
        targetPath = path.resolve(targetPathParent, 'index.vue')
      } else {
        // 直接添加
        targetPathParent = path.resolve(dest)
        targetPath = path.resolve(targetPathParent, `${componentName}.vue`)
      }
      console.log(targetPath)
      // 如果目录不存在 先创建目录 再将result写入到对应的文件
      if (createDirSync(targetPathParent)) {
        writeToFile(targetPath, result).then(() => {
          console.log(`component ${componentName} Creating a success`)
        })
      }
      break
    case 'react':
      console.log('The current framework is not currently supported\n暂不支持当前框架')
      break
    case 'angular':
      console.log('The current framework is not currently supported\n暂不支持当前框架')
      break
  }
}

// 查看默认安装路径
const viewDefaultConfig = () => {
  console.log(pathConfig)
}
// 设置默认创建的项目类型
const setCreateFramework = (framework) => {
  writeConfig('createFramework', framework)
}

// 设置组件默认安装路径
const setAddComponentPath = (componentPath) => {
  writeConfig('addComponentPath', componentPath)
}

// 设置添加组件时是否创建同名文件夹
const setAddComponentMkdir = (addComponentMkdir) => {
  const val = checkIsBoolean(addComponentMkdir)
  writeConfig('addComponentMkdir', val)
}

// 设置组件默认安装路径
const setAddPagePath = (pagePath) => {
  writeConfig('addPagePath', pagePath)
}

// 设置添加页面时是否创建同名文件夹
const setAddPageMkdir = (addPageMkdir) => {
  const val = checkIsBoolean(addPageMkdir)
  writeConfig('addPageMkdir', val)
}

module.exports = {
  createProjectAction,
  initProjectAction,
  addPageAction,
  addComponentAction,
  viewDefaultConfig,
  setCreateFramework,
  setAddComponentPath,
  setAddComponentMkdir,
  setAddPagePath,
  setAddPageMkdir
}
