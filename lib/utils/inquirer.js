/** 用于询问用户选择参数 */
const inquirer = require('inquirer')

/** 询问注入 */
function inquirerInject(injectProps, obj = {}) {
  const questions = injectProps.map((item) => {
    const { name, message, choices } = item
    /** 如果需要的参数已经传过来了，执行下一个 */
    if (obj[name]) return null

    return {
      type: 'list',
      name,
      message,
      choices
    }
  })

  /** 询问用户选择 */
  return inquirer.prompt(questions.filter(Boolean))
}

module.exports = inquirerInject