$(document).ready(function() {
    
    // 1. Digital Clock
    setInterval(() => {
        $('#digital-clock').text("Digital Time: " + new Date().toLocaleTimeString());
    }, 1000);

    // 2. Show/Hide Email
    $('#show-email-btn').click(function() {
        $('#email-address').toggle();
    });

    // 3. Joke API Integration
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
    
    // Set interval and initial call
    setInterval(fetchJoke, 60000); 
    fetchJoke();

    // 4. Cookie Logic
    function checkCookie() {
        let lastVisit = document.cookie.replace(/(?:(?:^|.*;\s*)lastVisit\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        let now = new Date().toLocaleString();

        if (!lastVisit) {
            alert("Welcome to my homepage for the first time!");
        } else {
            alert("Welcome back! Your last visit was " + lastVisit);
        }
        // Set the cookie to expire in 1 year (31536000 seconds)
        document.cookie = `lastVisit=${now}; path=/; max-age=31536000`;
    }
    
    checkCookie();
});