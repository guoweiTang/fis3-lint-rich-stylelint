# fis3-lint-rich-stylelint
- The fis3-lint-rich-stylelint library exported as a [fis3](http://fis.baidu.com/fis3/index.html) plugin.

[![npm](https://img.shields.io/npm/v/fis3-lint-rich-stylelint.svg)](https://www.npmjs.com/package/fis3-lint-rich-stylelint)
[![node](https://img.shields.io/node/v/fis3-lint-rich-stylelint.svg)](https://nodejs.org/en/)
[![npm](https://img.shields.io/npm/dm/fis3-lint-rich-stylelint.svg)](https://www.npmjs.com/package/fis3-lint-rich-stylelint)
## Dependencies
* [node]() (^4.7.0)
* [stylelint](https://github.com/stylelint/stylelint) (^8.4.0)

## Installation
``` shell
$ npm install fis3-lint-rich-stylelint [--save-dev]
```

## Usages
``` js
fis.match('*.js', {
    lint: fis.plugin('rich-stylelint'[, options])
})

```
See the **options** what is same as [stylelint lint](https://stylelint.io/user-guide/node-api/) for more details.

## Default configs
``` js
{
    'fix': false,
    'allowOutfixed': false,
    'code': fileText,
    'formatter': 'string',
    'useEslintrc': false,
    'ignoreFiles': [
        'bower_components/**',
        'node_modules/**',
        'lint-fixed/**'
    ],
    'config': {
        'rules': rules
    }
}
```
### allowOutfixed: Boolean | [Boolean, options]
Output the restored file to the directory '/lint-fixed/**', the premise is that the value of fix is true
#### options
* `'root': true` Get root permissions, it will modify the source file，this operation does't promise correctness, so be careful!!!
* `'dirname': '/lint-fixed'` Specify the root directory of the repaired file output

### ignoreFiles: [String]
 [Glob](https://github.com/isaacs/node-glob) patterns for paths to ignore.

### Rules
As mentioned above, the following is introduce of **rules**:

#### Stylelint-config-lagou
配置参考[stylelint-config-lagou](https://github.com/guoweiTang/stylelint-config-lagou)定义

#### Turning rules off from within your CSS
* turn all the rules off:
```css
/* stylelint-disable */
a {}
/* stylelint-enable */
```
* turn off specified rules:
```css
/* stylelint-disable selector-no-id, declaration-no-important  */
#id {
  color: pink !important;
}
/* stylelint-enable */
```
* turn off specified line and rules:
```css
#id { /* stylelint-disable-line */
  color: pink !important; /* stylelint-disable-line declaration-no-important */
}
#id {
  /* stylelint-disable-next-line declaration-no-important */
  color: pink !important;
}
```
- If you want to know more, please refer to [stylelint turning rules off from CSS](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/configuration.md#turning-rules-off-from-within-your-css)
