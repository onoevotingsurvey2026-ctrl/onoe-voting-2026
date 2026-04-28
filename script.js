let support = 0;
let against = 0;
let voted = false;

function vote(type) {

  if (voted) {
    alert("You already voted!");
    return;
  }

  voted = true;

  if (type === "support") support++;
  if (type === "against") against++;

  let total = support + against;

  document.getElementById("result").innerText =
    "Support: " + support + " | Against: " + against;

  let supPer = ((support / total) * 100).toFixed(1);
  let agPer = ((against / total) * 100).toFixed(1);

  document.getElementById("percent").innerText =
    "Support: " + supPer + "% | Against: " + agPer + "%";
}
