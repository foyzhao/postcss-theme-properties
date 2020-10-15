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
                require('postcss-nested')(),
                require('postcss-theme-properties')({
                  themes: ['foo', 'bar']
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
      // ...
    ]
  }
```

src/config.css
```pcss
:root {
  --theme-primary-color: black;
  --theme-divider-color: gray;
  --foo-primary-color: blue;
  --foo-divider-color: lightblue;
  --bar-primary-color: green;
  --bar-divider-color: lightgreen;
}
```

src/app.css
```css
button {
  padding: 1rem 2rem;
  background: var(--theme-primary-color);
  border: 1px solid var(--theme-divider-color);
  color: #fff;
}

a {
  color: var(--theme-primary-color);
}
```

dist/output.css
```css
button {
  padding: 1rem 2rem;
  background: black;
  border: 1px solid gray;
  color: #fff;
}
.foo button {
  background: blue;
  border: 1px solid lightblue;
}
.bar button {
  background: green;
  border: 1px solid lightgreen;
}
a {
  color: black;
}
.foo a {
  color: blue;
}
.bar a {
  color: green;
}
```
