if(process.NODE_ENV != "production"){
    require("dotenv").config();
    
}

const express=require("express");
const app = express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const listingRouter = require("./routes/listing")
const reviewRouter = require("./routes/review");
const userRouter = require("./routes/user");
const { error } = require("console");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

// const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

const dbUrl = process.env.ATLAS_DB_CONN;

const store= MongoStore.create({
         mongoUrl:dbUrl,
         crypto:{
            secret:process.env.SECRET
         },
         touchAfter:24 * 3600,
    });

app.use(session(
    {     
        store:store,
        secret:process.env.SECRET,
        resave:false,
        saveUninitialized:true
    }
));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})
//MONGODB DATABASE
async function main(){
    // await mongoose.connect(MONGO_URL);
    await mongoose.connect(dbUrl);
}
main()
.then(()=>{
    console.log("connected successfully");
})
.catch((err)=>{
    console.log(err)
})

app.listen(8080,()=>{
    console.log("The server is started");
});

// ROOT
app.get("/",wrapAsync(async (req,res)=>{
    // res.send("This is live");
    res.render("listings");
}));

//DEMO USER
// app.get("/demouser",async (req,res)=>{
//     let fake_user =new User({
//         username:"Raju",
//         email:"raju@gmail.com"
//     });
//     let registeredUser = await User.register(fake_user,"Raja");
//     res.send(registeredUser);
    
    
// })



//LISTING AND REVIEW ROUTES
app.use("/listings", listingRouter);
app.use("/listings/:id",reviewRouter);
app.use("/user",userRouter);


//HANDLING ALL UNDEFINED REQUESTS
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found"));
})

//ERROR HANDLING
app.use((err,req,res,next)=>{
    let {statusCode = 400,message = "Internal server error"}=err;
   res.status(statusCode).render("./listings/error.ejs",{message});
})






