function checkCookie() {
    let lastVisit = document.cookie.replace(/(?:(?:^|.*;\s*)lastVisit\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    let now = new Date().toLocaleString();

    if (lastVisit === "") {
        alert("Welcome to my homepage for the first time!");
    } else {
        alert("Welcome back! Your last visit was " + lastVisit);
    }
    document.cookie = "lastVisit=" + now + "; path=/; max-age=31536000";
}

checkCookie();

function fetchJoke() {
    $.ajax({
        url: "https://v2.jokeapi.dev/joke/Any",
        success: function(result) {
            let jokeText = result.type === "single" ? result.joke : result.setup + " ... " + result.delivery;
            $('#joke-container').text(jokeText);
        }
    });
}

// Refresh joke every 60 seconds
setInterval(fetchJoke, 60000);
fetchJoke(); // Call immediately