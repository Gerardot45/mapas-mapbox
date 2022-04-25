const mongoose = require("mongoose");
const geocoder = require('../utils/geocoder')

const StoreSchema = new mongoose.Schema({
  storeId: {
    type: String,
    required: [true, "Please, add a store ID"],
    unique: true,
    trim: true,
    maxlength: [10, "Store Id must be less than 10 chars"],
  },
  address : {
      type:String,
      required:[true,"Please add an address"] // esta dirección se convertirá a coordenadas
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    //required: true,
    },
    coodinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

StoreSchema.pre('save', async function(next){
    const loc = await geocoder.geocode(this.address)
    this.location = {
      type : 'Point',
      coodinates : [loc[0].longitude, loc[0].latitude],
      formattedAddress : loc[0].formattedAddress
    }

    //Do not save address 
    this.address = undefined
    console.log(loc);
    next()
})

module.exports = mongoose.model("Store", StoreSchema);
