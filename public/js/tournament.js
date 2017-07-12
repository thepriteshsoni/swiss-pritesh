$(function() {

    var $tours = $('.all-tours');
    var $tname = $('.tname');

    $.ajax({
        type: 'GET',
        url: 'tournament/gettours',
        success: function(tours) {
            $.each(tours, function(i, tour) {
                $tours.append('<h3><a href="/tournament/'+ tour.name +'"> '+ tour.name +' </a></h3>');
            });
        },
        error: function() {
            alert('error loading tournaments!');
        }
    });

    $('.add-tour').on('click', function() {

        if($tname.val() == '') {
            $.notify(
                'Tournament name is mandatory!', 'error',
                { position: 'top center', autoHideDelay: 10000}
            );
        }

        else {

            var tour = {
                name: $tname.val()
            };


            $.ajax({
                type: 'POST',
                url: 'tournament/new',
                dataType: "json",
                data: tour,
                success: function(newTour) {
                    $.notify(
                        "Tournament created!", "success",
                        { globalPosition: 'top center', autoHideDelay: 10000}
                    );
                    $tours.append('<h3><a href="/tournament/'+ newTour +'"> '+ newTour +' </a></h3>');
                },
                error: function() {
                    $.notify(
                        "Tournament name must be unique!", "error",
                        { globalPosition: 'top center', autoHideDelay: 10000}
                    );
                }
            });

        }

    });

});
