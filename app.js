const GIFTS = [
  ["Complimentary", "Free beer", "img/beer.jpg"],
  ["Bar service", "Get me a jello shot", "img/jello.jpg"],
  ["Venue request", "Please stop talking so loud", "img/loud.jpg"],
  ["Hospitality", "A quiet five minutes", "img/quiet.jpg"],
  ["Ops", "Charge my badge", "img/badge.jpg"],
  ["Social", "Pretend you know me", "img/pretend.jpg"],
  ["Hydration", "Water, actually", "img/water.jpg"],
  ["Wayfinding", "Point me at the bathroom", "img/bathroom.jpg"],
  ["Privacy", "Stop filming this", "img/filming.jpg"],
  ["Etiquette", "High five, then leave", "img/highfive.jpg"],
  ["Meta", "Tell me this QR was worth it", "img/qr.jpg"],
  ["Priority", "Get Karlz a beer", "img/karlz.jpg"],
];

const DISCORD_HOOK =
  "https://discord.com/api/webhooks/1563411696020619384/sLFgfVOoeiaJkP0NNDELSBwnGiPwCGqGTTcmUr2g0DjSQF3D72b_o-Cg-vBpXTsvcvwG";

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

function pingDiscord(kicker, title) {
  const payload = JSON.stringify({
    username: "snappy",
    content: "Gift picked: " + title,
    embeds: [
      {
        title: title,
        description: kicker,
        color: 1294714,
      },
    ],
  });
  const blob = new Blob([payload], { type: "application/json" });
  if (navigator.sendBeacon && navigator.sendBeacon(DISCORD_HOOK, blob)) {
    return;
  }
  fetch(DISCORD_HOOK, {
    method: "POST",
    keepalive: true,
    headers: { "Content-Type": "application/json" },
    body: payload,
  }).catch(function () {});
}

GIFTS.forEach(function (item) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "gift";
  button.innerHTML =
    '<img class="swatch" src="' +
    item[2] +
    '" alt="">' +
    '<div class="body">' +
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
    pingDiscord(item[0], item[1]);
    showToast("Locked in: " + item[1] + ". Phil got a ping.");
  });
  grid.appendChild(button);
});
