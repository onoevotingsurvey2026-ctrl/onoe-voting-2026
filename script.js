window.loginWithGoogle = async function () {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    console.log("LOGIN SUCCESS:", user);

    alert("Login success!");
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    alert(error.message);
  }
};
