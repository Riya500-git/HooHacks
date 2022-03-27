const router = require("express").Router();
const User = require("./models/User");
const bcrypt = require("bcrypt");
const crypto = require('crypto');
var email = require('./utility/mailer');

//REGISTER
router.post("/register", async (req, res) => {

  User.findOne({ username: req.body.username }, async function (err, user) {

    // error occur
    if(err){
      res.status(500).json({msg: err.message});
  }
  // if email is exist into database i.e. email is associated with another user.
  else if (user) {
      res.status(400).json({msg:'This username is already associated with another account.'});
  }else{

  try {
    var interests = []
    const reqBody = req.body;

    if(reqBody.sports){
      interests.push(reqBody.sports);
    }
    if(reqBody.movies){
      interests.push(reqBody.movies);
    }
    if(reqBody.reading){
      interests.push(reqBody.reading);
    }
    if(reqBody.writing){
      interests.push(reqBody.writing);
    }
    if(reqBody.charity){
      interests.push(reqBody.charity);
    }
    if(reqBody.gardening){
      interests.push(reqBody.gardening);
    }
    if(reqBody.gaming){
      interests.push(reqBody.gaming);
    }
    if(reqBody.art){
      interests.push(reqBody.art);
    }
    if(reqBody.traveling){
      interests.push(reqBody.traveling);
    }
    if(reqBody.music){
      interests.push(reqBody.music);
    }
    if(reqBody.pets){
      interests.push(reqBody.pets);
    }
    if(reqBody.cooking){
      interests.push(reqBody.cooking);
    }
    if(reqBody.collecting){
      interests.push(reqBody.collecting);
    }
    const hashedPass = bcrypt.hashSync(req.body.password, 10);

    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
      gender: req.body.gender,
      age: req.body.age,
      interests: interests,
      address: req.body.address,
      country: req.body.country,
      state: req.body.state,
      zipcode: req.body.zip
    });

    const user = await newUser.save();

    if(user){
      if(process.env.MAIL_USERNAME && process.env.MAIL_PASSWORD){
        email.welcome(user.firstname, user.lastname, user.email);
      }

    res.status(200).json(user);
    
    }else{
      res.status(500).json("Something went wrong");
    }

  } catch (err) {
    res.status(500).json(err);
  }
}
});
});

//LOGIN
router.post("/login", (req, res) => {
      User.findOne({ email: req.body.email }).then(user => {
      !user && res.status(400).json({message: "Wrong email!"});
      
      user && bcrypt.compare(req.body.password, user.password).then(validated => {
        !validated && res.status(400).json({message: "Wrong password!"});

        const { password, ...others } = user._doc;

        user  && res.cookie('username', others.username).sendFile(__dirname + '/public/index.html');
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
});

module.exports = router;
