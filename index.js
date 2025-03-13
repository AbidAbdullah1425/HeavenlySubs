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

        // Group episodes into rows
        episodes.forEach((episode, index) => {
            let li = document.createElement("li");
            li.innerHTML = `<a href="episode.html?id=${episode.key}">${episode.key}</a>`;
            
            // Add class based on the number of digits
            if (episode.key < 10) {
                li.classList.add("one-digit");
            } else if (episode.key < 100) {
                li.classList.add("two-digit");
            } else {
                li.classList.add("three-digit");
            }

            episodeList.appendChild(li);
        });
    } else {
        episodeList.innerHTML = "<li>No episodes found.</li>";
    }
}).catch(error => {
    episodeList.innerHTML = "<li>Error loading episodes.</li>";
});