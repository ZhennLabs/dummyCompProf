# Company Profile Website

Website static untuk company profile menggunakan HTML dan Tailwind CSS. Project ini dibuat sebagai dummy/template yang dapat disesuaikan dengan kebutuhan perusahaan.

## 🚀 Fitur

- **Responsive Design** - Website dapat diakses dengan baik di desktop, tablet, dan mobile
- **Modern UI/UX** - Menggunakan Tailwind CSS untuk styling yang modern dan konsisten
- **Smooth Scrolling** - Navigasi yang halus antar section
- **Interactive Elements** - Menu mobile, form kontak, dan animasi scroll
- **SEO Friendly** - Struktur HTML yang baik untuk optimasi mesin pencari
- **Fast Loading** - Menggunakan CDN Tailwind CSS untuk performa optimal

## 📁 Struktur Project

```
dummyComProf/
├── index.html          # Halaman utama website
├── styles.css          # Custom CSS tambahan
├── script.js           # JavaScript untuk interaktivitas
└── README.md           # Dokumentasi project
```

## 🎨 Sections

Website ini memiliki beberapa section utama:

1. **Navigation** - Menu navigasi dengan logo perusahaan
2. **Hero Section** - Banner utama dengan call-to-action
3. **About** - Informasi tentang perusahaan, visi & misi
4. **Services** - Layanan yang ditawarkan perusahaan
5. **Portfolio** - Showcase project yang telah dikerjakan
6. **Contact** - Form kontak dan informasi perusahaan
7. **Footer** - Informasi tambahan dan social media links

## 🛠️ Teknologi

- **HTML5** - Markup semantik untuk struktur website
- **Tailwind CSS** - Framework CSS utility-first
- **Vanilla JavaScript** - Interaktivitas tanpa dependency tambahan
- **CSS3** - Custom styling dan animasi

## 🚀 Cara Menjalankan

1. **Clone atau download** project ini
2. **Buka folder** `dummyComProf` 
3. **Double click** file `index.html` atau
4. **Gunakan local server** seperti Live Server di VS Code

### Menggunakan Local Server (Recommended)

Jika menggunakan Laragon, website dapat diakses melalui:
```
http://localhost/dummyComProf
```

Atau menggunakan VS Code dengan ekstensi Live Server:
1. Install ekstensi "Live Server"
2. Right click pada `index.html`
3. Pilih "Open with Live Server"

## 🎨 Kustomisasi

### Warna

Website menggunakan color scheme yang dapat disesuaikan melalui Tailwind config di `index.html`:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#1e40af',    // Biru utama
                secondary: '#64748b',  // Abu-abu
                accent: '#f59e0b'      // Kuning/Orange
            }
        }
    }
}
```

### Konten

1. **Logo & Nama Perusahaan** - Ubah di navigation section
2. **Hero Text** - Edit di hero section untuk menyesuaikan tagline
3. **About Content** - Sesuaikan visi, misi, dan deskripsi perusahaan
4. **Services** - Tambah/ubah layanan yang ditawarkan
5. **Portfolio** - Ganti dengan project nyata perusahaan
6. **Contact Info** - Update dengan kontak yang benar

### Gambar

Untuk menambahkan gambar nyata, ganti placeholder dengan:
```html
<img src="path/to/image.jpg" alt="Description" class="...">
```

## 📱 Responsive Breakpoints

Website menggunakan breakpoint Tailwind CSS:
- **Mobile** - < 640px
- **Tablet** - 640px - 768px  
- **Desktop** - > 768px

## ⚡ Performance Tips

1. **Optimize Images** - Gunakan format WebP dan kompres gambar
2. **Minify CSS/JS** - Untuk production, minify file CSS dan JavaScript
3. **CDN** - Gunakan CDN untuk library eksternal
4. **Caching** - Setup browser caching untuk asset static

## 🔧 Development

### Adding New Sections

Untuk menambah section baru:

1. Tambahkan HTML structure di `index.html`
2. Update navigation links
3. Tambahkan styling di `styles.css` jika diperlukan
4. Update JavaScript di `script.js` untuk interaktivitas

### Styling Guidelines

- Gunakan utility classes Tailwind CSS
- Custom styling hanya untuk kasus khusus
- Konsisten dengan color scheme yang sudah ada
- Mobile-first approach

## 📞 Support

Jika ada pertanyaan atau butuh bantuan customization, silakan hubungi developer.

## 📄 License

Project ini bebas digunakan untuk keperluan komersial maupun non-komersial.

---

**Dibuat dengan ❤️ menggunakan Tailwind CSS**
