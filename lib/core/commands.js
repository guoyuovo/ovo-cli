const path = require('path')
const program = require('commander')
const {createFramework, addComponentPath, addPagePath} = require('../config/path-config.json')
const {
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
} = require('./actions')
const createCommands = () => {
  program.command('create <projectName> [others...]')
    .description('init your project by project name such:yu create projectName [-f vue]\n' +
      '根据项目名初始化你的项目 例如 yu create projectName [-f vue]'
    )
    .action(projectName => {
      createProjectAction(projectName, program.framework || createFramework)
    })

  program.command('init')
    .description('init your project by project name\n' +
      '根据项目名初始化你的项目'
    )
    .action(initProjectAction)

  program.command('framework')
    .description('init your project by project name\n' +
      '通过项目称初始化你的项目'
    )
    .action(() => {
      console.log(require(path.resolve(process.cwd(), 'package.json')))
      console.log(process.cwd())
    })

  program.command('addpage <pageName> [others...]')
    .description('add a page such:yu addpage Login [-d src/pages]\n' +
      '添加一个页面 例如:yu addpage Login [-d src/pages]'
    )
    .action(pageName => {
      addPageAction(pageName, program.dest || addPagePath, program.opts().Mk)
    })

  program.command('addcpn <componentName> [others...]')
    .description('add a component such:yu addcpn HelloWorld [-d src/components]\n' +
      '添加一个组件 例如:yu addcpn HelloWorld [-d src/components]'
    )
    .action(componentName => {
      addComponentAction(componentName, program.dest || addComponentPath, program.opts().Mk)
    })

  program.command('config')
    .description('View the default path for the installation command\n' +
      '查看安装命令的默认路径'
    )
    .action(viewDefaultConfig)

  program.command('setf <framework>')
    .description('Set the default to create framework\n' +
      '设置默认创建框架'
    )
    .action(setCreateFramework)

  program.command('setcpn <componentPath>')
    .description('Sets the default add path for the component\n' +
      '设置组件的默认添加路径'
    )
    .action(setAddComponentPath)

  program.command('setcpnmk <addComponentMkdir>')
    .description('Sets whether to create a folder with the same name when adding a component\n' +
      '设置添加组件时是否创建同名文件夹'
    )
    .action(setAddComponentMkdir)

  program.command('setpage <pagePath>')
    .description('Set the default add path for the page\n' +
      '设置页面的默认添加路径'
    )
    .action(setAddPagePath)

  program.command('setpagemk <addPageMkdir>')
    .description('Sets whether to create a folder with the same name when adding a page\n' +
      '设置添加页面时是否创建同名文件夹'
    )
    .action(setAddPageMkdir)
}
module.exports = createCommands
