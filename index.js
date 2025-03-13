// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDsIeABdHyO_J9jOiY5m-P33kDEy_47zYI",
    databaseURL: "https://heavenlysubs-7beba-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Get the episode list element
const episodeList = document.getElementById("episode-list");

// Fetch and display episodes
get(ref(db, "episodes/season5")).then(snapshot => {
    if (snapshot.exists()) {
        episodeList.innerHTML = "";
        let episodes = [];
        snapshot.forEach(child => {
            let episode = child.val();
            episodes.push({ key: child.key, ...episode });
        });

        // Sort episodes in descending order by key
        episodes.sort((a, b) => b.key - a.key);

        // Group episodes into rows with random number of items per row
        let currentItem = 0;
        while (currentItem < episodes.length) {
            const row = document.createElement("div");
            row.classList.add("row");
            const itemsInRow = Math.floor(Math.random() * 3) + 3; // Random number between 3 and 5
            for (let i = 0; i < itemsInRow && currentItem < episodes.length; i++, currentItem++) {
                const episode = episodes[currentItem];
                const li = document.createElement("li");
                li.innerHTML = `<a href="episode.html?id=${episode.key}">${episode.key}</a>`;
                row.appendChild(li);
            }
            episodeList.appendChild(row);
        }
    } else {
        episodeList.innerHTML = "<li>No episodes found.</li>";
    }
}).catch(error => {
    episodeList.innerHTML = "<li>Error loading episodes.</li>";
});