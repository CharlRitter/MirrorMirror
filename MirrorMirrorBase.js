/*
Charl Ritter
Start date:24 July 2017
JourneyApps internship
*/

//Retrieve all GitHub users from Cape Town with more than 1 follower.
var fetch = require("node-fetch");
var login;
var numFollowers = 0;
var userArr = [];
fetch('https://api.github.com/search/users?q=location:"Cape Town"+followers:>=10+language:Javascript', {
    method: 'GET'
}).then(function(response){
    return response.json();
}).then(function(json){
    return json.items.map(function(item){
        return item.url + "?access_token=process.env.GITHUB_TOKEN";
    });
}).then(function(urls){
    return urls.map(function(url){
        return fetch(url, {
                    method: 'GET'
                }).then(function(response){
                    return response.json();
                }).then(function(json){
                    return json;
                }).catch(function(error){
                    console.log("error2");
                });
        });
}).then(function(urls){
    Promise.all(urls).then(function(results){
        userArr = results.map(function(result){
            return (result.followers + " " + result.login);
        });
        var output = userArr.slice(0,10);
        var count = 1;
        console.log("The 10 most popular javascript developers in Cape Town are: ");
        output.forEach(function(user){
            console.log(count + ") " + user);
            count++;
        })
    }).catch(function(error){
        console.log("error3")
    });
}).catch(function(error){
    console.log("error1");
});