import type { Localized } from "@/i18n/types";

/* ------------------------------------------------------------------
 * ✏️  EDIT YOUR CONTENT HERE
 * Every text has an English (en) and Indonesian (id) version.
 * Images live in /public/img — reference them as "/img/…".
 * ------------------------------------------------------------------ */

export const profile = {
  name: "Walid Fernando Sastriana",
  degree: "S.Kom",
  logo: "/img/WFS-logo.png",
  photo: "/img/profile.jpg",
  emails: ["walid.sastriana@binus.ac.id", "walidfernando21@gmail.com"],
  primaryEmail: "walid.sastriana@binus.ac.id",
  /** TODO: complete your number, e.g. "+62 812-3456-7890" — the WhatsApp button activates automatically */
  phone: "+62",
  cvUrl:
    "https://drive.google.com/drive/folders/1SXhNqLfpVLrmgzmWGtGzDaLlMAKv6VJ9?usp=sharing",
  location: {
    en: "Bojong Gede, Bogor Regency, Indonesia.",
    id: "Bojong Gede, Kabupaten Bogor, Indonesia.",
  } satisfies Localized,
  socials: {
    linkedin: "https://www.linkedin.com/in/walid-fernando-sastriana-6a0290233/",
    instagram: "https://instagram.com/liddddd_14",
    facebook: "https://www.facebook.com/walid.fernando.s",
  },
};

export const roles: Localized<string[]> = {
  en: ["UI/UX Designer", "Web Development", "Data Analyst"],
  id: ["Desainer UI/UX", "Pengembangan Web", "Analis Data"],
};

/** Greetings that rotate in the hero (the first one follows the active language) */
export const greetings = [
  "Hello",
  "Halo",
  "مرحباً",
  "Hola",
  "Bonjour",
  "Olá",
  "Konnichiwa",
  "Nǐ hǎo",
  "Hallo",
  "안녕하세요",
  "Namaste",
  "Привет",
];

export const aboutParagraphs: Localized<string[]> = {
  en: [
    "Hello! My name is Walid Fernando Sastriana, S.Kom. I am a fresh graduate with a Bachelor's degree in Computer Science from Bina Nusantara University. My interest in computer technology since childhood has guided me through an exciting academic journey, allowing me to continuously deepen my knowledge, explore various aspects of technology, and strengthen my skills along the way.",
    "I am currently working as a contract employee at the Directorate General of Sea Transportation, Ministry of Transportation of the Republic of Indonesia, serving as a Data Processing Staff. In this role, I am responsible for supporting data management and digital information processes within the organization. This position allows me to apply the knowledge I gained during my studies to real-world scenarios while further developing my professional experience in data processing and information systems.",
    "During my time in university, I was actively involved in several extracurricular activities, including the Islamic Spiritual Organization, where I learned the importance of teamwork, collaboration, and collective problem-solving. I enjoy exchanging insights, learning from others, and working together to build meaningful solutions.",
    "Beyond the professional and academic environment, I also have a strong interest in photography, which I believe plays an important role in creativity and personal growth.",
    "I created this portfolio to share my journey, projects, and achievements. If you would like to connect, collaborate, or share ideas, please feel free to reach out anytime. Let's explore opportunities and create positive change together! Thank you.",
  ],
  id: [
    "Halo! Nama saya Walid Fernando Sastriana, S.Kom. Saya adalah lulusan baru (fresh graduate) Sarjana Ilmu Komputer dari Universitas Bina Nusantara. Ketertarikan saya pada teknologi komputer sejak kecil telah membimbing saya melalui perjalanan akademik yang menarik, yang memungkinkan saya untuk terus memperdalam pengetahuan, mengeksplorasi berbagai aspek teknologi, dan memperkuat keterampilan saya.",
    "Saat ini saya bekerja sebagai pegawai kontrak di Direktorat Jenderal Perhubungan Laut, Kementerian Perhubungan Republik Indonesia, sebagai Staf Pengolah Data. Dalam peran ini, saya bertanggung jawab mendukung pengelolaan data dan proses informasi digital di lingkungan organisasi. Posisi ini memungkinkan saya menerapkan ilmu yang saya peroleh selama kuliah ke dalam situasi nyata, sekaligus mengembangkan pengalaman profesional di bidang pengolahan data dan sistem informasi.",
    "Selama masa kuliah, saya aktif dalam beberapa kegiatan ekstrakurikuler, termasuk Organisasi Kerohanian Islam, tempat saya belajar tentang pentingnya kerja sama tim, kolaborasi, dan pemecahan masalah secara bersama. Saya senang bertukar wawasan, belajar dari orang lain, dan bekerja sama untuk membangun solusi yang bermakna.",
    "Di luar lingkungan profesional dan akademik, saya juga memiliki minat yang besar pada fotografi, yang saya yakini berperan penting dalam kreativitas dan pengembangan diri.",
    "Saya membuat portofolio ini untuk berbagi perjalanan, proyek, dan pencapaian saya. Jika Anda ingin terhubung, berkolaborasi, atau bertukar ide, jangan ragu untuk menghubungi saya kapan saja. Mari bersama-sama menjelajahi peluang dan menciptakan perubahan positif! Terima kasih.",
  ],
};

export const quickFacts: {
  key: "degree" | "currently" | "studying" | "interests";
  value: Localized;
}[] = [
  {
    key: "degree",
    value: {
      en: "S.Kom — Computer Science, BINUS University",
      id: "S.Kom — Ilmu Komputer, Universitas Bina Nusantara",
    },
  },
  {
    key: "currently",
    value: {
      en: "Data Processing Staff, Directorate General of Sea Transportation",
      id: "Staf Pengolah Data, Direktorat Jenderal Perhubungan Laut",
    },
  },
  {
    key: "studying",
    value: {
      en: "Master of Administration (M.A), Institut STIAMI",
      id: "Magister Administrasi (M.A), Institut STIAMI",
    },
  },
  {
    key: "interests",
    value: {
      en: "Technology, Data, UI/UX & Photography",
      id: "Teknologi, Data, UI/UX & Fotografi",
    },
  },
];

/* ----------------------------- Education ----------------------------- */
export interface Education {
  school: Localized;
  level: Localized;
  program?: Localized;
  period: Localized;
  logo: string;
  current?: boolean;
}

export const education: Education[] = [
  {
    school: { en: "SMP Global Insani School", id: "SMP Global Insani School" },
    level: { en: "Junior High School", id: "Sekolah Menengah Pertama" },
    period: { en: "2015 – 2018", id: "2015 – 2018" },
    logo: "/img/global-insani-logo.png",
  },
  {
    school: {
      en: "SMK Penerbangan Angkasa Bogor",
      id: "SMK Penerbangan Angkasa Bogor",
    },
    level: { en: "Vocational High School", id: "Sekolah Menengah Kejuruan" },
    program: {
      en: "Airframe & Power Plant Engineering",
      id: "Teknik Airframe & Power Plant (Pesawat Udara)",
    },
    period: { en: "2018 – 2021", id: "2018 – 2021" },
    logo: "/img/smk-penerbangan-logo.png",
  },
  {
    school: {
      en: "Bina Nusantara University",
      id: "Universitas Bina Nusantara",
    },
    level: { en: "Bachelor's Degree (S1)", id: "Sarjana (S1)" },
    program: {
      en: "School of Computer Science (S.Kom)",
      id: "School of Computer Science — Ilmu Komputer (S.Kom)",
    },
    period: { en: "2021 – 2025", id: "2021 – 2025" },
    logo: "/img/binus-logo.png",
  },
  {
    school: { en: "Institut STIAMI Jakarta", id: "Institut STIAMI Jakarta" },
    level: { en: "Master's Degree (S2)", id: "Magister (S2)" },
    program: {
      en: "Master of Administration (M.A)",
      id: "Magister Administrasi (M.A)",
    },
    period: { en: "2026 – Present", id: "2026 – Sekarang" },
    logo: "/img/stiami.png",
    current: true,
  },
];

/* ------------------------------- Skills ------------------------------ */
export interface Skill {
  name: Localized;
  icon: string;
  category: Localized;
}

const frontend: Localized = { en: "Frontend", id: "Frontend" };
const backend: Localized = { en: "Backend", id: "Backend" };

export const skills: Skill[] = [
  {
    name: { en: "HTML", id: "HTML" },
    icon: "/img/skills/html.png",
    category: frontend,
  },
  {
    name: { en: "CSS", id: "CSS" },
    icon: "/img/skills/css.png",
    category: frontend,
  },
  {
    name: { en: "JavaScript", id: "JavaScript" },
    icon: "/img/skills/js.png",
    category: frontend,
  },
  {
    name: { en: "Python", id: "Python" },
    icon: "/img/skills/python.png",
    category: { en: "Data & AI", id: "Data & AI" },
  },
  {
    name: { en: "PHP", id: "PHP" },
    icon: "/img/skills/php.png",
    category: backend,
  },
  {
    name: { en: "React.js", id: "React.js" },
    icon: "/img/skills/react.png",
    category: frontend,
  },
  {
    name: { en: "Ms Office", id: "Ms Office" },
    icon: "/img/skills/office.png",
    category: { en: "Productivity", id: "Produktivitas" },
  },
  {
    name: { en: "MySQL", id: "MySQL" },
    icon: "/img/skills/mysql.png",
    category: { en: "Database", id: "Basis Data" },
  },
  {
    name: { en: "Laravel", id: "Laravel" },
    icon: "/img/skills/laravel.png",
    category: backend,
  },
  {
    name: { en: "Mechanical", id: "Mekanikal" },
    icon: "/img/skills/mechanic.png",
    category: { en: "Engineering", id: "Teknik" },
  },
  {
    name: { en: "Photography", id: "Fotografi" },
    icon: "/img/skills/photograph.png",
    category: { en: "Creative", id: "Kreatif" },
  },
];

/* ----------------------------- Experience ---------------------------- */
export interface Experience {
  role: Localized;
  org: Localized;
  period: Localized;
  type: Localized;
  logo: string;
  current?: boolean;
  points: Localized<string[]>;
}

export const experiences: Experience[] = [
  {
    role: { en: "Data Processing Staff", id: "Staf Pengolah Data" },
    org: {
      en: "Ministry of Transportation — Directorate General of Sea Transportation",
      id: "Kementerian Perhubungan — Direktorat Jenderal Perhubungan Laut",
    },
    period: { en: "September 2025 – Present", id: "September 2025 – Sekarang" },
    type: { en: "Contract", id: "Kontrak" },
    logo: "/img/KEMENHUB.png",
    current: true,
    points: {
      en: [
        "Conduct data collection, cleaning, and analysis of maritime transportation to support policy decisions, create dashboards, and provide insights for operational efficiency.",
      ],
      id: [
        "Melakukan pengumpulan, pembersihan, dan analisis data transportasi laut untuk mendukung pengambilan kebijakan, membuat dashboard, serta memberikan insight untuk efisiensi operasional.",
      ],
    },
  },
  {
    role: { en: "Certified Internship", id: "Magang Bersertifikat" },
    org: {
      en: "Bina Nusantara University — School of Computer Science",
      id: "Universitas Bina Nusantara — School of Computer Science",
    },
    period: {
      en: "September 2024 – February 2025",
      id: "September 2024 – Februari 2025",
    },
    type: { en: "Internship", id: "Magang" },
    logo: "/img/binus-logo.png",
    points: {
      en: [
        "Working on a project with the School of Computer Science department.",
      ],
      id: ["Mengerjakan proyek bersama departemen School of Computer Science."],
    },
  },
  {
    role: {
      en: "Enrichment Programs – Research Assistant",
      id: "Program Enrichment – Asisten Peneliti",
    },
    org: {
      en: "Bina Nusantara University — School of Computer Science",
      id: "Universitas Bina Nusantara — School of Computer Science",
    },
    period: {
      en: "February 2024 – July 2024",
      id: "Februari 2024 – Juli 2024",
    },
    type: { en: "Research", id: "Riset" },
    logo: "/img/binus-logo.png",
    points: {
      en: [
        "Analyzing regional malnutrition patterns among Indonesian infants using clustering techniques to support targeted nutritional interventions.",
      ],
      id: [
        "Menganalisis pola malnutrisi regional pada bayi di Indonesia menggunakan teknik clustering untuk mendukung intervensi gizi yang tepat sasaran.",
      ],
    },
  },
  {
    role: {
      en: "Junior Aircraft Technician (Certified Internship)",
      id: "Teknisi Pesawat Junior (Magang Bersertifikat)",
    },
    org: {
      en: "PT Garuda Maintenance Facility AeroAsia Tbk",
      id: "PT Garuda Maintenance Facility AeroAsia Tbk",
    },
    period: {
      en: "January 2020 – March 2020",
      id: "Januari 2020 – Maret 2020",
    },
    type: { en: "Internship", id: "Magang" },
    logo: "/img/gmf.jpg",
    points: {
      en: [
        "Conducting routine inspections on Airbus A330-200/300/900Neo and Boeing 777-400/737-Max aircraft to ensure optimal condition.",
        "Identifying and repairing technical issues with avionics, hydraulic systems, and engines.",
        "Ensuring compliance with international aviation safety standards and maintenance regulations.",
      ],
      id: [
        "Melakukan inspeksi rutin pada pesawat Airbus A330-200/300/900Neo dan Boeing 777-400/737-Max untuk memastikan kondisi optimal.",
        "Mengidentifikasi dan memperbaiki masalah teknis pada sistem avionik, hidrolik, dan mesin pesawat.",
        "Memastikan kepatuhan terhadap standar keselamatan penerbangan internasional dan regulasi perawatan pesawat.",
      ],
    },
  },
];

/* ------------------------------ Projects ----------------------------- */
export type ProjectCategory = "research" | "design" | "social";

export interface Project {
  id: string;
  category: ProjectCategory;
  title: Localized;
  summary: Localized;
  badge?: Localized;
  period: Localized;
  location: Localized;
  role: Localized;
  tools: string[];
  details: Localized<string[]>;
  link?: string;
  linkLabel?: Localized;
  image: string;
}

const paper = (title: string): Localized => ({
  en: `Title: “${title}”`,
  id: `Judul: “${title}”`,
});
const binus: Localized = {
  en: "Bina Nusantara University",
  id: "Universitas Bina Nusantara",
};
const ieee: Localized = {
  en: "View on IEEE Xplore",
  id: "Lihat di IEEE Xplore",
};
const figma: Localized = { en: "Open in Figma", id: "Buka di Figma" };

export const projects: Project[] = [
  {
    id: "simonkin",
    category: "design", // Anda bisa menggantinya menjadi "social" jika dirasa lebih cocok
    title: { en: "SIMONKIN", id: "SIMONKIN" },
    summary: {
      en: "System Monitoring Kinerja Internal (SIMONKIN) is a web-based internal performance monitoring system designed for the Data Processing Work Team at the Secretariat of the Directorate General of Sea Transportation.",
      id: "System Monitoring Kinerja Internal (SIMONKIN) adalah sistem pemantauan kinerja internal berbasis web yang dirancang untuk Tim Kerja Pengolahan Data di Sekretariat Direktorat Jenderal Perhubungan Laut.",
    },
    badge: { en: "Web App", id: "Aplikasi Web" },
    period: { en: "2026", id: "2026" }, // Silakan sesuaikan tahunnya jika berbeda
    location: {
      en: "Directorate General of Sea Transportation",
      id: "Direktorat Jenderal Perhubungan Laut",
    },
    role: { en: "Full-Stack Developer", id: "Full-Stack Developer" }, // Silakan sesuaikan peran Anda
    tools: ["Flask", "Python", "HTML", "CSS"], // Berdasarkan screenshot folder Anda sebelumnya
    details: {
      en: [
        "Developed a web-based system to monitor internal performance and manage employee tasks.",
        "Implemented features for meeting schedules, employee dispositions, and performance reports with evidence.",
        "Integrated a calendar system for events and reminders.",
        "Tailored the system specifically for the Data Processing Work Team under the Organization and Administration Bureau.",
      ],
      id: [
        "Mengembangkan sistem berbasis web untuk memantau kinerja internal dan mengelola tugas pegawai.",
        "Mengimplementasikan fitur jadwal rapat, disposisi pegawai, serta laporan status kinerja beserta bukti.",
        "Mengintegrasikan sistem kalender untuk event dan pengingat.",
        "Menyesuaikan sistem secara khusus untuk Tim Kerja Pengolahan Data di bawah Bagian Organisasi dan Tata Laksana.",
      ],
    },
    link: "https://tinyurl.com/SIMONKIN",
    linkLabel: { en: "View Live App", id: "Lihat Aplikasi" },
    image: "/img/simonkin.png", // Pastikan Anda menambahkan gambar logo/UI SIMONKIN ke folder public/img dengan nama ini
  },
  {
    id: "thesis-xray",
    category: "research",
    title: {
      en: "Thesis Scientific Article (Scopus Indexed)",
      id: "Artikel Ilmiah Skripsi (Terindeks Scopus)",
    },
    summary: paper(
      "Late Fusion Approach for X-Ray Detection Using Frequency Domain Features DWT, SIFT, and LBP with SVM Model",
    ),
    badge: { en: "Scopus Indexed", id: "Terindeks Scopus" },
    period: { en: "April 2025 – August 2025", id: "April 2025 – Agustus 2025" },
    location: binus,
    role: { en: "Student", id: "Mahasiswa" },
    tools: ["Python"],
    details: {
      en: [
        "Proposed a Late Fusion method for detecting X-Ray images by combining multiple feature types.",
        "Utilized Discrete Wavelet Transform (DWT) to extract frequency domain information.",
        "Implemented Scale-Invariant Feature Transform (SIFT) to detect and represent stable feature points in images.",
        "Applied Local Binary Pattern (LBP) as a texture descriptor.",
        "Trained and tested the model using Support Vector Machine (SVM) as the main classifier.",
        "This approach improved the classification accuracy of X-Ray images into two categories: fracture and non-fracture.",
        "Demonstrated that feature fusion at the late stage outperforms single-feature approaches.",
      ],
      id: [
        "Mengusulkan metode Late Fusion untuk mendeteksi citra X-Ray dengan menggabungkan beberapa jenis fitur.",
        "Memanfaatkan Discrete Wavelet Transform (DWT) untuk mengekstraksi informasi domain frekuensi.",
        "Menerapkan Scale-Invariant Feature Transform (SIFT) untuk mendeteksi dan merepresentasikan titik fitur yang stabil pada citra.",
        "Menggunakan Local Binary Pattern (LBP) sebagai deskriptor tekstur.",
        "Melatih dan menguji model menggunakan Support Vector Machine (SVM) sebagai classifier utama.",
        "Pendekatan ini meningkatkan akurasi klasifikasi citra X-Ray ke dalam dua kategori: fraktur dan non-fraktur.",
        "Membuktikan bahwa penggabungan fitur pada tahap akhir (late fusion) lebih unggul dibandingkan pendekatan fitur tunggal.",
      ],
    },
    image: "/img/Thesis.png",
  },
  {
    id: "paper-meta-classifier",
    category: "research",
    title: { en: "Scientific Paper", id: "Makalah Ilmiah" },
    summary: paper(
      "Meta-Classifier Approach to Facial Expression Recognition Using DWT-Based Feature Extraction",
    ),
    badge: { en: "IEEE Xplore", id: "IEEE Xplore" },
    period: {
      en: "December 2024 – January 2025",
      id: "Desember 2024 – Januari 2025",
    },
    location: {
      en: "International Conference on Computer Sciences, Engineering, and Technology Innovation 2025 (ICOCSETI 2025)",
      id: "International Conference on Computer Sciences, Engineering, and Technology Innovation 2025 (ICOCSETI 2025)",
    },
    role: { en: "Researcher / Author", id: "Peneliti / Penulis" },
    tools: ["Python"],
    details: {
      en: [
        "Conducted experiments on Facial Expression Recognition using the CK+48 dataset.",
        "Performed data analysis using machine learning methods and models to evaluate accuracy.",
        "Authored and published a paper at the ICOCSETI 2025 Conference based on the experimental results.",
      ],
      id: [
        "Melakukan eksperimen Facial Expression Recognition menggunakan dataset CK+48.",
        "Melakukan analisis data menggunakan metode dan model machine learning untuk mengevaluasi akurasi.",
        "Menulis dan memublikasikan makalah pada Konferensi ICOCSETI 2025 berdasarkan hasil eksperimen.",
      ],
    },
    link: "https://ieeexplore.ieee.org/document/11020511",
    linkLabel: ieee,
    image: "/img/MataClassifier.png",
  },
  {
    id: "paper-late-fusion-fer",
    category: "research",
    title: { en: "Scientific Paper", id: "Makalah Ilmiah" },
    summary: paper(
      "Late Fusion Approach for Facial Expression Recognition Using HOG, LBP, and DWT Features with SVM",
    ),
    badge: { en: "IEEE Xplore", id: "IEEE Xplore" },
    period: {
      en: "October 2024 – December 2024",
      id: "Oktober 2024 – Desember 2024",
    },
    location: {
      en: "Beyond Technology Summit on Informatics International Conference 2024 (BTS-I2C 2024)",
      id: "Beyond Technology Summit on Informatics International Conference 2024 (BTS-I2C 2024)",
    },
    role: { en: "Researcher / Author", id: "Peneliti / Penulis" },
    tools: ["Python"],
    details: {
      en: [
        "Conducted experiments on Facial Expression Recognition using the CK+48 dataset.",
        "Performed analysis using machine learning methods and models to measure experimental accuracy.",
        "Presented the research findings at the BTS-I2C International Conference.",
      ],
      id: [
        "Melakukan eksperimen Facial Expression Recognition menggunakan dataset CK+48.",
        "Melakukan analisis menggunakan metode dan model machine learning untuk mengukur akurasi eksperimen.",
        "Mempresentasikan hasil penelitian pada Konferensi Internasional BTS-I2C.",
      ],
    },
    link: "https://ieeexplore.ieee.org/document/10941791",
    linkLabel: ieee,
    image: "/img/LateFusion.png",
  },
  {
    id: "ticktake",
    category: "design",
    title: { en: "TickTake", id: "TickTake" },
    summary: {
      en: "TickTake is a concert ticket booking platform that helps concert fans discover and purchase their favorite concert tickets quickly, safely, and easily.",
      id: "TickTake adalah platform pemesanan tiket konser yang membantu para penggemar konser menemukan dan membeli tiket konser favorit mereka dengan cepat, aman, dan mudah.",
    },
    badge: { en: "Web App", id: "Aplikasi Web" },
    period: {
      en: "September 2023 – January 2024",
      id: "September 2023 – Januari 2024",
    },
    location: binus,
    role: {
      en: "UI/UX Designer & Front-End Developer",
      id: "Desainer UI/UX & Front-End Developer",
    },
    tools: ["Figma", "Laravel"],
    details: {
      en: [
        "Implemented user interface designs using HTML, CSS, and JavaScript.",
        "Built interactive components using the Laravel front-end framework.",
        "Developed prototypes with design tools such as Figma.",
      ],
      id: [
        "Mengimplementasikan desain antarmuka pengguna menggunakan HTML, CSS, dan JavaScript.",
        "Membangun komponen interaktif menggunakan framework Laravel di sisi front-end.",
        "Mengembangkan prototipe menggunakan tools desain seperti Figma.",
      ],
    },
    link: "https://www.figma.com/design/4tJke98tWn5BAoINVAKT8y/WEB-PROGRAMMING?node-id=0-1&m=dev&t=vrIf9qzPYiAP0abk-1",
    linkLabel: figma,
    image: "/img/ticktake.png",
  },
  {
    id: "pawpals",
    category: "design",
    title: { en: "PawPals", id: "PawPals" },
    summary: {
      en: "PawPals is a modern petshop website providing food, accessories, and premium services such as pet hotels, grooming, and animal care in one convenient platform.",
      id: "PawPals adalah website petshop modern yang menyediakan makanan, aksesori, dan layanan premium seperti pet hotel, grooming, dan perawatan hewan dalam satu platform yang praktis.",
    },
    badge: { en: "UI/UX", id: "UI/UX" },
    period: {
      en: "September 2023 – January 2024",
      id: "September 2023 – Januari 2024",
    },
    location: binus,
    role: { en: "UI/UX Designer", id: "Desainer UI/UX" },
    tools: ["Figma"],
    details: {
      en: ["Designed and developed interactive prototypes using Figma."],
      id: [
        "Merancang dan mengembangkan prototipe interaktif menggunakan Figma.",
      ],
    },
    link: "https://www.figma.com/design/kEluuLC68Jbz5SdYHnL1IG/PAWPALS?node-id=0-1&m=dev&t=fjqsWJCpPgC0SLFj-1",
    linkLabel: figma,
    image: "/img/pawpals.png",
  },
  {
    id: "character-building",
    category: "social",
    title: {
      en: "Character Building Religion Project",
      id: "Proyek Character Building Agama",
    },
    summary: {
      en: "A social project aimed at fostering tolerance among different religions through education and discussion in the school environment.",
      id: "Proyek sosial yang bertujuan menumbuhkan sikap toleransi antarumat beragama melalui edukasi dan diskusi di lingkungan sekolah.",
    },
    badge: { en: "Social Project", id: "Proyek Sosial" },
    period: { en: "2023", id: "2023" },
    location: { en: "SMP Negeri 40 Jakarta", id: "SMP Negeri 40 Jakarta" },
    role: { en: "Speaker & Documenter", id: "Pemateri & Dokumentator" },
    tools: ["MS Office"],
    details: {
      en: [
        "Delivered material on the importance of tolerance and interfaith harmony.",
        "Led interactive discussion sessions with students to deepen their understanding of diversity values.",
        "Documented all activities in photos and videos.",
        "Compiled a documentation report as an evaluation reference.",
      ],
      id: [
        "Menyampaikan materi tentang pentingnya toleransi dan kerukunan antarumat beragama.",
        "Memimpin sesi diskusi interaktif bersama siswa untuk memperdalam pemahaman tentang nilai-nilai keberagaman.",
        "Mendokumentasikan seluruh kegiatan dalam bentuk foto dan video.",
        "Menyusun laporan dokumentasi sebagai bahan evaluasi.",
      ],
    },
    image: "/img/CBagama.png",
  },
];

/* ---------------------------- Certificates --------------------------- */
export type CertificateCategory =
  | "competency"
  | "conference"
  | "training"
  | "seminar";

export interface Certificate {
  id: string;
  title: Localized;
  issuer?: string;
  category: CertificateCategory;
  image: string;
}

export const certificates: Certificate[] = [
  {
    id: "bnsp-digital-marketing",
    title: {
      en: "BNSP Certificate of Competence – Digital Marketing & AI",
      id: "Sertifikat Kompetensi BNSP – Digital Marketing & AI",
    },
    issuer: "BNSP",
    category: "competency",
    image: "/img/certificates/BNSP-DIGITALMARKETING.jpg",
  },
  {
    id: "bnsp-office-admin",
    title: {
      en: "BNSP Certificate of Competence – Office Administration",
      id: "Sertifikat Kompetensi BNSP – Administrasi Perkantoran",
    },
    issuer: "BNSP",
    category: "competency",
    image: "/img/certificates/BNSP-ADM PERKANTORAN.png",
  },
  {
    id: "icobar-2025",
    title: {
      en: "Certificate of International Conference Presentation – ICOBAR 2025 (SCOPUS Indexed)",
      id: "Sertifikat Presentasi Konferensi Internasional – ICOBAR 2025 (Terindeks SCOPUS)",
    },
    issuer: "ICOBAR 2025",
    category: "conference",
    image: "/img/certificates/Sertif-ICOBAR.png",
  },
  {
    id: "it-bootcamp",
    title: {
      en: "Certificate of Achievement – IT Bootcamp Program Front End Developer",
      id: "Sertifikat Prestasi – Program IT Bootcamp Front End Developer",
    },
    issuer: "IT Bootcamp",
    category: "training",
    image: "/img/certificates/ITBootcamp.png",
  },
  {
    id: "gmf-internship",
    title: {
      en: "Internship Certificate – Garuda Maintenance Facility AeroAsia Tbk.",
      id: "Sertifikat Magang – Garuda Maintenance Facility AeroAsia Tbk.",
    },
    issuer: "GMF AeroAsia",
    category: "training",
    image: "/img/certificates/SKGMF.png",
  },
  {
    id: "airframe-power-plant",
    title: {
      en: "Certificate of Competency – Airframe & Power Plant",
      id: "Sertifikat Kompetensi – Airframe & Power Plant",
    },
    category: "competency",
    image: "/img/certificates/airframe.png",
  },
  {
    id: "basic-survival",
    title: {
      en: "Certificate of Achievement – Basic Survival Training by Lanud Atang Sendjaja Bogor",
      id: "Sertifikat Prestasi – Pelatihan Dasar Survival oleh Lanud Atang Sendjaja Bogor",
    },
    issuer: "Lanud Atang Sendjaja",
    category: "training",
    image: "/img/certificates/basic-survival.png",
  },
  {
    id: "icocseti-2025",
    title: {
      en: "Certificate of International Conference Presentation – ICOCSETI 2025",
      id: "Sertifikat Presentasi Konferensi Internasional – ICOCSETI 2025",
    },
    issuer: "ICOCSETI 2025",
    category: "conference",
    image: "/img/certificates/icocseti-2025.png",
  },
  {
    id: "bts-i2c-2024",
    title: {
      en: "Certificate of International Conference Presentation – BTS-I2C 2024",
      id: "Sertifikat Presentasi Konferensi Internasional – BTS-I2C 2024",
    },
    issuer: "BTS-I2C 2024",
    category: "conference",
    image: "/img/certificates/BTS.png",
  },
  {
    id: "data-science-ai",
    title: {
      en: "Certificate of Completion – Data Science & AI, Specific Independent Study Track",
      id: "Sertifikat Penyelesaian – Data Science & AI, Program Studi Independen Spesifik",
    },
    issuer: "BINUS University",
    category: "training",
    image: "/img/certificates/binus-data-science.png",
  },
  {
    id: "cimb-public-speaking",
    title: {
      en: "Certificate of Participation – Public Speaking Seminar by CIMB Niaga",
      id: "Sertifikat Partisipasi – Seminar Public Speaking oleh CIMB Niaga",
    },
    issuer: "CIMB Niaga",
    category: "seminar",
    image: "/img/certificates/cimb-public-speaking.png",
  },
  {
    id: "bca-career",
    title: {
      en: "Certificate of Participation – Career Preparation Seminar by BCA",
      id: "Sertifikat Partisipasi – Seminar Persiapan Karier oleh BCA",
    },
    issuer: "BCA",
    category: "seminar",
    image: "/img/certificates/bca-career.png",
  },
  {
    id: "reddoorz-data",
    title: {
      en: "Certificate of Participation – Kickstart Your Career in Data Analytics Seminar by RedDoorz",
      id: "Sertifikat Partisipasi – Seminar Kickstart Your Career in Data Analytics oleh RedDoorz",
    },
    issuer: "RedDoorz",
    category: "seminar",
    image: "/img/certificates/reddoorz-data.png",
  },
  {
    id: "dana-communication",
    title: {
      en: "Certificate of Participation – Communication Skills Seminar by DANA",
      id: "Sertifikat Partisipasi – Seminar Keterampilan Komunikasi oleh DANA",
    },
    issuer: "DANA",
    category: "seminar",
    image: "/img/certificates/dana-communication.png",
  },
];

/* ----------------------------- Activities ---------------------------- */
export interface Activity {
  id: string;
  title: Localized;
  date: Localized;
  images: string[];
  description: Localized;
}

export const activities: Activity[] = [
  {
    id: "tilawah-2026",
    title: { en: "Tilawatil Qur'an", id: "Tilawatil Qur'an" },
    date: { en: "March 2026", id: "Maret 2026" },
    images: [
      "/img/activities/DSC00890.jpg",
      "/img/activities/DSC00888.jpg",
      "/img/activities/DSC00848.jpg",
      "/img/activities/DSC00833.jpg",
    ],
    description: {
      en: "Performed Quran recitation during the 'Santunan Anak Yatim' and 'Buka Puasa Bersama' event organized by the Bagian Organisasi dan Tata Laksana, Secretariat of the Directorate General of Sea Transportation.",
      id: "Membawakan tilawah Al-Qur'an pada acara Santunan Anak Yatim dan Buka Puasa Bersama yang diselenggarakan oleh Bagian Organisasi dan Tata Laksana, Sekretariat Direktorat Jenderal Perhubungan Laut.",
    },
  },
  {
    id: "virtual-event-2026",
    title: {
      en: "Virtual Event Technical Coordinator",
      id: "Koordinator Teknis Acara Virtual",
    },
    date: { en: "February 2026", id: "Februari 2026" },
    images: [
      "/img/activities/op.png",
      "/img/activities/op2.png",
      "/img/activities/op3.png",
    ],
    description: {
      en: "Served as the lead Zoom Meeting Operator for a high-level National Health Seminar featuring the Spouse of the Vice Minister of Transportation. Managed live streaming, participant coordination, and technical troubleshooting to ensure a seamless virtual experience for the Ministry's executive leadership and Dharma Wanita Persatuan members.",
      id: "Bertugas sebagai operator utama Zoom Meeting pada Seminar Kesehatan Nasional tingkat tinggi yang menghadirkan Istri Wakil Menteri Perhubungan. Mengelola siaran langsung, koordinasi peserta, dan penanganan kendala teknis untuk memastikan pengalaman virtual yang lancar bagi jajaran pimpinan Kementerian dan anggota Dharma Wanita Persatuan.",
    },
  },
  {
    id: "stranas-pk-2025",
    title: {
      en: "Socialization of Stranas PK Reporting",
      id: "Sosialisasi Pelaporan Stranas PK",
    },
    date: { en: "December 2025", id: "Desember 2025" },
    images: ["/img/activities/cilacap.jpeg"],
    description: {
      en: "Coordinated the socialization at KSOP Kelas II Cilacap and data collection for the National Anti-Corruption Strategy (Stranas PK) reporting within the Directorate General of Sea Transportation. This involved ensuring data compliance and integrity for the prevention of corruption in maritime services and port administration.",
      id: "Mengoordinasikan kegiatan sosialisasi di KSOP Kelas II Cilacap serta pengumpulan data untuk pelaporan Strategi Nasional Pencegahan Korupsi (Stranas PK) di lingkungan Direktorat Jenderal Perhubungan Laut. Kegiatan ini mencakup upaya memastikan kepatuhan dan integritas data untuk pencegahan korupsi pada layanan maritim dan administrasi pelabuhan.",
    },
  },
  {
    id: "tilawah-2025",
    title: { en: "Tilawatil Qur'an", id: "Tilawatil Qur'an" },
    date: { en: "August 2025", id: "Agustus 2025" },
    images: ["/img/activities/qori2.jpg", "/img/activities/qori1.jpg"],
    description: {
      en: "Performed Quran recitation during the joint prayer and Independence Day commemoration event at the Ministry of Transportation.",
      id: "Membawakan tilawah Al-Qur'an pada acara doa bersama dan peringatan Hari Kemerdekaan Republik Indonesia di Kementerian Perhubungan.",
    },
  },
  {
    id: "gmf-internship-2020",
    title: {
      en: "Internship PT GMF AeroAsia Tbk.",
      id: "Magang di PT GMF AeroAsia Tbk.",
    },
    date: { en: "January 2020", id: "Januari 2020" },
    images: ["/img/MagangGmf.jpg"],
    description: {
      en: "Weekly check on an Airbus A330-900neo aircraft.",
      id: "Melakukan weekly check pada pesawat Airbus A330-900neo.",
    },
  },
];

/* ---------------------------- Navigation ----------------------------- */
export const NAV_SECTIONS = [
  "about",
  "experience",
  "projects",
  "certificates",
  "activities",
  "contact",
] as const;
export type NavSection = (typeof NAV_SECTIONS)[number];
