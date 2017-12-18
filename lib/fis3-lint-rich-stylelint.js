'use strict'

/*
 * fis3-lint-rich-stylelint
 */
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
    var warnCount = result.warnings.length;
    var errCount = totalCount - warnCount;

    messages.forEach(function (msgItem) {
        var ruleId = msgItem.rule,
            line = msgItem.line,
            col = msgItem.column,
            desc = msgItem.text,
            severity = msgItem.severity;
        var type = severity == 1 ? 'warning'.yellow : 'error'.red; // error type

        // 7:8  error  'b' is not defined  no-undef
        msg += '\n  ' + line + ':' + col + '  ' + type + '  ' + desc + '  ' + ruleId + '\n';
    });

    // 1 problem (1 error, 0 warnings)
    var count = '\n  ' + totalCount + ' problem  (' + errCount + ' errors, ' + warnCount + ' warnings)';
    msg += count.bold.yellow;
    return msg;
}
module.exports = function (content, file, conf) {

    var lintConfigs = Object.assign({}, conf, {
        code: content,
        formatter: 'string'
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

