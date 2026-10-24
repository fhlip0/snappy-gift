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
const nameInput = document.getElementById("guest-name");
const NAME_KEY = "snappy-guest-name";
let toastTimer = 0;

nameInput.value = window.sessionStorage.getItem(NAME_KEY) || "";
nameInput.addEventListener("input", function () {
  window.sessionStorage.setItem(NAME_KEY, nameInput.value);
});

function showToast(text) {
  toast.hidden = false;
  toast.textContent = text;
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(function () {
    toast.hidden = true;
  }, 2200);
}

function guestName() {
  return nameInput.value
    .replace(/[\u0000-\u001f]/g, " ")
    .replace(/@everyone|@here/gi, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 40);
}

function pingDiscord(who, kicker, title) {
  const payload = JSON.stringify({
    username: "snappy",
    content: who + " wants: " + title,
    embeds: [
      {
        title: title,
        description: kicker,
        color: 1294714,
        fields: [
          { name: "Who", value: who, inline: true },
          { name: "Gift", value: title, inline: true },
        ],
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
    const who = guestName();
    if (!who) {
      nameInput.focus();
      showToast("Put your name first so Phil knows who this is.");
      return;
    }
    button.classList.add("is-on");
    pingDiscord(who, item[0], item[1]);
    showToast("Locked in for " + who + ": " + item[1] + ".");
  });
  grid.appendChild(button);
});
