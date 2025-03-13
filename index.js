import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDsIeABdHyO_J9jOiY5m-P33kDEy_47zYI",
    databaseURL: "https://heavenlysubs-7beba-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const episodeList = document.getElementById("episode-list");

get(ref(db, "episodes/season5")).then(snapshot => {
    if (snapshot.exists()) {
        episodeList.innerHTML = "";
        let episodes = [];
        snapshot.forEach(child => {
            let episode = child.val();
            episodes.push({ key: child.key, ...episode });
        });

        episodes.sort((a, b) => b.key - a.key);

        episodes.forEach(episode => {
            let li = document.createElement("li");
            li.innerHTML = `<a href="episode.html?id=${episode.key}">${episode.key}</a>`;
            episodeList.appendChild(li);
        });
    } else {
        episodeList.innerHTML = "<li>No episodes found.</li>";
    }
}).catch(error => {
    episodeList.innerHTML = "<li>Error loading episodes.</li>";
});


document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll("ul li a");

    items.forEach(item => {
        item.addEventListener("click", function () {
            // Remove 'clicked' class from all items
            items.forEach(i => i.classList.remove("clicked"));
            // Add 'clicked' class to the clicked item
            this.classList.add("clicked");
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        document.body.classList.add("loaded");
    }, 1000); // Simulating loading delay
});