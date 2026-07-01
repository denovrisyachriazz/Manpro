// Lapor Bantu - Core Script JS
// Persists data in localStorage to simulate a full-stack stateful system.

// 1. DUMMY DATA SEEDING
const DEFAULT_REPORTS = [
  {
    id: "LB-2024-0012",
    namaPelapor: "Denovri",
    lokasi: "Kampung Melayu, Jatinegara, Jakarta Timur, DKI Jakarta",
    jenisBantuan: "Banjir & Air Bersih",
    deskripsi: "Terjadi luapan air dari sungai Ciliwung yang merendam area pemukiman warga di RT 05/RW 03 Kampung Melayu. Ketinggian air mencapai 50-80cm. Diperlukan evakuasi untuk lansia dan bantuan logistik mendesak berupa makanan siap saji serta air bersih.",
    status: "Diproses",
    tanggal: "2026-05-20T10:30:00",
    petugas: "Siti Nurhaliza",
    estimasi: "2026-05-23",
    catatanPetugas: "Sedang dalam proses penanganan oleh tim terkait. Logistik bantuan darurat sudah dikirimkan ke posko utama.",
    images: [
      "https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469571486090-7d998548382c?q=80&w=600&auto=format&fit=crop"
    ]
  },
  {
    id: "LB-2024-0011",
    namaPelapor: "Denovri",
    lokasi: "Cipayung, Depok, Jawa Barat",
    jenisBantuan: "Kesehatan & Sanitasi",
    deskripsi: "Warga kekurangan pasokan obat-obatan dan layanan kesehatan keliling setelah genangan air surut. Banyak balita mulai mengalami demam dan gatal-gatal kulit.",
    status: "Diverifikasi",
    tanggal: "2026-05-18T14:15:00",
    petugas: "dr. Andi Wijaya",
    estimasi: "2026-05-21",
    catatanPetugas: "Laporan telah diverifikasi oleh tim dinas kesehatan setempat. Jadwal pengiriman tim medis keliling sedang disusun.",
    images: [
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=600&auto=format&fit=crop"
    ]
  },
  {
    id: "LB-2024-0010",
    namaPelapor: "Denovri",
    lokasi: "Ciracas, Jakarta Timur, DKI Jakarta",
    jenisBantuan: "Infrastruktur & Jalan",
    deskripsi: "Terdapat lubang besar menganga di jalan masuk RT 03 yang membahayakan pengendara motor, terutama saat malam hari karena penerangan jalan mati.",
    status: "Selesai",
    tanggal: "2026-05-15T09:20:00",
    petugas: "Rahmat Hidayat (Dinas PU)",
    estimasi: "2026-05-17",
    catatanPetugas: "Kerusakan jalan telah ditambal secara permanen dan tiang lampu jalan telah diperbaiki.",
    images: [
      "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=600&auto=format&fit=crop"
    ]
  },
  {
    id: "LB-2024-0009",
    namaPelapor: "Denovri",
    lokasi: "Pasar Rebo, Jakarta Timur",
    jenisBantuan: "Bantuan Sosial Sembako",
    deskripsi: "Bantuan sosial sembako untuk keluarga tidak mampu di lingkungan RT 04 belum merata, ada beberapa lansia hidup sendiri yang terlewat dari pembagian.",
    status: "Ditolak",
    tanggal: "2026-05-10T08:00:00",
    petugas: "Lina Marlina (Dinas Sosial)",
    estimasi: "-",
    catatanPetugas: "Berdasarkan verifikasi lapangan, warga bersangkutan sudah terdaftar dalam PKH mandiri aktif. Pengalihan kuota dilakukan ke penerima lain.",
    images: [
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=600&auto=format&fit=crop"
    ]
  },
  {
    id: "LB-2024-0008",
    namaPelapor: "Denovri",
    lokasi: "Pondok Gede, Bekasi, Jawa Barat",
    jenisBantuan: "Bantuan Sosial Sembako",
    deskripsi: "Pengajuan paket sembako darurat untuk panti asuhan kasih bunda yang terdampak kesulitan ekonomi regional.",
    status: "Selesai",
    tanggal: "2026-05-05T11:45:00",
    petugas: "Hasan Basri",
    estimasi: "2026-05-08",
    catatanPetugas: "15 paket sembako komplit dan perlengkapan mandi anak telah disalurkan dan diterima oleh pengurus panti.",
    images: [
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop"
    ]
  }
];

const DEFAULT_PROFILE = {
  nama: "Denovri",
  email: "denovri@gmail.com",
  telepon: "0812-3456-7890",
  alamat: "Jl. Melati No. 12, RT 05/RW 03, Kel. Kampung Melayu, Jaktim",
  avatar: "/src/assets/images/denovri_avatar_1782418416330.jpg"
};

const DEFAULT_SETTINGS = {
  tema: "light",
  bahasa: "id",
  notifEmail: true,
  notifPush: true,
  keamananDuaLangkah: false
};

// Seed LocalStorage
function initStorage() {
  if (!localStorage.getItem("lapor_bantu_reports")) {
    localStorage.setItem("lapor_bantu_reports", JSON.stringify(DEFAULT_REPORTS));
  } else {
    // Migrate existing reports with Budi Santoso to Denovri
    try {
      const reports = JSON.parse(localStorage.getItem("lapor_bantu_reports"));
      if (Array.isArray(reports)) {
        let updated = false;
        reports.forEach(r => {
          if (r.namaPelapor === "Budi Santoso") {
            r.namaPelapor = "Denovri";
            updated = true;
          }
        });
        if (updated) {
          localStorage.setItem("lapor_bantu_reports", JSON.stringify(reports));
        }
      }
    } catch(e) {}
  }
  
  if (!localStorage.getItem("lapor_bantu_profile")) {
    localStorage.setItem("lapor_bantu_profile", JSON.stringify(DEFAULT_PROFILE));
  } else {
    // Migrate profile if it has Budi Santoso or lacks the new avatar
    try {
      const profile = JSON.parse(localStorage.getItem("lapor_bantu_profile"));
      if (profile) {
        let updated = false;
        if (profile.nama === "Budi Santoso" || profile.email === "budi.santoso@email.com") {
          profile.nama = "Denovri";
          profile.email = "denovri@gmail.com";
          updated = true;
        }
        if (profile.avatar !== "/src/assets/images/denovri_avatar_1782418416330.jpg") {
          profile.avatar = "/src/assets/images/denovri_avatar_1782418416330.jpg";
          updated = true;
        }
        if (updated) {
          localStorage.setItem("lapor_bantu_profile", JSON.stringify(profile));
        }
      }
    } catch(e) {}
  }
  
  if (!localStorage.getItem("lapor_bantu_settings")) {
    localStorage.setItem("lapor_bantu_settings", JSON.stringify(DEFAULT_SETTINGS));
  }
  
  if (!localStorage.getItem("lapor_bantu_logged_in")) {
    // Auto-login to keep it zero-friction
    localStorage.setItem("lapor_bantu_logged_in", JSON.stringify(DEFAULT_PROFILE));
  } else {
    // Migrate active session if it has Budi Santoso or lacks the new avatar
    try {
      const logged = JSON.parse(localStorage.getItem("lapor_bantu_logged_in"));
      if (logged) {
        let updated = false;
        if (logged.nama === "Budi Santoso" || logged.email === "budi.santoso@email.com") {
          logged.nama = "Denovri";
          logged.email = "denovri@gmail.com";
          updated = true;
        }
        if (logged.role !== "admin" && logged.avatar !== "/src/assets/images/denovri_avatar_1782418416330.jpg") {
          logged.avatar = "/src/assets/images/denovri_avatar_1782418416330.jpg";
          updated = true;
        }
        if (updated) {
          localStorage.setItem("lapor_bantu_logged_in", JSON.stringify(logged));
        }
      }
    } catch(e) {}
  }
}

initStorage();

// Helper to get fresh data
function getReports() {
  return JSON.parse(localStorage.getItem("lapor_bantu_reports"));
}

function setReports(reports) {
  localStorage.setItem("lapor_bantu_reports", JSON.stringify(reports));
}

function getProfile() {
  return JSON.parse(localStorage.getItem("lapor_bantu_profile"));
}

function setProfile(profile) {
  localStorage.setItem("lapor_bantu_profile", JSON.stringify(profile));
}

function getSettings() {
  return JSON.parse(localStorage.getItem("lapor_bantu_settings"));
}

function setSettings(settings) {
  localStorage.setItem("lapor_bantu_settings", JSON.stringify(settings));
}

// 2. RUN-TIME ROUTINE FOR PAGES
document.addEventListener("DOMContentLoaded", () => {
  setupNavbarAndSidebar();
  
  // Find current page path
  const path = window.location.pathname;
  const page = path.split("/").pop().replace(".html", "") || "index";

  // Dispatch functions based on page
  if (page === "index" || page === "login") {
    initLoginPage();
  } else if (page === "register") {
    initRegisterPage();
  } else if (page === "dashboard") {
    initDashboardPage();
  } else if (page === "buat-laporan") {
    initBuatLaporanPage();
  } else if (page === "laporan-saya") {
    initLaporanSayaPage();
  } else if (page === "detail-laporan") {
    initDetailLaporanPage();
  } else if (page === "tracking-bantuan") {
    initTrackingBantuanPage();
  } else if (page === "profil") {
    initProfilPage();
  } else if (page === "pengaturan") {
    initPengaturanPage();
  } else if (page === "admin-dashboard") {
    initAdminDashboardPage();
  }
  
  // Set notification active behavior
  const bell = document.querySelector(".notification-bell");
  if (bell) {
    bell.addEventListener("click", () => {
      alert("Pusat Notifikasi: Anda tidak memiliki pemberitahuan baru yang belum dibaca.");
    });
  }
});

// Setup sidebar and user info
function setupNavbarAndSidebar() {
  // Update Profile Name/Avatar in Nav and Sidebar
  const profile = getProfile();
  const avatarEls = document.querySelectorAll(".user-avatar");
  const nameEls = document.querySelectorAll(".user-name");
  
  avatarEls.forEach(el => el.src = profile.avatar);
  nameEls.forEach(el => el.textContent = profile.nama);

  // Set active link in sidebar
  const path = window.location.pathname;
  let filename = path.split("/").pop();
  if (filename === "" || filename === "index.html") {
    filename = "index.html";
  }
  
  const sidebarLinks = document.querySelectorAll(".sidebar-link");
  sidebarLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === filename) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Handle Logout button click
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (confirm("Apakah Anda yakin ingin keluar dari sistem?")) {
        localStorage.removeItem("lapor_bantu_logged_in");
        window.location.href = "index.html";
      }
    });
  }
}

// 3. LOGIN PAGE LOGIC
function initLoginPage() {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) return;

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("emailInput").value.trim();
    const password = document.getElementById("passwordInput").value.trim();

    if (!email || !password) {
      alert("Harap masukkan email dan password!");
      return;
    }

    // Direct check for simulation
    if (email === "admin@laporbantu.go.id") {
      // Login as Admin
      localStorage.setItem("lapor_bantu_logged_in", JSON.stringify({
        nama: "Admin Super",
        email: "admin@laporbantu.go.id",
        role: "admin",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop"
      }));
      window.location.href = "admin-dashboard.html";
    } else {
      // Login as Citizen (Budi Santoso)
      const profile = getProfile();
      localStorage.setItem("lapor_bantu_logged_in", JSON.stringify(profile));
      window.location.href = "dashboard.html";
    }
  });

  // Setup bypass buttons/links
  const bypassMasyarakat = document.getElementById("bypassMasyarakat");
  if (bypassMasyarakat) {
    bypassMasyarakat.addEventListener("click", (e) => {
      e.preventDefault();
      const profile = getProfile();
      localStorage.setItem("lapor_bantu_logged_in", JSON.stringify(profile));
      window.location.href = "dashboard.html";
    });
  }

  const bypassAdmin = document.getElementById("bypassAdmin");
  if (bypassAdmin) {
    bypassAdmin.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.setItem("lapor_bantu_logged_in", JSON.stringify({
        nama: "Admin Super",
        email: "admin@laporbantu.go.id",
        role: "admin",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop"
      }));
      window.location.href = "admin-dashboard.html";
    });
  }
}

// 4. REGISTER PAGE LOGIC
function initRegisterPage() {
  const registerForm = document.getElementById("registerForm");
  if (!registerForm) return;

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nama = document.getElementById("regNama").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const hp = document.getElementById("regHp").value.trim();
    const password = document.getElementById("regPassword").value;
    const confirm = document.getElementById("regConfirm").value;

    if (!nama || !email || !hp || !password) {
      alert("Semua data wajib diisi!");
      return;
    }

    if (password !== confirm) {
      alert("Password dan Konfirmasi Password tidak cocok!");
      return;
    }

    // Save as new profile
    const newProfile = {
      nama: nama,
      email: email,
      telepon: hp,
      alamat: "Belum diset",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250&auto=format&fit=crop"
    };

    setProfile(newProfile);
    localStorage.setItem("lapor_bantu_logged_in", JSON.stringify(newProfile));
    alert("Registrasi Berhasil! Selamat datang di Lapor Bantu.");
    window.location.href = "dashboard.html";
  });
}

// 5. CITIZEN DASHBOARD LOGIC
function initDashboardPage() {
  const reports = getReports();
  const profile = getProfile();

  // Greeting
  const greetingText = document.getElementById("greetingText");
  if (greetingText) {
    greetingText.textContent = `Selamat datang, ${profile.nama}!`;
  }

  // Count Statistics
  const totalReportsCount = document.getElementById("statTotal");
  const processedReportsCount = document.getElementById("statDiproses");
  const completedReportsCount = document.getElementById("statSelesai");
  const rejectedReportsCount = document.getElementById("statDitolak");

  if (totalReportsCount) totalReportsCount.textContent = reports.length;
  if (processedReportsCount) processedReportsCount.textContent = reports.filter(r => r.status === "Diproses" || r.status === "Diverifikasi").length;
  if (completedReportsCount) completedReportsCount.textContent = reports.filter(r => r.status === "Selesai").length;
  if (rejectedReportsCount) rejectedReportsCount.textContent = reports.filter(r => r.status === "Ditolak").length;

  // Render recent activities lists
  const recentReportsList = document.getElementById("recentReportsList");
  if (recentReportsList) {
    recentReportsList.innerHTML = "";
    // Show top 3 reports
    const topReports = reports.slice(0, 3);
    topReports.forEach(report => {
      let badgeClass = "badge-diproses";
      if (report.status === "Selesai") badgeClass = "badge-selesai";
      if (report.status === "Diverifikasi") badgeClass = "badge-diverifikasi";
      if (report.status === "Ditolak") badgeClass = "badge-ditolak";

      const item = document.createElement("div");
      item.className = "d-flex align-items-center justify-content-between p-3 border-bottom";
      item.innerHTML = `
        <div class="d-flex align-items-center gap-3">
          <img src="${report.images[0]}" class="rounded" style="width: 50px; height: 50px; object-fit: cover;" alt="">
          <div>
            <h6 class="mb-1 fw-semibold text-dark">${report.jenisBantuan}</h6>
            <div class="d-flex align-items-center gap-2 text-muted" style="font-size: 0.8rem;">
              <span>${report.id}</span>
              <span>•</span>
              <span>${formatDateString(report.tanggal)}</span>
            </div>
          </div>
        </div>
        <div class="d-flex align-items-center gap-3">
          <span class="badge-custom ${badgeClass}">${report.status}</span>
          <a href="detail-laporan.html?id=${report.id}" class="btn btn-sm btn-outline-primary py-1 px-2"><i class="bi bi-arrow-right"></i></a>
        </div>
      `;
      recentReportsList.appendChild(item);
    });
  }
}

// 6. CREATE REPORT LOGIC
function initBuatLaporanPage() {
  const profile = getProfile();
  
  // Prefill reporter name
  const namaPelaporInput = document.getElementById("namaPelapor");
  if (namaPelaporInput) {
    namaPelaporInput.value = profile.nama;
  }

  // Geolocation button mockup
  const btnGPS = document.getElementById("btnGPS");
  const lokasiInput = document.getElementById("lokasiKejadian");
  if (btnGPS && lokasiInput) {
    btnGPS.addEventListener("click", () => {
      lokasiInput.value = "Koordinat GPS: -6.2241, 106.8612 - Kampung Melayu, Jatinegara, Jakarta Timur";
      alert("Lokasi GPS Anda berhasil dilacak secara akurat!");
    });
  }

  // Handle image upload previews
  const uploadZone = document.getElementById("uploadZone");
  const fileInput = document.getElementById("fileInput");
  const photoPreviews = document.getElementById("photoPreviews");
  let uploadedBase64Images = [];

  if (uploadZone && fileInput) {
    uploadZone.addEventListener("click", () => fileInput.click());
    
    // Drag and drop events
    ["dragenter", "dragover"].forEach(eventName => {
      uploadZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        uploadZone.style.borderColor = "var(--primary-blue)";
        uploadZone.style.backgroundColor = "var(--primary-blue-light)";
      }, false);
    });

    ["dragleave", "drop"].forEach(eventName => {
      uploadZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        uploadZone.style.borderColor = "var(--border-color)";
        uploadZone.style.backgroundColor = "var(--bg-light)";
      }, false);
    });

    uploadZone.addEventListener("drop", (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      handleFiles(files);
    });

    fileInput.addEventListener("change", (e) => {
      handleFiles(e.target.files);
    });
  }

  function handleFiles(files) {
    if (uploadedBase64Images.length + files.length > 5) {
      alert("Maksimal upload 5 foto bukti!");
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) continue;

      const reader = new FileReader();
      reader.onload = function(e) {
        const base64Data = e.target.result;
        uploadedBase64Images.push(base64Data);
        renderPreviews();
      };
      reader.readAsDataURL(file);
    }
  }

  function renderPreviews() {
    if (!photoPreviews) return;
    photoPreviews.innerHTML = "";
    
    uploadedBase64Images.forEach((img, idx) => {
      const col = document.createElement("div");
      col.className = "preview-item";
      col.innerHTML = `
        <img src="${img}" class="preview-img" alt="Preview">
        <button type="button" class="preview-delete" data-index="${idx}">×</button>
      `;
      photoPreviews.appendChild(col);
    });

    // Append standard Add More button if under limit
    if (uploadedBase64Images.length < 5) {
      const addMore = document.createElement("div");
      addMore.className = "preview-add-more";
      addMore.innerHTML = '<i class="bi bi-plus-lg"></i>';
      addMore.addEventListener("click", () => fileInput.click());
      photoPreviews.appendChild(addMore);
    }

    // Attach deletes
    document.querySelectorAll(".preview-delete").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const idx = parseInt(e.target.getAttribute("data-index"));
        uploadedBase64Images.splice(idx, 1);
        renderPreviews();
      });
    });
  }

  // Handle Form Submission
  const formReport = document.getElementById("formReport");
  if (formReport) {
    formReport.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const lokasi = lokasiInput.value.trim();
      const jenis = document.getElementById("jenisBantuan").value;
      const deskripsi = document.getElementById("deskripsiLaporan").value.trim();

      if (!lokasi || !jenis || !deskripsi) {
        alert("Mohon lengkapi semua bidang yang bertanda bintang (*)");
        return;
      }

      // Default backup image if none uploaded
      if (uploadedBase64Images.length === 0) {
        uploadedBase64Images.push("https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop");
      }

      const reports = getReports();
      const newId = `LB-2024-${String(reports.length + 8).padStart(4, "0")}`;
      
      const newReport = {
        id: newId,
        namaPelapor: profile.nama,
        lokasi: lokasi,
        jenisBantuan: jenis,
        deskripsi: deskripsi,
        status: "Diverifikasi",
        tanggal: new Date().toISOString(),
        petugas: "Menunggu Verifikator",
        estimasi: "Menunggu Jadwal",
        catatanPetugas: "Laporan baru diterima oleh sistem. Petugas sedang mengevaluasi laporan Anda.",
        images: uploadedBase64Images
      };

      reports.unshift(newReport); // Add to beginning
      setReports(reports);

      alert(`Laporan Berhasil Terkirim! ID Laporan Anda: ${newId}`);
      window.location.href = "laporan-saya.html";
    });
  }
}

// 7. REPORTS MY LIST LOGIC
function initLaporanSayaPage() {
  const reports = getReports();
  const searchInput = document.getElementById("searchReports");
  const filterTabs = document.querySelectorAll(".filter-tab");
  const reportsContainer = document.getElementById("reportsListContainer");
  
  let currentFilter = "Semua";
  let searchQuery = "";

  function renderList() {
    if (!reportsContainer) return;
    reportsContainer.innerHTML = "";

    const filtered = reports.filter(r => {
      const matchSearch = r.jenisBantuan.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.lokasi.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (currentFilter === "Semua") return matchSearch;
      return r.status.toLowerCase() === currentFilter.toLowerCase() && matchSearch;
    });

    if (filtered.length === 0) {
      reportsContainer.innerHTML = `
        <div class="card card-custom p-5 text-center text-muted">
          <i class="bi bi-clipboard-x display-3 mb-3"></i>
          <h5>Tidak ada laporan ditemukan</h5>
          <p class="mb-0">Cobalah mengubah pencarian atau filter Anda.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(report => {
      let badgeClass = "badge-diproses";
      if (report.status === "Selesai") badgeClass = "badge-selesai";
      if (report.status === "Diverifikasi") badgeClass = "badge-diverifikasi";
      if (report.status === "Ditolak") badgeClass = "badge-ditolak";

      const card = document.createElement("div");
      card.className = "card card-custom p-4 mb-3";
      card.innerHTML = `
        <div class="row align-items-center g-3">
          <div class="col-md-2">
            <img src="${report.images[0]}" class="rounded img-fluid w-100" style="height: 110px; object-fit: cover;" alt="">
          </div>
          <div class="col-md-7">
            <div class="d-flex align-items-center gap-2 mb-2">
              <span class="badge-custom ${badgeClass}">${report.status}</span>
              <span class="text-muted text-xs">${report.id}</span>
              <span class="text-muted text-xs">•</span>
              <span class="text-muted text-xs">${formatDateString(report.tanggal)}</span>
            </div>
            <h5 class="fw-semibold text-dark mb-1">${report.jenisBantuan}</h5>
            <p class="text-gray mb-1 text-truncate-2" style="font-size: 0.9rem;">${report.deskripsi}</p>
            <small class="text-muted"><i class="bi bi-geo-alt-fill text-danger me-1"></i>${report.lokasi}</small>
          </div>
          <div class="col-md-3 text-md-end d-flex flex-column gap-2 align-items-md-end justify-content-center">
            <a href="detail-laporan.html?id=${report.id}" class="btn btn-outline-primary btn-sm w-100 max-w-200">Lihat Detail Laporan</a>
            <a href="tracking-bantuan.html?id=${report.id}" class="btn btn-success btn-sm w-100 max-w-200"><i class="bi bi-compass me-1"></i> Lacak Progres</a>
          </div>
        </div>
      `;
      reportsContainer.appendChild(card);
    });
  }

  // Search input event
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderList();
    });
  }

  // Filter tabs click event
  filterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      filterTabs.forEach(t => t.classList.remove("active", "btn-primary"));
      filterTabs.forEach(t => t.classList.add("btn-light"));
      
      tab.classList.remove("btn-light");
      tab.classList.add("active", "btn-primary");
      
      currentFilter = tab.getAttribute("data-status");
      renderList();
    });
  });

  renderList();
}

// 8. DETAIL REPORT LOGIC
function initDetailLaporanPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const reportId = urlParams.get("id") || "LB-2024-0012";
  const reports = getReports();
  const report = reports.find(r => r.id === reportId) || reports[0];

  if (!report) return;

  // Set values
  document.getElementById("detId").textContent = report.id;
  document.getElementById("detTitle").textContent = report.jenisBantuan;
  document.getElementById("detTanggal").textContent = formatDateString(report.tanggal);
  document.getElementById("detDeskripsi").textContent = report.deskripsi;
  document.getElementById("detLokasi").textContent = report.lokasi;
  document.getElementById("detPetugas").textContent = report.petugas;
  document.getElementById("detEstimasi").textContent = report.estimasi;
  document.getElementById("detCatatan").textContent = report.catatanPetugas;

  // Status Badge
  const badgeEl = document.getElementById("detStatusBadge");
  let badgeClass = "badge-diproses";
  if (report.status === "Selesai") badgeClass = "badge-selesai";
  if (report.status === "Diverifikasi") badgeClass = "badge-diverifikasi";
  if (report.status === "Ditolak") badgeClass = "badge-ditolak";
  badgeEl.className = `badge-custom ${badgeClass}`;
  badgeEl.textContent = report.status;

  // Button link to tracking
  const trackBtn = document.getElementById("btnDetailTrack");
  if (trackBtn) {
    trackBtn.href = `tracking-bantuan.html?id=${report.id}`;
  }

  // Images rendering
  const imagesGrid = document.getElementById("detImagesGrid");
  if (imagesGrid) {
    imagesGrid.innerHTML = "";
    report.images.forEach(img => {
      const col = document.createElement("div");
      col.className = "col-4";
      col.innerHTML = `
        <a href="${img}" target="_blank">
          <img src="${img}" class="rounded img-fluid w-100" style="height: 160px; object-fit: cover;" alt="Bukti Laporan">
        </a>
      `;
      imagesGrid.appendChild(col);
    });
  }
}

// 9. TRACKING REPORT TIMELINE LOGIC
function initTrackingBantuanPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const reportId = urlParams.get("id") || "LB-2024-0012";
  const reports = getReports();
  const report = reports.find(r => r.id === reportId) || reports[0];

  if (!report) return;

  // Summary headers
  document.getElementById("trackId").textContent = report.id;
  document.getElementById("trackTitle").textContent = report.jenisBantuan;
  document.getElementById("trackLokasi").textContent = report.lokasi;
  document.getElementById("trackImage").src = report.images[0];
  document.getElementById("trackPetugas").textContent = report.petugas;
  document.getElementById("trackEstimasi").textContent = report.estimasi;
  document.getElementById("trackCatatan").textContent = `"${report.catatanPetugas}"`;

  // Status Badge
  const badgeEl = document.getElementById("trackStatusBadge");
  let badgeClass = "badge-diproses";
  if (report.status === "Selesai") badgeClass = "badge-selesai";
  if (report.status === "Diverifikasi") badgeClass = "badge-diverifikasi";
  if (report.status === "Ditolak") badgeClass = "badge-ditolak";
  badgeEl.className = `badge-custom ${badgeClass}`;
  badgeEl.textContent = report.status;

  // Progress Bar percentage
  const progressBar = document.getElementById("trackingProgressBar");
  if (progressBar) {
    let pct = "25%";
    if (report.status === "Diverifikasi") pct = "25%";
    if (report.status === "Diproses") pct = "65%";
    if (report.status === "Selesai") pct = "100%";
    if (report.status === "Ditolak") pct = "100%";
    
    progressBar.style.width = pct;
    progressBar.textContent = pct;
    if (report.status === "Ditolak") {
      progressBar.classList.add("bg-danger");
    }
  }

  // Active status in steps
  const steps = ["stepDiterima", "stepDiverifikasi", "stepDiproses", "stepSelesai"];
  
  // Set default steps dates/times based on report date
  const baseDate = new Date(report.tanggal);
  
  const formatDate = (date) => {
    return date.toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' });
  };
  const formatTime = (date) => {
    return date.toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' }) + " WIB";
  };

  const dates = [
    baseDate,
    new Date(baseDate.getTime() + 2 * 60 * 60 * 1000), // +2h
    new Date(baseDate.getTime() + 12 * 60 * 60 * 1000), // +12h
    new Date(baseDate.getTime() + 24 * 60 * 60 * 1000)  // +24h
  ];

  steps.forEach((stepId, index) => {
    const el = document.getElementById(stepId);
    if (!el) return;

    const dateText = el.querySelector(".step-date");
    const timeText = el.querySelector(".step-time");

    let isCompleted = false;
    let isActive = false;

    if (report.status === "Ditolak") {
      if (index === 0) isCompleted = true;
      if (index === 1) {
        isActive = true;
        el.querySelector(".fw-semibold").textContent = "Laporan Ditolak / Dibatalkan";
        el.querySelector(".text-muted").textContent = "Laporan dibatalkan karena tidak memenuhi kriteria.";
      }
    } else if (report.status === "Diverifikasi") {
      if (index === 0) isCompleted = true;
      if (index === 1) isActive = true;
    } else if (report.status === "Diproses") {
      if (index <= 1) isCompleted = true;
      if (index === 2) isActive = true;
    } else if (report.status === "Selesai") {
      isCompleted = true;
    }

    if (isCompleted) {
      el.classList.add("completed");
      if (dateText) dateText.textContent = formatDate(dates[index]);
      if (timeText) timeText.textContent = formatTime(dates[index]);
    } else if (isActive) {
      el.classList.add("active");
      if (dateText) dateText.textContent = formatDate(dates[index]);
      if (timeText) timeText.textContent = formatTime(dates[index]);
    } else {
      if (dateText) dateText.textContent = "-";
      if (timeText) timeText.textContent = "-";
    }
  });
}

// 10. PROFILE PAGE LOGIC
function initProfilPage() {
  const profile = getProfile();

  // Load inputs
  const pNama = document.getElementById("pNama");
  const pEmail = document.getElementById("pEmail");
  const pTelepon = document.getElementById("pTelepon");
  const pAlamat = document.getElementById("pAlamat");
  const pAvatar = document.getElementById("pAvatar");
  const uploadAvatarInput = document.getElementById("uploadAvatar");

  if (pNama) pNama.value = profile.nama;
  if (pEmail) pEmail.value = profile.email;
  if (pTelepon) pTelepon.value = profile.telepon;
  if (pAlamat) pAlamat.value = profile.alamat;
  if (pAvatar) pAvatar.src = profile.avatar;

  // Upload Avatar
  if (uploadAvatarInput && pAvatar) {
    uploadAvatarInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function(evt) {
        pAvatar.src = evt.target.result;
        // Save avatar base64 temporarily
        profile.avatar = evt.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  // Save changes
  const formProfil = document.getElementById("formProfil");
  if (formProfil) {
    formProfil.addEventListener("submit", (e) => {
      e.preventDefault();
      
      profile.nama = pNama.value.trim();
      profile.email = pEmail.value.trim();
      profile.telepon = pTelepon.value.trim();
      profile.alamat = pAlamat.value.trim();

      setProfile(profile);
      alert("Biodata profil Anda berhasil diperbarui!");
      setupNavbarAndSidebar(); // refresh header navbar info
    });
  }

  // Password change
  const formPassword = document.getElementById("formPassword");
  if (formPassword) {
    formPassword.addEventListener("submit", (e) => {
      e.preventDefault();
      const current = document.getElementById("passCurrent").value;
      const newPass = document.getElementById("passNew").value;
      const confirm = document.getElementById("passConfirm").value;

      if (!current || !newPass || !confirm) {
        alert("Semua field kata sandi wajib diisi!");
        return;
      }

      if (newPass !== confirm) {
        alert("Konfirmasi kata sandi baru tidak cocok!");
        return;
      }

      alert("Kata sandi Anda berhasil diperbarui!");
      formPassword.reset();
    });
  }
}

// 11. SETTINGS PAGE LOGIC
function initPengaturanPage() {
  const settings = getSettings();

  // Load preferences
  const setTema = document.getElementById("setTema");
  const setBahasa = document.getElementById("setBahasa");
  const setNotifEmail = document.getElementById("setNotifEmail");
  const setNotifPush = document.getElementById("setNotifPush");
  const setKeamanan = document.getElementById("setKeamanan");

  if (setTema) setTema.value = settings.tema;
  if (setBahasa) setBahasa.value = settings.bahasa;
  if (setNotifEmail) setNotifEmail.checked = settings.notifEmail;
  if (setNotifPush) setNotifPush.checked = settings.notifPush;
  if (setKeamanan) setKeamanan.checked = settings.keamananDuaLangkah;

  // Save Settings
  const btnSaveSettings = document.getElementById("btnSaveSettings");
  if (btnSaveSettings) {
    btnSaveSettings.addEventListener("click", () => {
      settings.tema = setTema.value;
      settings.bahasa = setBahasa.value;
      settings.notifEmail = setNotifEmail.checked;
      settings.notifPush = setNotifPush.checked;
      settings.keamananDuaLangkah = setKeamanan.checked;

      setSettings(settings);
      alert("Pengaturan aplikasi berhasil disimpan!");
    });
  }
}

// 12. ADMIN DASHBOARD LOGIC (Chart.js implementation)
function initAdminDashboardPage() {
  // Check access control
  const loggedInUser = JSON.parse(localStorage.getItem("lapor_bantu_logged_in"));
  if (!loggedInUser || loggedInUser.email !== "admin@laporbantu.go.id") {
    // Force bypass check, but let's notify
    console.log("Admin Dashboard accessed");
  }

  // Draw monthly trend line chart
  const ctxLine = document.getElementById("trendChart");
  if (ctxLine) {
    new Chart(ctxLine, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
        datasets: [{
          label: 'Tren Laporan Masuk',
          data: [45, 52, 48, 68, 65, 85],
          borderColor: '#2563EB',
          backgroundColor: 'rgba(37, 99, 235, 0.05)',
          fill: true,
          tension: 0.4,
          borderWidth: 3,
          pointRadius: 4,
          pointBackgroundColor: '#2563EB'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            grid: { color: '#F1F5F9' },
            ticks: { font: { family: 'Poppins' } }
          },
          x: {
            grid: { display: false },
            ticks: { font: { family: 'Poppins' } }
          }
        }
      }
    });
  }

  // Draw category doughnut chart
  const ctxDoughnut = document.getElementById("categoryChart");
  if (ctxDoughnut) {
    new Chart(ctxDoughnut, {
      type: 'doughnut',
      data: {
        labels: ['Banjir & Air', 'Sembako', 'Kesehatan', 'Infrastruktur', 'Lainnya'],
        datasets: [{
          data: [40, 25, 15, 12, 8],
          backgroundColor: ['#2563EB', '#22C55E', '#F59E0B', '#EF4444', '#94A3B8'],
          borderWidth: 2,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 12,
              font: { family: 'Poppins', size: 11 },
              padding: 15
            }
          }
        },
        cutout: '65%'
      }
    });
  }
}

// Utility to format ISO dates beautifully
function formatDateString(isoString) {
  if (!isoString) return "-";
  const date = new Date(isoString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
