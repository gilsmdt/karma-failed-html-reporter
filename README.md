karma-failed-html-reporter
==============

Filters the tests results just to the failed tests.
Generates an HTML report with the failed tests information.

Install this using npm
--------------

    npm install karma-failed-html-reporter

Installations
--------------
*Include this specrunner in your `karma.conf.js` like so:*

    reporters: ['failed'],

Configuration
--------------
*you can add a configuration object to 'karma.conf.js' file*

    failedConfig: {
		verbose: true,
		reportPath: 'd:\\failedReport.html'
	}    
    
**verbose**

will write reporter outputs to console
*default value*: false
    
**reportsPath**

sets the full file path for the failed tests report html file. 
*default value*: working directory + failedReport.html 

License
--------------
Legal stuff...

    Copyright (C) 2014 Jaap Broekhuizen <jaapz.b@gmail.com>
                  2016 Gil Schmidt

    Permission is hereby granted, free of charge, to any person obtaining
    a copy of this software and associated documentation files (the "Software"),
    to deal in the Software without restriction, including without limitation
    the rights to use, copy, modify, merge, publish, distribute, sublicense,
    and/or sell copies of the Software, and to permit persons to whom the
    Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included
    in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
    OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
    IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
    TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
    OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
