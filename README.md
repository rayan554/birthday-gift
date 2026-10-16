# A Little Universe Made for You

Website ulang tahun statis bernuansa malam biru dengan ilustrasi *paper-cut* berlapis.
Tanpa backend, tanpa build tools, tanpa dependensi berat — cukup HTML, CSS, dan JavaScript
biasa. Bisa langsung di-host gratis di GitHub Pages.

```
birthday-website/
├── index.html        → struktur & seluruh isi website
├── style.css         → design tokens, layout, animasi
├── script.js         → interaksi (scroll, galeri, wish)
├── README.md         → file ini
└── assets/
    ├── memory-01.jpg → foto kenangan 1 (placeholder)
    ├── memory-02.jpg → foto kenangan 2 (placeholder)
    └── memory-03.jpg → foto kenangan 3 (placeholder)
```

---

## 1. Menjalankan website secara lokal

Cara paling mudah: **klik dua kali `index.html`** — website langsung terbuka di browser.

Kalau ingin lewat local server (opsional), jalankan salah satu perintah ini dari folder
project, lalu buka `http://localhost:8000`:

```bash
python3 -m http.server 8000
# atau
npx serve .
```

## 2. Mengganti nama dan pesan ulang tahun

Semua teks yang perlu diganti ditandai dengan placeholder di dalam kurung siku.
Buka `index.html` dengan text editor apa pun, lalu cari (Ctrl+F) dan ganti:

| Placeholder                | Artinya                                            |
|----------------------------|----------------------------------------------------|
| `[HER_NAME]`               | Nama pacarmu (di surat)                            |
| `[YOUR_NICKNAME_FOR_HER]`  | Panggilan sayangmu untuk dia                       |
| `[PERSONAL_MESSAGE]`       | Pesan pribadimu — cerita kecil, harapan, apa pun   |
| `[THING_I_LOVE_1]` … `_3`  | Hal-hal kecil yang kamu sukai tentang dia          |
| `[MEMORY_CAPTION_1]` … `_3`| Caption tiap foto kenangan                         |
| `[YOUR_NAME]`              | Namamu (tanda tangan surat & penutup)              |
| `[BIRTHDAY_YEAR]`          | Tahun ulang tahunnya                               |

Kamu juga bisa mengubah judul section dan kalimat lain langsung di `index.html` —
semuanya HTML biasa, tanpa templating.

## 3. Memasukkan foto pribadi

1. Siapkan 3 foto (JPG), usahakan masing-masing di bawah ±500 KB agar cepat dibuka
   di HP. Kamu bisa mengompresnya gratis di squoosh.app.
2. Ganti file di folder `assets/` dengan fotomu, **gunakan nama yang sama**:
   `memory-01.jpg`, `memory-02.jpg`, `memory-03.jpg`.
3. Sesuaikan `alt` dan `data-caption` di `index.html` pada tiap `<figure class="memory">`.

Rasio bawaan: foto 1 portrait (3:4), foto 2 landscape (4:3), foto 3 persegi (1:1).
Kalau rasionya berbeda, layout tetap aman — browser menyesuaikan otomatis.

Tidak punya 3 foto? Hapus saja `<figure>` yang tidak dipakai; layout akan tetap rapi.

## 4. Mengubah warna dan font

Semua warna ada di satu tempat — bagian `:root` paling atas di `style.css`:

```css
:root {
  --midnight: #081426;   /* latar utama */
  --navy:     #102747;
  --dusty:    #42658A;
  --sky:      #9DBBDA;
  --ivory:    #F5F0E6;   /* teks & kertas surat */
  --silver:   #C7D4E5;
}
```

Font juga diatur di sana (`--font-serif` untuk heading, `--font-sans` untuk body).
Kalau ingin mengganti font Google Fonts, ubah juga `<link>` di `<head>` `index.html`.

## 5. Upload project ke GitHub lewat browser (tanpa install apa pun)

1. Buat akun / login di [github.com](https://github.com).
2. Klik tombol **+** di kanan atas → **New repository**.
3. Beri nama, misalnya `birthday-website` → klik **Create repository**.
4. Di halaman repository yang masih kosong, klik link
   **“uploading an existing file”**.
5. Drag & drop `index.html`, `style.css`, `script.js`, `README.md`,
   **dan folder `assets/`** sekaligus ke halaman itu.
6. Scroll ke bawah → klik **Commit changes**.

## 6. Mengaktifkan GitHub Pages

1. Di repository-mu, buka **Settings** → **Pages** (menu kiri).
2. Di bagian **Build and deployment** → **Source**, pilih **Deploy from a branch**.
3. Di **Branch**, pilih **main** dan folder **/(root)** → klik **Save**.
4. Tunggu 1–2 menit, lalu refresh halaman Settings → Pages.

## 7. Menemukan URL website-mu

Setelah GitHub Pages aktif, URL akan muncul di bagian atas halaman
**Settings → Pages**, dengan format:

```
https://USERNAME.github.io/birthday-website/
```

Kirim link itu ke dia. Semua path di project ini relatif, jadi website tetap
berfungsi penuh walaupun berada di subdirectory seperti di atas.

---

### Catatan kecil

- Website menghormati `prefers-reduced-motion` — animasi otomatis diminimalkan
  untuk pengguna yang sensitif terhadap gerakan.
- Kalau `script.js` gagal dimuat, semua konten tetap bisa dibaca normal.
- Tidak ada tracking, cookie, atau koneksi ke server mana pun (selain Google Fonts,
  yang punya fallback sistem jika offline).
