const program = require('commander')

/** 创建项目行为 */
 const createProject = async (project, other) => {
  console.log(`项目名: ${project}`)
  console.log(`其他参数: ${other}`)
  console.log(`框架类型: ${ program.framework }`)
 }

 module.exports = {
  createProject,
}