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
            rowDiv.style.gap = "8px";  // Keeps spacing between buttons
            rowDiv.style.marginBottom = "10px";
            rowDiv.style.flexWrap = "wrap";  // Prevents breaking outside screen
            rowDiv.style.maxWidth = "100%";  // Keeps within container
            
            for (let i = 0; i < itemsInRow; i++) {
                if (index >= episodes.length) break;

                let li = document.createElement("li");
                let anchor = document.createElement("a");

                anchor.href = `episode.html?id=${episodes[index].key}`;
                anchor.innerText = episodes[index].key;
                anchor.style.display = "flex";
                anchor.style.alignItems = "center";
                anchor.style.justifyContent = "center";
                anchor.style.width = "40px";  // Fixed width to keep uniform size
                anchor.style.height = "40px"; // Fixed height to maintain shape
                anchor.style.padding = "5px";
                anchor.style.backgroundColor = "#cc0000";
                anchor.style.borderRadius = "50%";  // Keeps the rounded button shape
                anchor.style.color = "white";
                anchor.style.textAlign = "center";
                anchor.style.textDecoration = "none";
                anchor.style.fontSize = "14px";

                li.style.listStyle = "none";
                li.appendChild(anchor);
                rowDiv.appendChild(li);
                
                index++;
            }
            episodeList.appendChild(rowDiv);
        }
    }
}