console.log("🔥 SCRIPT LOADED");

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

/* 🔐 LOGIN */
function login(){
  console.log("👉 LOGIN CLICKED");

  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      console.log("✔ Persistence set");

      return auth.signInWithRedirect(provider);
    })
    .catch(err => {
      console.log("❌ Persistence Error:", err.message);
    });
}

/* 🔁 REDIRECT DEBUG */
auth.getRedirectResult()
.then(result => {
  console.log("🔁 Redirect Result Triggered");

  if(result.user){
    console.log("✅ LOGIN SUCCESS:", result.user.email);
  } else {
    console.log("ℹ No user in redirect result");
  }
})
.catch(error => {
  console.log("❌ REDIRECT ERROR:", error.code, error.message);
});

/* 👤 AUTH STATE */
auth.onAuthStateChanged(user => {
  console.log("👤 AUTH STATE:", user);

  if(user){
    document.getElementById("status").innerText =
      "LOGGED IN: " + user.email;
  } else {
    document.getElementById("status").innerText =
      "NOT LOGGED IN";
  }
});
