const program = require('commander')
// 创建options
const createOptions = () => {
  program.option('-d --dest <dest>', 'a destination folder such:-d src/components\n' +
    '目标文件夹 例如:-d src/components')
  program.option('-f --framework <framework>', 'you framework type such:vue react angular\n' +
    '需要创建的项目类型 例如:vue react angular')
  program.option('-mk', 'Whether to generate a folder with the same name\n' +
    '是否生成同名文件夹')
}
module.exports = createOptions
