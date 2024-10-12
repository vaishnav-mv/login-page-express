const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const session = require('express-session'); 
const {v4:uuidv4} = require('uuid');
const router = require('./router');

const app = express();

const port = process.env.PORT||3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));



//use static asset
app.use('/static',express.static(path.join(__dirname,'public')));


app.use(session({
    secret : 'secret',
    resave : false,
    saveUninitialized : false,
    cookie: {maxAge:3600000}
}));

app.use('/route',router);

app.set('view engine','ejs');

//home route
app.get('/',(req,res)=>{
    res.render('base',{title:"Login System"});
});

app.listen(port,()=>{
    console.log("listening to server on http://localhost:3000");
});
