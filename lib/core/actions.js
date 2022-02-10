const { promisify } = require('util')
const program = require('commander')
const downloadRepo = promisify(require('download-git-repo')) // 通过 promisify 包裹为Promise的形式

const repoConfig = require('../../config/repo_config')
const terminal = require('../utils/terminal')


/** 创建项目行为 */
const createProject = async (project, other) => {
  /** 目标仓库地址 */
  const targetRepo = repoConfig[program.framework]
  if (!targetRepo) {
    return console.log('您所选择的框架，暂未支持～')
  }
  console.log('正在帮助您创建您的项目，请稍候~')
  /** clone项目从仓库 */
  await downloadRepo(targetRepo, project, { clone: true })
  console.log('安装项目依赖~')
  /** 执行终端命令npm install */
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  await terminal.spawn(npm, ['install'], { cwd: `./${project}` })
  console.log('启动项目~')
  /** 运行项目 */
  await terminal.spawn(npm, ['run', 'serve'], { cwd: `./${project}` })
}

 module.exports = {
  createProject,
}