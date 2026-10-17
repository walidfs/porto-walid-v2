# Portofolio — Walid Fernando Sastriana

Website portofolio pribadi yang dibangun dengan **React 19 + Vite + Tailwind CSS v4**, siap di-deploy ke **Vercel**.

## ✨ Fitur

- 🌐 **Switch bahasa Inggris ↔ Indonesia** (EN | ID) di navbar
  - Pilihan bahasa tersimpan otomatis (localStorage)
  - Mendeteksi bahasa browser saat kunjungan pertama
  - Bisa dibagikan via URL: `https://domain-anda.vercel.app/?lang=id` atau `?lang=en`
  - `<html lang>`, judul tab, dan meta description ikut berganti
- 🌗 Mode gelap / terang (tersimpan otomatis, tanpa "flash")
- 📱 Responsif penuh + menu mobile
- 🔍 Modal detail proyek (tautan IEEE Xplore & Figma), pratinjau sertifikat, dan galeri kegiatan (navigasi tombol panah ← →, tutup dengan Esc)
- 🧭 Navbar dengan penanda section aktif, progress bar scroll, tombol kembali ke atas
- ✉️ Formulir kontak yang membuka aplikasi email dengan pesan otomatis terisi + tombol salin email
- ⚡ Gambar sudah dioptimasi (57 MB → ±4 MB) & lazy-load

## 🚀 Menjalankan secara lokal

```bash
npm install
npm run dev      # buka http://localhost:5173
npm run build    # hasil build ada di folder dist/
```

## ✏️ Mengubah konten

| Yang ingin diubah | File |
| --- | --- |
| Profil, about, pendidikan, skill, pengalaman, proyek, sertifikat, kegiatan, kontak | `src/data/portfolio.ts` |
| Teks antarmuka (menu, tombol, judul section) | `src/i18n/dictionary.ts` |
| Gambar | `public/img/…` (panggil dengan path `/img/nama-file.jpg`) |

Setiap teks memiliki dua versi: `en` (Inggris) dan `id` (Indonesia).

> **Catatan:** nomor WhatsApp masih `+62`. Lengkapi di `profile.phone` pada `src/data/portfolio.ts`
> (mis. `"+62 812-3456-7890"`) — tombol **Chat via WhatsApp** akan muncul otomatis.

## ▲ Deploy ke Vercel

### Opsi A — lewat GitHub (disarankan)
1. Push proyek ini ke repository GitHub.
2. Buka [vercel.com/new](https://vercel.com/new) → **Import** repository tersebut.
3. Vercel otomatis mendeteksi **Vite** (Build Command: `npm run build`, Output Directory: `dist`).
4. Klik **Deploy**. Setiap `git push` berikutnya akan otomatis di-deploy ulang.

### Opsi B — lewat Vercel CLI
```bash
npm i -g vercel
vercel          # deploy preview
vercel --prod   # deploy production
```

Untuk memakai domain lama `walid-fernando-sastriana.vercel.app`, deploy ke project Vercel yang sama
(atau atur nama project di **Settings → General → Project Name**).
