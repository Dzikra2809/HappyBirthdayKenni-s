// elemen
const envelopeWrapper = document.getElementById('envelopeWrapper');
const envelopeBtn = document.getElementById('envelopeBtn');
const scrapbookMain = document.getElementById('scrapbookMain');
const slidesWrapper = document.getElementById('slidesWrapper');
const prevBtn = document.getElementById('prevSlideBtn');
const nextBtn = document.getElementById('nextSlideBtn');
const prevPageBtn = document.getElementById('prev');
const nextPageBtn = document.getElementById('next');

// fungsi buka amplop -> tampilkan scrapbook
function playPaperSound() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(440, ctx.currentTime);

  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.45);
}

function openEnvelope() {
  playPaperSound();
  envelopeBtn.classList.add('opening');
  envelopeWrapper.querySelector('.envelope-label').textContent = 'Opening...';
  setTimeout(() => {
    envelopeWrapper.style.transition = "opacity 0.4s ease";
    envelopeWrapper.style.opacity = "0";
    setTimeout(() => {
      envelopeWrapper.classList.add('hidden');
      scrapbookMain.classList.remove('hidden');
      envelopeBtn.classList.remove('opening');
    }, 400);
  }, 600);
}

// fungsi kembali ke amplop
function backToEnvelope() {
  scrapbookMain.style.transition = "opacity 0.4s ease";
  scrapbookMain.style.opacity = "0";
  setTimeout(() => {
    scrapbookMain.classList.add('hidden');
    envelopeWrapper.classList.remove('hidden');
    envelopeWrapper.style.opacity = "1";
    envelopeBtn.classList.remove('opening');
  }, 400);
}

// fungsi buka scrapbook (dari envelope)
function goToScrapbook() {
  openEnvelope();
}

// event klik amplop
envelopeBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  openEnvelope();
});

// event sentuh untuk mobile
envelopeBtn.addEventListener('touchstart', (e) => {
  e.preventDefault();
  openEnvelope();
});

// fungsi scroll horizontal slider dengan dynamic amount
function getScrollAmount() {
  if (slidesWrapper.children.length > 0) {
    const firstChild = slidesWrapper.children[0];
    const slideWidth = firstChild.offsetWidth;
    const gap = 32; // gap dari css gap: 2rem (32px)
    return slideWidth + gap;
  }
  return 320;
}

const dynamicSlideLeft = () => {
  const amount = getScrollAmount();
  slidesWrapper.scrollBy({ left: -amount, behavior: 'smooth' });
};

const dynamicSlideRight = () => {
  const amount = getScrollAmount();
  slidesWrapper.scrollBy({ left: amount, behavior: 'smooth' });
};

// pasang event listener tombol slide
if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', dynamicSlideLeft);
  nextBtn.addEventListener('click', dynamicSlideRight);
}

// pasang event listener tombol navigasi page
if (prevPageBtn) {
  prevPageBtn.addEventListener('click', () => {
    // Jika di scrapbook, kembali ke envelope
    if (!scrapbookMain.classList.contains('hidden')) {
      backToEnvelope();
    }
  });
}

if (nextPageBtn) {
  nextPageBtn.addEventListener('click', () => {
    window.location.href = 'index_timer.html';
  });
}

    // Jika di scrapbook, buka halaman scrapbook HTML
    if (!timerMain.classList.contains('hidden')) {
      window.location.href = 'index_timer.html';
    }
  });
}

// tombol keyboard panah kiri/kanan
window.addEventListener('keydown', (e) => {
  if (!scrapbookMain.classList.contains('hidden')) {
    if (e.key === 'ArrowLeft') {
      dynamicSlideLeft();
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      dynamicSlideRight();
      e.preventDefault();
    }
  }
});

// tambahkan stiker cantik floating di scrapbook
function addStickers() {
  const container = scrapbookMain;
  if (!container) return;
  const stickerArray = ['🌸', '✨', '💌', '🎀', '🍰', '📸', '💫', '🌹'];
  for (let i = 0; i < 12; i++) {
    let sticker = document.createElement('div');
    sticker.className = 'sticker';
    sticker.innerHTML = stickerArray[i % stickerArray.length];
    const topRand = Math.random() * 90;
    const leftRand = Math.random() * 95;
    sticker.style.top = topRand + '%';
    sticker.style.left = leftRand + '%';
    sticker.style.fontSize = (Math.random() * 1.2 + 1) + 'rem';
    sticker.style.opacity = Math.random() * 0.5 + 0.2;
    sticker.style.position = 'absolute';
    sticker.style.pointerEvents = 'none';
    sticker.style.zIndex = '1';
    container.style.position = 'relative';
    container.appendChild(sticker);
  }
}

// observer untuk menambahkan stiker saat scrapbook muncul
let stickerAdded = false;
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mut) => {
    if (mut.attributeName === 'class' && !scrapbookMain.classList.contains('hidden') && !stickerAdded) {
      setTimeout(() => {
        addStickers();
        stickerAdded = true;
      }, 200);
      observer.disconnect();
    }
  });
});
observer.observe(scrapbookMain, { attributes: true });

// efek heart burst saat amplop diklik
function createHeartBurst(x, y) {
  for (let i = 0; i < 12; i++) {
    let heart = document.createElement('i');
    heart.className = 'fas fa-heart';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.color = `hsl(${Math.random() * 20 + 340}, 80%, 65%)`;
    heart.style.fontSize = '1rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '2000';
    heart.style.opacity = '0.9';
    heart.style.transition = 'all 1s ease-out';
    document.body.appendChild(heart);
    const dx = (Math.random() - 0.5) * 80;
    const dy = (Math.random() - 0.5) * 80 - 40;
    setTimeout(() => {
      heart.style.transform = `translate(${dx}px, ${dy}px) scale(0.2)`;
      heart.style.opacity = '0';
    }, 10);
    setTimeout(() => heart.remove(), 1000);
  }
}

envelopeBtn.addEventListener('click', (e) => {
  const rect = envelopeBtn.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  createHeartBurst(centerX, centerY);
});

envelopeBtn.addEventListener('touchstart', (e) => {
  const rect = envelopeBtn.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  createHeartBurst(centerX, centerY);
});

// tooltip untuk tombol slider
if (prevBtn) prevBtn.title = "geser ke kiri";
if (nextBtn) nextBtn.title = "geser ke kanan";

console.log('Happy 1st Anniversary! 💖');
