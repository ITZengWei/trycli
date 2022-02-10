const program = require('commander')
const { createProject } = require('./actions')

/** 创建指令命令 */
const createCommand = () => {
  program
    .command('create <project> [otherArgs...]')
    .description('将存储库克隆到新创建的目录中')
    .action(createProject)
}

module.exports = createCommand