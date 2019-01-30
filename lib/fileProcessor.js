'use strict';

var fs = require('fs');
var JSSoup = require('jssoup').default;
var sanitizeHtml = require('sanitize-html');
var events = require('./events.js');

function processFileAsync(fileName) {
    fs.readFile(fileName, 'utf8', function (err, data) {
        if (err) {
            throw err;
        }

        var dirty = data;
        var clean = sanitizeHtml(dirty);
        var soup = new JSSoup(clean);
        var prettySoup = soup.prettify();
        var table = prettySoup.find('table');
        var rows = table.contents;
        var courses = [];
        for (var i = 1; i < rows.length; i++) {
            var row = rows[i];
            var fields = row.contents;
            var name = fields[0].text;
            var descriptions = fields[5].text;
            courses.push({ name: name, descriptions: descriptions });
            /*
            TODO:
            escaped characters
            regex on descriptions
            real Course objects
            Jsonify
            
            
            
            */
        }
        var jsonified = JSON.stringify(courses);
        fs.writeFile('result.json', jsonified, function (err) {
            if (err) throw err;
            console.log('done');
        });
    });
}

processFileAsync('test.html');