# Datatable.js Documentation

Datatable.js adalah library sederhana yang membantu Anda untuk menampilkan data dalam bentuk tabel interaktif di aplikasi web Anda. Dengan menggunakan Datatable.js, Anda dapat menambahkan kolom, mengatur lebar maksimum kolom, serta menyisipkan data dengan cara yang sangat mudah.

---

## Instalasi

1. Tambahkan file JavaScript `datatable.js` ke dalam proyek Anda.

```html
<script type="text/javascript" src="/js/datatable.js"></script>
```

2. Pastikan Anda memiliki elemen HTML untuk menampung tabel, seperti berikut:

```html
<table id="datatables"></table>
```

---

## Contoh Penggunaan

Berikut adalah contoh sederhana untuk menampilkan tabel data menggunakan Datatable.js.

### Langkah 1: Siapkan Data
Data harus berbentuk objek JSON dengan dua bagian utama:
- **head**: Berisi definisi kolom, termasuk nama kolom dan properti tambahan (misalnya `max` untuk panjang maksimum teks).
- **data**: Berisi array data yang akan ditampilkan.

Contoh data:

```javascript
const dataset = {
    "head": [
        {"name": "Nama"},
        {"name": "Email", "max": 50},
        {"name": "Nomor Telepon"},
        {"name": "Alamat"}
    ],
    "data": [
        ["John Doe", "john.doe@example.com", "123456789", "Jl. Kebon Jeruk 1"],
        ["Jane Smith", "jane.smith@example.com", "987654321", "Jl. Anggrek 2"],
        ["Albert Einstein", "albert.einstein@example.com", "555444333", "Jl. Melati 3"]
    ]
};
```

### Langkah 2: Inisialisasi Datatable
Panggil library `DataTable` dan berikan data serta ID elemen tabel sebagai argumen:

```html
<script>
    new DataTable("datatables", dataset);
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
           ["Ali", 25],
           ["Aisyah", 22]
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
