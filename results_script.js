// Kunci (key) untuk mengambil data dari Local Storage (HARUS SAMA dengan di script.js)
const STORAGE_KEY = 'favoriteTeachersVotes';

// Fungsi untuk memuat data dari Local Storage
function loadTeachersData() {
    const storedData = localStorage.getItem(STORAGE_KEY);
    
    if (storedData) {
        try {
            return JSON.parse(storedData);
        } catch (e) {
            console.error("Gagal memuat data voting.", e);
            return [];
        }
    }
    return [];
}

// Fungsi untuk menggambar grafik
function drawChart(teachersData) {
    if (teachersData.length === 0) {
        document.querySelector('.chart-area').innerHTML = "<p>Belum ada data voting yang tersimpan.</p>";
        return;
    }

    // 1. Siapkan Data
    // Urutkan berdasarkan suara terbanyak (opsional)
    const sortedData = teachersData.sort((a, b) => b.votes - a.votes);
    
    const teacherNames = sortedData.map(t => t.name);
    const teacherVotes = sortedData.map(t => t.votes);

    // 2. Ambil elemen canvas
    const ctx = document.getElementById('voteChart').getContext('2d');

    // 3. Konfigurasi dan Buat Grafik
    new Chart(ctx, {
        type: 'bar', // Jenis grafik: Bar (Batang)
        data: {
            labels: teacherNames,
            datasets: [{
                label: 'Jumlah Suara',
                data: teacherVotes,
                backgroundColor: [
                    'rgba(76, 175, 80, 0.6)', // Hijau
                    'rgba(255, 152, 0, 0.6)', // Oranye
                    'rgba(3, 169, 244, 0.6)', // Biru muda
                    'rgba(156, 39, 176, 0.6)', // Ungu (Tambahkan warna jika guru lebih banyak)
                ],
                borderColor: [
                    'rgba(76, 175, 80, 1)',
                    'rgba(255, 152, 0, 1)',
                    'rgba(3, 169, 244, 1)',
                    'rgba(156, 39, 176, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Total Suara'
                    },
                    // Pastikan sumbu Y hanya menampilkan bilangan bulat
                    ticks: {
                        stepSize: 1 
                    }
                }
            },
            plugins: {
                legend: {
                    display: false // Sembunyikan legenda
                }
            }
        }
    });
}

// Jalankan logika saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    const data = loadTeachersData();
    drawChart(data);

    // Tampilkan waktu pembaruan
    document.querySelector('.last-updated').textContent = `Data diperbarui terakhir pada: ${new Date().toLocaleTimeString('id-ID')}`;
});