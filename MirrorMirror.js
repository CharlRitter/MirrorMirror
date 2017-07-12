/*
Charl Ritter
Start date:12 July 2017
JourneyApps internship
*/

//console.log(getUsers());

//function getUsers(){
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.github.com/search/users?q=location:cape town followers:>=1", false);
xhr.setRequestHeader("Content-type", "application/json");
xhr.send();

var output = xhr.responseText;
console.log(output);
console.log(xhr.status);
console.log(xhr.statusText);
//}
