const program = require('commander')

/** 增加自己的option */
const helpOptions = () => {
  program.option('-T --try', '这是 Try 的脚手架')
  /** 传入 <xxx> 这种形式就需要填充参数，不然会报错 */
  program.option('-d --dest <dest> ', '目标位置 例: -d src/pages, 错误案例: /src/pages')
  program.option('-f --framework <framework> ', '你选择的框架')

  /** 监听指令 */
  program.on('--help', () => {
    console.log('')
    console.log('Other: ')
    console.log('  其他Options～')
  })
}

module.exports = helpOptions