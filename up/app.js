
var express = require('express');
var path = require('path');
var app = express();
var multer = require('multer');
var chalk = require('chalk');
var log = console.log.bind(console);

app.use(express.static('static'));
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'files');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname);
    }
})

var upload = multer({ storage: storage })
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.post('/upload', upload.any(), function (req, res) {
    log(req.files);
    res.send({ message: '上传成功' });
})
app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), function () {
    log(`创建服务${chalk.green(`localhost`)}:${chalk.yellow(app.get('port'))}成功`);
});