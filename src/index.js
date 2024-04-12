// Your code here
const db = "http://localhost:3000/films"
document.addEventListener("DOMContentLoaded", () => {
    getMovies();
    document.querySelector("#buy-ticket").addEventListener("click", handleBuyTicket);
});

async function getMovies() {
    try {
        const response = await fetch(db);
        const movies = await response.json();
        movies.forEach(renderMovieList);
        const firstMovie = document.querySelector("#id1");
        firstMovie.dispatchEvent(new Event("click"));
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

function renderMovieList(movie) {
    const li = document.createElement("li");
    li.textContent = movie.title;
    li.id = "id" + movie.id;
    li.classList.add("film", "item");
    li.addEventListener("click", () => handleMovieClick(movie));
    document.querySelector("#films").appendChild(li);
}

function handleMovieClick(movie) {
    const { poster, title, runtime, description, showtime, capacity, tickets_sold } = movie;
    const posterImg = document.querySelector("img#poster");
    const info = document.querySelector("#showing");
    posterImg.src = poster;
    posterImg.alt = title;
    info.querySelector("#title").textContent = title;
    info.querySelector("#runtime").textContent = runtime + " minutes";
    info.querySelector("#film-info").textContent = description;
    info.querySelector("#showtime").textContent = showtime;
    info.querySelector("#ticket-num").textContent = capacity-+movie.tickets_sold-1 + "remaining tickets";
}

function handleBuyTicket(e) {
    const ticketDiv = document.querySelector("#ticket-num");
    const tickets = parseInt(ticketDiv.textContent.split(" ")[0]);
    if (tickets > 0) {
        ticketDiv.textContent = tickets - 1 + "remaining tickets";
    } else {
        alert("No more tickets!");
        e.target.classList.add("sold-out");
        e.target.classList.remove("orange");
    }
}

   
