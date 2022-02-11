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


app.use((req, res) => { 
    res.status(404).send(" <p> Page not found </p>");

});
app.listen(port, () =>{
    console.log(`App is live at https://localhost:${port}`)
});