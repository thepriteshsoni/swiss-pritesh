$(function() {

    var $players = $('.all-players');
    var $rank = $('.rankings');
    var $ep = $('.ep');
    var $pname = $('.p1');
    var $tour = $('.tour-id strong').text();
    var $cnt = 0;

    function initialize() {
        var r=4+parseInt(Math.random()*16);
        for(var i=r; i--;) {
            setTimeout(function() {
                'createFirework(8,14,2,null,null,null,null,null,Math.random()>0.5,true)' },
                (i+1)*(1+parseInt(Math.random()*1000)));
            }
        return false;
    }

    $.ajax({
        type: 'GET',
        url: 'browse/'+ $tour +'',
        success: function(result) {
            $.each(result.players, function(i, player) {
                $players.append('<tr> <td> '+ player.name +' </td> </tr>');
            });
            $.each(result.ep, function(i, player) {
                $ep.append('<option value="'+ player.name +'"> '+ player.name +'</option>');
            });
            $.each(result.ranks, function(i, player) {
                $cnt = i+1;
                $rank.append(`
                    <tr>
                        <td> ${$cnt} </td>
                        <td> ${player.name} </td>
                        <td> ${player.matches} </td>
                        <td> ${player.wins} </td>
                    </tr>
                `);
            });
        },
        error: function() {
            alert('error loading tournaments!');
        }
    });

    $('.new-player').on('click', function() {

        if($pname.val() == '') {
            $.notify(
                'Player name is mandatory!', 'error',
                { position: 'top center', autoHideDelay: 10000}
            );
        }

        else {

            var player = {
                name: $pname.val()
            };


            $.ajax({
                type: 'POST',
                url: 'player/'+ $tour +'',
                dataType: "json",
                data: player,
                success: function(msg) {
                    $('.p1').val('');
                    var type = msg.id == 0 ? "error" : ( msg.id == -1 ) ? "info" : "success";
                    $.notify(
                        msg.msg, type,
                        { position: 'top center', autoHideDelay: 10000}
                    );
                    if(msg.id == 1) {
                        $players.append('<tr> <td> '+ msg.name +' </td> </tr>');
                        $rank.append(`
                            <tr>
                                <td> ${++$cnt} </td>
                                <td> ${msg.name} </td>
                                <td> ${0} </td>
                                <td> ${0} </td>
                            </tr>
                        `);
                    }
                },
                error: function() {
                }
            });

        }

    });

    $('.ex-player').on('click', function() {

        if(!$ep.val()) {
            $.notify(
                'Empty input!', 'error',
                { position: 'top center', autoHideDelay: 10000}
            );
        }

        else {

            var player = {
                name: $ep.val()
            };


            $.ajax({
                type: 'POST',
                url: 'eplayer/'+ $tour +'',
                dataType: "json",
                data: player,
                success: function(msg) {
                    var type = msg.id == 0 ? "error" : ( msg.id == -1 ) ? "info" : "success";
                    $.notify(
                        msg.msg, type,
                        { position: 'top center', autoHideDelay: 10000}
                    );
                    if(msg.id == 1) {
                        $players.append('<tr> <td> '+ msg.name +' </td> </tr>');
                        $rank.append(`
                            <tr>
                                <td> ${++$cnt} </td>
                                <td> ${msg.name} </td>
                                <td> ${0} </td>
                                <td> ${0} </td>
                            </tr>
                        `);
                        $ep.empty();
                        $.each(msg.ep, function(i, player) {
                            $ep.append('<option value="'+ player.name +'"> '+ player.name +'</option>');
                        });
                    }
                },
                error: function() {
                }
            });

        }

    });

    $('.conduct').on('click', function() {

        $.ajax({
            type: 'GET',
            url: 'game/'+ $tour +'',
            success: function(msg) {
                var type = msg.id == 0 ? "error" : ( msg.id == -1 ) ? "info" : "success";
                if(msg.id == 0 || msg.id == -1 || msg.id == 2) {
                    $.notify(
                        msg.msg, type,
                        { position: 'top center', autoHideDelay: 10000}
                    );
                }
                if(msg.id == 2) {
                    initialize();
                }
                if(msg.id == 1) {
                    window.location.href = 'game/view/'+ $tour +'';
                }
            },
            error: function() {
            }
        });

    });

});
