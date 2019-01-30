const moment = require('moment');
var dayOfWeek = new Map()
dayOfWeek.set(0, "شنبه");
dayOfWeek.set(1, "یکشنبه");
dayOfWeek.set(2, "دوشنبه");
dayOfWeek.set(3, "سه‌شنبه");
dayOfWeek.set(4, "چهارشنبه");
dayOfWeek.set(5, "پنجشنبه");
dayOfWeek.set(6, "جمعه");
    
  
class Course {
    constructor(dayOfWeek, title, teacher, start, end, location) {
        this.dayOfWeek = dayOfWeek;
        this.title = title;
        this.teacher = teacher;
        this.start = moment(start, 'HH:mm').toDate();
        this.end = moment(end, 'HH:mm').toDate();
        this.location = location;
        
    }
    getSummary() {
        let text = `${this.title}|${this.teacher}|${this.location}`;
        return text;
    }
    getDayOfWeekText() {
        return dayOfWeek.get(this.dayOfWeek);
    }
    getTimetableFormat() {
        let dayOfWeek = this.getDayOfWeekText();
        let summary = this.getSummary();
        let obj = { dayOfWeek,
               summary,
               this.start,
               this.end };
        return obj;
        
    }
}