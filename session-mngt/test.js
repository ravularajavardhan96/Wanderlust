const express = require('express');
const app = express();
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

const flash = require("connect-flash");
const cookieParser =require('cookie-parser');
const session = require('express-session');
const sessionOptions =  {
    secret:"Thisisasecretstring",
    resave:false,
    saveUninitialized:true
    }

app.use(cookieParser("babbi"));
app.use(session( sessionOptions));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.errorMsg=req.flash("not registered");
    res.locals.successMsg=req.flash("registered");
   
    next();
})
app.listen(3000,()=>{
    console.log("The server started ");
})

app.get("/reqcount",(req,res)=>{
    if(req.session.count){
        req.session.count++;
    }else{
        req.session.count=1;
    }
    res.send(`You sent request ${req.session.count} times`);
})

app.get("/test",(req,res)=>{
    res.send("This is a session");
})


//    STORING AND ACCESSING INFO

app.get("/register",(req,res)=>{
    let {name = "Raj"}=req.query;   
    req.session.name=name;
    console.log(req.session);
    if(name=='Raj'){
        req.flash("not registered" , " not Registered");

    }else{
        req.flash("registered" , "Registered successfully");
    }
  
    res.send("The flash is stored");
});

app.get("/hello",(req,res)=>{
    console.log(req.session);
    let name=req.session.name;
   
    
    res.render("page.ejs", {name});
})


//          COOKIES

app.get("/getcookies",(req,res)=>{
    res.cookie("name","babbi");
    res.send("This is a cookies route");

})

app.get("/",(req,res)=>{
    let {name ="babbi"}=req.cookies;
    // console.log(req.cookies);
    console.log(req.signedCookies);
    res.send(name);
})

app.get("/signedCookie",(req,res)=>{
    res.cookie("love","coding",{signed:true});
    res.send("The signed cookie sent");
})

app.get("/",(req,res)=>{
    console.dir(req.cookies);
    let {college="Deeksha"}=req.cookies;
    res.send(college);
})

app.get("/cookies",(req,res)=>{
    res.cookie("This","cookie");
    res.cookie("role","developer");
    res.send("You sent some cookies");
})

app.get("/signedcookies",(req,res)=>{
    res.cookie("name" ,"raja",({signed:true}));
    res.send("The signed cookies are sent");

});

app.get("/verify",(req,res)=>{
    console.log(req.signedCookies);
    res.send(req.signedCookies);
})