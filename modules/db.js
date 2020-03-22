const mongoose =require('mongoose');
const Schema=mongoose.Schema;

const productSchema=new Schema({
    pname:{
        type:String,
        required:true
    },
    pimg:{
        type:String
    },
    pprice:{
        type:Number,
        default:0
    },
    pdesc:{
        type:String
    }
});
const Product=mongoose.model('products',productSchema);
module.exports=Product;