// grab the nerd model we just created
const express = require('express')
const bodyParser= require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({limit: '50mb',extended: true}))


var Profile = require('./models/Nerd.js');
//var Post = require('./models/Challenge.js');
var User = require('./models/Users.js');
var Property = require('./models/Property.js');
var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config/aws.js');

module.exports = function(app,passport) {
    // =====================================
    // PROFILE ROUTES =====================
    // =====================================  
    app.get('/api/profile', function(req, res) {
        console.log(req.query.user_id);
        Profile.findOne({'user_id': req.query.user_id}, function(err,prof){
            if(err){
                console.log('ERROR:', err);
            }else if(prof){
                console.log('IN ELSE IF: ', prof);
                res.json(prof);
            }else{
                console.log('IN ELSE:', prof);
                res.json({success: false});

            }   
        });

    }); 
    app.post('/api/profile', isLoggedIn, function(req, res){
        var fileFlag = false; 
        var uniqueFile = '';
        if(req.body.file_data != undefined && req.body.file_data != ''){
            fileFlag = true; 
            var date = new Date().toISOString().replace(/T/,'_').replace(/\..+/,'').replace(/:/,'-').replace(/:/,'-');
            var matches= req.body.file_data.match(/^data:.+\/(.+);base64,(.*)$/);
            var ext = matches[1];
            var newFileName = date+'.'+ext;
            uniqueFile = newFileName
            var b64String = matches[2];
            uploadtoS3(newFileName,b64String);
        }
        Profile.findOne({'user_id': req.body.user_id}, function(err,prof){
            if(err){
                console.log('ERROR:', err);
            }else if(prof){
                console.log('WE FOUND A PROFILE?');
                prof.age = req.body.age || prof.age;
                prof.name = req.body.name || prof.name;
                prof.profile_photo_name = req.body.profile_photo_name || prof.profile_photo_name; 
                prof.profile_photo_location = uniqueFile || prof.profile_photo_location;
                prof.dob = req.body.dob || '';
                prof.identification =req.body.identification || prof.identification; 
                prof.phone_number = req.body.phone_number || prof.phone_number;
                prof.email = req.body.email || prof.email;
                prof.curent_address = req.body.curent_address || prof.curent_address;
                prof.leasor = req.body.leasor || prof.leasor ;
                prof.income = req.body.income || prof.income; 
                prof.credit_score = req.body.credit_score || prof.credit_score;
                prof.criminal_check = req.body.criminal_check || prof.criminal_check;
                prof.occupation = req.body.occupation || prof.occupation;
                prof.employer = req.body.employer || prof.employer;
                prof.animal_exist = req.body.animal_exist || prof.animal_exist;
                prof.animal_breed = req.body.animal_breed || prof.animal_breed;
                prof.education = req.body.education || prof.education;
                prof.current_stat = req.body.current_stat || prof.current_stat;
                prof.facebook = req.body.facebook || prof.facebook;
                prof.google = req.body.google || prof.google;
                prof.linked = req.body.linked || prof.linked;
                prof.reference_name = req.body.reference_name || prof.reference_name ;
                prof.reference_number = req.body.reference_number || prof.reference_numbe;
                prof.roomates = req.body.roomates || prof.roomates;
                prof.user_id = req.body.user_id || prof.user_id;
                prof.hobbies = req.body.hobbies || prof.hobbies;

                prof.save(function(err,dat){
                    if (err){
                        res.send(err);
                    }
                    else{
                        res.json({message: "Profile Edited"})
                        console.log(dat);
                    }
                });
            }else{
                var profile = new Profile();
                console.log("WE ARE ABOUT TO CREATE A NEW PROFILE - HERE IS THE REQUEST:", req.body);
                profile.profile_photo_name = req.body.profile_photo_name; 
                profile.profile_photo_location = uniqueFile || '';
                profile.dob = req.body.dob;
                profile.identification =req.body.identification; 
                profile.phone_number = req.body.phone_number;
                profile.email = req.body.email;
                profile.curent_address = req.body.curent_address;
                profile.leasor = req.body.leasor;
                profile.income = req.body.income; 
                profile.credit_score = req.body.credit_score;
                profile.criminal_check = req.body.criminal_check;
                profile.occupation = req.body.occupation;
                profile.employer = req.body.employer;
                profile.animal_exist = req.body.animal_exist;
                profile.animal_breed = req.body.animal_breed;
                profile.education = req.body.education;
                profile.current_stat = req.body.current_stat;
                profile.facebook = req.body.facebook;
                profile.google = req.body.google;
                profile.linked = req.body.linked;
                profile.reference_name = req.body.reference_name;
                profile.reference_number = req.body.reference_number;
                profile.roomates = req.body.roomates;
                profile.user_id = req.body.user_id;
                profile.name = req.body.name;
                profile.age = req.body.age;
                profile.hobbies = req.body.hobbies;
                profile.profile_photo_name = req.body.profile_photo_name;
                profile.profile_photo_location = req.body.profile_photo_location;
                profile.file_data = req.body.file_data;
                
                profile.save(function(err){
                    console.log(profile)
                    if (err)
                        res.send(err);

                    res.json({message: "Post Created!"})
                });
            }   
        });
    });
    // =====================================
    // PROFILE ROUTES END =====================
    // =====================================  

    // =====================================
    // PROPERTY ROUTES =====================
    // =====================================    
    app.get('/api/property', function(req, res) {
        console.log(req.query.user_id);
        Property.find({'user_id': req.query.user_id}, function(err,prof){
            if(err){
                console.log('ERROR:', err);
            }else if(prof){
                console.log('IN ELSE IF: PROPERY ', prof);
                res.json(prof);
            }else{
                console.log('IN ELSE: PROPERTY', prof);
                res.json({success: false});

            }   
        });

    }); 

    // use mongoose to get all nerds in the database
     app.get('/api/all/property', isLoggedIn,function(req, res) {   
        Property.find(function(err, nerds) {
            console.log('here');
            if (err)
                res.send(err);

            res.json(nerds); // return all nerds in JSON format
        });
    });

    app.post('/api/property', function(req, res){
        var fileFlag = false; 
        var uniqueFile = '';
        console.log('THIS IS THE FILE DATA:',req.body.file_data);
        if(req.body.file_data != undefined && req.body.file_data != ''){
            console.log('are we here?');
            fileFlag = true; 
            var date = new Date().toISOString().replace(/T/,'_').replace(/\..+/,'').replace(/:/,'-').replace(/:/,'-');
            var matches= req.body.file_data.match(/^data:.+\/(.+);base64,(.*)$/);
            var ext = matches[1];
            var newFileName = date+'.'+ext;
            uniqueFile = newFileName
            var b64String = matches[2];
            uploadtoS3(newFileName,b64String);
        }
        Property.findOne({'user_id': req.body.user_id}, function(err,prof){
            if(err){
                console.log('ERROR:', err);
            }else if(prof){
                prof.user_id = req.body.user_id || prof.user_id;
                prof.profile_photo_location = uniqueFile || prof.profile_photo_location;
                prof.profile_photo_name = req.body.profile_photo_name || prof.profile_photo_name;
                prof.address = req.body.address || prof.address;
                prof.price = req.body.price || prof.price;
                prof.bedrooms = req.body.bedrooms || prof.bedrooms;
                prof.bathrooms = req.body.bathrooms  || prof.bathrooms;
                prof.date_avail = req.body.date_avail || prof.date_avail;
                prof.terms_avail = req.body.terms_avail || prof.terms_avail;
                prof.parking =req.body.parking|| prof.parking;
                prof.proof_of_owner =req.body.proof_of_owner || prof.proof_of_owner;
                prof.save(function(err){
                    console.log(property)
                    if (err){
                        res.send(err);
                    }
                    res.json({message: "Post Created!"});
                });
            }else{
                var property = new Property();
                property.user_id = req.body.user_id;
                property.profile_photo_location = uniqueFile || '';
                property.profile_photo_name = req.body.profile_photo_location;
                property.address = req.body.address;
                property.price = req.body.price;
                property.bedrooms = req.body.bedrooms;
                property.bathrooms = req.body.bathrooms;
                property.date_avail = req.body.date_avail;
                property.terms_avail = req.body.terms_avail;
                property.parking =req.body.parking;
                property.proof_of_owner =req.body.proof_of_owner;
                property.save(function(err){
                    console.log(property)
                    if (err){
                        res.send(err);
                    }
                    res.json({message: "Post Created!"});
                });
            }     
        });
    });   

     /*
    app.get('/api/property', isLoggedIn, function(req, res) {
        console.log(req.query.user_id);
        Property.find({'user_id': req.query.user_id}, function(err,prof){
            if(err){
                console.log('ERROR:', err);
            }else if(prof){
                console.log('IN ELSE IF: PROPERY ', prof);
                res.json(prof);
            }else{
                console.log('IN ELSE: PROPERTY', prof);
                res.json({message: "Profile doesnt exist"});

            }   
        });

    }); 
    */
    // =====================================
    // PROPERTY ROUTES END =====================
    // =====================================  
    

    //apparently its this easy with passport! http://passportjs.org/docs
    app.get('/logout', function(req, res){
        console.log("passport logging out")
        req.logout();
        res.redirect('/');
    });

   // app.get('/auth/facebook', passport.authenticate('facebook', { 'scope' : 'email' }));
   app.get('/auth/facebook', passport.authenticate('facebook', { 'scope' : 'email' }), function(req, res){
        console.log('in the facebook login');
   });
   /*
    app.get('/auth/facebook', function(req, res, next){
        passport.authenticate('facebook')(req, res, next);
    });    
    */
    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
  

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
            successRedirect : '/map',
            failureRedirect : '/'
    }));
   
 

    app.post('/api/user/signup', function(req,res,next){ 
        passport.authenticate('local-signup', function(err, user,info){
            if (err) {
              return next(err); // will generate a 500 error
            }
            // Generate a JSON response reflecting authentication status
            if (! user) {
              return res.send({ success : false, message : 'authentication failed' });
            }
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
        response = {
            message : "YES",
            user_id : req.user.id
        };
        res.send(response);
    });


    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

};

function uploadtoS3(newFileName,data){
    var buf;
    buf = new Buffer(data,'base64');
    var s3 = new AWS.S3();
    
    s3.upload({
        Key: newFileName,
        Bucket: 'leasy-images',
        Body: buf
    }, function(err, data){
        if (err) {
        console.log('There was an error getting your object: ', err.message);
        }
        console.log('Successfully downloaded photo.', data);         
    });
    
}

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