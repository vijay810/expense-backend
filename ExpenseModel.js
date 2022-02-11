const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema(
{
    expName:{
        type: String,
        required: true,
        minlength: 3
    },
    expAmt:{
        type: Number,
        required: true,
        min: 1,
        max: 10000
    },
    expDate:{
        type: Date,
        required: true,
        immutable: false
    }
},
{timestamps: true}
);
module.exports=mongoose.model("Expense", ExpenseSchema);