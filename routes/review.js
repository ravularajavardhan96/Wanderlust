const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const Listing=require("../models/sampleListing");
const Review = require("../models/review");
const {validateReview , isLogged,isAuthor} = require("../middleware");
const reviewController = require("../controllers/reviews");


// REVIEWS ROUTE - POST REQUEST
router.post("/reviews",isLogged,validateReview,wrapAsync(reviewController.reviewCreate));



//REVIEW ROUTE - DELETE ROUTE
router.delete("/reviews/:reviewId",isAuthor,wrapAsync(reviewController.reviewDelete));

module.exports = router;