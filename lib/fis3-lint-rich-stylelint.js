/**
 * @fileoverview Used for creating a rich configuration based on stylelint.
 * @author ice.tang
 */

'use strict';
const mixinDeep = require('mixin-deep');
const lagouConfig = require('stylelint-config-lagou');
const stylelint = require('stylelint');
const path = require('path');
const fs = require('fs');
const syntax = {
    '.scss': 'scss',
    '.less': 'less',
    '.sss': 'sugarss'
};
const firstIndex = 0;

/**
 * mkdirSync 同步创建多级目录
 * @param {string} dirname 需要创建的目录
 */
function mkdirSync(dirname) {  
    if (fs.existsSync(dirname)) {  
        return true;  
    } else {  
        if (mkdirSync(path.dirname(dirname))) {  
            fs.mkdirSync(dirname);  
            return true;  
        }
    }  
}
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
    let messages;
    let msgText = '';
    let totalCount = 0;
    let warnCount = 0;
    let errCount = 0;
    let lineMsgText;
    /**
     * msgItem of messages every
     */
    let line;
    let col;
    let desc;
    let severity;
    let type;

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
        msgText += '\n  ' + line + ':' + col + '  ' + type + '  ' + desc + '\n';
    });
    errCount = totalCount - warnCount;

    // 1 problems (1 error, 0 warnings)
    lineMsgText = '\n  ' + totalCount + ' problems  (' + errCount + ' errors, ' + warnCount + ' warnings)\n';    
    msgText += lineMsgText.bold.yellow;
    return msgText;
}

/**
 * formatAllowOutfixed 格式化输出配置
 * @param {Object} config 
 */
function formatAllowOutfixed(config) {
    const resourceOutputConfig = config.allowOutfixed;
    const firstIndex = 0;
    const type = Object.prototype.toString.call(resourceOutputConfig);
    let outputConfig = {};
    if (type === '[object Boolean]') {
        outputConfig.allow = resourceOutputConfig;
    }else if (type === '[object Array]') {
        outputConfig.allow = resourceOutputConfig[firstIndex];
        if (resourceOutputConfig.length > 1) {
            outputConfig = mixinDeep({}, outputConfig, resourceOutputConfig[1]);
        } 
    }
    return outputConfig;
}

module.exports = function(content, file, conf) {

    let lintConfigs = mixinDeep({}, {
        fix: false,
        allowOutfixed: false,
        code: content,
        codeFilename: file.id,
        defaultSeverity: 'error',
        config: {
            "rules": lagouConfig.rules
        }
    }, conf);

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
        let fixedText = res.output;
        let outputConfig = formatAllowOutfixed(lintConfigs);

        
        // 输出修复过的文档
        if (lintConfigs.fix && outputConfig.allow && fixedText) {
            // 修改源文件。警告：此操作会修改源文件，是否会出错不敢保证，所以慎用！！！
            if (outputConfig.root) {
                let ws = fs.createWriteStream(file.realpath, {
                    autoClose: true
                });
                ws.write(fixedText);
            // 输出到指定目录
            } else {
                let relativeDirname = outputConfig.dirname || '/lint-fixed';
                let dirname = path.join(process.cwd(), relativeDirname, file.subdirname);
                // 创建或检测是否存在文件所在目录
                let hadMkdirSync = mkdirSync(dirname);
                if (hadMkdirSync) {
                    let ws = fs.createWriteStream(path.join(dirname, '/', file.basename), {
                        autoClose: true
                    });
                    ws.write(fixedText);
                }
            }
            
        }
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
