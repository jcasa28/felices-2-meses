// 💗 PERSONALIZA AQUÍ: cambia canciones, planes, restaurantes, películas y retos.
const CONFIG = {
  songs: [
    { title: "King for a Day", artist: "Pierce the Veil" },
    { title: "#TETAS", artist: "CA7RIEL Y PACO AMOROSO" },
    { title: "Carapherelia", artist: "Pierce the Veil" },
    { title: "Jeremias 17-5", artist: "Canserbero" },
    { title: "Ganas de verte", artist: "Airbag" },
    {
      title: "De la Vida como Pelicula, Comedia, Tragedia y Ficcion",
      artist: "Canserbero",
    },
    { title: "Disintegrate Me", artist: "Viniloversus" },
    { title: "Can You Feel My Heart", artist: "Bring Me The Horizon" },
    { title: "MANTRA", artist: "Bring Me The Horizon" },
    { title: "G O D D E S S", artist: "Omar Courtz" },
  ],
  dates: [
    "🍝 Salir a comer",
    "🏋️‍♂️ Absolute Recomp",
    "⚽️ Fuol",
    "🎳 Bowling (pierde quien paga)",
    "🎨 Pintar juntos",
    "👾 Codificar",
    "🎞️ Noche de pelis en la casa :)",
    "🍿 CINE",
    "☕ Cafecito y chisme",
    "🛍️ Vitrinear en el mall",
    "🎇 Legacy",
  ],
  restaurants: [
    "🍣 Tokyo House",
    "🍝 North Italia",
    "🌮 Tacos de downtown Denton",
    "🍔 Whataburguer",
    "🍔 In N' Out",
    "🥩 Texas Roadhouse",
    "🍲 CAVA",
  ],
  movies: [
    "🎤🎶 High School Musical",
    "🍿 Ricky Stanicky",
    "😵‍💫 Obsesion",
    " 🛬❄️ La sociedad de la nieve",
    "🕷️ Spiderman",
  ],
  bonuses: [
    "💋 10 besitos extra",
    "📸 Hard Launch",
    "🍦 Comprar un postre para compartir",
    "📚 Hacer tarea juntos (mi plan fav)😍",
    "🕺 Enseñarte a bailar salsa",
    "😎 Batalla de Aura",
    "🤳🏻 Scrollear",
  ],
};
const $ = (id) => document.getElementById(id);
$("songs").innerHTML = CONFIG.songs
  .map(
    (s, i) =>
      `<div class="song"><b>${String(i + 1).padStart(2, "0")}</b><span>${escapeHTML(s.title)}<small>${escapeHTML(s.artist)}</small></span></div>`,
  )
  .join("");
function escapeHTML(s) {
  return String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}
const no = $("no");
let dodges = 0;
function dodge() {
  const area = $("choice") || no.parentElement;
  const box = area.getBoundingClientRect();
  if (dodges++ === 0) {
    area.style.minHeight = "170px";
  }
  no.style.position = "absolute";
  const maxX = Math.max(0, box.width - no.offsetWidth),
    maxY = Math.max(0, area.clientHeight - no.offsetHeight);
  no.style.left = Math.random() * maxX + "px";
  no.style.top = Math.random() * maxY + "px";
}
no.addEventListener("mouseenter", dodge);
no.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();
    dodge();
  },
  { passive: false },
);
no.addEventListener("focus", dodge);
no.addEventListener("click", (e) => {
  e.preventDefault();
  dodge();
});
$("yes").addEventListener("click", () => {
  $("response").textContent = "Vergacion vo si sabeijm 😌💗";
  $("experience").classList.remove("hidden");
  $("experience").scrollIntoView({ behavior: "smooth" });
});
const chosen = { date: null, restaurant: null, movie: null, bonus: null };
function spin(buttonId, slotId, options, key, done) {
  const btn = $(buttonId),
    slot = $(slotId);
  btn.disabled = true;
  slot.classList.add("rolling");
  let ticks = 0;
  const interval = setInterval(() => {
    slot.textContent = options[Math.floor(Math.random() * options.length)];
    if (++ticks >= 18) {
      clearInterval(interval);
      chosen[key] = options[Math.floor(Math.random() * options.length)];
      slot.textContent = chosen[key];
      slot.classList.remove("rolling");
      btn.disabled = false;
      if (done) done();
      renderSummary();
    }
  }, 75);
}
$("dateSpin").onclick = () =>
  spin("dateSpin", "dateSlot", CONFIG.dates, "date");

$("foodSpin").onclick = () =>
  spin("foodSpin", "foodSlot", CONFIG.restaurants, "restaurant");
$("movieSpin").onclick = () =>
  spin("movieSpin", "movieSlot", CONFIG.movies, "movie");
$("bonusSpin").onclick = () =>
  spin("bonusSpin", "bonusSlot", CONFIG.bonuses, "bonus");

function planText() {
  return `💗 NUESTRO PLAN DE 2 MESES
💌 Cita: ${chosen.date || "Por elegir"}
🍽️ Restaurante: ${chosen.restaurant || "Por elegir"}
🍿 Película: ${chosen.movie || "Por elegir"}
✨ Extra: ${chosen.bonus || "Por elegir"}
❤️ Contigo, siempre.`;
}

function renderSummary() {
  $("summary").innerHTML = planText()
    .split("\n")
    .slice(1, -1)
    .map((line) => `<div>${escapeHTML(line)}</div>`)
    .join("");
}
$("copy").onclick = async () => {
  try {
    await navigator.clipboard.writeText(planText());
    $("copy").textContent = "✅ ¡Plan copiado!";
    setTimeout(() => ($("copy").textContent = "📋 Copiar nuestro plan"), 1800);
  } catch {
    alert(planText());
  }
};
$("reset").onclick = () => {
  Object.keys(chosen).forEach((k) => (chosen[k] = null));
  $("dateSlot").textContent = "💌 ¿Qué haremos?";
  $("foodSlot").textContent = "🍽️ ¿Dónde comemos?";
  $("movieSlot").textContent = "🎬 Nuestra película sorpresa";
  $("bonusSlot").textContent = "✨ ¿Qué nos toca?";

  renderSummary();
};
renderSummary();
