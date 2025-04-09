const Listing = require("../models/sampleListing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/Geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });



module.exports.listingIndex = async (req,res)=>{
    let allListings=await Listing.find();
    res.render("./listings/index.ejs",{allListings});    
    }

module.exports.listingUpdate = async (req,res)=>{
    console.log(req.user);
    let {id}=req.params;
    let listing = await Listing.findByIdAndUpdate(`${id}`,{...req.body.listing});
    // if(typeof req.file!=undefined){
    if(req.file){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename};
        listing.save();
    }
    req.flash("success", "Lisitng updated");
   res.redirect("/listings");
}

module.exports.renderListingForm = (req,res)=>{
    res.render("./listings/create.ejs" ,{ listing: {} });
   
};

module.exports.lisitngCreate = async (req,res,next)=>{
  let resp= await geocodingClient.forwardGeocode({query: req.body.listing.location , limit: 1}).send();
  

    let url = req.file.path;
    let filename = req.file.filename;
    // console.log(url,"..",filename);
       
    let listing= req.body.listing;
    // if ((!req.body.listing.image || !req.body.listing.image.url)) {
    //     req.body.listing.image = {
    //         url: 'https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'
    //     };
    // }
let listing2 = await new Listing(listing)
listing2.Owner = req.user._id;
listing2.image = {url,filename};
listing2.geometry =  resp.body.features[0].geometry;
let savdelist = await listing2.save();
// console.log(savdelist);
req.flash("success", "New lisitng added");
res.redirect("/listings");
}

module.exports.lisitngShow = async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(`${id}`).populate(
        {
        path:"reviews",
        populate:{path:"author"}
        }).populate("Owner");
    if(!listing){
        req.flash("error" , "Listing not found!");
        res.redirect("/listings");
    }
    res.render("./listings/show.ejs",{listing , MAP_TOKEN:process.env.MAP_TOKEN});
    }


module.exports.listingEdit = async (req,res)=>{
    let {id}=req.params;
    let listing = await Listing.findById(`${id}`);
    if(!listing){
        req.flash("error" , "Listing not found!");
        res.redirect("/listings");
    }
    let originalUrl = listing.image.url;
    originalUrl = originalUrl.replace("/upload","/upload/w_200,h_200,e_blur:30");
    res.render("./listings/edit.ejs",{listing , originalUrl});
    }

module.exports.listingDelete = async (req,res)=>{
    let delListing =async()=>{
    let {id} =req.params;
    let delList =await Listing.findOneAndDelete({_id:id});
    }
    await delListing();
    req.flash("success", "Lisitng deleted");
    res.redirect("/listings");
    
    }