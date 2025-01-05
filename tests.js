// Framework test sederhana
function test(description, callback) {
    try {
      callback();
      console.log(✔️ ${description});
    } catch (error) {
      console.error(❌ ${description});
      console.error(error);
    }
  }
  
  // Dummy data untuk pengujian
  penjualan = []; // Reset data untuk setiap pengujian
  
  // Pengujian tambah data
  test("Tambah data penjualan", () => {
    tambahData("Produk A", 10);
    tambahData("Produk B", 20);
  
    if (penjualan.length !== 2) throw new Error("Jumlah data tidak sesuai!");
    if (penjualan[0].nama !== "Produk A") throw new Error("Data pertama tidak sesuai!");
    if (penjualan[1].jumlah !== 20) throw new Error("Data kedua tidak sesuai!");
  });
  
  // Pengujian edit data
  test("Edit data penjualan", () => {
    penjualan = [{ nama: "Produk A", jumlah: 10 }];
    perbaruiData(0, "Produk B", 20);
  
    if (penjualan[0].nama !== "Produk B") throw new Error("Nama produk tidak diperbarui dengan benar!");
    if (penjualan[0].jumlah !== 20) throw new Error("Jumlah produk tidak diperbarui dengan benar!");
  });
  
  // Pengujian hapus data
  test("Hapus data penjualan", () => {
    penjualan = [{ nama: "Produk A", jumlah: 10 }];
    hapusData(0);
  
    if (penjualan.length !== 0) throw new Error("Data tidak terhapus!");
  });
  
  // Pengujian penyimpanan ke localStorage
  test("Simpan dan muat data dari localStorage", () => {
    penjualan = [{ nama: "Produk A", jumlah: 10 }];
    simpanKeLocalStorage();
  
    const dataDariStorage = JSON.parse(localStorage.getItem("penjualan"));
    if (!dataDariStorage) throw new Error("Data tidak tersimpan di localStorage!");
    if (dataDariStorage[0].nama !== "Produk A") throw new Error("Data dari localStorage tidak sesuai!");
  });
  
  // Pengujian render tabel
  test("Render tabel dengan data", () => {
    penjualan = [
      { nama: "Produk A", jumlah: 10 },
      { nama: "Produk B", jumlah: 20 },
    ];
    renderTable();
  
    const baris = document.querySelectorAll("#data-penjualan tr");
    if (baris.length !== 2) throw new Error("Jumlah baris tabel tidak sesuai!");
  });