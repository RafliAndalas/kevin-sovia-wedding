# Aplikasi Web Undangan Pernikahan Modern & Estetik
## *The Wedding of Kevin Daneil & Sovia Yoni Putri*

Aplikasi web undangan pernikahan digital modern, mewah, dan responsif dengan konsep **Aesthetic Warm Luxury**. Didesain langsung sebagai **Landing Page Modern** yang elegan untuk tampilan desktop widescreen dan sepenuhnya responsif untuk perangkat smartphone (mobile). Dilengkapi transisi khusus **Fluid Card Appearance** (efek kemunculan kartu seperti aliran air yang tenang).

---

## 🎨 1. Konsep Desain & Visual (Aesthetic Theme)

- **Palet Warna Mewah & Hangat**:
  - **Champagne Gold (`#D4AF37`)**: Aksen emas mewah pada monogram, border, tombol CTA, dan ornamen.
  - **Soft Cream (`#FDFBF7`)**: Latar belakang utama yang hangat, bersih, dan menenangkan.
  - **Sage Green Lembut (`#8A9A86`)**: Sentuhan botani alami pada badge, ranting zaitun, dan aksen busana.
  - **Dark Charcoal (`#2C2C2C`)**: Tipografi tajam dan mudah dibaca dengan kontras seimbang.
- **Tipografi Elegan**:
  - *Playfair Display* & *Cormorant Garamond*: Font serif klasik untuk nama mempelai & judul romantis.
  - *Great Vibes*: Aksen kaligrafi kursif untuk sentuhan personal.
  - *Cinzel*: Karakter huruf Romawi klasik untuk tanggal dan label formal.
  - *Plus Jakarta Sans*: Sans-serif modern dan bersih untuk seluruh detail informasi acara.
- **Aksen Dekoratif Minimalis**:
  - Garis tipis emas, ornamen ranting floral botani (SVG), dan ruang kosong (*whitespace*) yang lapang agar terkesan anggun dan mewah.

---

## 💧 2. Efek Spesial "Fluid Card Appearance"

- **Glassmorphism Mewah**: Setiap card informasi memiliki latar belakang krem transparan (`rgba(253, 251, 247, 0.82)`), `backdrop-filter: blur(16px)`, border emas halus, dan bayangan lembut (*soft shadow*).
- **Animasi Aliran Air (*Fluid Water Entrance*)**:
  - Menggunakan kurva `cubic-bezier(0.19, 1.22, 0.35, 1)` yang mereplikasi elastisitas aliran air.
  - Card meluncur bergantian dari arah samping kiri (`.fluid-from-left`) dan kanan (`.fluid-from-right`), serta dari bawah (`.fluid-from-bottom`), kemudian berhenti dengan tenang di tengah.
  - Shimmer riak air (*water ripple wave*) otomatis menyapu permukaan kartu saat memasuki layar (*Intersection Observer*).

---

## 🖥️ 3. Format Tampilan (Landing Page Responsif Desktop & HP)

- **Landing Page Penuh (*Full-width Landing Page*)**:
  - Ditampilkan langsung sebagai website landing page modern tanpa mockup HP dan tanpa header simulator.
  - Di layar desktop: Memanfaatkan tata letak multi-kolom yang luas (2 kolom untuk mempelai, 2 kolom untuk akad & resepsi, 4 kolom untuk kisah cinta dan galeri, 2 kolom untuk RSVP & buku tamu, serta 3 kolom untuk kado digital).
  - Di layar smartphone: Otomatis beradaptasi secara mulus (*100% fluid mobile view*) dengan kartu-kartu yang nyaman digulir dan disentuh.

---

## 🏛️ 4. Struktur Halaman & Fitur Lengkap

1. **Cover / Envelope Gateway (Fullscreen Overlay)**:
   - Monogram emas *K & S* dengan segel lilin (*wax seal*).
   - Nama kedua mempelai: **Kevin Daneil & Sovia Yoni Putri**.
   - Tanggal pernikahan: **Sabtu, 26 Desember 2026**.
   - Kotak penerima membaca parameter URL: `?to=Nama+Tamu`.
   - Tombol interaktif **"BUKA UNDANGAN"** yang membuka gerbang undangan, memicu semburan konfeti emas (*golden confetti*), dan otomatis memutar musik romantis.
2. **Opening Quote & Ayat Suci**:
   - Kaligrafi Bismillah dan kutipan suci QS. Ar-Rum: 21.
3. **Kedua Mempelai (Couple Profile)**:
   - **Mempelai Pria**: **Kevin Daneil** (Putra dari Bapak Darman & Ibu Nelriani).
   - **Mempelai Wanita**: **Sovia Yoni Putri** (Putri dari Bapak Oyon (Alm) & Ibu Zulaina).
4. **Wedding Details (Akad & Resepsi)**:
   - Hitung mundur *live* (*Days, Hours, Minutes, Seconds*) menuju 26 Desember 2026.
   - Akad Nikah (08.00 - 10.00 WIB di Masjid Raya Al-Insan Senayan).
   - Resepsi Pernikahan (11.00 - 15.00 WIB di The Glasshouse Ballroom The Dharmawangsa).
   - Tombol **"Simpan ke Google Calendar"** & **"Petunjuk Lokasi (Google Maps)"** interaktif.
5. **Love Story / Perjalanan Kisah Cinta**:
   - Timeline interaktif: *2020: Pertemuan Pertama*, *2022: Menjalin Hubungan*, *2025: Momen Lamaran*, dan *2026: Menuju Ikrar Abadi*.
6. **Galeri Foto Prewedding**:
   - Grid 4 foto romantis dengan efek hover zoom lembut.
7. **RSVP & Buku Tamu Digital**:
   - Formulir konfirmasi kehadiran (Hadir, Tidak Hadir, Masih Ragu), jumlah tamu, dan ucapan doa.
   - Feed ucapan *real-time* yang langsung tersimpan di `localStorage` beserta counter tamu.
8. **Amplop Digital & Kado (Gift Section)**:
   - Rekening Bank BCA (a.n. Kevin Daneil) & Bank Mandiri (a.n. Sovia Yoni Putri) dengan tombol **"Salin Nomor Rekening"** otomatis (+ notifikasi *toast*).
   - QRIS Standar Nasional (*Kevin & Sovia Wedding*).
   - Alamat pengiriman kado fisik beserta tombol salin alamat.
9. **Floating Audio Controller**:
   - Tombol piringan hitam emas berputar (*spinning vinyl*) di pojok kanan bawah.
   - Dilengkapi *Web Audio Procedural Synthesizer Fallback* (arpeggio piano/harpa) agar musik selalu berbunyi merdu meski offline.
10. **Partikel Emas & Kelopak Bunga**:
    - Efek lembut partikel emas (*bokeh*) dan kelopak bunga yang melayang tenang di latar belakang.

---

## 🚀 Cara Menjalankan Proyek

### Opsi 1: Langsung Buka di Browser
Klik dua kali file `index.html` pada File Explorer Anda di Google Chrome, Edge, Safari, atau Firefox.

### Opsi 2: Menggunakan Python (Lokal)
```bash
python -m http.server 3000
```
Buka browser di `http://localhost:3000`.

---

## 💌 Personalisasi Nama Tamu (URL Parameter)

Untuk membagikan undangan dengan nama tamu yang telah dipersonalisasi:
- `http://localhost:3000/?to=Bapak+Joko+Santoso+Sekeluarga`
- `http://localhost:3000/?to=Sahabat+Tercinta`
