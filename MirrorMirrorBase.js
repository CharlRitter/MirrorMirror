/*
Charl Ritter
Start date:24 July 2017
JourneyApps internship
*/

//Retrieve all GitHub users from Cape Town with more than 1 follower.
var fetch = require("node-fetch");
var output;
var login, temp;
var numFollowers = 0;
var userArr = [];
var url = [];
fetch('https://api.github.com/search/users?q=location:"Cape Town"+followers:>=10+language:Javascript', {
    method: 'GET'
}).then(function(response){
    return response.json();
}).then(function(json){
    output = json;
    for(i in output.items){
        url.push(output.items[i].url + "?access_token=d66c6fbc9f79f7ca4a621bac4efb29e4f82d701e");
    }
    return url;
}).then(function(url){
    //console.log(url);
    for(i in url){
        fetch(url[i], {
            method: 'GET'
        }).then(function(response){
            return response.json();
        }).then(function(json){
            temp = json;
            login = temp.login;
            numFollowers = temp.followers;
            userArr.push(numFollowers+" "+login);
           
            return userArr;
            
        }).catch(function(error){
            console.log("error2");
        });
    }
    // var p = new Promise(function(resolve, reject){
    //     if(true){
    //         resolve(userArr);
    //     }else{
    //         reject(error);
    //     }
    // });

    // p.then(function(userArr){
    //     console.log(userArr);
    // }, function(error){
    //     console.log("error3")
    // });
    
}).catch(function(error){
    console.log("error1");
});


