const Listing = require("../models/sampleListing");
const Review = require("../models/review");


module.exports.reviewCreate = async (req,res,next)=>{
    let {id} =req.params;
    let reqListing = await Listing.findById(`${id}`);
    let newReview = await new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    reqListing.reviews.push(newReview);
    await reqListing.save();
    await newReview.save();
    req.flash("success", "Review created");
    res.redirect(`/listings/${id}`);
}

module.exports.reviewDelete = async (req,res)=>{
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
  
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted");
    res.redirect(`/listings/${id}`);
  }