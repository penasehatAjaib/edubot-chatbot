import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  Trash2,
  BookOpen,
  MessageSquare,
  Copy,
  Check,
  Code,
  Layers,
  Cpu,
  Database,
  Plus,
  Search,
  RotateCcw,
  Tag,
  HelpCircle,
  Moon,
  Sun,
  Mic,
  MicOff,
  Download,
  Upload,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Square,
  Shuffle,
  SlidersHorizontal,
  X,
  Volume2,
  VolumeX,
  Timer,
  Play,
  Pause,
  Bookmark,
  ArrowRight,
  Sparkles
} from 'lucide-react';

// Data awal pengetahuan bot bertema edukasi & lifestyle Gen Z (12 topik)
const DATA_AWAL = [
  {
    id: 'data-1',
    category: 'Kesehatan Mental',
    keywords: ['burnout', 'overthinking', 'stres', 'capek', 'mental', 'lelah', 'istirahat'],
    questionExample: 'Gimana cara ngatasin burnout dan overthinking saat nugas?',
    answer:
      'Wajar banget ngerasa capek atau *burnout* kalau tugas numpuk. Coba langkah simpel ini:\n\n1. **Brain Dump:** Tulis semua hal yang bikin kepikiran di kertas biar kepala nggak penuh.\n2. **Aturan 5 Menit:** Kalau malas mulai, paksa kerjain 5 menit dulu. Biasanya setelah jalan bakal keterusan.\n3. **Jeda Tanpa Layar:** Istirahat 15 menit jauh dari HP atau laptop, minum air putih, atau jalan sebentar.'
  },
  {
    id: 'data-2',
    category: 'Finansial Gen Z',
    keywords: ['uang', 'nabung', 'kos', 'boncos', 'keuangan', 'gaji', 'jajan', 'checkout'],
    questionExample: 'Tips mengatur uang bulanan anak kos biar nggak boncos?',
    answer:
      'Biar nggak cuma makan mi instan di akhir bulan, coba terapkan trik ini:\n\n- **Metode 50/30/20:** 50% kebutuhan pokok (kos, makan, kuota), 30% hiburan/nongkrong, 20% tabungan. *(Coba ketik `budget 1500000` di sini buat hitung otomatis!)*\n- **Tunda Checkout 24 Jam:** Kalau lihat barang lucu di *e-commerce*, masukin keranjang dulu dan tunggu besok—biasanya keinginan impulsifnya hilang.\n- **Pisahkan Rekening:** Bikin rekening atau e-wallet khusus dana darurat yang nggak dipakai buat jajan.'
  },
  {
    id: 'data-3',
    category: 'Produktivitas',
    keywords: ['doomscrolling', 'scroll', 'malas', 'prokrastinasi', 'fokus', 'tugas', 'nunda'],
    questionExample: 'Cara berhenti doomscrolling dan mulai ngerjain tugas?',
    answer:
      'Kebiasaan *doomscrolling* bikin otak terbiasa cari dopamin instan. Coba cara ini buat memutusnya:\n\n1. **Teknik Pomodoro:** Fokus nugas 25 menit, lalu istirahat 5 menit (kamu bisa pakai **Timer Fokus** di bilah atas chat ini!).\n2. **Jauhkan HP:** Taruh HP di luar jangkauan tangan atau aktifkan mode *Do Not Disturb* selama sesi fokus.\n3. **Pecah Tugas Kecil:** Ubah target "kerjain makalah" menjadi "bikin kerangka 3 poin dulu".'
  },
  {
    id: 'data-4',
    category: 'Karir & Magang',
    keywords: ['cv', 'portofolio', 'magang', 'intern', 'kerja', 'linkedin', 'fresh graduate'],
    questionExample: 'Gimana cara bikin CV dan portofolio pertama kalau belum punya pengalaman?',
    answer:
      'Belum punya pengalaman kerja bukan masalah besar untuk magang pertama. Kamu bisa menonjolkan hal berikut:\n\n- **Proyek Kuliah & Mandiri:** Masukkan tugas besar, aplikasi, desain, atau riset yang pernah kamu kerjakan lengkap dengan hasilnya.\n- **Kepanitiaan & Organisasi:** Jelaskan kontribusi konkretmu pakai angka (misal: *"Mengelola publikasi acara dengan 300+ peserta"*).\n- **Format ATS-Friendly:** Gunakan desain 1 kolom yang bersih, font standar, dan kata kunci yang sesuai dengan posisi magang yang dilamar.'
  },
  {
    id: 'data-5',
    category: 'Digital Lifestyle',
    keywords: ['fomo', 'medsos', 'sosmed', 'insecure', 'bandingin', 'instagram', 'tiktok'],
    questionExample: 'Cara ngatasin FOMO pas lihat pencapaian teman di media sosial?',
    answer:
      'Ingat bahwa media sosial itu *highlight reel*—orang cuma unggah momen terbaiknya, bukan proses gagalnya.\n\n1. **Kurasi Timeline:** *Mute* atau *unfollow* akun yang bikin kamu terus merasa kurang tanpa alasan sehat.\n2. **Fokus ke Progres Sendiri:** Bandingkan dirimu hari ini dengan dirimu 6 bulan lalu, bukan dengan *timeline* orang lain.\n3. **Detoks Digital Akhir Pekan:** Kurangi *screen time* media sosial minimal setengah hari setiap akhir pekan.'
  },
  {
    id: 'data-6',
    category: 'Produktivitas',
    keywords: ['manajemen waktu', 'jadwal', 'skala prioritas', 'keteteran', 'deadline', 'sibuk'],
    questionExample: 'Gimana cara manajemen waktu antara kuliah, organisasi, dan nugas?',
    answer:
      'Biar nggak keteteran sama *deadline*, pakai **Matriks Eisenhower** sederhana:\n\n- **Penting & Mendesak:** Kerjakan sekarang (tugas mepet *deadline*).\n- **Penting tapi Tidak Mendesak:** Jadwalkan di kalender (cicil skripsi, belajar ujian).\n- **Mendesak tapi Kurang Penting:** Delegasikan atau batasi waktunya.\n- **Tidak Keduanya:** Kurangi (scroll tanpa tujuan).'
  },
  {
    id: 'data-7',
    category: 'Karir & Magang',
    keywords: ['interview', 'wawancara', 'hrd', 'gugup', 'perkenalan', 'star'],
    questionExample: 'Tips menghadapi interview magang pertama biar nggak gugup?',
    answer:
      'HRD biasanya menilai kemauan belajar dan cara komunikasimu saat magang:\n\n1. **Siapkan "Tell Me About Yourself":** Rangkum dalam 60 detik (latar belakang jurusan, minat, dan proyek/pengalaman relevan).\n2. **Gunakan Metode STAR:** Saat ditanya pengalaman, jelaskan *Situation* (situasi), *Task* (tugas), *Action* (tindakanmu), dan *Result* (hasilnya).\n3. **Siapkan 2 Pertanyaan Balik:** Misal tanya tentang budaya tim atau ekspektasi di 1 bulan pertama magang.'
  },
  {
    id: 'data-8',
    category: 'Finansial Gen Z',
    keywords: ['side hustle', 'cuan', 'penghasilan', 'freelance', 'kerja sampingan', 'mahasiswa'],
    questionExample: 'Ide side hustle yang cocok buat mahasiswa tanpa ganggu kuliah?',
    answer:
      'Beberapa opsi *side hustle* fleksibel buat mahasiswa:\n\n- **Jasa Digital:** Desain grafis (Canva/Figma), *video editing* konten pendek, atau *copywriting*.\n- **Tutor / Les Privat:** Mengajar mata pelajaran sekolah atau bahasa asing secara online.\n- **Affiliate & Konten Kreator:** Review produk atau berbagi tips kuliah/teknologi secara konsisten.\n- **Asisten Riset / Admin Medsos:** Membantu dosen atau UMKM mengelola jadwal posting.'
  },
  {
    id: 'data-9',
    category: 'Kesehatan Mental',
    keywords: ['quarter life crisis', 'qlc', 'masa depan', 'bingung', 'arah hidup', 'dewasa'],
    questionExample: 'Gimana cara menghadapi quarter life crisis di usia 20-an?',
    answer:
      'Fase bingung soal arah karier, relasi, dan masa depan di usia 20-an itu sangat normal.\n\n1. **Terima Ketidakpastian:** Nggak semua hal harus terjawab hari ini; usia 20-an memang masa eksperimen.\n2. **Eksplorasi Skill:** Coba ikut magang, komunitas, atau kursus singkat buat tahu mana bidang yang cocok.\n3. **Ngobrol dengan Mentor/Teman Sebaya:** Ceritakan keresahanmu—sering kali kamu sadar banyak teman yang mengalami hal serupa.'
  },
  {
    id: 'data-10',
    category: 'Pengembangan Diri',
    keywords: ['boundaries', 'menolak', 'tidak enakan', 'people pleaser', 'capek hati'],
    questionExample: 'Cara pasang boundaries dan bilang tidak tanpa merasa nggak enakan?',
    answer:
      'Menjaga energi sendiri itu bukan egois. Coba kalimat penolakan yang sopan tapi tegas:\n\n- *"Makasih udah ngajak, tapi jadwal aku minggu ini lagi penuh banget. Lain kali kita atur lagi ya!"*\n- *"Aku bantu bagian ini ya, tapi untuk bagian satunya aku belum bisa pegang karena ada prioritas lain."*\n- **Ingat:** Orang yang menghargaimu akan memahami batasanmu.'
  },
  {
    id: 'data-11',
    category: 'Digital Lifestyle',
    keywords: ['keamanan', 'phishing', 'hack', 'password', 'akun', 'data pribadi', 'penipuan'],
    questionExample: 'Tips menjaga keamanan akun media sosial dan menghindari link phishing?',
    answer:
      'Waspada sama penipuan berkedok undangan digital, paket kurir, atau verifikasi centang biru:\n\n1. **Aktifkan 2FA (Two-Factor Authentication):** Gunakan aplikasi *authenticator* untuk akun email dan media sosial utama.\n2. **Cek URL Sebelum Klik:** Jangan pernah masukkan *password* atau kode OTP di tautan mencurigakan.\n3. **Password Berbeda:** Gunakan kombinasi unik untuk setiap akun penting.'
  },
  {
    id: 'data-12',
    category: 'Kuliah & Belajar',
    keywords: ['belajar', 'ujian', 'uts', 'uas', 'hafal', 'materi', 'skripsi', 'nilai'],
    questionExample: 'Metode belajar efektif biar materi cepat nempel sebelum UTS atau UAS?',
    answer:
      'Hindari sistem kebut semalam (SKS) dengan metode yang terbukti lebih efektif:\n\n- **Active Recall:** Tutup catatanmu lalu coba jelaskan ulang materinya dengan bahasamu sendiri.\n- **Feynman Technique:** Bayangkan kamu sedang mengajari materi tersebut ke teman yang belum paham.\n- **Spaced Repetition:** Ulangi materi dalam jeda 1 hari, 3 hari, dan 7 hari sebelum ujian.'
  }
];

const STORAGE_KEY = 'edubot_genz_knowledge_v2';
const CHAT_STORAGE_KEY = 'edubot_chat_history_v2';
const THEME_STORAGE_KEY = 'edubot_dark_mode_v2';

// Bersihkan tanda markdown sebelum dibacakan oleh fitur Text-to-Speech
function bersihkanMarkdownUntukSuara(teks) {
  return teks
    .replace(/```[\s\S]*?```/g, ' kode program ')
    .replace(/[*_`#-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Bunyi lonceng lembut saat timer Pomodoro selesai
function putarNadaSelesai() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime);
    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.18);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.55);
  } catch {
    // Abaikan jika browser memblokir audio otomatis
  }
}

// Kalkulator pembagian uang bulanan 50/30/20
function hitungBudgeting(teks) {
  const match = teks.match(
    /(?:budget|anggaran|alokasi|uang bulanan|gaji)\s*(?:rp\.?\s*)?([0-9.,]+)\s*(jt|juta|rb|ribu)?/i
  );
  if (!match) return null;

  let angka = parseFloat(match[1].replace(/\./g, '').replace(',', '.'));
  const satuan = (match[2] || '').toLowerCase();

  if (satuan === 'jt' || satuan === 'juta') angka *= 1_000_000;
  else if (satuan === 'rb' || satuan === 'ribu') angka *= 1_000;

  if (!angka || Number.isNaN(angka) || angka < 1000) return null;

  const formatRp = (val) => `Rp ${Math.round(val).toLocaleString('id-ID')}`;
  return {
    total: formatRp(angka),
    kebutuhan: formatRp(angka * 0.5),
    hiburan: formatRp(angka * 0.3),
    tabungan: formatRp(angka * 0.2)
  };
}

// Evaluasi ekspresi matematika dasar (+, -, *, /, tanda kurung) secara aman
function evaluasiAritmatika(ekspresi) {
  const tokens = ekspresi.replace(/\s+/g, '').match(/(\d+\.?\d*|\.\d+|[+\-*/()])/g);
  if (!tokens) return null;

  let pos = 0;

  function parseEkspresi() {
    let nilai = parseSuku();
    if (nilai === null) return null;

    while (tokens[pos] === '+' || tokens[pos] === '-') {
      const op = tokens[pos++];
      const kanan = parseSuku();
      if (kanan === null) return null;
      nilai = op === '+' ? nilai + kanan : nilai - kanan;
    }
    return nilai;
  }

  function parseSuku() {
    let nilai = parseFaktor();
    if (nilai === null) return null;

    while (tokens[pos] === '*' || tokens[pos] === '/') {
      const op = tokens[pos++];
      const kanan = parseFaktor();
      if (kanan === null || (op === '/' && kanan === 0)) return null;
      nilai = op === '*' ? nilai * kanan : nilai / kanan;
    }
    return nilai;
  }

  function parseFaktor() {
    if (tokens[pos] === '+') {
      pos++;
      return parseFaktor();
    }
    if (tokens[pos] === '-') {
      pos++;
      const val = parseFaktor();
      return val === null ? null : -val;
    }
    if (tokens[pos] === '(') {
      pos++;
      const val = parseEkspresi();
      if (tokens[pos] !== ')') return null;
      pos++;
      return val;
    }
    const angka = parseFloat(tokens[pos]);
    if (Number.isNaN(angka)) return null;
    pos++;
    return angka;
  }

  const hasil = parseEkspresi();
  if (hasil === null || pos !== tokens.length) return null;
  return hasil;
}

// Kalkulator operasi matematika sederhana (contoh: "hitung 45 * 12")
function hitungMatematika(teks) {
  const match = teks.match(/(?:hitung|berapa|hasil)\s+([0-9+\-*/().\s]+)/i);
  const ekspresiMentah = match ? match[1].trim() : teks.trim();

  if (!/^[0-9+\-*/().\s]+$/.test(ekspresiMentah)) return null;
  if (!/[+\-*/]/.test(ekspresiMentah)) return null;

  const hasil = evaluasiAritmatika(ekspresiMentah);
  if (typeof hasil === 'number' && Number.isFinite(hasil)) {
    const hasilFormat = Number.isInteger(hasil) ? hasil : Number(hasil.toFixed(4));
    return { rumus: ekspresiMentah, hasil: hasilFormat };
  }
  return null;
}

// Sesuaikan format jawaban berdasarkan gaya yang dipilih pengguna
function terapkanGayaJawaban(teks, gayaBahasa) {
  if (gayaBahasa === 'ringkas') {
    const barisPenting = teks
      .split('\n')
      .map((b) => b.trim())
      .filter((b) => b.length > 0)
      .slice(0, 4);
    return `**Versi Ringkas:**\n\n${barisPenting.join('\n')}`;
  }

  if (gayaBahasa === 'terstruktur') {
    return `**Ringkasan Poin Utama:**\n\n${teks}\n\n---\n*Tips Aksi: Pilih 1 poin paling mudah untuk langsung dipraktikkan hari ini.*`;
  }

  return teks;
}

// Ambil 2 topik lanjutan yang relevan untuk menjaga alur diskusi
function ambilTopikLanjutan(itemTerpilih, daftarPengetahuan) {
  const lain = daftarPengetahuan.filter((d) => d.id !== itemTerpilih.id);
  const sekategori = lain.filter((d) => d.category === itemTerpilih.category);
  const bedaKategori = lain.filter((d) => d.category !== itemTerpilih.category);
  const gabungan = [...sekategori, ...bedaKategori];
  return gabungan.slice(0, 2).map((d) => d.questionExample);
}

// Fungsi utama untuk mencari jawaban yang paling cocok secara lokal
function cariJawabanBot(inputUser, daftarPengetahuan, gayaBahasa = 'santai') {
  const teksKecil = inputUser.toLowerCase().trim();

  // 1. Cek sapaan dasar
  const daftarSapaan = [
    'halo',
    'hai',
    'hello',
    'hi',
    'assalamualaikum',
    'selamat pagi',
    'selamat siang',
    'selamat sore',
    'selamat malam',
    'permisi'
  ];
  const cekSapaan = daftarSapaan.some(
    (s) => teksKecil === s || teksKecil === `${s}!` || teksKecil === `${s} edubot`
  );

  if (cekSapaan) {
    const jam = new Date().getHours();
    let salam = 'Halo';
    if (jam >= 4 && jam < 11) salam = 'Selamat pagi';
    else if (jam >= 11 && jam < 15) salam = 'Selamat siang';
    else if (jam >= 15 && jam < 18) salam = 'Selamat sore';
    else salam = 'Selamat malam';

    return {
      text: `${salam}! Lagi pengen bahas topik apa nih hari ini? Kamu bisa tanya soal mental health, budgeting anak kos, magang, atau produktivitas.`,
      meta: {
        category: 'Sapaan',
        confidence: 100,
        followUps: daftarPengetahuan.slice(0, 2).map((d) => d.questionExample)
      }
    };
  }

  // 2. Cek pertanyaan jam atau tanggal
  if (/(jam berapa|waktu sekarang|tanggal berapa|hari apa)/.test(teksKecil)) {
    const sekarang = new Date();
    const tanggal = sekarang.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const waktu = sekarang.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });

    return {
      text: `Sekarang pukul **${waktu}**, hari **${tanggal}**.`,
      meta: { category: 'Info Waktu', confidence: 100 }
    };
  }

  // 3. Cek kalkulator budgeting 50/30/20
  const hasilBudget = hitungBudgeting(teksKecil);
  if (hasilBudget) {
    return {
      text: `Berikut simulasi pembagian **Metode 50/30/20** untuk dana **${hasilBudget.total}**:\n\n- **50% Kebutuhan Pokok** (kos, makan, kuota): **${hasilBudget.kebutuhan}**\n- **30% Hiburan & Nongkrong**: **${hasilBudget.hiburan}**\n- **20% Tabungan & Dana Darurat**: **${hasilBudget.tabungan}**`,
      meta: {
        category: 'Kalkulator Budget',
        confidence: 100,
        followUps: [
          'Tips mengatur uang bulanan anak kos biar nggak boncos?',
          'Ide side hustle yang cocok buat mahasiswa tanpa ganggu kuliah?'
        ]
      }
    };
  }

  // 4. Cek perhitungan matematika
  const hasilHitung = hitungMatematika(teksKecil);
  if (hasilHitung) {
    return {
      text: `Hasil dari \`${hasilHitung.rumus}\` adalah **${hasilHitung.hasil}**.`,
      meta: { category: 'Kalkulator', confidence: 100 }
    };
  }

  // 5. Bersihkan tanda baca dan pecah kata
  const teksNormal = teksKecil.replace(/[^\w\s]/g, ' ');
  const kataUser = teksNormal.split(/\s+/).filter((kata) => kata.length > 1);

  if (kataUser.length === 0) {
    return {
      text: 'Coba ketik pertanyaan yang lebih jelas ya.',
      meta: { category: 'Info', confidence: 0 }
    };
  }

  // 6. Hitung skor kecocokan dengan data pengetahuan
  let jawabanTerbaik = null;
  let skorTertinggi = 0;

  daftarPengetahuan.forEach((item) => {
    let skor = 0;
    let jumlahCocok = 0;

    item.keywords.forEach((kw) => {
      const keyword = kw.toLowerCase().trim();
      if (!keyword) return;

      if (teksNormal.includes(keyword)) {
        skor += keyword.includes(' ') ? 5 : 3;
        jumlahCocok += 1;
      } else {
        const cocokSebagian = kataUser.some(
          (token) => token === keyword || (token.length >= 4 && keyword.includes(token))
        );
        if (cocokSebagian) {
          skor += 1.5;
          jumlahCocok += 1;
        }
      }
    });

    if (skor > skorTertinggi) {
      skorTertinggi = skor;
      const rasio = jumlahCocok / Math.max(1, Math.min(item.keywords.length, 4));
      const persen = Math.min(99, Math.max(45, Math.round(rasio * 100)));
      jawabanTerbaik = { item, confidence: persen };
    }
  });

  if (jawabanTerbaik && skorTertinggi >= 2) {
    return {
      text: terapkanGayaJawaban(jawabanTerbaik.item.answer, gayaBahasa),
      meta: {
        category: jawabanTerbaik.item.category,
        confidence: jawabanTerbaik.confidence,
        followUps: ambilTopikLanjutan(jawabanTerbaik.item, daftarPengetahuan)
      }
    };
  }

  const saranAlternatif = daftarPengetahuan.slice(0, 3).map((d) => d.questionExample);

  return {
    text: `Maaf, EduBot belum menemukan jawaban yang pas untuk **"${inputUser}"**.\n\nKamu bisa menambahkan topik ini lewat tab **Latih Bot** di atas, atau coba pilih salah satu topik berikut:`,
    meta: {
      category: 'Belum Ada Data',
      confidence: 0,
      suggestions: saranAlternatif
    }
  };
}

// Helper fetch dengan exponential backoff tanpa mencatat retry sebagai error
async function fetchDenganBackoff(url, options, maxRetries = 2) {
  let delay = 900;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        return await response.json();
      }
      if (response.status === 429 || response.status >= 500) {
        if (attempt < maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, delay));
          delay *= 2;
          continue;
        }
      }
      throw new Error(`HTTP ${response.status}`);
    } catch (err) {
      if (attempt === maxRetries) throw err;
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= 2;
    }
  }
}

// Mesin respons adaptif EduBot (menggabungkan fitur lokal cepat, basis pengetahuan, dan pencarian terkini)
async function tanyaEduBotCerdas(inputUser, riwayatChat, daftarPengetahuan, gayaBahasa = 'santai') {
  const teksKecil = inputUser.toLowerCase().trim();

  // Jalankan fitur kalkulator & info waktu secara instan
  if (
    /(jam berapa|waktu sekarang|tanggal berapa|hari apa)/.test(teksKecil) ||
    hitungBudgeting(teksKecil) ||
    hitungMatematika(teksKecil)
  ) {
    return cariJawabanBot(inputUser, daftarPengetahuan, gayaBahasa);
  }

  // Susun instruksi gaya bahasa sambil mempertahankan identitas penuh sebagai EduBot
  let instruksiGaya =
    'Gunakan gaya bahasa santai, hangat, dan suportif khas Gen Z Indonesia (pakai "kamu/aku", tidak kaku, rapi dengan poin atau penekanan bold seperlunya).';
  if (gayaBahasa === 'ringkas') {
    instruksiGaya =
      'Berikan jawaban yang ringkas, padat, dan langsung ke inti (maksimal 3-4 poin singkat atau 1 paragraf pendek).';
  } else if (gayaBahasa === 'terstruktur') {
    instruksiGaya =
      'Susun jawaban secara terstruktur dengan sub-poin yang jelas, lalu akhiri dengan 1 langkah aksi praktis yang bisa langsung dilakukan hari ini.';
  }

  const ringkasanPengetahuan = daftarPengetahuan
    .map((item) => `- [${item.category}] ${item.questionExample}: ${item.answer.replace(/\n+/g, ' ')}`)
    .join('\n');

  const systemPrompt = `Kamu adalah EduBot, asisten virtual edukasi, pengembangan diri, karir, finansial, dan gaya hidup untuk Gen Z di Indonesia.
ATURAN IDENTITAS (WAJIB DIPATUHI):
1. Identitasmu sepenuhnya adalah EduBot. Jangan pernah menyebut dirimu sebagai Gemini, Google, AI buatan Google, LLM, atau mesin pencari.
2. Jika ditanya siapa pembuatmu atau teknologimu, jawab bahwa kamu adalah EduBot yang dirancang sebagai asisten interaktif untuk menemani diskusi dan belajar Gen Z.
3. Jangan mencantumkan URL mentah, tautan sitasi, atau menyebut sumber pencarian eksternal kecuali pengguna memintanya secara eksplisit.
4. ${instruksiGaya}

Gunakan referensi topik internal EduBot berikut jika relevan dengan pertanyaan pengguna, namun tetap kembangkan jawaban dengan bahasa yang segar dan variatif:
${ringkasanPengetahuan}`;

  // Ambil maksimal 6 pesan terakhir untuk menjaga konteks percakapan lanjutan
  const konteksTerakhir = riwayatChat
    .filter((m) => m.text && m.text.trim().length > 0)
    .slice(-6)
    .map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }));

  konteksTerakhir.push({
    role: 'user',
    parts: [{ text: inputUser }]
  });

  // Ubah baris di bawah ini di VS Code menjadi: const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";

  const headers = { 'Content-Type': 'application/json' };
  if (apiKey) {
    headers['x-goog-api-key'] = apiKey;
  }

  const daftarPercobaan = [
    {
      model: 'gemini-3-flash-preview',
      payload: {
        contents: konteksTerakhir,
        tools: [{ google_search: {} }],
        systemInstruction: { parts: [{ text: systemPrompt }] }
      }
    },
    {
      model: 'gemini-3-flash-preview',
      payload: {
        contents: konteksTerakhir,
        systemInstruction: { parts: [{ text: systemPrompt }] }
      }
    },
    {
      model: 'gemini-2.5-flash',
      payload: {
        contents: konteksTerakhir,
        systemInstruction: { parts: [{ text: systemPrompt }] }
      }
    }
  ];

  for (const percobaan of daftarPercobaan) {
    try {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${percobaan.model}:generateContent?key=${encodeURIComponent(apiKey)}`;
      const result = await fetchDenganBackoff(
        apiUrl,
        {
          method: 'POST',
          headers,
          body: JSON.stringify(percobaan.payload)
        },
        1
      );

      const candidate = result?.candidates?.[0];
      const teksJawaban = candidate?.content?.parts?.[0]?.text?.trim();

      if (!teksJawaban) continue;

      const adaPencarian = Boolean(
        candidate?.groundingMetadata?.webSearchQueries?.length ||
          candidate?.groundingMetadata?.groundingAttributions?.length
      );

      const topikCocok = daftarPengetahuan.find((item) =>
        item.keywords.some((kw) => teksKecil.includes(kw.toLowerCase()))
      );

      const kategoriLabel = topikCocok
        ? topikCocok.category
        : adaPencarian
        ? 'Wawasan Terkini'
        : 'EduBot Smart';

      const followUps = topikCocok
        ? ambilTopikLanjutan(topikCocok, daftarPengetahuan)
        : daftarPengetahuan
            .slice()
            .sort(() => 0.5 - Math.random())
            .slice(0, 2)
            .map((d) => d.questionExample);

      return {
        text: teksJawaban,
        meta: {
          category: kategoriLabel,
          confidence: 0,
          adaptive: true,
          followUps
        }
      };
    } catch {
      // Lanjut ke opsi model berikutnya jika opsi saat ini gagal
    }
  }

  // Fallback otomatis ke basis pengetahuan lokal jika berjalan offline atau tanpa API key
  return cariJawabanBot(inputUser, daftarPengetahuan, gayaBahasa);
}

// Komponen untuk merender teks tebal (**teks**), miring (*teks*), dan kode (`kode`)
function ChatMessage({ text, darkMode = true }) {
  if (!text) return null;
  const bagian = text.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-2 text-sm sm:text-base leading-relaxed break-words">
      {bagian.map((part, index) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const isiKode = part.slice(3, -3).replace(/^[a-z]+\n/i, '');
          return (
            <pre
              key={index}
              className="bg-slate-950 text-slate-100 border border-slate-800 p-3 rounded-xl text-xs sm:text-sm font-mono overflow-x-auto my-2"
            >
              <code>{isiKode}</code>
            </pre>
          );
        }

        const baris = part.split('\n');
        return (
          <div key={index} className="space-y-1">
            {baris.map((line, lineIdx) => {
              if (!line.trim()) {
                return <div key={lineIdx} className="h-1.5" />;
              }

              const token = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
              return (
                <p key={lineIdx}>
                  {token.map((segmen, i) => {
                    if (segmen.startsWith('**') && segmen.endsWith('**')) {
                      return (
                        <strong key={i} className="font-semibold">
                          {segmen.slice(2, -2)}
                        </strong>
                      );
                    }
                    if (segmen.startsWith('*') && segmen.endsWith('*') && segmen.length > 2) {
                      return (
                        <em key={i} className="italic">
                          {segmen.slice(1, -1)}
                        </em>
                      );
                    }
                    if (segmen.startsWith('`') && segmen.endsWith('`')) {
                      return (
                        <code
                          key={i}
                          className={`px-1.5 py-0.5 mx-0.5 rounded font-mono text-xs sm:text-sm ${
                            darkMode
                              ? 'bg-slate-800 text-indigo-300 border border-slate-700'
                              : 'bg-slate-200/80 text-indigo-700'
                          }`}
                        >
                          {segmen.slice(1, -1)}
                        </code>
                      );
                    }
                    return <span key={i}>{segmen}</span>;
                  })}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

// Halaman untuk menambah & mengelola daftar pengetahuan bot
function LatihBotView({
  knowledgeBase,
  onAddKnowledge,
  onDeleteKnowledge,
  onResetKnowledge,
  onImportKnowledge,
  onTestQuestion,
  darkMode
}) {
  const [contohTanya, setContohTanya] = useState('');
  const [kataKunci, setKataKunci] = useState('');
  const [kategori, setKategori] = useState('Kesehatan Mental');
  const [jawaban, setJawaban] = useState('');
  const [kataCari, setKataCari] = useState('');
  const [filterKategori, setFilterKategori] = useState('Semua');
  const [pesanError, setPesanError] = useState('');
  const fileInputRef = useRef(null);

  const handleSimpan = (e) => {
    e.preventDefault();
    if (!contohTanya.trim() || !kataKunci.trim() || !jawaban.trim()) {
      setPesanError('Harap lengkapi kolom pertanyaan, kata kunci, dan jawaban.');
      return;
    }

    const daftarKeyword = kataKunci
      .split(',')
      .map((k) => k.trim().toLowerCase())
      .filter((k) => k.length > 0);

    if (daftarKeyword.length === 0) {
      setPesanError('Masukkan minimal satu kata kunci yang valid.');
      return;
    }

    const itemBaru = {
      id: `user-data-${Date.now()}`,
      category: kategori,
      keywords: daftarKeyword,
      questionExample: contohTanya.trim(),
      answer: jawaban.trim()
    };

    onAddKnowledge(itemBaru);
    setContohTanya('');
    setKataKunci('');
    setJawaban('');
    setPesanError('');
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(knowledgeBase, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `edubot-knowledge-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result);
        if (!Array.isArray(parsed)) {
          setPesanError('Format JSON harus berupa daftar (array) topik.');
          return;
        }
        const validItems = parsed
          .filter(
            (item) =>
              item &&
              typeof item.questionExample === 'string' &&
              Array.isArray(item.keywords) &&
              typeof item.answer === 'string'
          )
          .map((item, idx) => ({
            id: `user-data-${Date.now()}-${idx}`,
            category: item.category || 'Umum',
            keywords: item.keywords.map((k) => String(k).toLowerCase().trim()).filter(Boolean),
            questionExample: item.questionExample.trim(),
            answer: item.answer.trim()
          }));

        if (validItems.length === 0) {
          setPesanError('Tidak ditemukan data valid di dalam file JSON.');
          return;
        }

        onImportKnowledge(validItems);
        setPesanError('');
      } catch {
        setPesanError('File JSON tidak valid atau rusak.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const daftarKategori = ['Semua', ...new Set(knowledgeBase.map((item) => item.category))];

  const dataTersaring = knowledgeBase.filter((item) => {
    const cocokKategori = filterKategori === 'Semua' || item.category === filterKategori;
    const cocokCari =
      item.questionExample.toLowerCase().includes(kataCari.toLowerCase()) ||
      item.category.toLowerCase().includes(kataCari.toLowerCase()) ||
      item.keywords.some((k) => k.includes(kataCari.toLowerCase()));
    return cocokKategori && cocokCari;
  });

  const cardClass = darkMode
    ? 'bg-slate-900 border-slate-800 text-slate-100'
    : 'bg-white border-slate-200 text-slate-800';
  const inputClass = darkMode
    ? 'border-slate-700 bg-slate-800/80 text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:bg-slate-800'
    : 'border-slate-300 bg-slate-50 text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:bg-white';

  return (
    <div className={`flex-1 overflow-y-auto p-4 sm:p-6 ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 pb-8">
        {/* Form Tambah Data */}
        <div className="lg:col-span-5">
          <div className={`rounded-2xl border p-5 shadow-sm sticky top-4 ${cardClass}`}>
            <div
              className={`flex items-center gap-2.5 mb-4 pb-3 border-b ${
                darkMode ? 'border-slate-800' : 'border-slate-100'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  darkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'
                }`}
              >
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-base">Tambah Pengetahuan</h2>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Masukkan pertanyaan & jawaban baru
                </p>
              </div>
            </div>

            {pesanError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                {pesanError}
              </div>
            )}

            <form onSubmit={handleSimpan} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold mb-1 opacity-85">Kategori</label>
                <select
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                  className={`w-full rounded-xl border px-3 py-2 text-sm focus:outline-none ${inputClass}`}
                >
                  <option value="Kesehatan Mental">Kesehatan Mental</option>
                  <option value="Finansial Gen Z">Finansial Gen Z</option>
                  <option value="Produktivitas">Produktivitas</option>
                  <option value="Karir & Magang">Karir & Magang</option>
                  <option value="Digital Lifestyle">Digital Lifestyle</option>
                  <option value="Kuliah & Belajar">Kuliah & Belajar</option>
                  <option value="Pengembangan Diri">Pengembangan Diri</option>
                  <option value="Umum">Umum</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 opacity-85">
                  Contoh Pertanyaan
                </label>
                <input
                  type="text"
                  value={contohTanya}
                  onChange={(e) => setContohTanya(e.target.value)}
                  placeholder="Misal: Gimana cara mengatasi imposter syndrome?"
                  className={`w-full rounded-xl border px-3 py-2 text-sm focus:outline-none ${inputClass}`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 opacity-85">
                  Kata Kunci <span className="font-normal opacity-60">(pisahkan dengan koma)</span>
                </label>
                <input
                  type="text"
                  value={kataKunci}
                  onChange={(e) => setKataKunci(e.target.value)}
                  placeholder="Misal: imposter, ragu, percaya diri, minder"
                  className={`w-full rounded-xl border px-3 py-2 text-sm focus:outline-none ${inputClass}`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 opacity-85">Jawaban Bot</label>
                <textarea
                  rows={4}
                  value={jawaban}
                  onChange={(e) => setJawaban(e.target.value)}
                  placeholder="Tulis jawaban yang akan ditampilkan bot..."
                  className={`w-full rounded-xl border px-3 py-2 text-sm focus:outline-none ${inputClass}`}
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition shadow-sm"
              >
                <Database className="w-4 h-4" />
                Simpan Data
              </button>
            </form>
          </div>
        </div>

        {/* Daftar Pengetahuan Tersimpan */}
        <div className="lg:col-span-7 space-y-4">
          <div className={`rounded-2xl border p-4 shadow-sm space-y-3 ${cardClass}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={kataCari}
                  onChange={(e) => setKataCari(e.target.value)}
                  placeholder="Cari pertanyaan atau kata kunci..."
                  className={`w-full pl-9 pr-3 py-2 rounded-xl border text-sm focus:outline-none ${inputClass}`}
                />
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  title="Import database dari file JSON"
                  className={`inline-flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-medium border transition ${
                    darkMode
                      ? 'text-slate-300 border-slate-700 hover:bg-slate-800'
                      : 'text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Import</span>
                </button>

                <button
                  onClick={handleExportJson}
                  title="Export database ke file JSON"
                  className={`inline-flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-medium border transition ${
                    darkMode
                      ? 'text-slate-300 border-slate-700 hover:bg-slate-800'
                      : 'text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export</span>
                </button>

                <button
                  onClick={onResetKnowledge}
                  title="Kembalikan ke data bawaan"
                  className={`inline-flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-medium border transition ${
                    darkMode
                      ? 'text-slate-300 border-slate-700 hover:bg-slate-800'
                      : 'text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {daftarKategori.map((kat) => (
                <button
                  key={kat}
                  onClick={() => setFilterKategori(kat)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                    filterKategori === kat
                      ? 'bg-indigo-600 text-white'
                      : darkMode
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {kat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {dataTersaring.map((item) => (
              <div
                key={item.id}
                className={`rounded-2xl border p-4 shadow-sm transition ${
                  darkMode
                    ? 'bg-slate-900 border-slate-800 hover:border-indigo-500/40'
                    : 'bg-white border-slate-200 hover:border-indigo-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      darkMode ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-50 text-indigo-700'
                    }`}
                  >
                    <Tag className="w-3 h-3" />
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onTestQuestion(item.questionExample)}
                      className={`text-xs font-medium px-2.5 py-1 rounded-lg transition ${
                        darkMode
                          ? 'text-emerald-300 bg-emerald-500/15 hover:bg-emerald-500/25'
                          : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                      }`}
                    >
                      Coba Tanya
                    </button>
                    {item.id.startsWith('user-data-') && (
                      <button
                        onClick={() => onDeleteKnowledge(item.id)}
                        title="Hapus item"
                        className="p-1.5 text-rose-400 hover:bg-rose-500/15 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <h3 className="font-bold text-sm sm:text-base mb-1.5">{item.questionExample}</h3>
                <p
                  className={`text-xs sm:text-sm line-clamp-3 whitespace-pre-line mb-3 ${
                    darkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {item.answer}
                </p>

                <div
                  className={`flex flex-wrap items-center gap-1.5 pt-2 border-t ${
                    darkMode ? 'border-slate-800' : 'border-slate-100'
                  }`}
                >
                  <span className="text-[11px] text-slate-400">Kata kunci:</span>
                  {item.keywords.map((kw, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-0.5 rounded-md font-mono text-[11px] ${
                        darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Halaman penjelasan struktur proyek untuk bahan presentasi
function PanduanView({ onSwitchToChat, darkMode }) {
  const [copiedId, setCopiedId] = useState(null);

  const salinKode = (id, teks) => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(teks);
    } else {
      const el = document.createElement('textarea');
      el.value = teks;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const perintahInstall = `npm create -y vite@latest edubot -- --template react
cd edubot
npm install
npm install lucide-react tailwindcss @tailwindcss/vite
npm run dev`;

  const contohLogika = `function hitungSkorKecocokan(inputUser, keywords) {
  const teks = inputUser.toLowerCase();
  let skor = 0;

  keywords.forEach((kw) => {
    if (teks.includes(kw.toLowerCase())) {
      skor += kw.includes(' ') ? 5 : 3;
    }
  });

  return skor;
}`;

  const cardClass = darkMode
    ? 'bg-slate-900 border-slate-800 text-slate-100'
    : 'bg-white border-slate-200 text-slate-800';

  return (
    <div
      className={`flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 ${
        darkMode ? 'bg-slate-950' : 'bg-slate-50'
      }`}
    >
      <div className="max-w-4xl mx-auto space-y-6 pb-10">
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 sm:p-8 text-white shadow-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-medium mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Catatan Proyek & Struktur Kode</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Struktur Aplikasi EduBot</h2>
          <p className="text-indigo-100 text-sm sm:text-base max-w-2xl">
            EduBot adalah chatbot edukasi dan lifestyle untuk Gen Z yang dibangun menggunakan React dan Tailwind CSS, lengkap dengan respons kontekstual adaptif, efek streaming teks, voice input & text-to-speech, timer fokus Pomodoro, serta manajemen pengetahuan mandiri.
          </p>
          <button
            onClick={onSwitchToChat}
            className="mt-5 inline-flex items-center gap-2 bg-white text-indigo-600 font-semibold px-4 py-2.5 rounded-xl text-sm hover:bg-indigo-50 transition shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            Kembali ke Chat
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-5 rounded-xl border shadow-sm ${cardClass}`}>
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                darkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'
              }`}
            >
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold mb-1">1. Pembagian Komponen</h3>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Tampilan dibagi menjadi komponen <code className="text-indigo-400 font-mono">App</code>,{' '}
              <code className="text-indigo-400 font-mono">ChatMessage</code>,{' '}
              <code className="text-indigo-400 font-mono">LatihBotView</code>, dan{' '}
              <code className="text-indigo-400 font-mono">PanduanView</code> agar kode modular.
            </p>
          </div>

          <div className={`p-5 rounded-xl border shadow-sm ${cardClass}`}>
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                darkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
              }`}
            >
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold mb-1">2. Pencocokan Kata Kunci & Gaya Bahasa</h3>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Input pengguna dihitung skor kecocokannya terhadap kata kunci dan dapat diformat ke mode{' '}
              <strong>Santai Gen Z</strong>, <strong>Ringkas</strong>, atau{' '}
              <strong>Terstruktur</strong>.
            </p>
          </div>

          <div className={`p-5 rounded-xl border shadow-sm ${cardClass}`}>
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                darkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-600'
              }`}
            >
              <Database className="w-5 h-5" />
            </div>
            <h3 className="font-bold mb-1">3. Penyimpanan LocalStorage & JSON</h3>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Data baru di tab <strong>Latih Bot</strong>, jawaban favorit, riwayat obrolan, dan
              tema tersimpan di <code className="text-amber-400 font-mono">localStorage</code> serta
              bisa di-export/import sebagai <code className="text-amber-400 font-mono">.json</code>.
            </p>
          </div>

          <div className={`p-5 rounded-xl border shadow-sm ${cardClass}`}>
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
              }`}
            >
              <Code className="w-5 h-5" />
            </div>
            <h3 className="font-bold mb-1">4. Fitur Interaktif & Produktivitas</h3>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Mendukung kalkulator budget 50/30/20, kalkulator matematika, dikte suara & Text-to-Speech,
              Timer Fokus Pomodoro, serta ekspor transkrip{' '}
              <code className="text-blue-400 font-mono">.txt</code>.
            </p>
          </div>
        </div>

        <div className={`rounded-2xl border p-6 shadow-sm space-y-5 ${cardClass}`}>
          <h3
            className={`text-lg font-bold border-b pb-3 ${
              darkMode ? 'border-slate-800' : 'border-slate-100'
            }`}
          >
            Instalasi & Cuplikan Logika
          </h3>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold opacity-90">
                1. Setup Proyek di Terminal VS Code
              </span>
              <button
                onClick={() => salinKode('install', perintahInstall)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 bg-indigo-500/15 px-2.5 py-1 rounded-md transition"
              >
                {copiedId === 'install' ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                {copiedId === 'install' ? 'Tersalin' : 'Salin'}
              </button>
            </div>
            <pre className="bg-slate-950 text-slate-100 border border-slate-800 p-4 rounded-xl text-xs sm:text-sm font-mono overflow-x-auto">
              {perintahInstall}
            </pre>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold opacity-90">
                2. Fungsi Hitung Skor Kata Kunci
              </span>
              <button
                onClick={() => salinKode('algo', contohLogika)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 bg-indigo-500/15 px-2.5 py-1 rounded-md transition"
              >
                {copiedId === 'algo' ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                {copiedId === 'algo' ? 'Tersalin' : 'Salin'}
              </button>
            </div>
            <pre className="bg-slate-950 text-slate-100 border border-slate-800 p-4 rounded-xl text-xs sm:text-sm font-mono overflow-x-auto">
              {contohLogika}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('chat');

  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(darkMode));
    } catch {
      // Abaikan jika storage penuh
    }
  }, [darkMode]);

  const [knowledgeBase, setKnowledgeBase] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : DATA_AWAL;
    } catch {
      return DATA_AWAL;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(knowledgeBase));
    } catch {
      // Abaikan jika storage penuh atau diblokir
    }
  }, [knowledgeBase]);

  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(CHAT_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Abaikan jika storage penuh
    }
  }, [messages]);

  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [gayaBahasa, setGayaBahasa] = useState('santai');
  const [cardOffset, setCardOffset] = useState(0);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchChatQuery, setSearchChatQuery] = useState('');
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);
  const [copiedMsgId, setCopiedMsgId] = useState(null);

  // State untuk Mini Pomodoro Focus Timer (25 menit fokus / 5 menit istirahat)
  const [pomodoroMode, setPomodoroMode] = useState('focus'); // 'focus' | 'break'
  const [pomodoroSeconds, setPomodoroSeconds] = useState(25 * 60);
  const [pomodoroRunning, setPomodoroRunning] = useState(false);

  const bottomRef = useRef(null);
  const streamTimerRef = useRef(null);
  const recognitionRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (activeTab === 'chat' && !onlyBookmarked) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isStreaming, activeTab, onlyBookmarked]);

  // Auto-resize kolom input saat mengetik teks panjang
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [inputText]);

  // Logika hitung mundur Pomodoro
  useEffect(() => {
    if (!pomodoroRunning) return;

    const timer = setInterval(() => {
      setPomodoroSeconds((prev) => {
        if (prev <= 1) {
          setPomodoroRunning(false);
          putarNadaSelesai();
          const nextMode = pomodoroMode === 'focus' ? 'break' : 'focus';
          setPomodoroMode(nextMode);
          setToastMsg(
            pomodoroMode === 'focus'
              ? 'Sesi fokus selesai! Waktunya istirahat 5 menit.'
              : 'Istirahat selesai! Siap lanjut fokus 25 menit.'
          );
          setTimeout(() => setToastMsg(null), 2600);
          return nextMode === 'focus' ? 25 * 60 : 5 * 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [pomodoroRunning, pomodoroMode]);

  useEffect(() => {
    return () => {
      if (streamTimerRef.current) clearInterval(streamTimerRef.current);
      if (recognitionRef.current) recognitionRef.current.stop();
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  const tampilkanNotif = (teks) => {
    setToastMsg(teks);
    setTimeout(() => setToastMsg(null), 2600);
  };

  const formatTimer = (totalDetik) => {
    const menit = Math.floor(totalDetik / 60);
    const detik = totalDetik % 60;
    return `${String(menit).padStart(2, '0')}:${String(detik).padStart(2, '0')}`;
  };

  const gantiModePomodoro = () => {
    setPomodoroRunning(false);
    const nextMode = pomodoroMode === 'focus' ? 'break' : 'focus';
    setPomodoroMode(nextMode);
    setPomodoroSeconds(nextMode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const resetPomodoro = () => {
    setPomodoroRunning(false);
    setPomodoroSeconds(pomodoroMode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const hentikanSuaraBot = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingMsgId(null);
  };

  const toggleBacaPesan = (msg) => {
    if (!('speechSynthesis' in window)) {
      tampilkanNotif('Browser ini belum mendukung fitur baca suara');
      return;
    }

    if (speakingMsgId === msg.id) {
      hentikanSuaraBot();
      return;
    }

    window.speechSynthesis.cancel();
    const teksBersih = bersihkanMarkdownUntukSuara(msg.text);
    const utterance = new SpeechSynthesisUtterance(teksBersih);
    utterance.lang = 'id-ID';
    utterance.rate = 1.02;

    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);

    setSpeakingMsgId(msg.id);
    window.speechSynthesis.speak(utterance);
  };

  const hentikanStreaming = () => {
    if (streamTimerRef.current) {
      clearInterval(streamTimerRef.current);
      streamTimerRef.current = null;
    }
    setIsThinking(false);
    setIsStreaming(false);
  };

  const jalankanEfekKetik = (pesanBotId, teksPenuh) => {
    const potonganKata = teksPenuh.split(' ');
    let indeks = 0;

    if (streamTimerRef.current) clearInterval(streamTimerRef.current);

    streamTimerRef.current = setInterval(() => {
      indeks += 2;
      const teksSementara = potonganKata.slice(0, indeks).join(' ');

      setMessages((prev) =>
        prev.map((m) => (m.id === pesanBotId ? { ...m, text: teksSementara } : m))
      );

      if (indeks >= potonganKata.length) {
        clearInterval(streamTimerRef.current);
        streamTimerRef.current = null;
        setIsStreaming(false);
      }
    }, 35);
  };

  const kirimPesan = async (pertanyaanCepat = null, gayaOverride = null) => {
    const teks = (typeof pertanyaanCepat === 'string' ? pertanyaanCepat : inputText).trim();
    if (!teks || isStreaming || isThinking) return;

    hentikanSuaraBot();
    setOnlyBookmarked(false);

    const gayaAktif = gayaOverride || gayaBahasa;
    const waktuSekarang = new Date().toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const pesanUser = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: teks,
      timestamp: waktuSekarang
    };

    const riwayatSebelum = [...messages];
    setMessages((prev) => [...prev, pesanUser]);
    setInputText('');
    setIsThinking(true);

    const respon = await tanyaEduBotCerdas(teks, riwayatSebelum, knowledgeBase, gayaAktif);
    setIsThinking(false);

    const pesanBotId = `bot-${Date.now() + 1}`;
    const pesanBotAwal = {
      id: pesanBotId,
      role: 'bot',
      text: '',
      promptAsli: teks,
      meta: respon.meta,
      feedback: null,
      bookmarked: false,
      timestamp: new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    setMessages((prev) => [...prev, pesanBotAwal]);
    setIsStreaming(true);

    jalankanEfekKetik(pesanBotId, respon.text);
  };

  const ulangiJawabanBot = async (pesanBot) => {
    if (isStreaming || isThinking || !pesanBot.promptAsli) return;
    hentikanSuaraBot();
    setIsThinking(true);

    const indeksPesan = messages.findIndex((m) => m.id === pesanBot.id);
    const riwayatKonteks = indeksPesan > 0 ? messages.slice(0, indeksPesan - 1) : [];

    const responBaru = await tanyaEduBotCerdas(
      pesanBot.promptAsli,
      riwayatKonteks,
      knowledgeBase,
      gayaBahasa
    );

    setIsThinking(false);
    setIsStreaming(true);

    setMessages((prev) =>
      prev.map((m) =>
        m.id === pesanBot.id
          ? {
              ...m,
              text: '',
              meta: responBaru.meta,
              timestamp: new Date().toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit'
              })
            }
          : m
      )
    );

    jalankanEfekKetik(pesanBot.id, responBaru.text);
  };

  const beriFeedback = (id, jenis) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, feedback: m.feedback === jenis ? null : jenis } : m
      )
    );
  };

  const toggleBookmark = (id) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        const nextVal = !m.bookmarked;
        tampilkanNotif(nextVal ? 'Jawaban disimpan ke favorit' : 'Dihapus dari favorit');
        return { ...m, bookmarked: nextVal };
      })
    );
  };

  const toggleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      tampilkanNotif('Browser ini belum mendukung fitur input suara');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'id-ID';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      tampilkanNotif('Silakan bicara...');
    };

    recognition.onresult = (event) => {
      const hasilSuara = event.results[0][0].transcript;
      setInputText((prev) => (prev ? `${prev} ${hasilSuara}` : hasilSuara));
    };

    recognition.onerror = () => {
      setIsListening(false);
      tampilkanNotif('Gagal menangkap suara, coba lagi');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const unduhTranskripChat = () => {
    if (messages.length === 0) {
      tampilkanNotif('Belum ada percakapan untuk diunduh');
      return;
    }

    const isiFile = messages
      .map(
        (m) =>
          `[${m.timestamp}] ${m.role === 'user' ? 'Kamu' : 'EduBot'}:\n${m.text}\n`
      )
      .join('\n----------------------------------------\n\n');

    const blob = new Blob([`TRANSKRIP PERCAKAPAN EDUBOT\n\n${isiFile}`], {
      type: 'text/plain;charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `edubot-chat-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    tampilkanNotif('Transkrip chat diunduh');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      kirimPesan();
    }
  };

  const bersihkanChat = () => {
    hentikanStreaming();
    hentikanSuaraBot();
    setMessages([]);
    setSearchChatQuery('');
    setShowSearchBar(false);
    setOnlyBookmarked(false);
    tampilkanNotif('Obrolan baru dimulai');
  };

  const salinPesan = (id, text) => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
    } else {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopiedMsgId(id);
    tampilkanNotif('Teks disalin');
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const tambahData = (itemBaru) => {
    setKnowledgeBase((prev) => [itemBaru, ...prev]);
    tampilkanNotif('Data berhasil disimpan');
  };

  const importData = (itemsBaru) => {
    setKnowledgeBase((prev) => [...itemsBaru, ...prev]);
    tampilkanNotif(`${itemsBaru.length} topik berhasil diimpor`);
  };

  const hapusData = (id) => {
    setKnowledgeBase((prev) => prev.filter((item) => item.id !== id));
    tampilkanNotif('Data dihapus');
  };

  const resetData = () => {
    setKnowledgeBase(DATA_AWAL);
    tampilkanNotif('Data dikembalikan ke awal');
  };

  const ujiPertanyaan = (pertanyaan) => {
    setActiveTab('chat');
    setTimeout(() => {
      kirimPesan(pertanyaan);
    }, 100);
  };

  const acakKartuTopik = () => {
    setCardOffset((prev) => (prev + 4) % Math.max(1, knowledgeBase.length));
  };

  const kartuPembuka = Array.from({ length: Math.min(4, knowledgeBase.length) }, (_, i) => {
    return knowledgeBase[(cardOffset + i) % knowledgeBase.length];
  });

  const jumlahTersimpan = messages.filter((m) => m.bookmarked).length;

  const pesanDitampilkan = messages.filter((m) => {
    const lolosBookmark = !onlyBookmarked || m.bookmarked;
    const lolosCari =
      !searchChatQuery.trim() ||
      m.text.toLowerCase().includes(searchChatQuery.toLowerCase());
    return lolosBookmark && lolosCari;
  });

  return (
    <div
      className={`min-h-screen h-screen flex flex-col font-sans transition-colors ${
        darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-800'
      }`}
    >
      {toastMsg && (
        <div className="fixed top-20 right-4 z-50 bg-slate-800 text-white border border-slate-700 text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <header
        className={`border-b px-4 py-3 sm:px-6 shadow-sm z-10 transition-colors ${
          darkMode ? 'bg-slate-900/95 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-bold text-base sm:text-lg leading-tight">EduBot</h1>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Asisten Edukasi & Lifestyle Gen Z
                </p>
              </div>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? 'Ganti ke Light Mode' : 'Ganti ke Dark Mode'}
              className={`md:hidden p-2 rounded-xl border transition ${
                darkMode
                  ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div
              className={`flex items-center gap-1.5 p-1 rounded-xl overflow-x-auto flex-1 md:flex-initial ${
                darkMode ? 'bg-slate-800/90' : 'bg-slate-100'
              }`}
            >
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition ${
                  activeTab === 'chat'
                    ? darkMode
                      ? 'bg-slate-900 text-indigo-400 shadow-sm'
                      : 'bg-white text-indigo-600 shadow-sm'
                    : darkMode
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat</span>
              </button>

              <button
                onClick={() => setActiveTab('trainer')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition ${
                  activeTab === 'trainer'
                    ? darkMode
                      ? 'bg-slate-900 text-indigo-400 shadow-sm'
                      : 'bg-white text-indigo-600 shadow-sm'
                    : darkMode
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Database className="w-4 h-4" />
                <span>Latih Bot</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    darkMode
                      ? 'bg-indigo-500/20 text-indigo-300'
                      : 'bg-indigo-100 text-indigo-700'
                  }`}
                >
                  {knowledgeBase.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('tutorial')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition ${
                  activeTab === 'tutorial'
                    ? darkMode
                      ? 'bg-slate-900 text-indigo-400 shadow-sm'
                      : 'bg-white text-indigo-600 shadow-sm'
                    : darkMode
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Panduan</span>
              </button>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? 'Ganti ke Light Mode' : 'Ganti ke Dark Mode'}
              className={`hidden md:inline-flex p-2.5 rounded-xl border transition ${
                darkMode
                  ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Konten Utama */}
      {activeTab === 'trainer' ? (
        <LatihBotView
          knowledgeBase={knowledgeBase}
          onAddKnowledge={tambahData}
          onDeleteKnowledge={hapusData}
          onResetKnowledge={resetData}
          onImportKnowledge={importData}
          onTestQuestion={ujiPertanyaan}
          darkMode={darkMode}
        />
      ) : activeTab === 'tutorial' ? (
        <PanduanView onSwitchToChat={() => setActiveTab('chat')} darkMode={darkMode} />
      ) : (
        <main
          className={`flex-1 flex flex-col max-w-5xl w-full mx-auto overflow-hidden sm:my-4 sm:rounded-2xl sm:border sm:shadow-sm ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          {/* Toolbar Kontrol Chat */}
          <div
            className={`px-4 py-2.5 border-b flex flex-wrap items-center justify-between gap-2 ${
              darkMode
                ? 'bg-slate-900/80 border-slate-800'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex flex-wrap items-center gap-2">
              <div
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs ${
                  darkMode
                    ? 'bg-slate-800 border-slate-700 text-slate-300'
                    : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden sm:inline">Gaya:</span>
                <select
                  value={gayaBahasa}
                  onChange={(e) => setGayaBahasa(e.target.value)}
                  className="bg-transparent font-medium focus:outline-none cursor-pointer"
                >
                  <option value="santai" className={darkMode ? 'bg-slate-800' : 'bg-white'}>
                    Santai Gen Z
                  </option>
                  <option value="ringkas" className={darkMode ? 'bg-slate-800' : 'bg-white'}>
                    Ringkas
                  </option>
                  <option value="terstruktur" className={darkMode ? 'bg-slate-800' : 'bg-white'}>
                    Terstruktur
                  </option>
                </select>
              </div>

              {/* Mini Pomodoro Focus Timer */}
              <div
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs ${
                  pomodoroRunning
                    ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-300'
                    : darkMode
                    ? 'bg-slate-800 border-slate-700 text-slate-300'
                    : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                <Timer className="w-3.5 h-3.5 text-indigo-400" />
                <button
                  onClick={gantiModePomodoro}
                  title="Klik untuk ganti mode Fokus (25m) / Istirahat (5m)"
                  className="font-medium hover:text-indigo-400 transition"
                >
                  {pomodoroMode === 'focus' ? 'Fokus' : 'Jeda'}
                </button>
                <span className="font-mono font-semibold">{formatTimer(pomodoroSeconds)}</span>
                <button
                  onClick={() => setPomodoroRunning(!pomodoroRunning)}
                  title={pomodoroRunning ? 'Jeda timer' : 'Mulai timer'}
                  className="p-0.5 hover:text-indigo-400 transition"
                >
                  {pomodoroRunning ? (
                    <Pause className="w-3.5 h-3.5" />
                  ) : (
                    <Play className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  onClick={resetPomodoro}
                  title="Reset timer"
                  className="p-0.5 hover:text-rose-400 transition"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>

              <span
                className={`hidden lg:inline-flex items-center gap-1 text-xs ${
                  darkMode ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
                {knowledgeBase.length} topik aktif
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {jumlahTersimpan > 0 && (
                <button
                  onClick={() => setOnlyBookmarked(!onlyBookmarked)}
                  title="Tampilkan jawaban yang disimpan"
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                    onlyBookmarked
                      ? 'bg-amber-500 text-slate-950'
                      : darkMode
                      ? 'text-amber-300 bg-amber-500/15 hover:bg-amber-500/25'
                      : 'text-amber-700 bg-amber-50 hover:bg-amber-100'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5 fill-current" />
                  <span>{jumlahTersimpan}</span>
                </button>
              )}

              {messages.length > 0 && (
                <>
                  <button
                    onClick={() => {
                      setShowSearchBar(!showSearchBar);
                      setSearchChatQuery('');
                    }}
                    title="Cari pesan di obrolan"
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                      showSearchBar
                        ? 'bg-indigo-600 text-white'
                        : darkMode
                        ? 'text-slate-300 hover:bg-slate-800'
                        : 'text-slate-600 hover:bg-slate-200/70'
                    }`}
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Cari</span>
                  </button>

                  <button
                    onClick={unduhTranskripChat}
                    title="Unduh percakapan (.txt)"
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                      darkMode
                        ? 'text-slate-300 hover:bg-slate-800'
                        : 'text-slate-600 hover:bg-slate-200/70'
                    }`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Unduh</span>
                  </button>
                </>
              )}

              <button
                onClick={bersihkanChat}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-rose-400 hover:bg-rose-500/15 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset Chat</span>
              </button>
            </div>
          </div>

          {/* Bar Pencarian Dalam Chat */}
          {showSearchBar && (
            <div
              className={`px-4 py-2 border-b flex items-center gap-2 ${
                darkMode
                  ? 'bg-slate-800/60 border-slate-800'
                  : 'bg-indigo-50/60 border-slate-200'
              }`}
            >
              <Search className="w-4 h-4 text-indigo-400 shrink-0" />
              <input
                type="text"
                value={searchChatQuery}
                onChange={(e) => setSearchChatQuery(e.target.value)}
                placeholder="Ketik kata kunci untuk mencari di riwayat chat..."
                className="flex-1 bg-transparent text-xs sm:text-sm focus:outline-none"
                autoFocus
              />
              <button
                onClick={() => {
                  setShowSearchBar(false);
                  setSearchChatQuery('');
                }}
                className="p-1 text-slate-400 hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Area Percakapan atau Layar Pembuka */}
          <div
            className={`flex-1 overflow-y-auto p-4 sm:p-6 ${
              darkMode ? 'bg-slate-950/60' : 'bg-slate-50/50'
            }`}
          >
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center max-w-2xl mx-auto text-center py-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/25 mb-4">
                  <Bot className="w-8 h-8" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-2">
                  Halo! Mau bahas apa hari ini?
                </h2>
                <p
                  className={`text-xs sm:text-sm max-w-lg mb-6 leading-relaxed ${
                    darkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  Tanya seputar mental health, atur keuangan anak kos, tips magang, atau coba fitur cepat seperti{' '}
                  <code className="text-indigo-400 font-mono">budget 1500000</code> dan{' '}
                  <code className="text-indigo-400 font-mono">hitung 45 * 12</code>.
                </p>

                <div className="w-full flex items-center justify-between mb-2.5 px-1">
                  <span
                    className={`text-xs font-medium ${
                      darkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    Pilihan Topik Populer
                  </span>
                  <button
                    onClick={acakKartuTopik}
                    className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg transition ${
                      darkMode
                        ? 'text-indigo-300 bg-indigo-500/15 hover:bg-indigo-500/25'
                        : 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'
                    }`}
                  >
                    <Shuffle className="w-3.5 h-3.5" />
                    <span>Acak Topik</span>
                  </button>
                </div>

                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                  {kartuPembuka.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => kirimPesan(item.questionExample)}
                      className={`p-4 rounded-2xl border transition flex flex-col justify-between gap-2 group ${
                        darkMode
                          ? 'bg-slate-900/90 border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/80'
                          : 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40'
                      }`}
                    >
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-md w-fit ${
                          darkMode
                            ? 'bg-indigo-500/15 text-indigo-300'
                            : 'bg-indigo-50 text-indigo-600'
                        }`}
                      >
                        {item.category}
                      </span>
                      <p
                        className={`text-xs sm:text-sm font-medium leading-snug group-hover:text-indigo-400 transition ${
                          darkMode ? 'text-slate-200' : 'text-slate-700'
                        }`}
                      >
                        {item.questionExample}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {pesanDitampilkan.map((msg) => {
                  const isUser = msg.role === 'user';
                  const sedangDibaca = speakingMsgId === msg.id;

                  return (
                    <div
                      key={msg.id}
                      className={`flex items-start gap-3 ${
                        isUser ? 'flex-row-reverse' : 'flex-row'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                          isUser
                            ? 'bg-indigo-600 text-white'
                            : darkMode
                            ? 'bg-slate-800 border border-slate-700 text-indigo-400'
                            : 'bg-white border border-slate-200 text-indigo-600'
                        }`}
                      >
                        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-5 h-5" />}
                      </div>

                      <div
                        className={`max-w-[85%] sm:max-w-[76%] rounded-2xl px-4 py-3 shadow-xs ${
                          isUser
                            ? 'bg-indigo-600 text-white rounded-tr-none'
                            : darkMode
                            ? 'bg-slate-900 border border-slate-800 text-slate-100 rounded-tl-none'
                            : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                        }`}
                      >
                        {!isUser && msg.meta && (
                          <div
                            className={`flex flex-wrap items-center gap-1.5 mb-2 pb-1.5 border-b ${
                              darkMode ? 'border-slate-800' : 'border-slate-100'
                            }`}
                          >
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                                darkMode
                                  ? 'bg-slate-800 text-slate-300'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {msg.meta.category}
                            </span>
                            {msg.meta.confidence > 0 && (
                              <span
                                className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${
                                  darkMode
                                    ? 'bg-emerald-500/15 text-emerald-300'
                                    : 'bg-emerald-50 text-emerald-700'
                                }`}
                              >
                                Kecocokan: {msg.meta.confidence}%
                              </span>
                            )}
                            {msg.meta.adaptive && (
                              <span
                                className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-md ${
                                  darkMode
                                    ? 'bg-indigo-500/15 text-indigo-300'
                                    : 'bg-indigo-50 text-indigo-700'
                                }`}
                              >
                                <Sparkles className="w-2.5 h-2.5" />
                                Adaptif
                              </span>
                            )}
                          </div>
                        )}

                        {isUser ? (
                          <p className="text-sm sm:text-base whitespace-pre-line leading-relaxed">
                            {msg.text}
                          </p>
                        ) : (
                          <>
                            <ChatMessage text={msg.text || '...'} darkMode={darkMode} />

                            {/* Saran apabila pertanyaan belum ditemukan */}
                            {msg.meta?.suggestions && msg.meta.suggestions.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-1.5">
                                {msg.meta.suggestions.map((saran, i) => (
                                  <button
                                    key={i}
                                    onClick={() => kirimPesan(saran)}
                                    className={`text-xs px-3 py-1.5 rounded-xl border text-left transition ${
                                      darkMode
                                        ? 'bg-slate-800 border-slate-700 text-indigo-300 hover:border-indigo-500'
                                        : 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100'
                                    }`}
                                  >
                                    {saran}
                                  </button>
                                ))}
                              </div>
                            )}

                            {/* Topik lanjutan terkait */}
                            {!isStreaming &&
                              msg.meta?.followUps &&
                              msg.meta.followUps.length > 0 && (
                                <div
                                  className={`mt-3 pt-2.5 border-t space-y-1.5 ${
                                    darkMode ? 'border-slate-800/80' : 'border-slate-100'
                                  }`}
                                >
                                  <span className="block text-[11px] font-medium text-slate-400">
                                    Lanjut bahas:
                                  </span>
                                  <div className="flex flex-col gap-1.5">
                                    {msg.meta.followUps.map((topik, idx) => (
                                      <button
                                        key={idx}
                                        onClick={() => kirimPesan(topik)}
                                        className={`inline-flex items-center justify-between gap-2 text-xs px-3 py-1.5 rounded-xl border text-left transition ${
                                          darkMode
                                            ? 'bg-slate-800/70 border-slate-700/80 text-slate-300 hover:border-indigo-500/60 hover:text-indigo-300'
                                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-indigo-300 hover:text-indigo-700'
                                        }`}
                                      >
                                        <span className="line-clamp-1">{topik}</span>
                                        <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-70" />
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}
                          </>
                        )}

                        <div
                          className={`mt-2.5 pt-1.5 flex flex-wrap items-center justify-between gap-3 text-[11px] ${
                            isUser ? 'text-indigo-200' : 'text-slate-400'
                          }`}
                        >
                          <span>{msg.timestamp}</span>
                          {!isUser && (
                            <div className="flex flex-wrap items-center gap-2">
                              <button
                                onClick={() => toggleBacaPesan(msg)}
                                title={sedangDibaca ? 'Hentikan suara' : 'Bacakan jawaban'}
                                className={`inline-flex items-center gap-1 transition ${
                                  sedangDibaca
                                    ? 'text-indigo-400 font-semibold'
                                    : 'hover:text-indigo-400'
                                }`}
                              >
                                {sedangDibaca ? (
                                  <>
                                    <VolumeX className="w-3.5 h-3.5" />
                                    <span>Stop</span>
                                  </>
                                ) : (
                                  <>
                                    <Volume2 className="w-3.5 h-3.5" />
                                    <span>Dengar</span>
                                  </>
                                )}
                              </button>

                              <button
                                onClick={() => toggleBookmark(msg.id)}
                                title="Simpan jawaban favorit"
                                className={`p-1 rounded transition ${
                                  msg.bookmarked
                                    ? 'text-amber-400 bg-amber-500/15'
                                    : 'hover:text-amber-400'
                                }`}
                              >
                                <Bookmark
                                  className={`w-3 h-3 ${msg.bookmarked ? 'fill-current' : ''}`}
                                />
                              </button>

                              <button
                                onClick={() => beriFeedback(msg.id, 'up')}
                                title="Jawaban membantu"
                                className={`p-1 rounded transition ${
                                  msg.feedback === 'up'
                                    ? 'text-emerald-400 bg-emerald-500/15'
                                    : 'hover:text-indigo-400'
                                }`}
                              >
                                <ThumbsUp className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => beriFeedback(msg.id, 'down')}
                                title="Kurang sesuai"
                                className={`p-1 rounded transition ${
                                  msg.feedback === 'down'
                                    ? 'text-rose-400 bg-rose-500/15'
                                    : 'hover:text-rose-400'
                                }`}
                              >
                                <ThumbsDown className="w-3 h-3" />
                              </button>
                              {msg.promptAsli && (
                                <button
                                  onClick={() => ulangiJawabanBot(msg)}
                                  title="Buat ulang sesuai gaya bahasa terpilih"
                                  className="inline-flex items-center gap-1 hover:text-indigo-400 transition"
                                >
                                  <RefreshCw className="w-3 h-3" />
                                  <span>Ulangi</span>
                                </button>
                              )}
                              <button
                                onClick={() => salinPesan(msg.id, msg.text)}
                                className="inline-flex items-center gap-1 hover:text-indigo-400 transition"
                              >
                                {copiedMsgId === msg.id ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-400" />
                                    <span className="text-emerald-400">Tersalin</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Salin</span>
                                  </>
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {isThinking && (
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                        darkMode
                          ? 'bg-slate-800 border border-slate-700 text-indigo-400'
                          : 'bg-white border border-slate-200 text-indigo-600'
                      }`}
                    >
                      <Bot className="w-5 h-5 animate-pulse" />
                    </div>
                    <div
                      className={`rounded-2xl rounded-tl-none px-4 py-3 text-xs sm:text-sm border flex items-center gap-2 ${
                        darkMode
                          ? 'bg-slate-900 border-slate-800 text-slate-300'
                          : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      <span className="inline-flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" />
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:150ms]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:300ms]" />
                      </span>
                      <span>EduBot sedang menyusun jawaban...</span>
                    </div>
                  </div>
                )}

                <div ref={bottomRef} />
              </div>
            )}
          </div>

          {/* Form Input Pesan */}
          <div
            className={`p-3 sm:p-4 border-t ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                kirimPesan();
              }}
              className="flex items-end gap-2 sm:gap-2.5"
            >
              <button
                type="button"
                onClick={toggleVoiceInput}
                title={isListening ? 'Hentikan rekaman suara' : 'Ketik dengan suara'}
                className={`p-3 rounded-xl border transition shrink-0 ${
                  isListening
                    ? 'bg-rose-500/20 border-rose-500 text-rose-400 animate-pulse'
                    : darkMode
                    ? 'bg-slate-800 border-slate-700 text-slate-300 hover:border-indigo-500 hover:text-indigo-400'
                    : 'bg-slate-50 border-slate-300 text-slate-600 hover:border-indigo-500 hover:text-indigo-600'
                }`}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <textarea
                ref={textareaRef}
                rows={1}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tanya EduBot, ketik 'budget 1500000', atau 'hitung 125 * 8'..."
                className={`flex-1 resize-none rounded-xl border px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition ${
                  darkMode
                    ? 'border-slate-700 bg-slate-800/90 text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:bg-slate-800'
                    : 'border-slate-300 bg-slate-50 text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:bg-white'
                }`}
              />

              {isStreaming ? (
                <button
                  type="button"
                  onClick={hentikanStreaming}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 transition shrink-0"
                >
                  <Square className="w-4 h-4 fill-current" />
                  <span className="hidden sm:inline">Stop</span>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!inputText.trim() || isThinking}
                  className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-sm transition shrink-0 ${
                    darkMode
                      ? 'bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500'
                      : 'bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300'
                  } disabled:cursor-not-allowed`}
                >
                  <span className="hidden sm:inline">Kirim</span>
                  <Send className="w-4 h-4" />
                </button>
              )}
            </form>
          </div>
        </main>
      )}
    </div>
  );
}