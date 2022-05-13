const mdContainer = require('markdown-it-container');
module.exports =md => {
    //将markdown-it-container插件加载到当前的解析器实例中
    md.use(mdContainer, 'demo', {
      validate(params) {
        //函数在开始标记后验证尾部，成功时返回true
        return params.trim().match(/^demo\s*(.*)$/);
      },
      render(tokens, idx) {
        //渲染器函数
        const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
        if (tokens[idx].nesting === 1) {
          const description = m && m.length > 1 ? m[1] : '';
          // opening tag
          return `<demo-block>
                  <div slot="demo">组件demo</div>
                  <div slot="description">${description}</div>
                  <div slot="source">代码块</div>`
        } else {
          // closing tag
          return `</demo-block>`;
        }
      }
    });
  }