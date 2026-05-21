export const content = {

    nav: {
        logo: "Avaneesh Ramesh",
    },

    home: {
        greeting: "Hi, I'm",
        name: "Avaneesh Ramesh",
        tagline: "Computer Science Major at UT Austin; ML Researcher",
        ctaPrimary: "See My Work",
        ctaSecondary: "Contact Me",
        photo: "",
    },

    about: {
        heading: "About Me",
        paragraphs: [
            "Hi! My name is Avaneesh Ramesh. I'm currently a rising sophomore at the University of Texas at Austin. I am a Computer Science major, pursuing minors in Robotics and Economics",
            "My academic work has been focused on research, particularly in machine learning systems and artificial intelligence (see my experiences below for more information)",
            "In the future, I plan to pursue higher education and a career in robotics and education.",
        ],
        skills: [
            "Python",
            "Java",
            "C",
            "C++",
            "C# (.Net)"
        ],
        skillsLabel: "Technologies I work with:",
    },

    experience: {
        heading: "Experience",
        jobs: [
            {
                role: "Undergraduate Research Assistant",
                company: "Learning Directed Operating Systems Expedition (LDOS) @ UT Austin",
                period: "November 2025 - Present",
                location: "Austin, TX",
                bullets: [
                    "Researching predictive models (Random Forest, regression) for optimizing edge server scheduling of static workloads, reducing latency and improving resource usage under strict SLOs.",
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
                    "Presented research through reports and poster sessions to Applied Research Laboratories scientific community.",
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
                    "Correlation Analysis of Performance Counters in High-Performance Computing",
                ],
            },
            {
                role: "Software Engineering Intern",
                company: "Centre for Computational Technologies (CCTech)",
                period: "January 2023 - May 2023",
                location: "Pune, India (Remote)",
                bullets: [
                    "Implemented a neural network to interpret image data for Computational Flow Diagrams for various HVAC (Heating, Ventilation, and Air Conditioning) system designs",
                    "Integrated the proprietary API/SDK to extract training and testing datasets",
                ],
            },
        ],
    },

    projects: {
        heading: "Projects",
        categories: [
            {
                label: "Research",
                items: [
                    {
                        title: "PerfGPT",
                        description: "Scalable and fully automated pipeline for customized dataset generation from scientific literature and Llama, GPT, and BERT model fine-tuning with parallelization and QLoRA optimization.",
                        tags: ["Python", "Large Language Models", "High-Performance-Computing"],
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
                    {
                        title: "RAGRank",
                        description: "See description above.",
                        tags: ["Retrieval-Augmented-Generation", "Cybersecurity", "Large Language Models"],
                        links: [
                            { label: "Paper Submission to WAITI Workshop, Annual Computer Security Applications Conference", href: "https://arxiv.org/abs/2510.20768" },
                        ],
                    },
                ],
            },
            {
                label: "Other",
                items: [
                    {
                        title: "Wish Shell",
                        description: "A Unix shell built in C as part of the OSTEP projects curriculum. Supports built-in commands, executable path resolution, piped outputs, and flexible whitespace handling.",
                        tags: ["C", "Bash"],
                        links: [
                            { label: "GitHub", href: "https://github.com/Avaneesh-Ramesh-07/wish-shell" },
                        ],
                    },
                    {
                        title: "Random Forest",
                        description: "Random Forest Model that I made from scratch in Python. Supports training and testing on a dataset.",
                        tags: ["Python", "Machine Learning", "Random Forest"],
                        links: [
                            { label: "GitHub", href: "https://github.com/Avaneesh-Ramesh-07/RandomForest" },
                        ],
                    },
                    {
                        title: "Occupancy Map",
                        description: "See Avaneesh_Omap/build_omap.py for my contribution. Given input LiDAR data and servo angles, constructs an accurate occupancy map. Completed as part of the Computer Vision team for Longhorn Neurotech. Part of a larger project, where we are developing an autonomous rover with vision-based object detection and RL navigation for obstacle-aware path planning.",
                        tags: ["Python", "Robotics", "LiDAR", "Occupancy Map"],
                        links: [
                            { label: "GitHub", href: "https://github.com/Avaneesh-Ramesh-07/Computer-Vision/tree/main/Avaneesh_OMap" },
                        ],
                    },
                    {
                        title: "UsherBot",
                        description: "FRI I (Autonomous Robotics) final project, completed in collaboration with other UTCS freshmen. Users interact with our UsherBot via an intuitive frontend, where they sign in and select their reservation. Our UsherBot leads the user to their reserved seat. Tech stack: Python and TypeScript frontend, Supabase backend, C++ for robot navigation logic",
                        tags: ["Robotics", "ROS"],
                        links: [] as { label: string; href: string }[],
                    },
                ],
            },
        ],
    },

    outsideCS: {
        heading: "Outside of CS",
        subheading: "Life beyond the screen",
        items: [
            {
                title: "Guitar",
                description: "I've been playing guitar for about 10 years, spanning electric, classical, and flamenco styles. In high school, I composed a short flamenco piece for an independent-study presentation, then dove deep into music theory: scales, arpeggios, and finger patterns. Now I can improv along to pop, kpop, rock, and bollywood by ear. Lately I've been exploring jazz through Black Orpheus, which is a fun new challenge!",
                tags: [] as string[],
                links: [] as { label: string; href: string }[],
            },
            {
                title: "Clarinet",
                description: "I was part of Westwood High School's Band program throughout all 4 years. I played clarinet in the Wind Ensemble (highest band) during my Junior and Senior years of high school. During Junior year, we attended the Midwest Clinic in Chicago, where we gave a huge concert! I also participated in Marching Band throughout all 4 years as well.",
                tags: [] as string[],
                links: [] as { label: string; href: string }[],
            },
            {
                title: "Volunteering",
                description: "I love to volunteer throughout my community! I'm part of Camp Kesem at UT, a club that hosts a summer camp to children whose parents have been affected by cancer. I also volunteered consistently with my local library throughout high school.",
                tags: [] as string[],
                links: [] as { label: string; href: string }[],
            },
            {
                title: "Teaching",
                description: "Throughout high school, I dabbled a little bit in teaching! I was a tutor at LearnLee, where I taught English, Reading, Math, and Computer Science to various elementary schoolers. It was really rewarding seeing students finally understand concepts they'd been struggling heavily with. I also helped a friend start the CodeClub Austin to teach coding in our local communities for a summer. I'd really like to continue my teaching experience at UT by TAing and joining organizations like CS Roadshow.",
                tags: [] as string[],
                links: [] as { label: string; href: string }[],
            },
        ],
    },

    contact: {
        heading: "Contact Me",
        intro: "I'm always open to new opportunities or just chatting! Fill in the form below or reach out directly.",
        email: "avaneesh@utexas.edu",
        socials: [
            { label: "GitHub",   href: "https://github.com/Avaneesh-Ramesh-07" },
            { label: "LinkedIn", href: "https://linkedin.com/in/av-ram" },
        ],
        formLabels: {
            name:    "Name",
            email:   "Email",
            message: "Message",
            submit:  "Send Message",
        },
    },
}
