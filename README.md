# Datatable.js Documentation

Datatable.js adalah library sederhana yang membantu Anda untuk menampilkan data dalam bentuk tabel interaktif di aplikasi web Anda. Dengan menggunakan Datatable.js, Anda dapat menambahkan kolom, mengatur maksimum karakter pada kolom, serta menyisipkan data dengan cara yang sangat mudah.

---

## Instalasi

1. Tambahkan file JavaScript `Datatable.js` ke dalam proyek Anda.

```html
<script type="text/javascript" src="Datatable.js"></script>
```

1. Tambahkan file CSS `Datatable.css` ke dalam proyek Anda.

```html
<link rel="stylesheet" type="text/css" href="Datatable.css">
```

3. Pastikan Anda memiliki elemen HTML untuk menampung tabel, seperti berikut:

```html
<div id="datatables" class="datatables"></div>
```

---

## Contoh Penggunaan

Berikut adalah contoh sederhana untuk menampilkan tabel data menggunakan Datatable.js.

### Langkah 1: Siapkan Data
Data harus berbentuk objek JSON dengan dua bagian utama:
- **head**: Berisi definisi kolom, termasuk nama kolom dan properti tambahan (misalnya `max` untuk panjang maksimum teks).
- **data**: Berisi definisi data yang akan ditampilkan.

Contoh data:

```javascript
const dataset = {
    "head": [
        {"name": "Nama"},
        {"name": "Email", "max": 50 },//max untuk maksimal karater
        {"name": "Nomor Telepon"},
        {"name": "Alamat"}
    ],
    "data": [
        {"Nama":"John Doe", "Email":"john.doe@example.com", "Nomor Telepon":"123456789", "Alamat":"Jl. Kebon Jeruk 1"},
        {"Nama":"Jane Smith", "Email":"jane.smith@example.com", "Nomor Telepon":"987654321", "Alamat":"Jl. Anggrek 2"},
        {"Nama":"Albert Einstein", "Email":"albert.einstein@example.com", "Nomor Telepon":"555444333", "Alamat":"Jl. Melati 3"}
    ]
};
```

### Langkah 2: Inisialisasi Datatable
Panggil library `DataTable` dan berikan data serta ID elemen tabel sebagai argumen:

```html
<script>
    new DataTable("#datatables", dataset);
</script>
```

### Hasil Akhir
Ketika semua langkah diikuti, tabel interaktif akan ditampilkan di elemen dengan ID `datatables`.

---

## Fitur Utama

1. **Kolom Dinamis**
   - Anda dapat menambahkan atau menghapus kolom sesuai kebutuhan.
   - Contoh:

   ```javascript
   {
       "head": [
           { "name": "Nama" },
           { "name": "Umur" }
       ],
       "data": [
           ["Nama":"Ali", "Umur":25],
           ["Nama":"Aisyah", "Umur":22]
       ]
   }
   ```

2. **Pengaturan Panjang Teks**
   - Gunakan properti `max` untuk membatasi panjang teks pada kolom tertentu.
   - Contoh:

   ```javascript
   { "name": "Email", "max": 50 }
   ```

3. **Pemuatan Data Dinamis**
   - Data dapat diambil dari API atau backend.
   - Contoh:

   ```javascript
   fetch('/api/data')
       .then(response => response.json())
       .then(data => new DataTable("datatables", data));
   ```

---

## Tips

- Pastikan data yang Anda kirimkan dalam format JSON yang sesuai.
