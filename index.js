require('colors');

var FailedReporter = function (baseReporterDecorator, formatError) {
    const DEFAULT_FILE_NAME = 'failedReport.html';

    var that = this;
    var failedSpecs = [];
    var html;
    var msg;

    baseReporterDecorator(this);
    
    this.onSpecComplete = function (browser, result) {
        if (result.success === false) {
            if (!failedSpecs[browser.id]) {
                failedSpecs[browser.id] = [];
            }
            
            failedSpecs[browser.id].push(result);
        }
    }    

    this.onRunComplete = function(browsers, results) {
        html = '<html><head><title>Karma failed tests report</title></head><body>';
        browsers.forEach(function (browser, index) {
            if (results.failed) {
                html += '<h2>' + browser + ' failed specs</h2>';
                that.write('\n' + browser + ' failed specs:\n'.red)
                
                if (failedSpecs[browser.id]) {
                    processFailedSpecs(failedSpecs[browser.id]);
                }
            }
        });
        
        html += '</body></html>';
        writeToFile(html);
        that.write("\n");
        this.failedSpecs = [];
    }
        
    function processFailedSpecs(failedSpecs) {
        failedSpecs.forEach(function (spec, index) {
            processSpecSuite(spec.suite);
            html += '<h4 style="display:inline; color:#424445">' + spec.description + '</h4>';
            that.write(spec.description + '\n');            
            processSpecLog(spec.log);
            that.write(msg + '\n\n');
        });
    }
    
    function processSpecSuite(specSuite) {
        specSuite.forEach(function (suiteName, index) {
            if (index === 0) {
                that.write('  ');
            }
            html += '<br/><h3 style="display:inline">' + suiteName + ' &#8658; </h3>';
            that.write(suiteName + ' > '.grey);
        });
    }
    
    function processSpecLog(specLog) {
        msg = '';

        specLog.forEach(function (log) {
            var formattedError = formatError(log, '<span style="width:10px"></span>').replace('\n', '<br/>');
            html += '<div style="padding-left:10px; color:#8F1428">' + formattedError + '</div>';
            msg += formatError(log, '\t');
        });
    }

    function writeToFile(data) {
        var fs = require('fs');
        var path = require('path');        
        //TODO: support filename from configuration
        var filePath = path.join(__dirname, DEFAULT_FILE_NAME);
        
        fs.writeFileSync(filePath, data);
    }
};

FailedReporter.$inject = ['baseReporterDecorator', 'formatError'];

module.exports = {
    'reporter:failed': ['type', FailedReporter]
};
