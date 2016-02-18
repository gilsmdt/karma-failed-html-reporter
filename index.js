require('colors');

var FailedReporter = function (baseReporterDecorator, formatError) {
    const DEFAULT_FILE_NAME = 'failedReport.html';

    var that = this;
    var failedSpecs = [];
    
    baseReporterDecorator(this);
    
    this.onRunComplete = function(browsers, results) {
        var html = '<html><head><title>Karma failed tests report</title></head><body>';
        
        browsers.forEach(
            function (browser, index) {
                if (results.failed) {
                    html += '<h1>' + browser + ' failed specs:</h1>';
                    that.write('\n' + browser + ' failed specs:\n'.red)
                    if (failedSpecs[browser.id]) {
                        failedSpecs[browser.id].forEach(
                            (function (spec, index) {
                                spec.suite.forEach(
                                    (function (suiteName, index) {
                                        if (index === 0) {
                                            that.write('  ');
                                        }
                                        html += '<h2>' + suiteName + '</h2>';
                                        that.write(suiteName + ' > '.grey);
                                    })
                                );
                                
                                // Write descrition and error to the list.
                                html += '<h3>' + spec.description + '</h3>';
                                that.write(spec.description + '\n');
                                
                                var msg = '';
                                spec.log.forEach(function (log) {
                                    html += '<div style="padding-left:10px; color:#8F1428">' + formatError(log) + '</div>';
                                    msg += formatError(log, '\t');
                                });
                                that.write(msg + '\n\n');
                            })
                        );
                    }
                    
                    html += '</body></html>';
                    writeToFile(html);
                }
            })        
        
        that.write("\n");
        this.failedSpecs = [];
    }
    
    this.onSpecComplete = function(browser, result) {
        if (result.success === false) {
            if (!failedSpecs[browser.id]) {
                failedSpecs[browser.id] = [];
            }

            failedSpecs[browser.id].push(result);
        }
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
