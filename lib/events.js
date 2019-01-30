'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var moment = require('moment');

var Course = function () {
    function Course(dayOfWeek, title, teacher, start, end, location) {
        _classCallCheck(this, Course);

        this.dayOfWeek = dayOfWeek;
        this.title = title;
        this.teacher = teacher;
        this.start = moment(start, 'HH:mm').toDate();
        this.end = moment(end, 'HH:mm').toDate();
        this.location = location;
    }

    _createClass(Course, [{
        key: 'getSummary',
        value: function getSummary() {
            var text = this.title + '|' + this.teacher + '|' + this.location;
            return text;
        }
    }]);

    return Course;
}();

mv = [new Course('شنبه', 'ریزپردازنده', 'آغازاریان', '9:55', '12:25', 'فنی مهندسی ط۱'), new Course('یکشنبه', 'ریزپردازنده', 'آغازاریان', '9:55', '14:25', 'فنی مهندسی ط۱'), new Course('دوشنبه', 'ریزپردازنده', 'شهیدی', '9:55', '12:25', 'فنی مهندسی ط۱'), new Course('سه‌شنبه', 'ریزپردازنده', 'آغازاریان', '7:55', '12:25', 'فنی مهندسی ط۱'), new Course('پنجشنبه', 'ریزپردازنده', 'آغازاریان', '9:55', '12:25', 'فنی مهندسی ط۱')];

exports.default = mv;