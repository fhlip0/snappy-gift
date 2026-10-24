const GIFTS = [
  ["Complimentary", "Free beer"],
  ["Bar service", "Get me a jello shot"],
  ["Venue request", "Please stop talking so loud"],
  ["Hospitality", "A quiet five minutes"],
  ["Ops", "Charge my badge"],
  ["Social", "Pretend you know me"],
  ["Hydration", "Water, actually"],
  ["Wayfinding", "Point me at the bathroom"],
  ["Privacy", "Stop filming this"],
  ["Etiquette", "High five, then leave"],
  ["Meta", "Tell me this QR was worth it"],
  ["Mercy", "Earplugs"],
];

const grid = document.getElementById("gifts");
const toast = document.getElementById("toast");
let toastTimer = 0;

function showToast(text) {
  toast.hidden = false;
  toast.textContent = text;
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(function () {
    toast.hidden = true;
  }, 2200);
}

GIFTS.forEach(function (item) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "gift";
  button.innerHTML =
    '<div class="swatch"></div><div class="body">' +
    '<p class="kicker">' +
    item[0] +
    "</p>" +
    '<h3 class="title">' +
    item[1] +
    "</h3>" +
    '<p class="price">$0 &middot; Instant regret</p>' +
    "</div>";
  button.addEventListener("click", function () {
    document.querySelectorAll(".gift").forEach(function (node) {
      node.classList.remove("is-on");
    });
    button.classList.add("is-on");
    showToast("Locked in: " + item[1] + ". Nothing was sent.");
  });
  grid.appendChild(button);
});
