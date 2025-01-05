// Inisialisasi data penjualan
let penjualan = JSON.parse(localStorage.getItem("penjualan")) || [];
let indexEdit = null;
const dataPenjualan = document.getElementById("data-penjualan");
const form = document.getElementById("form-penjualan");

// Fungsi untuk render data ke tabel
function renderTable() {
  dataPenjualan.innerHTML = penjualan
    .map(
      (item, index) => `
      <tr class="fade-in">
        <td>${item.nama}</td>
        <td>${item.jumlah}</td>
        <td>${formatRupiah(item.harga)}</td>
        <td>${formatRupiah(item.jumlah * item.harga)}</td>
        <td>
          <button class="edit btn btn-primary btn-sm" onclick="editData(${index})">Edit</button>
          <button class="delete btn btn-danger btn-sm" onclick="hapusData(${index})">Hapus</button>
        </td>
      </tr>
    `
    )
    .join("");
}

// Fungsi untuk menambahkan data
function tambahData(nama, jumlah, harga) {
  penjualan.push({ nama, jumlah, harga });
  simpanKeLocalStorage();
  renderTable();
}

// Fungsi untuk memperbarui data
function perbaruiData(index, nama, jumlah, harga) {
  penjualan[index] = { nama, jumlah, harga };
  simpanKeLocalStorage();
  renderTable();
}

// Fungsi untuk mengedit data
function editData(index) {
  const data = penjualan[index];
  document.getElementById("nama-produk").value = data.nama;
  document.getElementById("jumlah-terjual").value = data.jumlah;
  document.getElementById("harga-satuan").value = data.harga;
  indexEdit = index;
}

// Fungsi untuk menghapus data
function hapusData(index) {
  penjualan.splice(index, 1);
  simpanKeLocalStorage();
  renderTable();
}

// Fungsi untuk menyimpan ke localStorage
function simpanKeLocalStorage() {
  localStorage.setItem("penjualan", JSON.stringify(penjualan));
}

// Fungsi format rupiah
function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(angka);
}

// Event listener pada form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nama = document.getElementById("nama-produk").value;
  const jumlah = parseInt(document.getElementById("jumlah-terjual").value, 10);
  const harga = parseInt(document.getElementById("harga-satuan").value, 10);

  if (indexEdit !== null) {
    perbaruiData(indexEdit, nama, jumlah, harga);
    indexEdit = null;
  } else {
    tambahData(nama, jumlah, harga);
  }

  form.reset();
});

// Render tabel saat halaman dimuat
renderTable();