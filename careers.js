/* Careers data for careers.html. Loaded only on that page to save data.
   Every entry was checked against the linked source in November 2026.
   BEFORE CLASS USE: a guidance counselor or teacher must confirm each entry with the school
   or office and set "reviewed" to the date they checked it (see RA2Careers.reviewed).
   Programs, fees and deadlines change every year. */
window.RA2Careers = {
  checked: "November 2026",
  reviewed: null, /* e.g. "2027-01-15 · Ms. Cruz, Guidance" once the school has checked every entry */

  /* tracks: ai | cyber | it.  area: near (eastern Pangasinan) | province (rest of Pangasinan) | far (Baguio) */
  schools: [
    {
      id: "psu-asingan", name: "Pangasinan State University – Asingan Campus", town: "Asingan, Pangasinan",
      area: "near", kind: "state", tracks: ["it", "cyber"],
      programs: ["BS Information Technology (major in Web and Mobile Technologies)"],
      url: "https://asingan.psu.edu.ph/college-of-technology-and-business/"
    },
    {
      id: "psu-urdaneta", name: "Pangasinan State University – Urdaneta City Campus", town: "Urdaneta City, Pangasinan",
      area: "near", kind: "state", tracks: ["it", "ai", "cyber"],
      programs: ["BS Information Technology (majors in Web and Mobile Technologies, and Data Analytics)", "BS Computer Engineering"],
      note: "College of Computing. The Data Analytics major is a good first step toward AI work.",
      note_fil: "College of Computing. Magandang unang hakbang ang Data Analytics major papunta sa AI.",
      url: "https://urdaneta.psu.edu.ph/bachelor-of-science-in-information-technology/"
    },
    {
      id: "ucu", name: "Urdaneta City University", town: "Urdaneta City, Pangasinan",
      area: "near", kind: "local", tracks: ["it", "cyber"],
      programs: ["BS Information Technology (College of Information and Technology Education)"],
      note: "City-run (local) university. Ask the school if free tuition applies to you.",
      note_fil: "Unibersidad ng lungsod. Itanong sa paaralan kung libre ang tuition para sa iyo.",
      url: "https://ucu.edu.ph/courses/cite"
    },
    {
      id: "panpacific", name: "Panpacific University (Tayug and Urdaneta campuses)", town: "Tayug and Urdaneta City, Pangasinan",
      area: "near", kind: "private", tracks: ["it"],
      programs: ["IT and computer programs — we could not confirm which ones the Tayug campus offers"],
      note: "Closest to San Nicolas. Private school, so there are fees. Ask the school what IT courses it offers this year.",
      note_fil: "Pinakamalapit sa San Nicolas. Pribadong paaralan, kaya may bayad. Itanong kung anong IT course ang meron ngayong taon.",
      url: null, unconfirmed: true
    },
    {
      id: "psu-bayambang", name: "Pangasinan State University – Bayambang Campus", town: "Bayambang, Pangasinan",
      area: "province", kind: "state", tracks: ["it", "ai", "cyber"],
      programs: ["BS Information Technology (majors in Web and Mobile Technologies, and Data Analytics)"],
      url: "https://bayambang.psu.edu.ph/bsit/"
    },
    {
      id: "psu-sancarlos", name: "Pangasinan State University – San Carlos City Campus", town: "San Carlos City, Pangasinan",
      area: "province", kind: "state", tracks: ["it"],
      programs: ["BS Information Technology (Web and Mobile Technologies)"],
      url: "https://sancarlos.psu.edu.ph/bachelor-of-science-in-information-technology/"
    },
    {
      id: "up-baguio", name: "University of the Philippines Baguio", town: "Baguio City",
      area: "far", kind: "state", tracks: ["ai", "it", "cyber"],
      programs: ["BS Computer Science (College of Science)"],
      note: "Has an entrance exam (UPCAT). Computer Science is the usual path into AI.",
      note_fil: "May entrance exam (UPCAT). Computer Science ang karaniwang daan papunta sa AI.",
      url: "https://www.upb.edu.ph/bachelor-of-science-in-computer-science/"
    },
    {
      id: "slu", name: "Saint Louis University", town: "Baguio City",
      area: "far", kind: "private", tracks: ["cyber", "it", "ai"],
      programs: ["BS Computer Science", "BS Information Technology"],
      note: "Private school, so there are fees. Its IT students compete in cybersecurity contests.",
      note_fil: "Pribadong paaralan, kaya may bayad. Sumasali ang mga IT student nito sa cybersecurity contest.",
      url: "https://www.slu.edu.ph/tag/cybersecurity/"
    }
  ],

  /* Certificates and badges students can earn for free (or with scholarships) */
  certs: [
    {
      id: "netacad-cyber", name: "Introduction to Cybersecurity", by: "Cisco Networking Academy", tracks: ["cyber"], cost: "free",
      award: "Free digital badge", award_fil: "Libreng digital badge",
      what: "Self-paced online course, about 15 hours, no experience needed. Covers attacks, privacy and how companies protect themselves.",
      what_fil: "Online course na sarili mong bilis, mga 15 oras, walang kailangang karanasan. Tungkol sa atake, privacy at paano nagpoprotekta ang kumpanya.",
      url: "https://www.netacad.com/courses/introduction-to-cybersecurity"
    },
    {
      id: "netacad-net", name: "Networking Basics", by: "Cisco Networking Academy", tracks: ["it", "cyber"], cost: "free",
      award: "Free digital badge (pass the final exam)", award_fil: "Libreng digital badge (ipasa ang final exam)",
      what: "Learn how home and school networks, Wi-Fi and the internet work. About 6 hours, with practice in a network simulator.",
      what_fil: "Alamin kung paano gumagana ang network sa bahay at paaralan, Wi-Fi at internet. Mga 6 na oras, may practice sa network simulator.",
      url: "https://www.netacad.com/courses/networking-basics"
    },
    {
      id: "eoai", name: "Elements of AI: Introduction to AI", by: "University of Helsinki and MinnaLearn", tracks: ["ai"], cost: "free",
      award: "Free certificate", award_fil: "Libreng certificate",
      what: "What AI is, what it can and can't do, and how it affects our lives. No programming or hard math needed. In English.",
      what_fil: "Ano ang AI, ano ang kaya at hindi nito kaya, at paano ito nakaaapekto sa buhay natin. Walang programming o mahirap na math. Nasa English.",
      url: "https://www.elementsofai.com/"
    },
    {
      id: "cs50", name: "CS50 (CS50x, CS50 AI, CS50 Cybersecurity, CS50 Python)", by: "Harvard University", tracks: ["it", "ai", "cyber"], cost: "free",
      award: "Free CS50 certificate (a paid edX certificate is optional, not needed)", award_fil: "Libreng CS50 certificate (opsyonal lang ang bayad na edX certificate)",
      what: "Harvard's famous intro to computer science, free for anyone. Challenging, with long video lectures, so it suits students who already like coding.",
      what_fil: "Sikat na intro sa computer science ng Harvard, libre para sa lahat. Mahirap, at mahahaba ang video lecture, kaya bagay sa mga mahilig na sa coding.",
      url: "https://cs50.harvard.edu/x/"
    },
    {
      id: "fcc", name: "freeCodeCamp certifications", by: "freeCodeCamp (non-profit)", tracks: ["it"], cost: "free",
      award: "Free certifications, such as Responsive Web Design", award_fil: "Libreng certification, gaya ng Responsive Web Design",
      what: "Learn to build websites step by step, in the browser. You finish projects to earn each certification.",
      what_fil: "Matutong gumawa ng website nang hakbang-hakbang, sa browser. Tapusin ang mga project para makuha ang bawat certification.",
      url: "https://www.freecodecamp.org/learn"
    },
    {
      id: "tesda-css", name: "Computer Systems Servicing NC II", by: "TESDA", tracks: ["it"], cost: "varies",
      award: "National certificate (NC II) that Philippine employers know", award_fil: "National certificate (NC II) na kilala ng mga employer sa Pilipinas",
      what: "Hands-on training to build, fix and network computers, then an assessment. Training and assessment fees vary.",
      what_fil: "Hands-on na training sa pagbuo, pag-aayos at pag-network ng computer, tapos may assessment. Iba-iba ang bayad sa training at assessment.",
      how: "Ask the TESDA Pangasinan office which nearby schools offer it, and whether there are scholarship slots this year.",
      how_fil: "Itanong sa TESDA Pangasinan kung aling malapit na paaralan ang may ganito, at kung may scholarship slot ngayong taon.",
      url: "https://www.tesda.gov.ph"
    }
  ],

  /* Free learning websites (no certificate needed) */
  sites: [
    {
      id: "tesda-online", name: "TESDA Online Program", tracks: ["it", "ai"],
      what: "Free online courses from the Philippine government, including computer basics, web development and new AI courses.",
      what_fil: "Libreng online course mula sa gobyerno ng Pilipinas, kasama ang computer basics, web development at mga bagong AI course.",
      url: "https://e-tesda.gov.ph"
    },
    {
      id: "khan", name: "Khan Academy – Computing", tracks: ["it", "ai"],
      what: "Free lessons on programming, how computers and the internet work, and AI. Non-profit, no ads.",
      what_fil: "Libreng aralin sa programming, paano gumagana ang computer at internet, at AI. Non-profit, walang ads.",
      url: "https://www.khanacademy.org/computing"
    },
    {
      id: "codeorg", name: "CodeAI (formerly Code.org)", tracks: ["ai", "it"],
      what: "Short, fun coding and AI activities that work in a phone or computer browser. A good first step.",
      what_fil: "Maiikli at masayang coding at AI activity na gumagana sa browser ng phone o computer. Magandang unang hakbang.",
      url: "https://code.org/ai"
    },
    {
      id: "scratch", name: "Scratch", tracks: ["it", "ai"],
      what: "Make games and animations by snapping code blocks together. Made by MIT. Easiest on a computer.",
      what_fil: "Gumawa ng laro at animation sa pagdugtong ng mga code block. Gawa ng MIT. Pinakamadali sa computer.",
      url: "https://scratch.mit.edu"
    },
    {
      id: "cs50-cyber", name: "CS50 Cybersecurity", tracks: ["cyber"],
      what: "Harvard's free beginner course on keeping accounts, data and devices safe. No coding needed.",
      what_fil: "Libreng beginner course ng Harvard tungkol sa pag-iingat ng account, data at device. Walang kailangang coding.",
      url: "https://cs50.harvard.edu/cybersecurity/"
    },
    {
      id: "dict", name: "DICT free digital skills training", tracks: ["it", "cyber", "ai"],
      what: "The Department of Information and Communications Technology runs free in-person trainings and job-fair workshops.",
      what_fil: "Nagbibigay ang DICT ng libreng personal na training at workshop sa job fair.",
      how: "Ask your teacher or the municipal hall about the next DICT training in Pangasinan.",
      how_fil: "Itanong sa guro o sa munisipyo kung kailan ang susunod na DICT training sa Pangasinan.",
      url: "https://dict.gov.ph"
    },
    {
      id: "kolibri", name: "Kolibri (for teachers)", tracks: ["it", "ai", "cyber"], teacher: true,
      what: "Free software that puts Khan Academy and other lessons on one school computer, so students can learn on the school network with no internet.",
      what_fil: "Libreng software na naglalagay ng Khan Academy at iba pang aralin sa isang computer ng paaralan, para matuto ang estudyante sa school network kahit walang internet.",
      url: "https://learningequality.org/kolibri/"
    }
  ],

  /* YouTube playlists and channels. Links only (no embedded players) so the page stays light. */
  videos: [
    { id: "howaiworks", name: "How AI Works", by: "CodeAI (Code.org)", tracks: ["ai"], size: "short",
      what: "11 short videos on machine learning, neural networks, chatbots and AI ethics. You can also download them from CodeAI's site to watch offline.",
      what_fil: "11 maikling video tungkol sa machine learning, neural network, chatbot at AI ethics. Puwede ring i-download sa site ng CodeAI para mapanood offline.",
      download: "https://code.org/ai",
      url: "https://www.youtube.com/playlist?list=PLzdnOPI1iJNeehd1RXhnVMBFi1WhWLx_Y" },
    { id: "cc-ai", name: "Crash Course: Artificial Intelligence", by: "CrashCourse", tracks: ["ai"], size: "medium",
      what: "A 20-episode series on AI and machine learning, with simple coding labs.",
      what_fil: "20-episode na serye tungkol sa AI at machine learning, may simpleng coding lab.",
      url: "https://www.youtube.com/playlist?list=PL8dPuuaLjXtO65LeD2p4_Sb5XQ51par_b" },
    { id: "cc-cs", name: "Crash Course: Computer Science", by: "CrashCourse", tracks: ["it", "cyber"], size: "medium",
      what: "40 episodes on how computers really work, from circuits to the internet and cybersecurity.",
      what_fil: "40 episode tungkol sa kung paano talaga gumagana ang computer, mula circuit hanggang internet at cybersecurity.",
      url: "https://www.youtube.com/playlist?list=PL8dPuuaLjXtNlUrzyH5r6jN9ulIgZBpdo" },
    { id: "messer", name: "Professor Messer", by: "Professor Messer", tracks: ["it", "cyber"], size: "medium",
      what: "Free videos for IT and security certification exams (CompTIA A+, Network+, Security+). The exams themselves cost money.",
      what_fil: "Libreng video para sa IT at security certification exam (CompTIA A+, Network+, Security+). May bayad ang mismong exam.",
      url: "https://www.youtube.com/@professormesser" },
    { id: "cs50-yt", name: "CS50x lectures", by: "Harvard University", tracks: ["it", "ai"], size: "long",
      what: "The full Harvard course on video. Each lecture is about two hours.",
      what_fil: "Ang buong kurso ng Harvard sa video. Mga dalawang oras ang bawat lecture.",
      url: "https://www.youtube.com/playlist?list=PLhQjrBD2T380hlTqAU8HfvVepCcjCqTg6" },
    { id: "cs50-cyber-yt", name: "CS50 Cybersecurity lectures", by: "Harvard University", tracks: ["cyber"], size: "long",
      what: "Five lectures on securing accounts, data, systems and software, and protecting your privacy.",
      what_fil: "Limang lecture tungkol sa pag-secure ng account, data, system at software, at pagprotekta sa privacy mo.",
      url: "https://www.youtube.com/playlist?list=PLhQjrBD2T383Cqo5I1oRrbC1EKRAKGKUE" },
    { id: "fcc-yt", name: "freeCodeCamp.org", by: "freeCodeCamp", tracks: ["it", "ai"], size: "long",
      what: "Full-length courses on programming, web development and machine learning. Many are several hours long.",
      what_fil: "Buong kurso sa programming, web development at machine learning. Marami ang ilang oras ang haba.",
      url: "https://www.youtube.com/@freecodecamp" }
    /* TEACHERS: add Filipino-language videos here after you have watched them, e.g.
       { id: "...", name: "...", by: "...", tracks: ["it"], size: "short", what: "...", what_fil: "...", url: "https://www.youtube.com/..." } */
  ],

  /* Help paying for school */
  money: [
    {
      id: "fhe", name: "Free tuition at state and local universities (RA 10931)",
      what: "Filipino students at state universities (like PSU and UP) and CHED-recognized local universities may get free tuition and other school fees, if they meet the school's admission and grade rules. It does not cover a second bachelor's degree.",
      what_fil: "Puwedeng libre ang tuition at iba pang bayarin ng Pilipinong estudyante sa state university (tulad ng PSU at UP) at sa local university na kinikilala ng CHED, kung pasado sa admission at grade rules ng paaralan. Hindi kasama ang pangalawang bachelor's degree.",
      url: "https://unifast.gov.ph/uaqtea.html"
    },
    {
      id: "dost", name: "DOST-SEI undergraduate scholarship",
      what: "A government scholarship for science and technology courses, including Computer Science and IT. You take a qualifying exam. Applications usually open in the second half of the year for the next school year.",
      what_fil: "Scholarship ng gobyerno para sa science at technology course, kasama ang Computer Science at IT. May qualifying exam. Karaniwang bukas ang aplikasyon sa ikalawang kalahati ng taon para sa susunod na school year.",
      how: "Check the official DOST-SEI site for this year's dates. Don't trust dates from other websites.",
      how_fil: "Tingnan ang opisyal na DOST-SEI site para sa petsa ngayong taon. Huwag magtiwala sa petsa mula sa ibang website.",
      url: "https://www.sei.dost.gov.ph"
    }
  ],

  /* Job paths: what you can do now, and what a degree opens up */
  jobs: [
    { id: "csr", name: "Customer service or tech support (BPO)", name_fil: "Customer service o tech support (BPO)", level: "now", tracks: ["it"],
      what: "Many BPO companies hire senior high graduates with good English, on-site in Baguio or work-from-home in Pangasinan. Work-from-home jobs need a stable home internet connection.",
      what_fil: "Maraming BPO ang tumatanggap ng senior high graduate na magaling mag-English, on-site sa Baguio o work-from-home sa Pangasinan. Kailangan ng stable na internet sa bahay para sa work-from-home." },
    { id: "tech", name: "Computer technician", name_fil: "Computer technician", level: "now", tracks: ["it"],
      what: "Repair shops, schools and offices need people who can fix computers and set up networks. A TESDA NC II helps a lot.",
      what_fil: "Kailangan ng repair shop, paaralan at opisina ng taong marunong mag-ayos ng computer at mag-set up ng network. Malaking tulong ang TESDA NC II." },
    { id: "data", name: "Data labeling for AI", name_fil: "Data labeling para sa AI", level: "now", tracks: ["ai"],
      what: "Some online jobs pay people to label pictures or text so AI can learn. Be careful: many fake \"online jobs\" are scams. Real ones never ask you to pay first.",
      what_fil: "May mga online job na nagbabayad para mag-label ng litrato o text para matuto ang AI. Mag-ingat: maraming pekeng \"online job\" ang scam. Hindi ka pinagbabayad muna ng totoong trabaho." },
    { id: "dev", name: "Web or mobile app developer", name_fil: "Web o mobile app developer", level: "degree", tracks: ["it"],
      what: "Builds websites and phone apps. A BSIT with a Web and Mobile major leads here.",
      what_fil: "Gumagawa ng website at phone app. Dito papunta ang BSIT na may Web and Mobile major." },
    { id: "analyst", name: "Data analyst", name_fil: "Data analyst", level: "degree", tracks: ["ai", "it"],
      what: "Finds patterns in numbers to help businesses decide. It's a common first job on the way to AI and machine learning.",
      what_fil: "Naghahanap ng pattern sa mga numero para makatulong sa desisyon ng negosyo. Karaniwang unang trabaho papunta sa AI at machine learning." },
    { id: "soc", name: "SOC analyst (cybersecurity)", name_fil: "SOC analyst (cybersecurity)", level: "degree", tracks: ["cyber"],
      what: "Watches computer systems for attacks and responds to alerts. Try the SOC Analyst simulation in this app to see what it's like.",
      what_fil: "Binabantayan ang mga computer system laban sa atake at tumutugon sa alerto. Subukan ang SOC Analyst simulation sa app na ito." , link: "sim.html?id=soc" },
    { id: "netadmin", name: "Network and IT support specialist", name_fil: "Network at IT support specialist", level: "degree", tracks: ["it", "cyber"],
      what: "Keeps an office's computers, Wi-Fi and accounts working and safe.",
      what_fil: "Inaalagaan ang computer, Wi-Fi at account ng isang opisina para gumana at ligtas." },
    { id: "ml", name: "AI or machine learning engineer", name_fil: "AI o machine learning engineer", level: "degree", tracks: ["ai"],
      what: "Builds and tests AI models. Usually needs a Computer Science degree and strong math.",
      what_fil: "Gumagawa at sumusubok ng AI model. Karaniwang kailangan ng Computer Science degree at malakas sa math." }
  ],

  /* Where to look for real job openings */
  boards: [
    { id: "philjobnet", name: "PhilJobNet (DOLE)", what: "The government's free job site. Only accredited employers can post. You can register from age 15.",
      what_fil: "Libreng job site ng gobyerno. Mga accredited na employer lang ang puwedeng mag-post. Puwedeng mag-register mula edad 15.",
      url: "https://philjobnet.gov.ph" },
    { id: "peso", name: "Public Employment Service Office (PESO)", what: "Your town hall and the Pangasinan provincial government run job fairs and help with job matching. Ask at the municipal hall in San Nicolas.",
      what_fil: "Nagdaraos ang munisipyo at ang Pamahalaang Panlalawigan ng Pangasinan ng job fair at tumutulong maghanap ng trabaho. Magtanong sa munisipyo ng San Nicolas.",
      url: "https://www.pangasinan.gov.ph/department/public-employment-service-office/" }
  ]
};
