const postcss = require('postcss')

module.exports = postcss.plugin('postcss-theme-properties', opts => {
  return root => {
    if (opts.themes && opts.themes.length) {
      root.walkRules(rule => {
        const themeRules = {}
        rule.walkDecls(decl => {
          if (decl.value.includes('--theme-')) {
            opts.themes.reverse().forEach(theme => {
              if (!themeRules[theme]) {
                themeRules[theme] = postcss.rule({
                  selector: `.${theme} ` + rule.selector
                })
              }
              themeRules[theme].append(postcss.decl({
                prop: decl.prop,
                value: decl.value.replace(/var\(--theme-([^)]*)\)/g, `var(--${theme}-$1)`)
              }))
            })
          }
          for (theme in themeRules) {
            root.insertAfter(rule, themeRules[theme])
          }
        })
      })
    }
  }
})
