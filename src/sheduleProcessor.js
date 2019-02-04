const fs = require('fs');
const JSSoup = require('jssoup').default;
const sanitizeHtml = require('sanitize-html');
const Papa = require('papaparse');
const Course = require('./course');

function sheduleProcessor(inputBuffer) {

    let wholePage = inputBuffer;
    let shitSoup = new JSSoup(wholePage);
    let expectedData = shitSoup.findAll('table');
    // find by id
    let dirtyData;
    for (item of expectedData) {
        if (item.attrs.id === 'ctl00_ContentPlaceHolder1_grdWeeklyPlan')
            dirtyData = item;
    }

    let clean = sanitizeHtml(dirtyData);
    let soup = new JSSoup(clean);
    let table = soup.find('tbody');
    let rows = table.contents;
    let courses = [];
    //    let dataPattern = /(code: \d+ )(, time: \d+:\d+ \d+:\d+ )?(, location: \d+ )?(, teacher: .+ )?(, exam: \d+\/\d+\/\d+ \d+:\d+)?/g;
    let timePattern = /time: (\d+[:.]\d+) (\d+[:.]\d+).+/

    for (let i = 1; i < rows.length; i++) {
        let row = rows[i];
        let fields = row.contents;
        //        console.log(fields);
        let title = fields[0].text;
        let descriptions = '';
        let day;
        for (let j = 3; j <= 9; j++) {
            //            console.log(i,j);
            if (fields[j].text) {
                descriptions = fields[j].text;
                day = j - 3;
            }
        }
        descriptions = descriptions.replace(/\s+/g, ' ');
        let data = descriptions.replace('ساعت شروع', ',time:');
        data = data.replace('نام استاد', ',teacher');
        data = data.replace('کلاس', ',location:');
        data = data.replace('مشخصه', 'code');
        data = data.replace(' code :', 'code: ');
        data = data.replace('تاریخ امتحان', ',exam');

        //let matchArray = dataPattern.exec(data);
        let arr = Papa.parse(data);
        let code, startTime, endTime, location, teacher, exam;
        let dataArray = arr.data[0];
        if (dataArray !== undefined) {
            code = dataArray[0].split(':')[1].replace(/\s+/g, '');
            // time is like "time: 12:33 9:55"
            let time = dataArray[1];
            //            console.log(time);
            timeMatches = timePattern.exec(time)
            //                time = dataArray[1].split(':');
            startTime = timeMatches[1];
            endTime = timeMatches[2];
            location = dataArray[2].split(':')[1];
            teacher = dataArray[3].split(':')[1];
            exam = dataArray[4].split(':')[1].replace(/\s+/g, '');
        }
        let course = new Course(day, title, teacher, startTime, endTime, location);
        courses.push(course.getTimetableFormat());
    }
    return courses;

}
module.exports = sheduleProcessor;
