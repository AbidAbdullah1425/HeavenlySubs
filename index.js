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

        // Populate the list
        episodes.forEach(episode => {
            let li = document.createElement("li");
            li.innerHTML = `<a href="episode.html?id=${episode.key}">${episode.key}</a>`;
            episodeList.appendChild(li);
        });

        // Apply randomization to list items
        const listItems = document.querySelectorAll('#episode-list li');
        listItems.forEach(item => {
            // Generate random margins for a staggered effect
            const randomLeft = Math.random() * 20 - 10; // Random offset between -10px and 10px
            const randomTop = Math.random() * 20 - 10; // Random offset between -10px and 10px
            item.style.marginLeft = `${randomLeft}px`;
            item.style.marginTop = `${randomTop}px`;
        });
    } else {
        episodeList.innerHTML = "<li>No episodes found.</li>";
    }
}).catch(error => {
    episodeList.innerHTML = "<li>Error loading episodes.</li>";
});