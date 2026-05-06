import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  increment,
  updateDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// 🔥 FIREBASE CONFIG (REPLACE THIS)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();


// =========================
// 🔐 AUTH STATE (PRO UX CORE)
// =========================
onAuthStateChanged(auth, (user) => {
  const status = document.getElementById("status");
  const voteBox = document.getElementById("voteBox");

  if (user) {
    status.innerText = "✅ Logged in as " + user.displayName;

    voteBox.style.opacity = "1";
    voteBox.style.pointerEvents = "auto";

    listenResults(); // start live dashboard

  } else {
    status.innerText = "🔒 Please login to vote";

    voteBox.style.opacity = "0.4";
    voteBox.style.pointerEvents = "none";
  }
});


// =========================
// 🔐 LOGIN
// =========================
window.loginWithGoogle = async function () {
  try {
    document.getElementById("status").innerText = "🔄 Logging in...";

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await setDoc(doc(db, "users", user.uid), {
      name: user.displayName,
      email: user.email
    }, { merge: true });

    document.getElementById("status").innerText =
      "✅ Login successful";

  } catch (error) {
    document.getElementById("status").innerText =
      "❌ Login failed";
  }
};


// =========================
// 🗳 VOTE SYSTEM (LOCK)
// =========================
window.vote = async function (candidate) {

  const user = auth.currentUser;

  if (!user) {
    alert("Please login first");
    return;
  }

  const voteRef = doc(db, "votes", user.uid);
  const voteSnap = await getDoc(voteRef);

  if (voteSnap.exists()) {
    document.getElementById("status").innerText =
      "⚠️ You already voted";

    alert("You already voted!");
    return;
  }

  await setDoc(voteRef, {
    vote: candidate,
    time: new Date()
  });

  const resultRef = doc(db, "results", candidate);

  await updateDoc(resultRef, {
    count: increment(1)
  }).catch(async () => {
    await setDoc(resultRef, { count: 1 });
  });

  document.getElementById("status").innerText =
    "🗳 Vote submitted successfully!";
};


// =========================
// 📊 LIVE DASHBOARD
// =========================
function listenResults() {

  const aRef = doc(db, "results", "Candidate_A");
  const bRef = doc(db, "results", "Candidate_B");
  const cRef = doc(db, "results", "Candidate_C");

  onSnapshot(aRef, (snap) => {
    document.getElementById("aCount").innerText =
      snap.exists() ? snap.data().count : 0;
  });

  onSnapshot(bRef, (snap) => {
    document.getElementById("bCount").innerText =
      snap.exists() ? snap.data().count : 0;
  });

  onSnapshot(cRef, (snap) => {
    document.getElementById("cCount").innerText =
      snap.exists() ? snap.data().count : 0;
  });
}
