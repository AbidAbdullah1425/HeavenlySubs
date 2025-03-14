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

        // Call function to arrange episodes dynamically
        arrangeEpisodes(episodes);
    } else {
        episodeList.innerHTML = "<li>No episodes found.</li>";
    }
}).catch(error => {
    episodeList.innerHTML = "<li>Error loading episodes.</li>";
});

// Function to arrange episodes in custom row structure
function arrangeEpisodes(episodes) {
    const rowStructure = [4, 6, 5]; // Define row pattern
    let index = 0;

    while (index < episodes.length) {
        for (let itemsInRow of rowStructure) {
            let rowDiv = document.createElement("div");
            rowDiv.style.display = "flex";
            rowDiv.style.justifyContent = "center";
            rowDiv.style.gap = "10px";
            rowDiv.style.marginBottom = "10px";

            for (let i = 0; i < itemsInRow; i++) {
                if (index >= episodes.length) break;
                let li = document.createElement("li");
                li.innerHTML = `<a href="episode.html?id=${episodes[index].key}">${episodes[index].key}</a>`;
                li.style.padding = "7px";
                li.style.backgroundColor = "#cc0000";
                li.style.borderRadius = "15px";
                li.style.color = "white";
                li.style.textAlign = "center";
                li.style.minWidth = "40px";
                li.style.display = "inline-block";

                rowDiv.appendChild(li);
                index++;
            }
            episodeList.appendChild(rowDiv);
        }
    }
}