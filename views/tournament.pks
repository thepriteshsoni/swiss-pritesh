<!doctype html>
<html>
<head>
    <title>Tournaments</title>
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="/css/style1.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script type="text/javascript" src="/js/notify.min.js" ></script>
</head>
<body>
    <div class="container">
        <div class="page-header text-center">
            <h1>Tournament Master</h1>
            <a href="/profile" class="btn btn-default btn-sm">Home</a>
            <a href="/logout" class="btn btn-default btn-sm">Logout</a>
        </div>
        <div class="row">
            <div class="col-sm-6 text-center">
                <div class="well all-tours">
                    <h2 class="text-primary text-center">MY TOURNAMENTS </h2>
                    <hr>
                </div>
            </div>
            <div class="col-sm-6 text-center">
                <div class="well">
                    <h2 class="text-primary text-center">TOURNAMENT CREATION</h2>
                    Tournament name:<br>
                    <input class="tname" type="text" name="tname" value=""><br>
                    <hr>
                    <button class="btn btn-default btn-sm add-tour">Create</button>
                </div>
            </div>
        </div>
    </div>
    <script src="/js/tournament.js"></script>
</body>
</html>
