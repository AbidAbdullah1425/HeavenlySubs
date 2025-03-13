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

        // Apply vertical randomization without overlap
        const listItems = document.querySelectorAll('#episode-list li');
        const itemHeight = 40; // Approximate height of each li (adjust based on your design)
        let usedPositions = new Set();

        listItems.forEach((item, index) => {
            let randomTop;
            let attempts = 0;
            const maxAttempts = 10;

            do {
                randomTop = Math.random() * 100; // Random vertical offset up to 100px
                attempts++;
                // Ensure position is not too close to others (simple check)
                const positionKey = Math.floor(randomTop / itemHeight);
                if (!usedPositions.has(positionKey) && randomTop >= 0 && randomTop <= 100) {
                    usedPositions.add(positionKey);
                    break;
                }
            } while (attempts < maxAttempts);

            if (attempts === maxAttempts) {
                randomTop = index * itemHeight; // Fallback to basic stacking if no unique position found
            }

            item.style.position = 'relative';
            item.style.top = `${randomTop}px`;
        });
    } else {
        episodeList.innerHTML = "<li>No episodes found.</li>";
    }
}).catch(error => {
    episodeList.innerHTML = "<li>Error loading episodes.</li>";
});