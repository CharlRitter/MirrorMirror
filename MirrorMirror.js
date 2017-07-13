/*
Charl Ritter
Start date:12 July 2017
JourneyApps internship
*/

//Creates a localhost that displayes the top 10 list.
var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var Arr = [];
    var txt1 = "The 10 most popular javascript developers in Cape Town are: ";
    var txt2;
    Arr = getUsers();
    //Print out a heading and the 10 most popular javascript developers in Cape Town.
    res.write("<p>" + txt1.fontsize(5).bold() + "</p>" + "<br>");
    for(k=0; k<10; k++){
        txt2 = k+1 + ") " + Arr[k];
        res.write(txt2.fontsize(4) + "<br>");
    }
    res.end();
}).listen(8080);

//A function to retrieve an array of usernames & their followers.
function getUsers(){
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
    //To remove the zeros added earlier, infront of number of followers, to make sorting easier.
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
    return userArr;
}