let support = 0;
let against = 0;

function vote(type) {
  if (type === "support") support++;
  if (type === "against") against++;

  document.getElementById("result").innerText =
    "Support: " + support + " | Against: " + against;
}

// USER NAME (safe check important)
window.onload = function () {
  document.getElementById("user").innerText = "User: N RAMAN";
};
