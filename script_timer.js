// JAM DIGITAL
function updateClock() {
  const now = new Date();
  const h = now.getHours().toString().padStart(2, "0");
  const m = now.getMinutes().toString().padStart(2, "0");
  const s = now.getSeconds().toString().padStart(2, "0");

  document.getElementById("hours").textContent = h;
  document.getElementById("minutes").textContent = m;
  document.getElementById("seconds").textContent = s;
}

function updateDays() {
  const startDate = new Date("2025-05-05"); // tanggal jadian
  const today = new Date();
  const diffTime = today - startDate;
  const daysPassed = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

  document.getElementById("days-count").textContent = daysPassed;
}

updateClock();
updateDays();

setInterval(() => {
  updateClock();
  updateDays();
}, 1000);

// NAVIGASI
document.getElementById('prev').addEventListener('click', () => {
  window.location.href = 'index_bookmark.html';
});

document.getElementById('next').addEventListener('click', () => {
  window.location.href = 'index_scrapbook.html';
});
