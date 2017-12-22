# fis3-lint-rich-stylelint
- The fis3-lint-rich-stylelint library exported as a [fis3](http://fis.baidu.com/fis3/index.html) plugin.

[![npm](https://img.shields.io/npm/v/fis3-lint-rich-stylelint.svg)](https://www.npmjs.com/package/fis3-lint-rich-stylelint)
[![node](https://img.shields.io/node/v/fis3-lint-rich-stylelint.svg)](https://nodejs.org/en/)
[![npm](https://img.shields.io/npm/dm/fis3-lint-rich-stylelint.svg)](https://www.npmjs.com/package/fis3-lint-rich-stylelint)
## Dependencies
* [node]() (^4.7.0)
* [stylelint](https://github.com/eslint/eslint) (^8.4.0)

## Installation
``` shell
$ npm install fis3-lint-rich-stylelint [--save]
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
    "code": fileText,
    "formatter": 'string',
    "useEslintrc": false,
    "config": {
        "rules": rules
    }
}
```
As mentioned above, the following is introduce of **rules**:

#### Spaces or Empty lines
* [warn : indentation] 缩进为4个空格
* [warn : max-empty-lines] 最大连续空2行
* `[error : block-no-empty] 禁止空代码块`
* `[error : comment-no-empty] 禁止空注释块（多行注释）`
* [warn : value-list-comma-space-after] 逗号后必须有空格
* [warn : value-list-max-empty-lines] 禁止值列表中存在空行
* [warn : declaration-block-semicolon-space-after] 单行语句分号后必须有空格
* [warn : block-closing-brace-empty-line-before] 语句块（右大括号）结束前一行不能是空行
* `[error : block-opening-brace-newline-after] 多行语句块（左大括号）后必须换行`
* [warn : block-opening-brace-space-before] 语句块（左大括号）开始前必须有空格
* `[error : declaration-colon-space-after] 属性值（冒号后）之前必须有空格`
* [warn : rule-empty-line-before] 多行规则的语句块间必须有空行




#### Specific Syntax
* [warn : function-calc-no-unspaced-operator] 禁止calc语句中计算符（+、-、*、/）两侧无空格
* `[error : declaration-no-important] 禁止!important`
* `[error : media-feature-name-no-unknown] 禁止未知的media名称`
* `[error : no-duplicate-at-import-rules] 禁止值重复的@import语句`
* `[error : no-unknown-animations] 禁止未知的animation-name`


#### Structure
* [warn : selector-max-compound-selectors] 禁止选择器继承关系超过3层
* `[error : selector-max-id] 禁止ID选择器超过1层`
* [warn : max-nesting-depth] 禁止选择器嵌套超过3层

#### Others
* `[error : color-no-invalid-hex] 禁止无效的十六进制颜色`
* [warn : color-named] 禁止使用颜色名字
* `[error : string-no-newline] 禁止同一个字符串内部换行（可用\n代替）`
* [warn : number-max-precision] 禁止小数尾数超过2位
* `[error : unit-no-unknown] 禁止未知单位`
* `[error : property-no-unknown] 禁止未知属性`
* `[error : selector-pseudo-class-no-unknown] 禁止未知伪类选择器`
* `[error : selector-pseudo-element-no-unknown] 禁止未知伪元素选择器`
* `[error : declaration-block-no-duplicate-properties] 禁止重复属性名`
* `[error : no-duplicate-selectors] 禁止重复的选择器`
* `[error : no-extra-semicolons] 禁止额外的的分号`
* `[error : declaration-block-trailing-semicolon] 语句必须分号结尾`
* [warn : string-quotes] 字符串的引号必须为双引号
* `[error : value-keyword-case] 属性值必须是小写`
* `[error : property-case] 属性名小写`

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
