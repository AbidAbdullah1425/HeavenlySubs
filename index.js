import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDsIeABdHyO_J9jOiY5m-P33kDEy_47zYI",
    databaseURL: "https://heavenlysubs-7beba-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const episodeList = document.getElementById("episode-list");

get(ref(db, "episodes")).then(snapshot => {
    if (snapshot.exists()) {
        episodeList.innerHTML = "";
        let seasons = [];

        snapshot.forEach(child => {
            let season = child.key;
            let episodes = [];
            child.forEach(grandChild => {
                episodes.push({ key: grandChild.key, ...grandChild.val() });
            });
            seasons.push({ season, episodes });
        });

        // Sort seasons by their number in descending order
        seasons.sort((a, b) => parseInt(b.season.split(' ')[1]) - parseInt(a.season.split(' ')[1]));

        seasons.forEach(season => {
            let seasonHeader = document.createElement("h2");
            seasonHeader.textContent = season.season;
            episodeList.appendChild(seasonHeader);

            let seasonUl = document.createElement("ul");
            seasonUl.classList.add("season-list");
            
            season.episodes.sort((a, b) => b.key - a.key); // Sort episodes in descending order

            season.episodes.forEach(episode => {
                let li = document.createElement("li");
                li.innerHTML = `<a href="episode.html?id=${episode.key}">${episode.key}</a>`;
                seasonUl.appendChild(li);
            });

            episodeList.appendChild(seasonUl);
        });
    } else {
        episodeList.innerHTML = "<li>No episodes found.</li>";
    }
}).catch(error => {
    episodeList.innerHTML = "<li>Error loading episodes.</li>";
});