const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync");
const Listing=require("../models/sampleListing");
const joi =require("joi");
const reviews = require("./review");
const passport = require("passport");
const User = require("../models/user")
const {isLogged , isOwner} = require("../middleware");
const {validateListing}=require("../middleware");
const listingController = require("../controllers/listings");
const multer  = require('multer')
const {storage} = require("../cloudConfig");
const upload = multer({ storage })



//LISTING ROUTES

// INDEX ROUTE
router.get("/",wrapAsync(listingController.listingIndex))

//NEW LISTING FORM
router.route("/create")
.get(isLogged,listingController.renderListingForm)
.post(isLogged,
    upload.single("listing[image][url]"),
    validateListing,
    wrapAsync(listingController.listingCreate));


// UPDATE ROUTE 
router.route("/:id")
.put(
    isLogged,
    isOwner,
    upload.single("listing[image][url]"),
    validateListing,
    wrapAsync(listingController.listingUpdate))
.get(wrapAsync(listingController.listingShow))
.delete(isLogged,isOwner,wrapAsync(listingController.listingDelete));


//EDIT LISTING
router.get("/:id/edit",isLogged, isOwner,wrapAsync(listingController.listingEdit))





module.exports = router;