/*
 * fis3-lint-rich-stylelint
 * 
 */
'use strict'

var stylelint = require('stylelint')
var syntax = {
    '.scss': 'scss',
    '.less': 'less',
    '.sss': 'sugarss'
}
/**
 * formatter
 * @param  {Array} results The result of linter
 * @example
 * resultes = {
    errored: true,
    output: '',//default error string
    results: [ {
        source: '<input css 13>',
        deprecations: [],
        invalidOptionWarnings: [],
        parseErrors: [],
        errored: true,
        warnings: [Object],
        ignored: undefined,
        _postcssResult: [{
            messages: [{
                type: 'warning',
                text: 'Expected indentation of 1 tab (indentation)',
                line: 3,
                column: 5,
                severity: 'error',
                rule: 'indentation',
                node: Object
            },
            {
                ...//following
            }]
        }] 
    }] 
* }
* @return {String}         The result message
* @example
*    7:8  error  'b' is not defined.  no-undef

    8:2  error  'wlskd' is not defined.  no-undef

    2 problem  (2 errors, 0 warnings)
*/
function formatter(result) {
    if (!result) {
        throw new Error('Type Error: is an invalid result!');
    }
    var messages = result._postcssResult.messages
    var msg = '';

    var totalCount = messages.length;

    messages.forEach(function (msgItem) {
        var ruleId = msgItem.rule;
        var line = msgItem.line;
        var col = msgItem.column;
        var desc = msgItem.text;
        var severity = msgItem.severity;
        var type = severity === 'warning' ? 'warning'.yellow : 'error'.red; // error type

        // 7:8  error  'b' is not defined  no-undef
        msg += '\n  ' + line + ':' + col + '  ' + type + '  ' + desc + '  ' + ruleId + '\n';
    });

    // 1 problem (1 error, 0 warnings)
    var count = '\n  total: ' + totalCount + ' errors';
    msg += count.bold.yellow;
    return msg;
}
module.exports = function (content, file, conf) {

    var lintConfigs = Object.assign({}, conf, {
        code: content,
        formatter: 'string',
        config: {
            "rules": {
                "indentation": 4,
                "max-empty-lines": 2,
                "block-no-empty": true,
                "comment-no-empty": true,
                "value-list-comma-space-after": "always",
                "value-list-max-empty-lines": 0,
                "declaration-block-semicolon-space-after": "always-single-line",
                "block-closing-brace-empty-line-before": "never",
                "block-opening-brace-newline-after": "always-multi-line",
                "block-opening-brace-space-before": "always",
                "declaration-colon-space-after": "always",
                "rule-empty-line-before": ["always-multi-line", {
                    "except": ["first-nested"],
                    "ignore": ["after-comment"]
                }],
                "function-calc-no-unspaced-operator": true,
                "function-linear-gradient-no-nonstandard-direction": true,
                "declaration-no-important": true,
                "media-feature-name-no-unknown": true,
                "no-duplicate-at-import-rules": true,
                "no-unknown-animations": true,
                "declaration-block-single-line-max-declarations": 1,
                "selector-max-compound-selectors": 3,
                "selector-max-id": 1,
                "max-nesting-depth": 3,
                "color-no-invalid-hex": true,
                "color-named": 'never',
                "string-no-newline": true,
                "number-max-precision": 2,
                "unit-no-unknown": true,
                "property-no-unknown": true,
                "selector-pseudo-class-no-unknown": true,
                "selector-pseudo-element-no-unknown": true,
                "declaration-block-no-duplicate-properties": true,
                "no-duplicate-selectors": true,
                "no-extra-semicolons": true,
                "declaration-block-trailing-semicolon": "always",
                "string-quotes": "double",
                "value-keyword-case": "lower",
                "property-case": "lower"
            }
        }
    })

    //缺省语法解析值
    if (!lintConfigs.syntax) {
        if (!syntax[file.ext]) {
            return;
        } else {
            lintConfigs.syntax = syntax[file.ext]
        }
    }

    stylelint.lint(lintConfigs).then(function (res) {
        var result = res.results[0];
        if (result.errored || result.warnings.length) {
            var msg = formatter(result);
            fis.log.info('%s  %s \n%s', file.id, 'stylelint fail!'.red, msg);
            return;
        }
        fis.log.info(file.id, ' stylelint pass!'.green);

    }).catch(function (err) {
        // do things with err e.g.
        fis.log.error(err);
    })
}

