$(document).ready(function() {
    
    setInterval(() => {
        $('#digital-clock').text(new Date().toLocaleTimeString());
    }, 1000);

    function updateAnalogClock() {
        const now = new Date();
        const sec = now.getSeconds();
        const min = now.getMinutes();
        const hour = now.getHours();

        const secDeg = sec * 6; // 360 / 60
        const minDeg = min * 6 + (sec * 0.1);
        const hourDeg = (hour % 12) * 30 + (min * 0.5);

        $('#sec-hand').css('transform', `rotate(${secDeg}deg)`);
        $('#min-hand').css('transform', `rotate(${minDeg}deg)`);
        $('#hour-hand').css('transform', `rotate(${hourDeg}deg)`);
    }
    setInterval(updateAnalogClock, 1000);
    updateAnalogClock(); 

    $('#show-email-btn').click(function() {
        $('#email-address').toggle();
    });

    function fetchJoke() {
        $.ajax({
            url: "https://v2.jokeapi.dev/joke/Any",
            success: (data) => {
                let joke = data.type === "single" ? data.joke : `${data.setup} ... ${data.delivery}`;
                $('#joke-container').text(joke);
            },
            error: () => {
                $('#joke-container').text("Could not load a joke right now.");
            }
        });
    }
    setInterval(fetchJoke, 60000); 
    fetchJoke();

    function fetchDog() {
        $.ajax({
            url: "https://dog.ceo/api/breeds/image/random",
            success: (data) => {
                $('#random-dog').attr('src', data.message).show();
            }
        });
    }
    fetchDog();

    function checkCookie() {
        let lastVisit = document.cookie.replace(/(?:(?:^|.*;\s*)lastVisit\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        let now = new Date().toLocaleString();

        if (!lastVisit) {
            alert("Welcome to my homepage for the first time!");
        } else {
            alert("Welcome back! Your last visit was " + lastVisit);
        }
        document.cookie = `lastVisit=${now}; path=/; max-age=31536000`;
    }
    
    // Slight timeout ensures the DOM loads before the alert blocks the screen
    setTimeout(checkCookie, 500); 
});