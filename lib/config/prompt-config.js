// 具体交互内容
const promptList = [
  {
    type: 'input',
    name: 'projectName',
    message: '请输入项目名:',
    validate(val) {
      if (val.trim().length === 0) {
        return '请输入正确项目名'
      } else {
        return true
      }
    }
  },
  {
    type: 'list',
    message: '请选择一个框架:',
    name: 'framework',
    choices: [
      'Vue',
      'React',
      'Angular'
    ],
    filter(val) { // 使用filter将回答变为小写
      return val.toLowerCase()
    }
  }
]

module.exports = promptList

