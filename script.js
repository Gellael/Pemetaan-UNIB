// ===============================
// 1. Inisialisasi Peta UNIB
// ===============================
var map = L.map("map").setView([-3.7589, 102.2748], 15);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap Contributors"
}).addTo(map);


// ===============================
// 2. Variabel Jalur Aktif
// ===============================
var jalurLayer = null;


// ===============================
// 3. Fungsi Tampilkan Jalur dari File GeoJSON
// ===============================
function tampilkanRute(namaFile) {

  // Hapus jalur sebelumnya
  if (jalurLayer) {
    map.removeLayer(jalurLayer);
  }

  // Load GeoJSON sesuai gedung
  fetch(namaFile)
    .then(response => response.json())
    .then(data => {

      // Tambahkan jalur ke peta
      jalurLayer = L.geoJSON(data, {
        style: function(feature) {
          return {
            weight: 6
          };
        }
      }).addTo(map);

      // Zoom otomatis ke jalur
      map.fitBounds(jalurLayer.getBounds());

      console.log("✅ Rute ditampilkan:", namaFile);
    })
    .catch(error => {
      alert("❌ Rute tidak ditemukan: " + namaFile);
      console.log(error);
    });
}


// ===============================
// 4. Data Gedung + File Rute
// ===============================
var lokasiUjian = [
  {
    nama: "Gedung FISIP",
    koordinat: [-3.7590926, 102.2745635],
    rute: "Gedung FISIP.geojson"
  },

  {
    nama: "Gedung LPTIK",
    koordinat: [-3.7584654, 102.2749436],
    rute: "Gedung LPTIK.geojson"
  },

  {
    nama: "Lab FKIP",
    koordinat: [-3.7582595, 102.2757007],
    rute: "Lab FKIP.geojson"
  },

  {
    nama: "Fakultas Hukum",
    koordinat: [-3.7606742, 102.2683446],
    rute: "Fakultas Hukum.geojson"
  },

  {
    nama: "Fakultas Ekonomi dan Bisnis",
    koordinat: [-3.7601792, 102.2700620],
    rute: "Fakultas Ekonomi dan Bisnis.geojson"
  },

  {
    nama: "Lab Tanah",
    koordinat: [-3.7593936, 102.2700113],
    rute: "Lab Tanah.geojson"
  },

  {
    nama: "Lab Matematika",
    koordinat: [-3.7577621, 102.2720450],
    rute: "Lab Matematika.geojson"
  },

  {
    nama: "Lab Teknik (FT)",
    koordinat: [-3.75896922,102.27679757],
    rute: "Lab Teknik.geojson"
  },

  {
    nama: "Perpustakaan UNIB",
    koordinat: [-3.7568878, 102.2748106],
    rute: "Gedung Perpustakaan.geojson"
  },

  {
    nama: "Fakultas Kedokteran (FKIK)",
    koordinat: [-3.7550378, 102.2779277],
    rute: "Fakultas Kedokteran.geojson"
  },

];


// ===============================
// 5. Tambahkan Marker + Klik untuk Jalur
// ===============================
lokasiUjian.forEach(function(item) {

  var marker = L.marker(item.koordinat).addTo(map);

  marker.bindPopup(`
    <b>📍 ${item.nama}</b><br><br>

    <button onclick="tampilkanRute('${item.rute}')"
      style="
        background:#004aad;
        color:white;
        border:none;
        padding:10px 15px;
        border-radius:10px;
        cursor:pointer;
        font-size:14px;
      ">
      🛣️ Tampilkan Rute
    </button>

    <br><br>

    <a href="https://www.google.com/maps?q=${item.koordinat[0]},${item.koordinat[1]}"
       target="_blank"
       style="
         text-decoration:none;
         background:green;
         color:white;
         padding:8px 12px;
         border-radius:10px;
         display:inline-block;
       ">
       🚗 Buka Google Maps
    </a>
  `);

});
