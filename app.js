const express= require("express")
const mongoose=require("mongoose")
// used arrays to store items before learning mongoose
// var items=['go to store','meal prep','jump rope'];
// let workItems=[]
const bodyParser=require("body-parser")
const date=require(__dirname + "/date.js");
 
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
//for ejs
app.set('view engine', 'ejs');

// mongoose
mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", {useNewUrlParser:true});

const itemsSchema= new mongoose.Schema({
    name:String
});
const Item=mongoose.model("Item",itemsSchema);

const items=[
    {name:"welcome to your todo list"},
    {name:"Hit the '+' button to add a new item"},
    {name:"--> hit this to delete an item"}
];

const listSchema={
    name:String,
    items:[itemsSchema]
};

const List=mongoose.model("List",listSchema)

async function getItems(){
    const Items= await Item.find({});
    return Items
}

app.get("/",function(req,res){
getItems().then(function(FoundItems){
    if(FoundItems.length===0){
    Item.insertMany(items).then(function(docs){
        console.log("documents inserted:",docs.length);
    }).catch(function(err){
        console.log(err);
    });
    res.redirect("/");
}else{
    res.render("list", {listTitle:"today", newListItem:FoundItems});
}
   
 });
   
});   
    
   
   app.post("/", function(req,res){
       const itemName =req.body.newItem
       const item= new Item({
        name:itemName
       });

      item.save();
      res.redirect("/")
   });

   
   

// app.post("/delete", function(req,res){
//     async function deleteItem(){
//         const toDelete=req.body.checkbox
//         const checkedItem=await Item.findOneAndDelete({toDelete})
//         return checkedItem
//     }
//     deleteItem().then
//          res.redirect ("/")
// });






app.listen(3000,function(){
    console.log("server is running on port 3000")
});