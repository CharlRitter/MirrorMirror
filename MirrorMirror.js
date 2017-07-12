/*
Charl Ritter
Start date:12 July 2017
JourneyApps internship
*/


var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhrUsers = new XMLHttpRequest();
xhrUsers.open("GET", "https://api.github.com/search/users?q=location:cape town followers:>=1", false);
xhrUsers.setRequestHeader("Content-type", "application/json");
xhrUsers.send();

var output = JSON.parse(xhrUsers.responseText);
var Login, FollowersUrl;
var numFollowers = 0;

for (i in output.items) { 
    for (j in output.items[i].login) {
        Login = output.items[i].login;
        FollowersUrl =  output.items[i].followers_url;
        }
    var xhrFollowers = new XMLHttpRequest();
    xhrFollowers.open("GET", FollowersUrl, false);
    xhrFollowers.setRequestHeader("Content-type", "application/json");
    xhrFollowers.send();
    var temp = JSON.parse(xhrFollowers.responseText);
    numFollowers = temp.length;

    console.log(Login);
    console.log(numFollowers);
    console.log();
    numFollowers = 0;
}