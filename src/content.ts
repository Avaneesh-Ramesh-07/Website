export const content = {

  // ----------------------------------------------------------
  //  NAV BAR
  // ----------------------------------------------------------
  nav: {
    logo: "Avaneesh Ramesh",          // Text or initials shown top-left
  },

  // ----------------------------------------------------------
  //  SECTION 1 — HOME
  //  The hero / landing section.
  // ----------------------------------------------------------
  home: {
    greeting: "Hi, I'm",
    name: "Avaneesh Ramesh",
    tagline: "Computer Science Major at UT Austin; ML Researcher",
    ctaPrimary: "See My Work",
    ctaSecondary: "Contact Me",
    // Optional: URL to a profile photo (leave empty string "" to hide)
    photo: "",
  },

  // ----------------------------------------------------------
  //  SECTION 2 — ABOUT ME
  // ----------------------------------------------------------
  about: {
    heading: "About Me",
    paragraphs: [
      "Hi! My name is Avaneesh Ramesh. I'm currently a rising sophomore at the University of Texas at Austin. I am a Computer Science major, pursuing minors in Robotics and Economics",
      "My academic work has been focused on research, particularly in machine learning systems and artificial intelligence (see my experiences below for more information)",
      "In the future, I plan to pursue higher education and a career in robotics and education."
    ],
    // Skills / technologies list
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "Your Skill",
      "Another Skill",
    ],
    skillsLabel: "Technologies I work with:",
  },

  // ----------------------------------------------------------
  //  SECTION 3 — EXPERIENCE
  //  Add as many jobs / roles as you need.
  // ----------------------------------------------------------
  experience: {
    heading: "Experience",
    jobs: [
      {
        role: "Undergraduate Research Assistant",
        company: "Learning Directed Operating Systems Expedition (LDOS) @ UT Austin",
        period: "November 2025 - Present",
        location: "Austin, TX",
        bullets: [
          "Researching predictive models (Random Forest, regression) for optimizing edge server scheduling of static workloads, reducing latency and improving resource usage under strict SLOs."
        ],
      },
      {
        role: "Research Assistant",
        company: "Applied Research Laboratories @ UT Austin",
        period: "June 2025 - August 2025",
        location: "Austin, TX",
        bullets: [
          "Co-developed RAGRank, a PageRank-based defense for cybersecurity attacks against Retrieval-Augmented Generation (RAG) systems.",
          "Improved LLM accuracy by 36% on benchmarks (HotPotQA, MS-MARCO) during attacks, forcing attackers to inject >5x more malicious documents than clean ones—conspicuous and computationally costly requirement.",
          "Extended validation to large Cyber-Threat Intelligence datasets, demonstrating scalability to real-world domains.",
          "Submitted paper to the WAITI Workshop, Annual Computer Security Applications Conference.",
          "Presented research through reports and poster sessions to Applied Research Laboratories scientific community."
        ],
      },
      {
        role: "Research Assistant to Dr. Tanzima Islam",
        company: "Per4ML Laboratory @ Texas State University",
        period: "June 2021 - May 2025",
        location: "Austin, TX",
        bullets: [
          "Overview: Collaborated (as the only high school student) with undergraduates, postdocs Masters, and PhD candidates in Dr. Tanzima Islam's Per4ML lab",
          "PerfGPT: Automating GPT Model Creation for HPC Performance Optimization",
          "Comparative Visualizations of Performance Anomaly Provenance in Chimbuko",          
          "Correlation Analysis of Performance Counters in High-Performance Computing"
        ],
      },
      {
        role: "Software Engineering Intern",
        company: "Centre for Computational Technologies (CCTech)",
        period: "January 2023 - May 2023",
        location: "Pune, India (Remote)",
        bullets: [
          "Implemented a neural network to interpret image data for Computational Flow Diagrams for various HVAC (Heating, Ventilation, and Air Conditioning) system designs",
          "Integrated the proprietary API/SDK to extract training and testing datasets"
        ],
      }
    ],
  },

  // ----------------------------------------------------------
  //  SECTION 4 — PROJECTS
  // ----------------------------------------------------------
  projects: {
    heading: "Projects",
    subheading: "Research & builds",
    items: [
      {
        title: "PerfGPT",
        description: "Scalable and fully automated pipeline for customized dataset generation from scientific literature and Llama, GPT, and BERT model fine-tuning with parallelization and QLoRA optimization.",
        tags: ["Python", "Large Language Models", "High-Performance-Computing"],
        // links is a list of dictionaries: {label: <label>, href: <link>}; Empty array shows no buttons
        links: [
          { label: "Extended Abstract (SC2024 TPC Workshop)", href: "https://drive.google.com/file/d/18fNyI0annq1WWK_4MIiM088STPpEJy1C/view?pli=1" },
        ],
      },
      {
        title: "Comparative Visualizations of Performance Anomaly Provenance in Chimbuko",
        description: "Implemented Circos Visualization to identify and analyze correlations among anomalous functions across multiple runs of an application and the relationships between the performance counters of each run and their similarities across runs.",
        tags: ["Python", "Machine Learning", "High-Performance-Computing"],
        links: [
          { label: "Poster (SC2023 International Conference)", href: "https://drive.google.com/file/d/1_8DT8E4AiztNti24lXMvyrnj3RGeirFP/view" },
          { label: "Paper (SC2023 International Conference)", href: "https://drive.google.com/file/d/1tR-aJoKwFIbG_v3nYjpUSFc_mC0j0_UZ/view" },
        ],
      },
      {
        title: "Correlation Analysis of Performance Counters in High-Performance Computing",
        description: "Applied Linear Sieve ML algorithm for correlation analysis among 20-500 performance counters in HPC application; visualized results with Node Graph and Parallel Coordinates.",
        tags: ["Python", "Machine Learning", "High-Performance-Computing"],
        links: [
          { label: "Poster (TSU REU Program)", href: "https://drive.google.com/file/d/1LrFABx2AH0b5nz6wibie-FJLyAjfnzRd/view" },
        ],
      },
    ],
  },

  // ----------------------------------------------------------
  //  SECTION 5 — OUTSIDE OF CS
  //  Hobbies, clubs, sports, music, travel — anything non-CS.
  // ----------------------------------------------------------
  outsideCS: {
    heading: "Outside of CS",
    subheading: "Life beyond the screen",
    items: [
      {
        title: "Guitar",
        description: "I love to play the guitar in my free time. I've been playing for about 10 years, and I've learned various songs on electric guitar and various pieces for classical guitar. For the past year, I've been trying to get into improv and spanish music. For an independent-study presentation, back in high school, I learned how to play the guitar, flamenco-style, and essentially composed a short piece showcasing my different techniques. After that, I went really heavy on music theory with my teacher and grinded scales, arpeggios, and other finger patterns. Now, I'm at the point where I can hear songs in different genres like pop, kpop, rock, and bollywood and improv along to them! " + 
                      "Right now, I'm learning a jazz piece called Black Orpheus. It's kinda my first time getting involved in Jazz and it's fun to learn the chords, although the improv here is definitely more of a learning curve...",
        tags: [],
        links: [] as { label: string; href: string }[],
      },
      {
        title: "Clarinet",
        description: "I was part of Westwood High School's Band program throughout all 4 years. I played clarinet in the Wind Ensemble (highest band) during my Junior and Senior years of high school. During Junior year, we attended the Midwest Clinic in Chicago, where we gave a huge concert! My favorite piece we played has to be Antique Violences by John Mackey!" + 
                      "I also participated in Marching Band throughout all 4 years as well.",
        tags: [],
        links: [] as { label: string; href: string }[],
      },
      {
        title: "Volunteering",
        description: "I love to volunteer throughout my community! I'm part of Camp Kesem at UT, a club that hosts a summer camp to children whose parents have been affected by cancer. I also volunteered consistently with my local library throughout high school",
        tags: [],
        links: [] as { label: string; href: string }[],
      },
      {
        title: "Teaching",
        description: "Throughout high school, I dabbled a little bit in teaching! I was a tutor at LearnLee, where I taught English, Reading, Math, and Computer Science to various elementary schoolers. It was really rewarding seeing students finally understand concepts they'd been struggling heavily with. I also helped a friend start the CodeClub Austin to teach coding in our local communities for a summer. I'd really like to continue my teaching experience at UT by TAing and joining organizations like CS Roadshow",
        tags: [],
        links: [] as { label: string; href: string }[],
      },

    ],
  },

  // ----------------------------------------------------------
  //  SECTION 6 — CONTACT ME
  // ----------------------------------------------------------
  contact: {
    heading: "Contact Me",
    intro: "I'm always open to new opportunities or just chatting! Fill in the form below or reach out directly.",
    email: "avaneesh@utexas.edu",
    // Social links — leave href "" to hide a link
    socials: [
      { label: "GitHub",   href: "https://github.com/Avaneesh-Ramesh-07" },
      { label: "LinkedIn", href: "https://linkedin.com/in/av-ram" }
    ],
    formLabels: {
      name: "Your Name",
      email: "Your Email",
      message: "Your Message",
      submit: "Send Message",
    },
  },
}
