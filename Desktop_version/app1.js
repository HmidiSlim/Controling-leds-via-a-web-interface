var https=require("https");
var fs=require("fs");
var options = {
  key: fs.readFileSync('certif/privatekey.pem'),
  cert: fs.readFileSync('certif/certificate.pem')
};
var express = require('express');
var app = express();
var server = https.createServer(options,app);
var io = require("socket.io")(server);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
var ejs = require('ejs');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var ex=require("./node_extension/build/Release/example");



// routes
var route = require('./route');
// model
var Model = require('./model');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({secret: 'secret strategic xxzzz code',
		resave:false,
		saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());


server.listen(4000,function(){
	console.log("server listen at:4000");});



app.use('/css',express.static(__dirname +'/views/css'));
app.use('/js',express.static(__dirname +'/views/js'));
app.use('/style',express.static(__dirname +'/views/style'));



var current_date=new Date();
var date=current_date.toString();

//connection between client and server using sockets
io.sockets.on('connection', function (socket) {
	
    
    var user= new Object();
    var current_date=new Date();
    var date=current_date.toString();
    socket.on("new_user",function(user1){
    user.username=user1;
    console.log("a new user is connected",user1);
    ex.user_connect(user1,date);
    });
    
	socket.on("state1",function(data){
        console.log("Buzzer is ",data);
        ex.etat_periph("Buzzer",data,user.username,date);
	var status=0;
	if(data=="ON"){	
	status=1;}
        ex.turn_periph(1,status);
   
         });
        socket.on("state2",function(data){
        console.log("led1 is ",data);
        ex.etat_periph("led1",data,user.username,date);
        var status=0;
	if(data=="ON"){	
	status=1;}
        ex.turn_periph(2,status);
   
         });
        socket.on("state3",function(data){
        console.log("led2 is ",data);
        ex.etat_periph("led2",data,user.username,date);
        var status=0;
	if(data=="ON"){	
	status=1;}
        ex.turn_periph(3,status);
   
    });
	

});


passport.use(new LocalStrategy(function(username, password, done) {
   new Model.User({username: username}).fetch().then(function(data) {
      var user = data;
      if(user === null) {
         return done(null, false, {message: 'Invalid username or password'});
      } else {
         user = data.toJSON();
         if(!bcrypt.compareSync(password, user.password)) {
            return done(null, false, {message: 'Invalid username or password'});
         } else {
            return done(null, user);
            
	    
	
         }
      }
   });
}));

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
   new Model.User({username: username}).fetch().then(function(user) {
      done(null, user);
   });
});




// GET
app.get('/', route.index);

// signin
// GET
app.get('/signin', route.signIn);
// POST
app.post('/signin', route.signInPost);

// signup
// GET
app.get('/signup', route.signUp);
// POST
app.post('/signup', route.signUpPost);

// logout
// GET
app.get('/signout', route.signOut);


