// grab the nerd model we just created
const express = require('express')
const bodyParser= require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))

var Nerd = require('./models/Nerd.js');
var Post = require('./models/Challenge.js');
var User = require('./models/Users.js');

module.exports = function(app,passport) {


    app.post('/api/challenges',function(req,res){
        console.log(req.body);
        var post = new Post();
        
        post.title = req.body.title;
        post.content = req.body.content; 


        post.save(function(err){
            console.log(post)
            if (err)
                res.send(err);

            res.json({message: "Post Created!"})
        });

    });

    
    app.delete('/api/challenges',function(req,res){
        
        Challenge.findByIdAndRemove(req.body.id,function(err,chal){
            var response = {
                message: "Challenge successfully delted",
                id: chal.id
            };
            res.send(response);
        })
    });

    app.post('/api/challenges/upvote', isLoggedIn, function(req, res){
        console.log(req.body);
        Challenge.findById(req.body.id,function(err,chal){
            if(err){
                res.status(500).send(err);
            }else{
                // console.log(chal);
                chal.points = chal.points + 25;
                User.findById(req.user.id, function(err,us){
                    us.points = us.points - 25;
                    us.save(function(err,u){
                        //if(err){
                        //    res.status(500).send(err);
                        //}
                        //res.send(u);
                    })
                })                  
                
                chal.save(function(err, chal){
                    if(err){
                        res.status(500).send(err);
                    }
                    res.send(chal);
                });
            }

        });
    });

    app.post('/api/challenges/downvote',isLoggedIn, function(req, res){
        Challenge.findById(req.body.id,function(err,chal){
            if(err){
                res.status(500).send(err);
            }else{
                
                chal.points = chal.points - 25;
                console.log(req.user.id);
                
                User.findById(req.user.id, function(err,us){
                    us.points = us.points - 25;
                    us.save(function(err,u){
                        //if(err){
                        //    res.status(500).send(err);
                        //}
                        //res.send(u);
                    })
                }) 
                chal.save(function(err, chal){
                    if(err){
                        res.status(500).send(err);
                    }
                    res.send(chal);
                });
            }

        });
    });

    
    app.get('/api/challenges', function(req, res) {
        // use mongoose to get all nerds in the database
        console.log(req.query.id);
        Post.findById(req.query.id, function(err, nerds) {
            if (err)
                res.send(err);

            res.json(nerds); // return all nerds in JSON format
        });
    }); 

    app.get('/user', function(req,res){
        User.find(function(err, nerds) {

            console.log('here');

            if (err)
                res.send(err);

            res.json(nerds); // return all nerds in JSON format
        });
    });
    
    app.post('/completed', function (req,res){
        User.findById(req.body.userId, function(err, us){
            Challenge.findById(req.body.challengeId, function(err,chal){
                us.points = us.points + chal.points; 
                us.challenges.push(req.body.challengeId);
                us.save(function(err, chal){
                    if(err){
                            res.status(500).send(err);
                    }
                    res.send(us);
                });
            });

        });

    });

    //apparently its this easy with passport! http://passportjs.org/docs
    app.get('/logout', function(req, res){
        console.log("passport logging out")
        req.logout();
        res.redirect('/');
    });

    app.post('/api/user/signup', function(req,res,next){ 
    passport.authenticate('local-signup', function(err, user,info){
    console.log('in signup:',req);
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (! user) {
      return res.send({ success : false, message : 'authentication failed' });
    }
    // ***********************************************************************
    // "Note that when using a custom callback, it becomes the application's
    // responsibility to establish a session (by calling req.login()) and send
    // a response."
    // Source: http://passportjs.org/docs
    // ***********************************************************************
    req.login(user, loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
      return res.send({ success : true, message : 'authentication succeeded', points: user.points });
    });      
  })(req, res, next); 
});

app.post('/api/user/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info) {
        if (err) {
          return next(err); // will generate a 500 error
        }
        // Generate a JSON response reflecting authentication status
        if (! user) {
          return res.send(401,{ success : false, message : 'authentication failed' });
        }
        req.login(user, function(err){
          if(err){
            return next(err);
          }
          return res.send({ success : true, message : 'authentication succeeded', points: user.points, challenges: user.challenges });        
        });
      })(req, res, next);
    });

	// frontend routes =========================================================

	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

    app.post('/verify', isLoggedIn, function(req, res){
        console.log(req.user.points);
        response = {
            message : "YES",
            points: req.user.points,
            challenge: req.user.challenges
        };
        res.send(response);
    });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()){        
        console.log('yes we are authenticated');

        return next();
    }
    else{
    // if they aren't redirect them to the home page
    console.log('nope we arent authenticated');
    var response ={
        message : "NO"
    };
    res.send(response);
    }
}