import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "onoevote2026.firebaseapp.com",
  projectId: "onoevote2026",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// vote function
window.voteNow = async function(type) {
  await addDoc(collection(db, "India"), {
    email: "onoe.voting.survey2026@gmail.com",
    vote: type,
    time: serverTimestamp()
  });

  alert("Vote Saved: " + type);
}
