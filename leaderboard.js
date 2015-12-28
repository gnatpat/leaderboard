const http = require('http');

leaderboard = []

http.createServer(function (request, response) {

    var requestURL = request.url.substring(1).split("?")[0];
    console.log(requestURL);
    if(requestURL == "add") {
        var optionsText = request.url.substring(1).split("?")[1];
        var options = optionsText.split("&");
        var optionsObj = {};
        for(var i = 0; i < options.length; i++)
        {
            var key = options[i].split("=")[0];
            var value = options[i].split("=")[1];
            optionsObj[key] = value;
        }
        var newEntry = true;
        var name = optionsObj.name;
        var score = optionsObj.score;
        for(var i = 0; i < leaderboard.length; i++)
            if(leaderboard[i].name == name)
            {
                newEntry = false;
                if(leaderboard[i].score < score)
                    leaderboard[i].score = score;
                break;
            }
        }
        if(newEntry)
            leaderboard.push({'name':optionsObj.name, 'score':optionsObj.score});
        leaderboard.sort(function(a, b) { return b.score - a.score });
    }
    response.writeHead(200, {'Content-Type': 'text/plain'});

    var scoresToSend = leaderboard.slice(0, 10);
    console.log(scoresToSend.length);
    for(var i = 0; i < scoresToSend.length; i++)
    {
        response.write("" + (i+1) + ". " + scoresToSend[i].name + ": " + scoresToSend[i].score + "\n");
    }

    response.end();

}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');
