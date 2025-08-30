const { default: mongoose } = require("mongoose");

const foodModel = new mongoose.Schema({
    foodName:String,
    price:Number,
    pathname:String,
    description:String,
    resto_id:mongoose.Schema.Types.ObjectId
})

export const foodSchema = mongoose.models.fooditems
|| mongoose.model("fooditems", foodModel);

