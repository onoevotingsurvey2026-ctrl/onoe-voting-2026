function listenResults() {
console.log("SCRIPT RUNNING");
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
// 🔥 FIX: Button click connect
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("loginBtn");

  if (btn) {
    btn.addEventListener("click", () => {
      loginWithGoogle();
    });
  }
});
