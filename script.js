import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  increment,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// 🔥 FIREBASE CONFIG (REPLACE WITH YOUR REAL VALUES)
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
// 🔐 LOGIN FUNCTION
// =========================
async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    console.log("LOGIN SUCCESS:", user);

    await setDoc(doc(db, "users", user.uid), {
      name: user.displayName,
      email: user.email
    }, { merge: true });

    document.getElementById("status").innerText =
      "✅ Logged in: " + user.displayName;

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    alert(error.message);
  }
}


// =========================
// 🔐 AUTH STATE
// =========================
onAuthStateChanged(auth, (user) => {

  const status = document.getElementById("status");
  const voteBox = document.getElementById("voteBox");

  if (user) {
    status.innerText = "✅ Logged in: " + user.displayName;

    voteBox.style.opacity = "1";
    voteBox.style.pointerEvents = "auto";

    listenResults();

  } else {
    status.innerText = "🔒 Please login to vote";

    voteBox.style.opacity = "0.5";
    voteBox.style.pointerEvents = "none";
  }
});


// =========================
// 🗳 VOTE SYSTEM
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

  alert("Vote submitted successfully!");
};


// =========================
// 📊 LIVE RESULTS
// =========================
function listenResults() {

  const aRef = doc(db, "results", "Candidate_A");
  const bRef = doc(db, "results", "Candidate_B");
  const cRef = doc(db, "results", "Candidate_C");

  onSnapshot(aRef, (snap) => {
    const el = document.getElementById("aCount");
    if (el) el.innerText = snap.exists() ? snap.data().count : 0;
  });

  onSnapshot(bRef, (snap) => {
    const el = document.getElementById("bCount");
    if (el) el.innerText = snap.exists() ? snap.data().count : 0;
  });

  onSnapshot(cRef, (snap) => {
    const el = document.getElementById("cCount");
    if (el) el.innerText = snap.exists() ? snap.data().count : 0;
  });

}


// =========================
// 🔥 BUTTON CONNECT FIX
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("loginBtn");

  if (btn) {
    btn.addEventListener("click", () => {
      loginWithGoogle();
    });
  }
});
