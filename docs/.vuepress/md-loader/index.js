const demoBlockContainers = require('./common/containers')
module.exports = () => {
  return {
    chainMarkdown(config) {
      //修改内部的 markdown 配置
      config // 增加额外的插件markdownContainers
        .plugin('markdownContainers')
        .use(demoBlockContainers)
        .end();
    }
  }
}