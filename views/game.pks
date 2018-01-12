<!doctype html>
<html>
<head>
    <title>Report Matches</title>
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="/css/style1.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script type="text/javascript" src="/js/notify.min.js" ></script>
</head>
<body>
    <div class="container">
        <div class="page-header text-center">
            <h1 class="tour-id"><strong>{{tour}}</strong>: Matches Timeline</h1>
            <a href="/profile" class="btn btn-default btn-sm">Home</a>
            <a href="/tournament/{{tour}}" class="btn btn-default btn-sm">Back</a>
            <a href="/logout" class="btn btn-default btn-sm">Logout</a>
        </div>
        <div class="row">
            <div class="col-sm-8 text-center">
                <div class="well">
                    <h2 class="text-primary text-center">FIXTURES</h2>
                    <hr>
                    <table class="fixtures" align="center">
                        <tr>
                            <th id="r">Round</th>
                            <th id="p1">Player 1</th>
                            <th id="p2">Player 2</th>
                            <th id="w">Winner</th>
                        </tr>
                        {{#each pair}}
                        <tr>
                            <td>{{../nxt}}</td>
                            <td>{{this.0.name}}</td>
                            <td>{{this.1.name}}</td>
                            <td>
                                <select class="winning" name="won">
                                    <option value="{{../nxt}}.{{this.0.name}}.{{this.1.name}}">{{this.0.name}}</option>
                                    <option value="{{../nxt}}.{{this.1.name}}.{{this.0.name}}">{{this.1.name}}</option>
                                </select>
                            </td>
                        </tr>
                        {{/each}}
                    </table>
                    <hr>
                    <button class="report-game">REPORT MATCHES</button>
                </div>
            </div>
            <div class="col-sm-4 text-center">
                <div class="well">
                    <h2 class="text-primary text-center">MATCHES HISTORY</h2>
                    <hr>
                    <table class= "history" align="center">
                        <tr>
                            <th>Round</th>
                            <th>Winner</th>
                            <th>Loser</th>
                        </tr>
                        {{#each game}}
                        <tr>
                            <td>{{round}}</td>
                            <td>{{winner}}</td>
                            <td>{{loser}}</td>
                        </tr>
                        {{/each}}
                    </table>
                </div>
            </div>
        </div>
    </div>
    <script src="/js/game.js"></script>
</body>
</html>
