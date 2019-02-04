const express = require('express');
const app = express();
const path = require('path');
const fileUpload = require('express-fileupload');
const sheduleProcessor = require('./src/sheduleProcessor.js');
const StringDecoder = require('string_decoder').StringDecoder;


const PORT = 8080;
const HOST = '0.0.0.0';

app.use(fileUpload());
app.use('/static', express.static('static'))

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')));
app.post('/upload', function (req, res) {
    let uploadedSchedule = req.files.schedule;
    let decoder = new StringDecoder('utf8');
    let scheduleHTML = decoder.write(uploadedSchedule.data);
    let courses = sheduleProcessor(scheduleHTML);
    res.json(courses);

})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
