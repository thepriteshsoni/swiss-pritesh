<!doctype html>
<html>
<head>
    <title>Tournament Info</title>
    <link rel="stylesheet" href="/css/style1.css">
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script type="text/javascript" src="/js/notify.min.js" ></script>
</head>
<body>
    <div class="container">
        <div class="page-header text-center">
            <h1 class="tour-id"><strong>{{tour}}</strong>: Tournament Manager</h1>
            <a href="/profile" class="btn btn-default btn-sm">Home</a>
            <a href="/tournament" class="btn btn-default btn-sm">Back</a>
            <a href="/logout" class="btn btn-default btn-sm">Logout</a>
        </div>
        <div class="row">
            <div class="col-sm-4 text-center">
                <div class="well">
                    <h2 class="text-primary text-center">REGISTERED PLAYERS</h2>
                    <hr>
                    <table class= "all-players" align="center">
                        <tr>
                            <th>Player Name</th>
                        </tr>
                        {{#each player}}
                        <tr>
                            <td>{{name}}</td>
                        </tr>
                        {{/each}}
                    </table>
                </div>
            </div>
            <div class="col-sm-4 text-center">
                <div class="well">
                    <h4 class="text-primary text-center">REGISTER PLAYER</h4>
                    <hr>
                    Player name:<br>
                    <input class="p1" type="text" name="pname" value=""><br>
                    <hr>
                    <input type="submit" class="new-player btn btn-default btn-sm" value="Add new player">
                    <hr>
                    <h4 class="text-primary text-center">ADD EXISTING PLAYER</h4>
                    <hr>
                    Player name:<br>
                    <select class="ep" name="eplayer">
                    </select>
                    <hr>
                    <input type="submit" class="ex-player btn btn-default btn-sm" value="Add existing player">
                    <hr>
                    <h2 class="conduct text-primary text-center"> <a>CONDUCT NEXT ROUND</a> </h2>
                </div>
            </div>
            <div class="col-sm-4 text-center">
                <div class="well text-center">
                    <h2 class="text-primary text-center">CURRENT PLAYER STANDINGS</h2>
                    <hr>
                    <table class="rankings" align="center">
                        <tr>
                            <th>Rank</th>
                            <th>Player</th>
                            <th>Matches</th>
                            <th>Wins</th>
                        </tr>
                        {{#each rank}}
                        <tr>
                            <td>{{@index}}</td>
                            <td>{{name}}</td>
                            <td>{{matches}}</td>
                            <td>{{wins}}</td>
                        </tr>
                        {{/each}}
                    </table>
                </div>
            </div>
        </div>
        <p class="hidden">{{finalwinner}}</p>
    </div>
    <script src="/js/browse.js"></script>
</body>
</html>
