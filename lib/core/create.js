const program = require('commander')
const { createProject, addComponent } = require('./actions')

/** 创建指令命令 */
const createCommand = () => {
  program
    .command('create <project> [otherArgs...]')
    .description('将存储库克隆到新创建的目录中')
    .action(createProject)

  program
    .command('addcpn <name>')
    .description('添加组件, 例如: cli-try addcpn NavBar [-d src/components]')
    .action((name) => {
      const { 
        dest = 'src/components'
      } = program
      
      addComponent(name, dest)
    })  
}

module.exports = createCommand