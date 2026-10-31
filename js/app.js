/**
 * Wedding Invitation Application Script
 * Landing Page Edition: Kevin Daneil & Sovia Yoni Putri
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Guest Name from URL parameter
  initGuestName();

  // 2. Initialize Countdown Timer
  initCountdown();

  // 3. Initialize Fluid Card Entrance Animations (IntersectionObserver)
  initFluidCardObserver();

  // 4. Initialize Cover Screen & Open Invitation Handler
  initInvitationCover();

  // 5. Initialize RSVP and Wishes System
  initRSVPSystem();

  // 6. Initialize Digital Gift / Clipboard Copy
  initClipboardButtons();

  // 7. Initialize Particles
  if (window.initPetals) {
    window.initPetals();
  }
});

/**
 * Parses URL query parameters to personalize guest greeting
 * e.g., ?to=Bapak+Joko+Santoso or ?to=Sarah+Aulia
 */
function initGuestName() {
  const urlParams = new URLSearchParams(window.location.search);
  let guestName = urlParams.get('to') || urlParams.get('u') || urlParams.get('nama');

  const guestNameElement = document.getElementById('guest-name-display');
  const rsvpNameInput = document.getElementById('rsvp-name');

  if (guestName) {
    guestName = decodeURIComponent(guestName.replace(/\+/g, ' '));
  } else {
    guestName = 'Tamu Undangan Terhormat';
  }

  if (guestNameElement) {
    guestNameElement.textContent = guestName;
  }
  if (rsvpNameInput && guestName !== 'Tamu Undangan Terhormat') {
    rsvpNameInput.value = guestName;
  }
}

/**
 * Countdown timer to wedding day: 26 Desember 2026, 08:00 WIB
 */
function initCountdown() {
  const targetDate = new Date('2026-12-26T08:00:00+07:00').getTime();

  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-minutes');
  const secsEl = document.getElementById('cd-seconds');

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  function update() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(minutes).padStart(2, '0');
    secsEl.textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/**
 * Fluid Card Appearance using IntersectionObserver
 * Cards slide fluidly with spring-like water easing when scrolling
 */
function initFluidCardObserver() {
  const fluidCards = document.querySelectorAll('.fluid-card');
  if (!fluidCards.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fluid-visible');
      }
    });
  }, observerOptions);

  fluidCards.forEach(card => observer.observe(card));

  window.refreshFluidObserver = () => {
    fluidCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        card.classList.add('fluid-visible');
      }
    });
  };
}

/**
 * Invitation Cover Opening handler
 */
function initInvitationCover() {
  const openBtn = document.getElementById('btn-open-invitation');
  const coverSection = document.getElementById('invitation-cover');
  const mainInvitation = document.getElementById('invitation-content');

  if (!openBtn || !coverSection) return;

  openBtn.addEventListener('click', () => {
    // 1. Play Background Music
    if (window.weddingAudio) {
      window.weddingAudio.play();
    }

    // 2. Fire celebratory confetti
    triggerGoldenConfetti();

    // 3. Smooth transition out of cover
    coverSection.classList.add('opened');
    if (mainInvitation) {
      mainInvitation.classList.remove('opacity-0', 'pointer-events-none');
      mainInvitation.classList.add('opacity-100');
    }

    // 4. Smooth scroll to opening section
    setTimeout(() => {
      const welcomeSection = document.getElementById('hero-welcome-section') || document.getElementById('opening-quote-section');
      if (welcomeSection) {
        welcomeSection.scrollIntoView({ behavior: 'smooth' });
      }
      if (window.refreshFluidObserver) {
        window.refreshFluidObserver();
      }
    }, 450);
  });
}

/**
 * Celebratory golden & ivory confetti explosion
 */
function triggerGoldenConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#D4AF37', '#F5E8C7', '#8A9A86', '#FFFDF9', '#C5A059']
    });
  }
}

/**
 * Interactive RSVP & Guest Book System with LocalStorage Persistence
 */
function initRSVPSystem() {
  const rsvpForm = document.getElementById('rsvp-form');
  const wishesContainer = document.getElementById('wishes-list');
  const attendanceCounterEl = document.getElementById('attendance-count');

  // Initial Sample Wishes for Kevin & Sovia
  const initialWishes = [
    {
      name: "dr. Fajar Pratama & dr. Nadia",
      attendance: "Hadir",
      pax: 2,
      message: "Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fii khoir. Selamat melangkah ke jenjang pernikahan Kevin & Sovia! Bahagia selalu sampai akhir hayat.",
      time: "2 jam yang lalu"
    },
    {
      name: "Bambang Triatmojo (Keluarga Besar)",
      attendance: "Hadir",
      pax: 2,
      message: "Alhamdulillah, selamat untuk Kevin & Sovia. Semoga menjadi keluarga sakinah, mawaddah, wa rahmah serta dikaruniai keturunan yang sholeh dan sholehah. Aamiin.",
      time: "Kemarin"
    },
    {
      name: "Clarita & Rekan Sahabat",
      attendance: "Hadir",
      pax: 1,
      message: "Sovia sayang! Terharu banget akhirnya hari bahagia ini tiba. Can't wait to see you as the most gorgeous bride. Lancar-lancar sampai hari H yaa!",
      time: "Kemarin"
    },
    {
      name: "Dimas Anggara & Istri",
      attendance: "Hadir",
      pax: 2,
      message: "Selamat brader Kevin Daneil! Ikut bahagia atas pernikahan kalian berdua. Insya Allah kami hadir merayakan momen sakral ini.",
      time: "2 hari yang lalu"
    }
  ];

  // Load stored wishes or use defaults
  let storedWishes = [];
  try {
    const raw = localStorage.getItem('wedding_wishes_kevin_sovia');
    storedWishes = raw ? JSON.parse(raw) : initialWishes;
  } catch (e) {
    storedWishes = initialWishes;
  }

  function renderWishes() {
    if (!wishesContainer) return;
    wishesContainer.innerHTML = '';

    let attendingCount = 18; // base confirmed headcount

    storedWishes.forEach(item => {
      if (item.attendance === 'Hadir') {
        attendingCount += (parseInt(item.pax) || 1);
      }

      const card = document.createElement('div');
      card.className = 'p-4 rounded-2xl bg-white/75 backdrop-blur-sm border border-[#D4AF37]/20 shadow-sm transition-all hover:bg-white/95';

      const badgeColor = item.attendance === 'Hadir' 
        ? 'bg-[#8A9A86]/20 text-[#546850] border-[#8A9A86]/30' 
        : (item.attendance === 'Tidak Hadir' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-amber-50 text-amber-700 border-amber-200');

      card.innerHTML = `
        <div class="flex items-start justify-between gap-2 mb-2">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B89047] text-white flex items-center justify-center font-serif-title font-bold text-xs shadow-sm">
              ${escapeHtml(item.name.charAt(0).toUpperCase())}
            </div>
            <div>
              <h5 class="font-semibold text-xs text-[#2C2C2C] leading-snug">${escapeHtml(item.name)}</h5>
              <span class="text-[10px] text-gray-400">${escapeHtml(item.time || 'Baru saja')}</span>
            </div>
          </div>
          <span class="text-[10px] px-2.5 py-0.5 rounded-full font-medium border ${badgeColor}">
            ${escapeHtml(item.attendance)}
          </span>
        </div>
        <p class="text-xs text-[#4A4A4A] leading-relaxed pl-10">${escapeHtml(item.message)}</p>
      `;

      wishesContainer.appendChild(card);
    });

    if (attendanceCounterEl) {
      attendanceCounterEl.textContent = `${attendingCount} Tamu`;
    }
  }

  renderWishes();

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('rsvp-name');
      const attendanceInput = document.querySelector('input[name="attendance"]:checked');
      const paxInput = document.getElementById('rsvp-pax');
      const messageInput = document.getElementById('rsvp-message');

      if (!nameInput.value.trim()) {
        showToast('Mohon masukkan nama Anda');
        nameInput.focus();
        return;
      }

      if (!attendanceInput) {
        showToast('Mohon pilih konfirmasi kehadiran Anda');
        return;
      }

      if (!messageInput.value.trim()) {
        showToast('Mohon tuliskan doa atau ucapan Anda');
        messageInput.focus();
        return;
      }

      const newWish = {
        name: nameInput.value.trim(),
        attendance: attendanceInput.value,
        pax: parseInt(paxInput ? paxInput.value : 1),
        message: messageInput.value.trim(),
        time: 'Baru saja'
      };

      storedWishes.unshift(newWish);
      try {
        localStorage.setItem('wedding_wishes_kevin_sovia', JSON.stringify(storedWishes));
      } catch (err) {
        console.warn('Could not save to localStorage', err);
      }

      renderWishes();
      triggerGoldenConfetti();
      showToast('Terima kasih! Konfirmasi & ucapan hangat Anda berhasil terkirim.');

      messageInput.value = '';
    });
  }
}

/**
 * Clipboard Copy Button Handler with animated feedback toast
 */
function initClipboardButtons() {
  const copyButtons = document.querySelectorAll('[data-copy]');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      const label = btn.getAttribute('data-label') || 'Informasi';

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`${label} berhasil disalin!`);
        }).catch(() => {
          fallbackCopyText(textToCopy, label);
        });
      } else {
        fallbackCopyText(textToCopy, label);
      }
    });
  });
}

function fallbackCopyText(text, label) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.top = "-9999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(`${label} berhasil disalin!`);
  } catch (err) {
    showToast(`Gagal menyalin. Silakan salin manual: ${text}`);
  }
  document.body.removeChild(textArea);
}

/**
 * Toast Notification Popup
 */
let toastTimeout = null;
function showToast(message) {
  let toast = document.getElementById('wedding-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'wedding-toast';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg class="w-4 h-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
    </svg>
    <span>${escapeHtml(message)}</span>
  `;

  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/**
 * Helper to escape HTML characters
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
