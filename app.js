    const express = require('express');
    const path = require('path');
    const exphbs = require('express-handlebars');
    var methodOverride = require('method-override');
    const mongoose = require('mongoose');
    const bodyParser = require('body-parser');
    const app = express();
    const flash = require('connect-flash');
    const session = require('express-session');
    //connect to mongoose

    //map global promise-warning

   // load routes

   const ideas = require('./routes/ideas');
   const users = require('./routes/users');



    mongoose.Promise = global.Promise;

    mongoose.connect('mongodb://localhost/vidjot-dev')
    .then(()=>
        console.log('CONNECT.......'));
        
  

    //how to use middleware
    //Handlebars middleware
    app.engine('handlebars',exphbs({
        defaultLayout:'main'
    }));
    //body parser

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());


      //static folder
      app.use(express.static(path.join(__dirname,'public')));

        // Method override middle
    app.use(methodOverride('_method'));
// express-sesion
    app.use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
      }));

  app.use(flash());

  // Global of variable

  app.use(function(req,res,next){

res.locals.sucess_msg = req.flash('sucess_msg');
res.locals.error_msg = req.flash('error_msg');
res.locals.error = req.flash('error');
next();
  });

    app.set('view engine', 'handlebars');

    // Welcome
    app.get('/',(req,res)=>{
        const title = 'Welcome';
    res.render('index',{
        title:title
    });
    });

//About         
    app.get('/about',(req,res)=>{
        res.render('about');
        });
      
        
  

 // Idea index page





 //use routes

 app.use('/ideas',ideas);
 app.use('/users',users);
// port
    //const port = 5000;

    const port = process.SET.PORT || 5000;
    app.listen(port,()=>{
        console.log(`Server on port ${port}`);
    });