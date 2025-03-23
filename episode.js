import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDsIeABdHyO_J9jOiY5m-P33kDEy_47zYI",
    databaseURL: "https://heavenlysubs-7beba-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const params = new URLSearchParams(window.location.search);
const episodeId = params.get("id");
const seasonId = params.get("season");

if (episodeId && seasonId) {
    get(ref(db, `episodes/${seasonId}/${episodeId}`)).then(snapshot => {
        if (snapshot.exists()) {
            let episode = snapshot.val();
            document.getElementById("episode-title").innerText = episode.title;
            document.getElementById("video-player").src = `https://www.dailymotion.com/embed/video/${episode.video_id}`;
        } else {
            document.body.innerHTML = "<h1>Episode Not Found</h1>";
        }
    }).catch(error => {
        console.error("Error fetching episode:", error);
        document.body.innerHTML = "<h1>Error Loading Episode</h1>";
    });
} else {
    document.body.innerHTML = "<h1>Invalid Episode</h1>";
}