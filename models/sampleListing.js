const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require('./review');

const listingSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    // image: {
    //     type: {
           
    //         url: {
    //             type: String,
    //             default: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
    //         }
    //     },
    //     default:()=>( {
    //         filename: "default.jpg",
    //         url: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
    //     })
    // },
    image:{
        url:String,
        filename:String

    },
    price:{
        type:Number,
        required:true
    },
    location:{
        type:String,

    },
    country:{
        type:String
    },
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review"
    }],
    Owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    geometry:{
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      }
});
listingSchema.post("findOneAndDelete",async(listing)=>{
    console.log("This is a post middlware. Im in samplelisting.js");
  if(listing){
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
    
});

const Listing=mongoose.model("Listing",listingSchema);

module.exports = Listing;