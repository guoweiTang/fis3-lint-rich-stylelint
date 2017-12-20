# fis3-lint-rich-stylelint
The fis3-lint-rich-stylelint library exported as a [fis3](http://fis.baidu.com/fis3/index.html) plugin.

[![npm](https://img.shields.io/npm/v/fis3-lint-rich-stylelint.svg)](https://www.npmjs.com/package/fis3-lint-rich-stylelint)
[![node](https://img.shields.io/node/v/fis3-lint-rich-stylelint.svg)](https://nodejs.org/en/)
[![npm](https://img.shields.io/npm/dt/fis3-lint-stylelint.svg)](https://www.npmjs.com/package/fis3-lint-rich-stylelint)
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
        "rules: rules
    }
}
```
As mentioned above, the following is introduce of **rules**:

#### Spaces or Empty lines
* 缩进为4个空格
* 最大连续空2行
* 禁止空代码块
* 禁止空注释块（多行注释）
* 逗号后必须有空格
* 禁止值列表中存在空行
* 单行语句分号后必须有空格
* 语句块（右大括号）结束前一行不能是空行
* 多行语句块（左大括号）后必须换行
* 语句块（左大括号）开始前必须有空格
* 属性值（冒号后）之前必须有空格
* 多行规则间必须有空行




#### Specific Syntax
* 禁止calc语句中计算符（+、-、*、/）两侧无空格
* 禁止liner-gradient中无效的方向值
* 禁止!important
* 禁止未知的media名称
* 禁止值重复的@import语句
* 禁止未知的animation-name


#### Structure
* 禁止每行语句超过1个
* 禁止选择器继承关系超过3层
* 禁止ID选择器超过1层
* 禁止选择器嵌套超过3层

#### Others
* 禁止无效的十六进制颜色
* 禁止使用颜色名字
* 禁止同一个字符串内部换行（可用\n代替）
* 禁止小数尾数超过2位
* 禁止未知单位
* 禁止未知属性
* 禁止未知伪类选择器
* 禁止未知伪元素选择器
* 禁止重复属性名
* 禁止重复的选择器
* 禁止额外的的分号
* 语句必须分号结尾
* 字符串的引号必须为双引号
* 属性值必须是小写
* 属性名小写

