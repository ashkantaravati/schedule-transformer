const fs = require('fs');
const JSSoup = require('jssoup').default;
const sanitizeHtml = require('sanitize-html');
const Papa = require('papaparse');
var Course = require('./course');

function processFileAsync(fileName) {
    fs.readFile(fileName, 'utf8', function (err, data) {
        if (err) {
            throw err;
        }
    
    let dirty = data;
    let clean = sanitizeHtml(dirty);
    let soup = new JSSoup(clean);
//    soup.prettify();
    let table = soup.find('table');
    let rows = table.contents;
    let courses = [];
    let dataPattern = /(code: \d+ )(, time: \d+:\d+ \d+:\d+ )?(, location: \d+ )?(, teacher: .+ )?(, exam: \d+\/\d+\/\d+ \d+:\d+)?/g;
        let timePattern = /time: (\d+:\d+) (\d+:\d+).+/
    for (let i=1; i<rows.length; i++) {
        let row = rows[i];
        let fields = row.contents;
        let title = fields[0].text;
        let descriptions = '';
        let day;
        for (let j=3; j<=9; j++){
            if (fields[j].text) {
                descriptions = fields[j].text;
                day = j-3;
            }
                
            //console.log(`i is ${i}, j is ${j} and fields[i,j] is ${fields[j]}`)
        }
        //console.log(i + descriptions);
        descriptions = descriptions.replace(/\s+/g, ' ');
        //console.log(descriptions);
        let data = descriptions.replace('ساعت شروع',',time:');
        data = data.replace('نام استاد',',teacher');
        data = data.replace('کلاس',',location:');
        data = data.replace('مشخصه','code');
        data = data.replace(' code :','code: ');
        data = data.replace('تاریخ امتحان',',exam');
     
        //let matchArray = dataPattern.exec(data);
        //console.log(matchArray);
        let arr = Papa.parse(data);
        let code , startTime, endTime , location, teacher , exam;
        let dataArray = arr.data[0];
        if (dataArray !==undefined)
            {
                code = dataArray[0].split(':')[1].replace(/\s+/g, '');
                // time is like "time: 12:33 9:55"
                let time = dataArray[1];
//                console.log(time);
//                console.log(timePattern.test(time))
                timeMatches = timePattern.exec(time)
//                time = dataArray[1].split(':');
//                console.log(timeMatches);
                startTime = timeMatches[1];
                endTime = timeMatches[2];
//                console.log(timeMatches);
                location = dataArray[2].split(':')[1];
                teacher = dataArray[3].split(':')[1];
                exam = dataArray[4].split(':')[1].replace(/\s+/g, '');
                //console.log(arr.data[0]); 
            }
//    constructor(dayOfWeek, title, teacher, start, end, location) {
    
        let course = new Course(day, title, teacher, startTime, endTime, location);
        courses.push(course.getTimetableFormat());
//        courses.push({ title, code, startTime, endTime, location, teacher, exam })
        /*
        TODO:
        escaped characters
        regex on descriptions
        real Course objects
        Jsonify
        
        
        
        */
    }
    let jsonified = JSON.stringify(courses);
    fs.writeFile('result.json', jsonified, (err)=>{
        if (err)
            throw err;
        console.log('done');
    });
    
});
}

processFileAsync('test.html')
