require('dotenv').config({path:__dirname+'/.env.dev'})
const express = require('express');
var http = require('http');
const https = require('https');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 3000;

const appSecret = process.env.appSecret || 'secret';

app.use(cookieParser());
app.use(session({
    secret: appSecret,
    resave: false,
    saveUninitialized: true,
    proxy: true,
    name: 'sfmc-example-app',
    cookie: {
        secure: true,
        httpOnly: false,
        sameSite: 'none'
    }
}));

const indexRoute = require('./routes/index');
/*const initRoute = require('./routes/init');*/
const loginRoute = require('./routes/login');
const callbackRoute = require('./routes/callback');
const logoutRoute = require('./routes/logout');

app.use('/', indexRoute);
/*app.use('/init', initRoute);*/
app.use('/login', loginRoute);
app.use('/callback', callbackRoute);
app.use('/logout', logoutRoute);

if(process.env.NODE_ENV !== 'development') {
    var httpServer = http.createServer(app);
    httpServer.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`);
    });
} else {
    const sslCredentials = {
        key: fs.readFileSync('./server.key'), // replace it with your key path
        cert: fs.readFileSync('./server.crt'), // replace it with your certificate path
    }
    var httpsServer = https.createServer(sslCredentials, app);
    
    
    httpsServer.listen(port, () => {
        console.log(`App listening at https://localhost:${port}`);
    });
}