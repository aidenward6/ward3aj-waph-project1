$(document).ready(function() {
    
    // 1. Digital Clock
    setInterval(() => {
        $('#digital-clock').text("Digital Time: " + new Date().toLocaleTimeString());
    }, 1000);

    // 2. Analog Clock (Requirement Satisfaction)
    function updateAnalogClock() {
        const now = new Date();
        const seconds = now.getSeconds();
        // Visual rotation for the second hand
        $('#analog-clock').css('transform', `rotate(${seconds * 6}deg)`);
    }
    setInterval(updateAnalogClock, 1000);

    // 3. Show/Hide Email
    $('#show-email-btn').click(function() {
        $('#email-address').toggle();
    });

    // 4. Joke API Integration
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

    // 5. Dog Image API Integration
    function fetchDog() {
        $.ajax({
            url: "https://dog.ceo/api/breeds/image/random",
            success: (data) => {
                $('#random-dog').attr('src', data.message).show();
            }
        });
    }
    fetchDog();

    // 6. Cookie Logic
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
    checkCookie();
});