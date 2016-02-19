require('colors');
var fs = require('fs');
var path = require('path');        

var failedHtmlReporter = function (baseReporterDecorator, config, formatError) {
    const DEFAULT_FILE_NAME = 'failedReport.html';

    var that = this;
    var failedSpecs = [];
    var html;
    var msg;
	var reporterConfig = config.failedConfig || {};
	
	// initialize configuration
	var reportPath = reporterConfig.reportPath || path.join(process.cwd(), DEFAULT_FILE_NAME);
	var verbose = reporterConfig.verbose || false;
	
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
		var hasFailedResults = false;
		
        html = '<html><head><title>Karma failed tests report</title></head><body>';
        browsers.forEach(function (browser, index) {
            if (results.failed) {
				hasFailedResults = true;
                html += '<h2>' + browser + ' failed specs</h2>';
                write('\n' + browser + ' failed specs:\n'.red)
                
                if (failedSpecs[browser.id]) {
                    processFailedSpecs(failedSpecs[browser.id]);
                }
            }
        });
        
        html += '</body></html>';
		
		if (hasFailedResults) {
			writeToFile(html);
			write("\n");
		}		
        
        this.failedSpecs = [];
    }
        
    function processFailedSpecs(failedSpecs) {
        failedSpecs.forEach(function (spec, index) {
            processSpecSuite(spec.suite);
            html += '<h4 style="display:inline; color:#424445">' + spec.description + '</h4>';
            write(spec.description + '\n');            
            processSpecLog(spec.log);
            write(msg + '\n\n');
        });
    }
    
    function processSpecSuite(specSuite) {
        html += '<br/>';
        specSuite.forEach(function (suiteName, index) {
            if (index === 0) {
                write('  ');
            }
            html += '<h3 style="display:inline">' + suiteName + ' &#8658; </h3>';
            write(suiteName + ' > '.grey);
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
        write('failed tests report generated to ' + reportPath);		
        fs.writeFileSync(reportPath, data);
    }
	
	function write(msg) {
		if (verbose) {
			that.write(msg);
		}
	}
};

failedHtmlReporter.$inject = ['baseReporterDecorator', 'config', 'formatError'];

module.exports = {
    'reporter:failed': ['type', failedHtmlReporter]
};
