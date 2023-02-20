const express= require("express")
var items=['go to store','meal prep','jump rope'];
let workItems=[]
const bodyParser=require("body-parser")

 
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
// to include the css must be stored under folder named public.
app.use(express.static("public"));
//for ejs
app.set('view engine', 'ejs');

app.get("/",function(req,res){
   // inbuilt js function
    var today= new Date();
    const options={
        weekday:'long',
        day:'numeric',
        year:'numeric',
        month:'long'
    }
    var day=today.toLocaleDateString("en-us", options);
    
        
   res.render("list", {listTitle:day, newListItem:items});
   
   app.post("/", function(req,res){
   let item=req.body.newItem;

   if(req.body.list==="work"){
    workItems.push(item);
    res.redirect("/work");

   }else{
   items.push(item);
   res.redirect("/");
   }
   });
});
app.get("/work", function(req,res){
    res.render("list",{listTitle:"work list", newListItem:workItems});
})
app.post("/work", function(req,res){
    let item=req.body.newItem
    workItems.push(item);
    res.redirect("/work");
})



app.listen(3000,function(){
    console.log("server is running on port 3000")
})