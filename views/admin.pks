<!doctype html>
<html>
<head>
    <title>Admin Panel</title>
    <link rel="stylesheet" href="/css/style1.css">
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script type="text/javascript" src="/js/notify.min.js" ></script>
</head>
<body>
    <div class="container">
        <div class="page-header text-center">
            <h1>Administrator Module</h1>
            <a href="/logout" class="btn btn-default btn-sm">Logout</a>
        </div>
        <div class="row">
            <div class="col-sm-4 text-center">
                <div class="well">
                    <h2 class="text-primary text-center">ALL USERS</h2>
                    <hr>
                    <table class="tb" align="center">
                        <tr>
                            <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;User</th>
                            <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Status</th>
                        </tr>
                        {{#each pool}}
                        <tr>
                            <td>{{email}}</td>
                            <td>{{status}}</td>
                        </tr>
                        {{/each}}
                    </table>
                </div>
            </div>
            <div class="col-sm-5 text-center">
                <div class="well">
                    <h2 class="text-primary text-center">TOP 5 ACTIVE USERS</h2>
                    <hr>
                    <table align="center">
                        <tr>
                            <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Username</th>
                            <th>No of tournaments</th>
                            <th>No of matches</th>
                        </tr>
                        {{#each top}}
                        <tr>
                            <td>{{email}}</td>
                            <td>{{tours}}</td>
                            <td>{{matches}}</td>
                        </tr>
                        {{/each}}
                    </table>
                </div>
            </div>
            <div class="col-sm-3 text-center">
                <div class="well">
                    <h2 class="text-primary text-center">BLOCK USERS</h2>
                    <hr>
                    <table align="center">
                        <tr>
                            <select class="icx" name="buser">
                                {{#each block}}
                                    <option value="{{email}}">{{email}}</option>
                                {{/each}}
                            </select>
                        </tr>
                    </table>
                    <hr>
                    <button class="block-user">OK</button>
                </div>
            </div>
        </div>
    </div>
    <script src="/js/admin.js"></script>
</body>
</html>
