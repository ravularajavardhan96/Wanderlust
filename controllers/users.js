const User = require("../models/user");

module.exports.renderSignupForm =(req,res)=>{
    res.render("./user/addUser.ejs");
}

module.exports.userSignup = async (req,res)=>{
    try{
        let {email,username,password} = req.body;
    let newUser = new User({email,username});
   let RegiUser= await User.register(newUser,password);
   req.login(RegiUser,(err)=>{
    if(err){
        return next(err);
    }
    console.log(RegiUser);
    req.flash("success","Registered successfully")
    res.redirect("/listings");

   })
  
    }
    catch(e){
        req.flash("error",`${e.message}`);
        res.redirect("/user/login");
    }
    
}

module.exports.renderLoginform = (req,res)=>{
    res.render("./user/loginpage.ejs");
}

module.exports.userLogin = async (req,res)=>{
    req.flash("success" , "Welcome back to Wanderlust!");
    let redirectUrl = res.locals.savedUrl || "/listings";
    res.redirect(redirectUrl);

};

module.exports.userLogout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next();
        }
        req.flash("success" , "Logged out successfully!");
        res.redirect("/listings");
    })
}