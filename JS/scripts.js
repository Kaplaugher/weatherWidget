$(document).ready(function () {

    $('#weather-form').submit(function () {
        // stop the form from submitting!
        event.preventDefault();
        // Inout field has id of lcoation. go get it.
        var location = $('#location').val();
        var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=' + location + ',us&appid=' + apiKey;
        console.log(weatherUrl);
        $.getJSON(weatherUrl, function (weatherData) {
            // console.log(this);
            console.log(weatherData);
            var currTemp = weatherData.main.temp;
            var name = weatherData.name;
            $('#currTemp').html("The temp in " + name + " is currently " + currTemp);
            var canvas = $('#weather-canvas');
            var context = canvas[0].getContext('2d');

            //            set up the outer circle
            var currPercent = 0;

            function animate() {
                //                draw the inner circle
                context.fillStyle = "#ccc";
                context.beginPath();
                context.arc(155, 75, 65, Math.PI * 0, Math.PI * 2);
                context.closePath();
                context.fill();

                //                draw the outer line
                context.lineWidth = 10;
                context.strokeColor = '#129793'
                context.beginPath();
                context.arc(155, 75, 70, Math.PI * 1.5, (Math.PI * 2 * currTemp) + Math.PI * 1.5);
                context.stroke();
                currPercent++;
                if (currPercent < currTemp) {
                    requestAnimationFrame(function () {
                        animate(currPercent / 100);
                    });
                }
            }
            animate();

        });

    })


});
// console.log(apiKey);