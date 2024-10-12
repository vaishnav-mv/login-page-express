const express = require('express');
const router = express.Router();
const credential={
    email: "you@example.com",
    password : "password"
};

//login user
router.post('/login',(req,res)=>{
    if(req.body.email==credential.email && req.body.password==credential.password){
        req.session.user=req.body.email;
        res.redirect('/route/dashboard');
    }else{
        // res.end("invalid username");
        res.render('base', { title: "Login System", error: "Invalid Username or Password" });
    }
});

router.get('/login', (req, res) => {
    res.render('base', { title: "Login System" });
});

router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user});
    }else{
        res.send("Unauthorized User");
    }
});

router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error");
        }else{
            res.render('base',{title:"Login System",logout:"Logout Successfully...!",alertClass:"alert-success"});
        }
    });
});

module.exports = router;