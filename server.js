const Express = require('express');
const app = Express();
const cors = require('cors');
const routes = require('express').Router();
app.use(cors())

var _bodyParserPackage = require("body-parser");

app.use('/', routes);

routes.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
});

require('./login')(app);
require('./person')(app);

app.use(Express.json());
app.use(_bodyParserPackage.json());

app.get('*',function (req, res) {
    res.redirect('/');
});

let server = app.listen(process.env.PORT || 3000, function () {
    let port = server.address().port;
});




