document.addEventListener("DOMContentLoaded", () => {

  const envelopeBtn = document.getElementById("envelopeBtn");
  const envelopeWrapper = document.getElementById("envelopeWrapper");
  const scrapbookMain = document.getElementById("scrapbookMain");

  const slidesWrapper = document.getElementById("slidesWrapper");

  const prevSlideBtn = document.getElementById("prevSlideBtn");
  const nextSlideBtn = document.getElementById("nextSlideBtn");

  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");


  // ===== BUKA AMPLOP =====
  if (envelopeBtn) {
    envelopeBtn.addEventListener("click", () => {

      envelopeBtn.style.pointerEvents = "none";
      envelopeBtn.classList.add("opening");

      setTimeout(() => {
        envelopeWrapper.classList.add("hidden");
        scrapbookMain.classList.remove("hidden");
      }, 800);

    });
  }


  // ===== SLIDER FOTO =====
  const scrollAmount = 350;

  if (prevSlideBtn) {
    prevSlideBtn.addEventListener("click", () => {
      slidesWrapper.scrollBy({
        left: -scrollAmount,
        behavior: "smooth"
      });
    });
  }

  if (nextSlideBtn) {
    nextSlideBtn.addEventListener("click", () => {
      slidesWrapper.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
      });
    });
  }


  // ===== NAV PAGE =====
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      window.location.href = "index_timer.html";
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      window.location.href = "index_timer.html";
    });
  }

});
