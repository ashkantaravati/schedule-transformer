'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _timetable = require('./timetable.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var timetable = new _timetable.Timetable();
timetable.setScope(7, 20); // optional, only whole hours between 0 and 23
timetable.useTwelveHour(); //optional, displays hours in 12 hour format (1:00PM)
myEvents = [{ title: 'تربیت بدنی', professor: 'احمدی', starts: '7:30', ends: '9:55', location: 'فنی مهندسی ۱۵۰۱' }];
timetable.addLocations(['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه']);
timetable.addEvent('Frankadelic', 'Mon', new Date(2015, 7, 17, 10, 45), new Date(2015, 7, 17, 12, 30));
var renderer = new _timetable.Timetable.Renderer(timetable);
renderer.draw('.timetable'); // any css selector


var Hello = function () {
    function Hello() {
        _classCallCheck(this, Hello);
    }

    _createClass(Hello, null, [{
        key: 'world',
        value: function world() {
            console.log('Hello, World!');
        }
    }]);

    return Hello;
}();

Hello.world();