#!/usr/bin/env node
const program = require('commander')
const figlet = require('figlet')
const Printer = require('@darkobits/lolcatjs')
const createOptions = require('./lib/core/options')
const createCommands = require('./lib/core/commands')
// 查看版本号
const _version = require('./package.json').version
const _versionStr = figlet.textSync('Yu')
program.version(
  Printer.default.fromString(
    `\n yu-cli:${_version}\n ${_versionStr}`
  )
)
// 添加options
createOptions()
// 添加commands
createCommands()
// 解析参数
program.parse(process.argv)
