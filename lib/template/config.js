/** 模板树
 * TODO obj[ts][reacthooks] === obj[reacthooks][ts]
 */
const templateTree = {
  'react-hooks': {
    value: 'component.jsx.ejs',
    ts: {
      value: 'component.tsx.ejs'
    }
  }
}

/** 获取模板名 */
function getTemplateName(condition) {
  // for (const item of arr) {
  //   if (templateTree[item]) {
  //     return 
  //   } else {
  //     return 
  //   }
  // }

  const { type, ts } = condition
  if (type === 'react-hooks') {
    return ts ? { templateName: 'component.tsx.ejs', ext: 'tsx' } : { templateName: 'component.jsx.ejs', ext: 'jsx' }
  }

  return null
}

module.exports = {
  getTemplateName
}