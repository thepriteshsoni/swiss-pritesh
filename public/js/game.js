$(function() {
    $('.report-game').on('click', function() {
        var $tour = $('.tour-id strong').text();
        var $win = $('select.winning');
        var $h = $('.history');
        var rpg = { name: [] };
        $('.report-game').css({"display": "none"});
        $('.fixtures').css({"display": "none"});
        $win.each(function() {
            rpg.name.push($(this).val());
        });
        $.ajax({
            type: 'POST',
            url: 'report/'+ $tour +'',
            dataType: "json",
            data: rpg,
            success: function(msg) {
                $.notify(
                    msg.msg, 'success',
                    { position: 'top center', autoHideDelay: 10000}
                );
                $.each(rpg.name, function(i, game) {
                    var pair = game.split('.');
                    var round = pair[0];
                    var winner = pair[1];
                    var loser = pair[2];
                    $h.append(`
                        <tr>
                            <td> ${round} </td>
                            <td> ${winner} </td>
                            <td> ${loser} </td>
                        </tr>
                    `);
                });
                setTimeout(function() {
                    window.location.href = '/tournament/'+ $tour +'';
                }, 4000);
            },
            error: function() {
            }
        });
    });
});
