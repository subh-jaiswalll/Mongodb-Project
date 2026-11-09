const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    title : {
        type : String,
        required : true
    },

    price : {
        type : Number,
        required : true
    },
    
    description : {
        type : String,
        required : true
    },
    imgUrl: {
        type : String,
        required : true
    }
},
{timestamps : true});

const Product = new mongoose.model('Product', productSchema);


module.exports = Product;