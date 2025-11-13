// --- KONFIGURASI DAN DATABASE SEDERHANA MENGGUNAKAN LOCAL STORAGE ---

// Kunci (key) untuk menyimpan data di Local Storage
const STORAGE_KEY = 'favoriteTeachersVotes';

// Data Guru Default (digunakan jika Local Storage kosong)
const defaultTeachers = [
    // CATATAN: Pastikan Anda memiliki file gambar ini di folder yang sama!
    { id: 1, name: "Mam Hayu", photo: "hayu.jpeg", votes: 0 },
    { id: 2, name: "Mam Yuli", photo: "yuli.jpeg", votes: 0 },
    { id: 3, name: "Mam Leni", photo: "leni.jpeg", votes: 0 },
    { id: 4, name: "Mam Sekar", photo: "sekar.jpeg", votes: 0 },
    { id: 5, name: "Mam Ika", photo: "ika.jpeg", votes: 0 },
    { id: 6, name: "Mam Venny", photo: "venny.jpeg", votes: 0 },
    { id: 7, name: "Mam Neng", photo: "neng.jpeg", votes: 0 },
    { id: 8, name: "Mam Aul", photo: "aul.jpeg", votes: 0 },
    { id: 9, name: "Mam Mega", photo: "mega.jpeg", votes: 0 },
    { id: 10, name: "Mam Desi", photo: "desy.jpeg", votes: 0 },
    { id: 11, name: "Mam Ami", photo: "ami.jpeg", votes: 0 },
    { id: 12, name: "Mam Fania", photo: "fannia.jpeg", votes: 0 },
    { id: 13, name: "Mam Fitrya", photo: "fitrya.jpeg", votes: 0 },
    { id: 14, name: "Mam Fanny", photo: "fanny.jpeg", votes: 0 },
    { id: 15, name: "Mam Dila", photo: "dila.jpeg", votes: 0 },
    { id: 16, name: "Mam Eva", photo: "eva.jpeg", votes: 0 },
    { id: 17, name: "Mam Zila", photo: "azila.jpeg", votes: 0 },
    { id: 18, name: "Mam caca", photo: "caca.jpeg", votes: 0 },
    { id: 19, name: "Mam Tri", photo: "tri.jpeg", votes: 0 },
    { id: 20, name: "Mam Ani", photo: "ani.jpeg", votes: 0 },
    { id: 21, name: "Mam Dara", photo: "dara.jpeg", votes: 0 },
    { id: 22, name: "Mr Syakur", photo: "syakur.jpeg", votes: 0 },
    { id: 23, name: "Mr Heru", photo: "heru.jpeg", votes: 0 },
    { id: 24, name: "Mr Andi", photo: "andi.jpeg", votes: 0 },
    { id: 25, name: "Mr Ages", photo: "ages.jpeg", votes: 0 },
    { id: 26, name: "Mr Rajab", photo: "rajab.jpeg", votes: 0 },

];

let teachers = []; // Variabel global untuk menyimpan data guru yang dimuat

// 1. Fungsi untuk memuat data dari Local Storage
function loadTeachers() {
    const storedData = localStorage.getItem(STORAGE_KEY);
    
    if (storedData) {
        try {
            // Mengubah string JSON menjadi array JavaScript
            // Ini akan memuat hasil voting yang sudah ada
            teachers = JSON.parse(storedData);
        } catch (e) {
            // Jika data rusak, gunakan default
            console.error("Gagal memuat data dari Local Storage, menggunakan data default.", e);
            teachers = defaultTeachers;
        }
    } else {
        // Jika belum ada data, gunakan data default
        teachers = defaultTeachers;
    }
}

// 2. Fungsi untuk menyimpan data ke Local Storage
function saveTeachers() {
    // Mengubah array JavaScript menjadi string JSON
    localStorage.setItem(STORAGE_KEY, JSON.stringify(teachers));
    console.log("Data voting berhasil disimpan.");
}

// Panggil fungsi loadTeachers di awal untuk mengisi array 'teachers'
loadTeachers();

// --- LOGIKA UTAMA APLIKASI ---

// Ambil elemen kontainer dari HTML
const votingContainer = document.querySelector('.voting-container');

// 3. Fungsi untuk merender (menampilkan) kartu guru
function renderTeachers() {
    // Kosongkan kontainer
    votingContainer.innerHTML = ''; 

    teachers.forEach(teacher => {
        // Buat elemen kartu
        const card = document.createElement('div');
        card.className = 'teacher-card';
        card.dataset.id = teacher.id; // Menyimpan ID guru
        
        // Struktur HTML untuk setiap kartu
        card.innerHTML = `
            <img src="${teacher.photo}" alt="Foto ${teacher.name}" class="teacher-image">
            <div class="teacher-name">${teacher.name}</div>
            
        `;
//<div class="vote-count">Suara: <span id="votes-${teacher.id}">${teacher.votes}</span></div>

        // Tambahkan event listener untuk voting saat kartu diklik
        card.addEventListener('click', () => handleVote(teacher.id));
        
        // Tambahkan kartu ke kontainer
        votingContainer.appendChild(card);
    });
}

// 4. Fungsi untuk menangani voting saat klik
function handleVote(teacherId) {
    // Cari guru berdasarkan ID
    const teacher = teachers.find(t => t.id === teacherId);
    
    if (teacher) {
        // Tambah suara
        teacher.votes++;
        
        // SIMPAN DATA PERMANEN ke Local Storage
        saveTeachers(); 
        
        // Update tampilan jumlah suara
        const voteSpan = document.getElementById(`votes-${teacher.id}`);
        if (voteSpan) {
            voteSpan.textContent = teacher.votes;
        }

        // Tambahkan efek visual
        const cardElement = document.querySelector(`.teacher-card[data-id="${teacherId}"]`);
        if (cardElement) {
            cardElement.classList.add('voted');
            setTimeout(() => {
                cardElement.classList.remove('voted');
                // Render ulang untuk update posisi kartu (karena diurutkan berdasarkan suara)
                renderTeachers(); 
            }, 300);
        }
        
        alert(`Terima kasih! Voting kamu telah dihitung.`);
    } else {
        console.error("Guru dengan ID tersebut tidak ditemukan!");
    }
}

// 5. Panggil fungsi render saat halaman sudah selesai dimuat
document.addEventListener('DOMContentLoaded', renderTeachers);

// --- KONSTANTA PASSWORD ---
const RESET_PASSWORD = '2309';

/**
 * Fungsi untuk mereset semua hitungan suara dengan verifikasi password.
 */
function resetVotes() {
    // 1. Minta pengguna memasukkan kata sandi
    const inputPassword = prompt("Masukkan kata sandi (password) untuk mereset semua voting:");

    // 2. Cek apakah password yang dimasukkan sesuai
    if (inputPassword === RESET_PASSWORD) {
        // Password Benar, Lanjutkan Konfirmasi Reset
        if (confirm("⚠️ PERINGATAN: Password benar. Apakah Anda yakin ingin mereset SEMUA hasil voting? Aksi ini tidak dapat dibatalkan.")) {
            
            // Reset votes di array 'teachers'
            teachers.forEach(teacher => {
                teacher.votes = 0;
            });
            
            // Hapus data dari Local Storage secara permanen
            localStorage.removeItem(STORAGE_KEY);
            
            // Render ulang tampilan
            renderTeachers();
            
            alert("✅ Sukses! Semua hasil voting telah berhasil direset menjadi nol.");
        } else {
            // Pengguna membatalkan setelah memasukkan password
            alert("Proses reset dibatalkan.");
        }
    } else if (inputPassword === null) {
        // Pengguna menekan tombol "Cancel" pada prompt password
        alert("Proses reset dibatalkan oleh pengguna.");
    } 
    else {
        // Password salah
        alert("❌ Kata sandi salah. Reset dibatalkan.");
    }
}

// --- FUNGSI UNTUK MENGUNDUH LAPORAN PDF ---

/**
 * Fungsi untuk menghasilkan dan mengunduh laporan ringkasan suara dalam format PDF.
 */
function generateReport() {
    // Memuat objek jsPDF yang kita tambahkan di index.html
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Judul Dokumen
    doc.setFontSize(16);
    doc.text("Ringkasan Hasil Voting Guru Terfavorit", 105, 15, null, null, "center");

    // Tanggal Laporan
    doc.setFontSize(10);
    doc.text(`Tanggal Laporan: ${new Date().toLocaleDateString('id-ID')}`, 105, 22, null, null, "center");
    
    // --- Persiapan Data Tabel ---
    
    // Urutkan data berdasarkan suara terbanyak untuk laporan
    const sortedTeachers = [...teachers].sort((a, b) => b.votes - a.votes);
    
    // Siapkan Header Tabel
    const tableColumn = ["Peringkat", "Nama Guru", "Jumlah Suara"];
    
    // Siapkan Isi Tabel
    const tableRows = [];
    sortedTeachers.forEach((teacher, index) => {
        const teacherData = [
            index + 1, // Peringkat
            teacher.name,
            teacher.votes
        ];
        tableRows.push(teacherData);
    });

    // --- Membuat Tabel di PDF menggunakan fitur autoTable (perlu plugin, tapi jsPDF punya fitur basic) ---
    // Karena kita hanya menggunakan jsPDF dasar, kita buat tabel secara manual atau menggunakan fitur bawaan:
    
    let y = 35; // Posisi Y awal
    const lineSpacing = 8;
    
    // Header Tabel Manual
    doc.setFont("helvetica", "bold");
    doc.text(tableColumn[0], 20, y);
    doc.text(tableColumn[1], 50, y);
    doc.text(tableColumn[2], 150, y, null, null, "right");
    y += 2;
    doc.line(15, y, 195, y); // Garis pemisah
    y += 5;
    
    // Isi Tabel Manual
    doc.setFont("helvetica", "normal");
    tableRows.forEach(row => {
        doc.text(String(row[0]), 20, y);
        doc.text(String(row[1]), 50, y);
        doc.text(String(row[2]), 150, y, null, null, "right");
        y += lineSpacing;
        
        // Tambahkan halaman baru jika sudah di bawah
        if (y > 280) {
            doc.addPage();
            y = 15;
        }
    });

    // --- Simpan File PDF ---
    doc.save("Laporan_Voting_Guru_Terfavorit.pdf");
}

// Pastikan fungsi-fungsi lain (loadTeachers, saveTeachers, renderTeachers, handleVote, resetVotes)
// tetap ada di script.js Anda.



