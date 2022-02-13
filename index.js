const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ExpenseModel = require('./ExpenseModel.js');

const app = express();
const port = 3002;
const mongodburl = `mongodb+srv://kumar:123@cluster1.5nyxd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(mongodburl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.options('*', cors());  

//Promises:-

// function addExpPromise(){
//     new ExpenseModel({ 
//             expName: `marker`,
//             expAmt: 50,
//             expDate: new Date()
//         }).save().then( () => console.log("Expense saved"))
//                 .catch(err => console.log(err));
//     }
//     addExpPromise();

//OR
//Asnyc:-

// async function addExpense(){
//     try{ 
//     new ExpenseModel({ 
//             expName: `marker`,
//             expAmt: 50,
//             expDate: new Date()
//         }).save()
//     } 
//     catch(err)
//     {  
//         console.log(err);
//     }
// }
// addExpense();

//showinng only Backend

app.get('/', cors(), async(req, res) =>{
    try{
        let listofexps = await ExpenseModel.find()
        console.log(listofexps);
        res.send({
            code:1, listofexpenses: listofexps
        });
    }
    catch(err)
    {
        console.log(err)
    }
});

app.post('/saveExpense',cors(), async(req,res)=> {
    console.log(req.body);
    {
        try{
            await ExpenseModel(req.body).save()
            
            res.send({code:1, msg:"Expense saved"});
        }catch(err){
            console.log(err)
        }
    }
})

//13-02-2022
app.delete('/deleteExpense/:id', cors(), async(req,res)=>{
    try{
        const{id} =req.params;
        await ExpenseModel.findByIdAndDelete({_id: id});
        res.send({code:1, msg: 'Deleted Successfully'});

    }catch(err){
        res.send({code:0, msg:err.message})
    }
});

app.put('/editExpense/:id', cors(), async(req,res)=>{
    try{
        const{expName,expAmt, expDate}= req.body;
        console.log(expName)
        const{id} =req.params;
        const expense = await ExpenseModel.findByIdAndUpdate({_id: id},{expName,expAmt,expDate});
        await ExpenseModel.save()
        res.send({code:1, msg: 'Updated Successfully'});

    }catch(err){
        res.send({code:0, msg:err.message})
    }
});


app.use((req, res) => { 
    res.status(404).send(" <p> Page not found </p>");

});
app.listen(port, () =>{
    console.log(`App is live at https://localhost:${port}`)
});