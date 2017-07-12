$(function() {

    $('.block-user').on('click', function() {

        if(!$('.icx').val()) {
            $.notify(
                'Empty input!', 'error',
                { position: 'top center', autoHideDelay: 10000}
            );
        }

        var user = {
            name : $('.icx').val()
        }

        $.ajax({
            type: 'POST',
            url: 'admin/block',
            dataType: "json",
            data: user,
            success: function(res) {
                $.notify(
                    "User blocked!", "success",
                    { globalPosition: 'top center', autoHideDelay: 10000}
                );
                $('.tb').append(`
                    <tr>
                        <td>${user.name}</td>
                        <td>SUSPENDED</td>
                    </tr>
                `);
                setTimeout(function() {
                    window.location.href = '/admin';
                }, 2000);
            },
            error: function() {
            }
        });
    });

});
