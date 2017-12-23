/**
 * @fileoverview Used for creating a rich configuration based on stylelint.
 * @author ice.tang
 */

'use strict';
var defaultRules = require('../package.json').stylelintRules;
var stylelint = require('stylelint');
var syntax = {
    '.scss': 'scss',
    '.less': 'less',
    '.sss': 'sugarss'
};
var firstIndex = 0;
/**
 * formatter
 * @param  {Array} results The result of linter
 * @example
 * results = {
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
    var messages;
    var msgText = '';
    var totalCount = 0;
    var warnCount = 0;
    var errCount = 0;
    var lineMsgText;
    /**
     * msgItem of messages every
     */
    var line;
    var col;
    var desc;
    var severity;
    var type;

    if (!result) {
        throw new Error('Type Error: is an invalid result!');
    }
    messages = result.warnings;
    Array.prototype.sort.call(messages, (a, b) => a.line - b.line);
    
    
    totalCount = messages.length;
    
    

    messages.forEach(function(msgItem) {
        line = msgItem.line;
        col = msgItem.column;
        desc = msgItem.text;
        severity = msgItem.severity;
        if (severity === 'warning') {
            warnCount ++;
            type = 'warning'.yellow;
        } else {
            type = 'error'.red;
        }

        // 9:1  warning  Expected indentation of 4 spaces (indentation)
        msg += '\n  ' + line + ':' + col + '  ' + type + '  ' + desc + '\n';
    });
    errCount = totalCount - warnCount;

    // 1 problems (1 error, 0 warnings)
    lineMsgText = '\n  ' + totalCount + ' problems  (' + errCount + ' errors, ' + warnCount + ' warnings)\n';    
    msgText += lineMsgText.bold.yellow;
    return msgText;
}
module.exports = function(content, file, conf) {

    var lintConfigs = Object.assign({}, conf, {
        code: content,
        codeFilename: file.id,
        defaultSeverity: 'error',
        config: {
            "rules": defaultRules
        }
    });

    // 缺省语法解析值
    if (!lintConfigs.syntax) {
        if (!syntax[file.ext]) {
            return;
        } else {
            lintConfigs.syntax = syntax[file.ext];
        }
    }

    stylelint.lint(lintConfigs).then(function(res) {
        let result = res.results[firstIndex];
        let msg;
        if (result.warnings.length) {
            msg = formatter(result);
            fis.log.info('%s  %s \n%s', file.id, 'stylelint fail!'.red, msg);
            return;
        }
        fis.log.info(file.id, ' stylelint pass!'.green);

    }).catch(function(err) {
        // do things with err e.g.
        fis.log.error(err);
    });
};
