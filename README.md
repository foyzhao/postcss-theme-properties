# postcss-theme-properties

webpack.config.js
```js
module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('postcss-nested')({
                  bubble: ['theme']
                }),
                require('postcss-theme-properties')({
                  themes: ['blue', 'red']
                }),
                require('postcss-custom-properties')({
                  importFrom: './src/config.css',
                  preserve: false
                })
              ]
            }
          }
        ]
      },
      ...
    ]
  }
```

src/config.css
```pcss
:root {
  --main-color: #000;
  --border-color: #ddd;
}
:root {
  --theme-blue-main-color: #00f;
  --theme-blue-border-color: #bbf;
}
:root {
  --theme-red-main-color: #f00;
  --theme-red-border-color: #fbb;
}
```

src/app.css
```pcss
button {
  padding: 1rem 2rem;
  color: #fff;
  @theme {
    background: var(--main-color);
    border: 1px solid var(--border-color);
  }
}
@theme {
  a {
    color: var(--main-color);
  }
}
```

dist/output.css
```pcss
button {
  padding: 1rem 2rem;
  color: #fff;
}
.theme-blue button {
  background: #00f;
  border: 1px solid #bbf;
}
.theme-red button {
  background: #f00;
  border: 1px solid #fbb;
}
.theme-blue a {
  color: #00f;
}
.theme-red a {
  color: #f00;
}
```
