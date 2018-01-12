<!doctype html>
<html>
<head>
    <title>Swiss Profile</title>
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css">
    <style> body{ padding-top:40px; word-wrap:break-word; } </style>
</head>
<body>
    <div class="container">
        <div class="page-header text-center">
            <h1><span class="fa fa-anchor"></span> DASHBOARD</h1>
            <a href="/logout" class="btn btn-default btn-sm">Logout</a>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="well">
                    <h3 class="text-primary text-center"> TOURNAMENTS </h3>
                    <p class="text-center"> <a href="/tournament">View tournaments</a></p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <div class="well">
                    <h3><span class="fa fa-user"></span> Local</h3>
                    <p>
                        <strong>email</strong>: {{user.email}}<br>
                    </p>
                </div>
            </div>
            {{#if user.id}}
            <div class="col-sm-6">
                <div class="well">
                    <h3 class="text-primary"><span class="fa fa-facebook"></span>
                    <span class="fa fa-google-plus"></span> Social media handle</h3>
                    <p>
                        <strong>id</strong>: {{user.id}}<br>
                        <strong>token</strong>: {{user.token}}<br>
                        <strong>email</strong>: {{user.email}}
                    </p>
                </div>
            </div>
            {{/if}}
        </div>
    </div>
</body>
</html>
