const Listing = require("./models/sampleListing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError");
const { reviewSchema} = require("./schema");
const {listingSchema } = require("./schema");

module.exports.isLogged = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.savedUrl = req.originalUrl;
        req.flash("error","You must be logged in");
       return res.redirect("/user/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.savedUrl){
        res.locals.savedUrl= req.session.savedUrl;
    }
    next();
  
}

module.exports.isOwner = async (req,res,next)=>{
    let {id}=req.params;
    let listing = await Listing.findById(id);
    console.log(listing.Owner);
    console.log(res.locals.currUser);
    if(!listing.Owner._id.equals(res.locals.currUser._id)){
    req.flash("error", "You don't have a access to manipulate this listing");
    return res.redirect(`/listings/${id}`);
    }

    next();
}

module.exports.validateListing =(req,res,next)=>{
    //JOI VAALIDATION FOR LISTING
   
        let {error}= listingSchema.validate(req.body);
        if(error){
        let errMsg = error.details.map((e)=>e.message).join(",");
        console.log(error);
       
            throw new ExpressError(400,errMsg);
        }else{
            next();
        }
    
    
}

module.exports.validateReview = (req,res,next)=>{
    let {error}= reviewSchema.validate(req.body);
    if(error){
    let errMsg = error.details.map((e)=>e.message).join(",");
    console.log(error);
   
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }

}

module.exports.isAuthor = async (req,res,next)=>{
    // console.log(req.params);
    let {reviewId,id}=req.params;
    let review = await Review.findById(reviewId);
    // console.log(review);
    console.log(res.locals.currUser);
    // if(!review.author.equals(res.locals.currUser))
    if (!res.locals.currUser || !review.author.equals(res.locals.currUser._id)){
    req.flash("error", "You don't have a access to manipulate this review");
    return res.redirect(`/listings/${id}`);
    }

    next();
}