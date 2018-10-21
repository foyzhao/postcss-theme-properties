const postcss = require('postcss');

module.exports = postcss.plugin('postcss-theme-properties', opts => {

  opts = Object.assign({
    themes: [],
    preserve: true
  }, opts);

  return root => {
    if (opts.themes && opts.themes.length) {
      root.walkAtRules(atRule => {
        if (atRule.name === 'theme') {
          atRule.walkRules(rule => {

            // preserve default rule
            if (opts.preserve) {
              root.insertBefore(atRule, rule.clone())
            }

            // insert theme rule
            opts.themes.forEach(theme => {
              const themeRule = rule.clone({
                selector: `.theme-${theme} ` + rule.selector
              });
              themeRule.replaceValues(/var\(--(.*)\)/, `var(--theme-${theme}-$1)`);
              root.insertBefore(atRule, themeRule)
            })

          });

          // remove @theme rule
          atRule.remove()
        }
      })
    }
  }

});