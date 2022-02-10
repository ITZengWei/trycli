const { promisify } = require('util')
const program = require('commander')
const downloadRepo = promisify(require('download-git-repo')) // 通过 promisify 包裹为Promise的形式

const repoConfig = require('../../config/repo_config')
const terminal = require('../utils/terminal')
const log = require('../utils/log')
const { handleEjsToFile } = require('../utils/file')
const inquirerInject = require('../utils/inquirer')
const { getTemplateName } = require('../template/config')


/** 创建项目行为 */
const createProject = async (project, other) => {
  /** 目标仓库地址 */
  const targetRepo = repoConfig[program.framework]
  if (!targetRepo) {
    return log.error('您所选择的框架，暂未支持～')
  }
  log.hint('正在帮助您创建您的项目，请稍候~')
  /** clone项目从仓库 */
  await downloadRepo(targetRepo, project, { clone: true })
  log.hint('安装项目依赖~')
  /** 执行终端命令npm install */
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  await terminal.spawn(npm, ['install'], { cwd: `./${project}` })
  log.hint('启动项目~')
  /** 运行项目 */
  await terminal.spawn(npm, ['run', 'serve'], { cwd: `./${project}` })
}

/** 添加组件 */
const addComponent = async (name, dest, ) => {
  /** 询问组件类型 */
  const inquirerRes = await inquirerInject([
    {
      name: 'type',
      message: '请选择组件类型?',
      choices: [
        { name: 'Vue2', value: 'vue2' },
        { name: 'Vue3(setup)', value: 'vue3' },
        { name: 'react-hooks', value: 'react-hooks' },
      ]
    },
    {
      name: 'ts',
      message: '支持typescript?',
      choices: [
        { name: '支持', value: 'ts' },
        { name: '不需要', value: '' },
      ]
    },
    // {
    //   name: 'naming',
    //   message: '组件命名方式',
    //   choices: [
    //     { name: '大驼峰(NavBar)', value: '1' },
    //     { name: '小驼峰(navBar)', value: '2' },
    //     { name: '短横线命名(nav-bar)', value: '3' },
    //   ]
    // },
    // {
    //   name: 'top',
    //   message: '是否需要文件夹包裹 例: NavBar/index.xx or NavBar.xx?',
    //   choices: [
    //     { name: '支持', value: true },
    //     { name: '不需要', value: false },
    //   ]
    // },
  ])

  const findRes = getTemplateName(inquirerRes)
  if (!findRes) return log.hint('当前组件模板暂未支持～') 

  const templateEjsPath = `../template/${ res.templateName }`

  // console.log(name, dest, templateEjsPath, `${name}.${ext}`)
  handleEjsToFile(name, dest, templateEjsPath, `${name}.${res.ext}`)
}

 module.exports = {
  createProject,
  addComponent,
}