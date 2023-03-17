module.exports=getDate;



// inbuilt js function
function getDate(){
let today= new Date();
let options={
    weekday:'long',
    day:'numeric',
    year:'numeric',
    month:'long'
}
let day=today.toLocaleDateString("en-us", options);
return day
}