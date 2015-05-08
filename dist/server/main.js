var path = require('path');
var url = require('url');
var express = require('express');
var cons = require('consolidate');
var cookieParser = require('cookie-parser');
var apiClient = require('./apiClient');
var bodyParser  = require('body-parser');

//built in modules
var userAuth = require('./userAuth');

var app = module.exports = express();
app.use(bodyParser());
app.use(cookieParser());

userAuth.configureUserAuth(app);

var globalConfig = {
    minify: process.env.MINIFY == 'yes' ? true : false,
    environment: process.env.ENVIRONMENT || 'local'
};

var rootPath = path.dirname(__dirname);
var port = Number(process.env.PORT || 80);

console.log('Designated Port: ' + process.env.PORT);

app.set('views', path.join(rootPath, 'server'));
app.engine('html', cons.handlebars);
app.set('view engine', 'html');

if(globalConfig.environment == 'local') {
    app.use(require('connect-livereload')());
}


app.use(function(req, res, next) {
    var config = configFromReq(req);
    var parsedUrl = url.parse(req.url);
    var splittedPath = parsedUrl.pathname.split(path.sep);

    if(splittedPath[1]) {
        var fileExtension = getFileExtension(parsedUrl.pathname);
        if(fileExtension == 'js' || fileExtension == 'css') {
            addPathPrefix(splittedPath, getMinPrefix(config));
        }
    }

    parsedUrl.pathname = splittedPath.join(path.sep);
    req.url = url.format(parsedUrl);

    req.config = config;
    next();
});

app.use('/', express.static(path.join(rootPath, 'app')));

app.get('/', function(req, res) {
    renderIndex(req.config, res);
});

app.use('/api', apiClient.handleRequest);


app.listen(port, function() {
    console.log('Server listening on port ' + port);
});

function renderIndex(config, res) {
    res.render(getMinPrefix(config) + '/views/index');
}

function configFromReq(req) {
    var config = {};
    config.minify = req.cookies.minify == 'true' ? true : false;
    return config;
}

function getMinPrefix(conf) {
    return conf.minify || globalConfig.minify ? 'minified' : 'unminified';
}

function addPathPrefix(filePath, prefix) {
    filePath.splice(1, 0, prefix);
}

function getFileExtension(filePath) {
    return filePath.split('.').pop();
}
