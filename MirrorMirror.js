/*
Charl Ritter
Start date:12 July 2017
JourneyApps internship
*/

//Retrieve all GitHub users from Cape Town with more than 1 follower.
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhrUsers = new XMLHttpRequest();
xhrUsers.open("GET", 'https://api.github.com/search/users?q=location:"Cape Town"+followers:>=10+language:Javascript', false);
xhrUsers.setRequestHeader("Content-type", "application/json");
xhrUsers.send();

var output = JSON.parse(xhrUsers.responseText);//Parse the output to JSON
var login, url;
var numFollowers = 0;
var userArr = [];

//Loop through every GitHub user.
for (i in output.items) { 
    login = output.items[i].login;
    url =  output.items[i].url;

    //Retrieve all followers from the GitHub user.
    var xhrFollowers = new XMLHttpRequest();
    xhrFollowers.open("GET", url, false);
    xhrFollowers.setRequestHeader("Content-type", "application/json");
    xhrFollowers.send();
    var temp = JSON.parse(xhrFollowers.responseText);

    numFollowers = temp.followers;
    //If statements to add zeros infront of any number of followers, to make the sorting of the array work.
    if(numFollowers<10){
        numFollowers = "00"+numFollowers;
    }
    else if(numFollowers<100 && numFollowers>=10){
        numFollowers = "0"+numFollowers;
    }
    userArr.push(numFollowers+" "+login); //add number of followers and username to an array.
    numFollowers = 0;
}

userArr.sort(); //Sorts the elements of the array.
userArr.reverse(); //Reverses the order of the elements.

var flag = 0;
for(i in userArr){
    while(flag == 0){
        if(userArr[i].charAt(0) != 0){
            flag = 1;
        }
        else{
            userArr[i] = userArr[i].substr(1, userArr[i].length);
        }
    }
    flag = 0;
}

//Print out a heading and the 10 most popular javascript developers in Cape Town.
console.log("The 10 most popular javascript developers in Cape Town are:");
for(k=0; k<10; k++){
    console.log(k+1 +") "+ userArr[k]);
}