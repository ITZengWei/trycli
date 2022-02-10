const ejs = require('ejs')
const path = require('path')
const fs = require('fs')
const log = require('./log')

/** 通过ejs编译模板 */
const ejsCompile = (templatePath, data={}, options = {}) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, {data}, options, (err, str) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(str);
    })
  })
}

/** 写入文件 */
const writeFile = (path, content) => {
  if (fs.existsSync(path)) {
    log.error("文件已存在~")
    return;
  }
  return fs.promises.writeFile(path, content);
}

/** 递归创建文件夹 */
const mkdirSync = (dirname) => {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    // 不存在,判断父亲文件夹是否存在？
    if (mkdirSync(path.dirname(dirname))) {
      // 存在父亲文件，就直接新建该文件
      fs.mkdirSync(dirname)
      return true
    }
  }
}


/** 
 * 将ejs模板编译转换文件
 *  1. 编写对应ejs模板
 *  2. 根据ejs模板编译生成组件文件
 *  3. 将组件文件写入目标位置
 */
 const handleEjsToFile = async (name, dest, template, filename) => {
  // 1.获取模块引擎的路径
  const templatePath = path.resolve(__dirname, template)
  const result = await ejsCompile(templatePath, {name, lowerName: name.toLowerCase()})

  // 2.写入文件中
  // 判断文件不存在,那么就创建文件
  mkdirSync(dest)
  const targetPath = path.resolve(dest, filename)
  writeFile(targetPath, result)
}

module.exports = {
  ejsCompile,
  writeFile,
  mkdirSync,
  handleEjsToFile
}
