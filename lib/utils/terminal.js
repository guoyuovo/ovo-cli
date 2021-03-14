// 执行终端命令相关的代码
const {spawn} = require('child_process')
const commandSpawn = (...args) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args)
    // 将子进程的日志同步输出到主进程
    childProcess.stdout.pipe(process.stdout)
    childProcess.stderr.pipe(process.stderr)
    childProcess.on('close', () => {
      resolve()
    })
  })
}
module.exports = {
  commandSpawn
}
