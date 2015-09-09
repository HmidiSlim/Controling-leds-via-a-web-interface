var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');


//importation of the Model.js
var Model = require('./model');

//verify if the email is valid or not
function verifMail(champ)
{
   var reg = new RegExp('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$', 'i');
	console.log(reg.test(champ));

	if(reg.test(champ))
	{
		return(true);
	}
	else
	{
		return(false);
	}
};

// function which will return a user to the index page if he's authenticated or to the signin if he's not authenticated
var index = function(req, res, next) {
   if(!req.isAuthenticated()) {
      res.redirect('/signin');
   } else {

      var user = req.user;

      if(user !== undefined) {
         user = user.toJSON();
      }
      res.render('index', {title: 'Home', user: user});
   }
};

// function which will redirect a user to the index page if he is authenticated or to the signin page if he's not.
// GET
var signIn = function(req, res, next) {
   if(req.isAuthenticated()) res.redirect('/');
   res.render('signin', {title: 'Sign In'});
};

// function which will redirect a user to the index page if he is authenticated well or show an error when he enter a wrong information
var signInPost = function(req, res, next) {
   passport.authenticate('local', { successRedirect: '/',
                          failureRedirect: '/signin'}, function(err, user, info) {
      if(err) {
         return res.render('signin', {title: 'Sign In', errorMessage: err.message});
      } 

      if(!user) {
         return res.render('signin', {title: 'Sign In', errorMessage: info.message});
      }
      return req.logIn(user, function(err) {
         if(err) {
            return res.render('signin', {title: 'Sign In', errorMessage: err.message});
         } else {
            return res.redirect('/');
         }
      });
   })(req, res, next);
};

// function will redirect a user to the index page if he's authenticated else to the signup page  
var signUp = function(req, res, next) {
   if(req.isAuthenticated()) {
      res.redirect('/');
   } else {
      res.render('signup', {title: 'Sign Up'});
   }
};

//function which allow to user to signup if he didn't have an account
var signUpPost = function(req, res, next) {
   var user = req.body;
   var usernamePromise = null;
   usernamePromise = new Model.User({username: user.username}).fetch();//verify the existence of username on the database
   

   return usernamePromise.then(function(model) {
      if(model) {
         res.render('signup', {title: 'signup', errorMessage: 'username already exists'});//verify if the entered username exists in the databas.
      } else {
         var password = user.password;
	var password1= user.password1;
	var email=user.email;

	if(password.length<5){
		res.render('signup',{title:'signup',errorMessage:'password so weak'});//password must been > 5 caracters.
	}else if(password !== password1){
		res.render('signup',{title:'signup',errorMessage:'password doesn\'t match together'});//verification if the passwords match with each other
	
	}
	else if(verifMail(email) === false){
		res.render('signup',{title:'signup',errorMessage:'email invalid'});//if the email is not valid,it show an error
	}
	
	else{
         var hash = bcrypt.hashSync(password);//crypt the password

         var signUpUser = new Model.User({username: user.username, password:hash,email:user.email,firstname:user.firstname,lastname:user.lastname});//add a new row in the database
	
         signUpUser.save().then(function(model) {
            signInPost(req, res, next);
         });
	};	
      }
   });
};
//
var signOut = function(req, res, next) {
   
      req.logout();
      res.redirect('/signin');
   
};



// export functions
/**************************************/
// index
module.exports.index = index;
module.exports.signIn = signIn;
module.exports.signInPost = signInPost;
module.exports.signUp = signUp;
module.exports.signUpPost = signUpPost;
module.exports.signOut = signOut;


