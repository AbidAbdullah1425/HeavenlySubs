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

        // Define the number of items per row
        const itemsPerRow = [5, 3, 4]; // 2nd row: 5 items, 3rd row: 3 items, 4th row: 4 items
        let currentIndex = 0;

        // Group episodes into rows
        episodes.forEach((episode, index) => {
            let li = document.createElement("li");
            li.innerHTML = `<a href="episode.html?id=${episode.key}">${episode.key}</a>`;

            // Determine which row this item belongs to
            let rowIndex = 0;
            let itemsBefore = 0;
            for (let i = 0; i < itemsPerRow.length; i++) {
                itemsBefore += itemsPerRow[i];
                if (index < itemsBefore) {
                    rowIndex = i;
                    break;
                }
            }
            // If beyond defined rows, repeat the pattern
            if (index >= itemsBefore) {
                rowIndex = (index - itemsBefore) % itemsPerRow.length;
            }

            // Apply random left padding for natural variation (0px to 3px)
            const randomPadding = Math.floor(Math.random() * 4); // Random padding between 0px and 3px
            li.style.paddingLeft = `${randomPadding}px`;

            // No need to set flex width since CSS handles fixed width
            episodeList.appendChild(li);
        });
    } else {
        episodeList.innerHTML = "<li>No episodes found.</li>";
    }
}).catch(error => {
    episodeList.innerHTML = "<li>Error loading episodes.</li>";
});