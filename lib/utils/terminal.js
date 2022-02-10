/**
 * 执行终端命令相关代码
 */

/** 子进程: 文档地址: https://nodejs.org/docs/latest-v15.x/api/child_process.html#child_process_child_process_spawn_command_args_options */
const { exec, spawn } = require('child_process') 

/** 偏向于底层 */
const spawnCommand = (...args) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args)

    /** 在当前进程打印标准输出、异常 */
    childProcess.stdout.pipe(process.stdout)
    childProcess.stderr.pipe(process.stderr)
    childProcess.on('close', () => {
      resolve()
    })
  })
}

const execCommand = (...args) => {
  return new Promise((resolve, reject) => {
    exec(...args, (err, stdout, stderr) => {
      if (err) {
        reject(err);
        return;
      }
      console.log(stdout.replace('\n', ''));
      // console.log(stderr);
      resolve();
    })
  })
}

module.exports = {
  spawn: spawnCommand,
  exec: execCommand
}