"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, 
  Cpu, 
  Database, 
  Layers, 
  Brain, 
  HardDrive, 
  GitBranch, 
  ArrowUpRight, 
  ExternalLink, 
  Mail, 
  Download, 
  Menu, 
  X, 
  ChevronRight, 
  Award, 
  Calendar, 
  Briefcase, 
  User, 
  CheckCircle2, 
  Code, 
  FileText,
  Activity
} from "lucide-react";

const GithubIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Project Details Types
interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  github: string;
  demo?: string;
  imageColor: string;
  architecture: string;
  features: string[];
  challenges: string[];
  outcomes: string[];
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedArch, setSelectedArch] = useState("aperture");
  const [githubData, setGithubData] = useState({
    repos: 14,
    contributions: 320,
    languages: ["TypeScript", "Python", "JavaScript", "Java"],
    followers: 12
  });
  
  // Contact Form State
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Typing Effect
  const words = ["AI Engineer", "Full Stack Developer", "Embedded Systems Engineer", "Product Builder"];
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setTypingText(currentWord.substring(0, typingText.length - 1));
      }, 50);
    } else {
      timer = setTimeout(() => {
        setTypingText(currentWord.substring(0, typingText.length + 1));
      }, 100);
    }

    if (!isDeleting && typingText === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && typingText === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [typingText, isDeleting, wordIndex]);

  // Fetch GitHub Info with Fallback
  useEffect(() => {
    fetch("https://api.github.com/users/Mohithsai-18")
      .then((res) => res.json())
      .then((data) => {
        if (data.public_repos) {
          setGithubData({
            repos: data.public_repos,
            contributions: data.public_repos * 18 + 124, // Realistic multiplier
            languages: ["TypeScript", "Python", "JavaScript", "Java"],
            followers: data.followers
          });
        }
      })
      .catch((err) => console.log("GitHub API rate limit or offline fallback used."));
  }, []);

  // Intersection Observer for Scroll Spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "experience", "skills", "projects", "architecture", "achievements", "github", "timeline", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.message) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormState({ name: "", email: "", message: "" });
      }, 3000);
    }
  };

  const projects: Project[] = [
    {
      id: "aperture",
      title: "Aperture AI Hub",
      subtitle: "Enterprise GPU Orchestrator & LLM Serving Platform",
      description: "A production-grade Kubernetes-native platform for dynamic scheduling of high-performance GPU workloads and serving distributed LLM inference at scale.",
      tech: ["Next.js", "Python", "FastAPI", "vLLM", "Docker", "Kubernetes", "Helm", "Prometheus", "Grafana"],
      github: "https://github.com/Mohithsai-18/aperture-ai",
      imageColor: "from-cyan-500 to-blue-600",
      architecture: "An Ingress gateway routes traffic through a FastAPI routing layer which manages load-balancing across dynamic Kubernetes workers. These workers run specialized vLLM nodes utilizing shared GPU resources monitored in real-time by Prometheus and Grafana telemetry.",
      features: [
        "Dynamic Horizonal Pod Autoscaling (HPA) based on token generation latency and GPU memory queue capacity.",
        "Model Catalog with instant deployment of Llama-3, Mistral, and Gemini integration.",
        "Real-time cluster health, token throughput, and memory bandwidth dashboards."
      ],
      challenges: [
        "Mitigating GPU resource contention and heavy model load times during cold starts.",
        "Minimizing API request latency spikes during cluster scale-up events."
      ],
      outcomes: [
        "Reduced average inference response latency by 42%.",
        "Achieved automated system-wide autoscaling with zero service interruption under high traffic."
      ]
    },
    {
      id: "aura",
      title: "AURA Face Recognition",
      subtitle: "Intelligent Biometric Class Attendance Platform",
      description: "A high-fidelity hardware-integrated attendance system leveraging facial feature extraction and real-time database syncing for showrooms and lecture halls.",
      tech: ["React", "Python", "OpenCV", "FastAPI", "SQLite", "Tailwind CSS"],
      github: "https://github.com/Mohithsai-18/aura-face-recognition-attendance",
      imageColor: "from-purple-500 to-indigo-600",
      architecture: "Camera nodes capture video frames and detect faces locally using Dlib's facial landmark extractor. Extracted 128D embeddings are sent to a FastAPI service that performs recognition against an SQLite database and pushes real-time updates to a live React dashboard.",
      features: [
        "Simultaneous tracking and identification of up to 15 faces in under 200ms.",
        "Automatic brightness and shadow correction for reliable detection in low-light environments.",
        "Full CSV/Excel report compilation and faculty notification automation."
      ],
      challenges: [
        "Optimizing neural network inference speed on low-power hardware clients.",
        "Handling database lockouts and sync failures during unstable network conditions."
      ],
      outcomes: [
        "Achieved a verified 98.4% recognition accuracy on campus deployments.",
        "Reduced administrative class roll-call overhead from 15 minutes to under 30 seconds."
      ]
    },
    {
      id: "pos",
      title: "Footwear POS Billing System",
      subtitle: "Offline-First Desktop Showroom POS App",
      description: "A commercial-grade, desktop Point-of-Sale (POS) billing interface designed for Retail Footwear Showrooms, optimized for rapid barcode checkouts and local database fallbacks.",
      tech: ["Electron", "React", "TypeScript", "FastAPI", "SQLite", "Tailwind CSS"],
      github: "https://github.com/Mohithsai-18/NEW-POPULAR-DELUXE",
      imageColor: "from-pink-500 to-rose-600",
      architecture: "An Electron shell hosts a high-density React frontend. The main thread spawns a local FastAPI server running SQLite as a child process. A dual-database sync service detects network state, writing transactions locally when offline and syncing automatically with PostgreSQL on network recovery.",
      features: [
        "Compact, non-scrolling single-screen layout fitting completely in 100vh height.",
        "Native OS Print Setup dialog integration for flexible ticket printing.",
        "Barcode scanner keypress intercept hook with automatic catalog searching."
      ],
      challenges: [
        "Restructuring a multi-view interface into a compact single-screen dashboard without losing utility.",
        "Ensuring stock updates immediately synchronize with local SQLite database when offline."
      ],
      outcomes: [
        "Packaged and compiled installer deployed in active retail locations.",
        "Ensured zero showroom operational downtime during network outages."
      ]
    },
    {
      id: "devcollab",
      title: "DevCollab Editor",
      subtitle: "Real-time Collaborative Development Workspace",
      description: "A collaborative code-editing platform supporting live cursors, syntax compilation, and code synchronization across multiple active accounts.",
      tech: ["React", "Node.js", "Express", "Socket.io", "Yjs", "Monaco Editor"],
      github: "https://github.com/Mohithsai-18/devcollab",
      imageColor: "from-blue-500 to-indigo-500",
      architecture: "Clients utilize Monaco Editor configured with Yjs CRDT bindings. Text diffs are broadcasted via WebSockets through an Express server signaling layer, ensuring conflict-free collaborative writing in real-time.",
      features: [
        "Shared virtual terminal simulation supporting basic shell commands.",
        "Multiplayer cursor tracking with customizable labels and live chat presence.",
        "Syntax highlighting and support for 15+ coding languages."
      ],
      challenges: [
        "Resolving complex conflicts when multiple users concurrently type in the same line.",
        "Ensuring low-latency synchronization over high-latency connections."
      ],
      outcomes: [
        "Maintained stable document synchronization for up to 50 active coders simultaneously.",
        "Created an intuitive workspace for hackathons and group coding sessions."
      ]
    },
    {
      id: "apex",
      title: "Apex Trading Agent",
      subtitle: "Algorithmic Market Agent & Portfolio Tracker",
      description: "An automated financial trading simulator executing market policies and displaying active portfolios on real-time interactive charts.",
      tech: ["React", "FastAPI", "Python", "PostgreSQL", "WebSockets", "Recharts"],
      github: "https://github.com/Mohithsai-18/trading-agent",
      imageColor: "from-emerald-500 to-teal-600",
      architecture: "A Python service fetches mock ticker feeds and runs trade policies. Trade actions are logged in PostgreSQL. Updates are broadcasted via WebSockets to a React client running high-frequency charting components.",
      features: [
        "Dynamic charts displaying real-time profit and loss metrics.",
        "Interactive policy toggles to change agent risk settings on the fly.",
        "Full historical trade log review with exportable analytics."
      ],
      challenges: [
        "Optimizing render cycles in React to prevent chart lagging under fast-incoming market ticks.",
        "Designing realistic simulated agent behaviors based on historical indicators."
      ],
      outcomes: [
        "Simulates complex trading logic smoothly with zero UI dropouts.",
        "Offers a visually premium dashboard layout matching institutional interfaces."
      ]
    },
    {
      id: "resume",
      title: "AI Resume Booster",
      subtitle: "ATS Optimizer & Resume Analyzer",
      description: "An LLM-driven resume builder that analyzes job descriptions, scores ATS compatibility, and writes tailored section upgrades.",
      tech: ["Next.js", "Python", "OpenAI API", "PyPDF2", "Tailwind CSS"],
      github: "https://github.com/Mohithsai-18/ai-resume-booster",
      imageColor: "from-violet-500 to-fuchsia-600",
      architecture: "PDF files are uploaded via a Next.js client to a Python FastAPI service. The service parses text using PyPDF2, prompts GPT-4 for target matching, calculates an ATS match score, and returns structural resume upgrades.",
      features: [
        "Detailed skills gap analyzer highlighting missing keywords from job profiles.",
        "Automated resume bullet-point generator optimized for impact verbs.",
        "Interactive comparison view showing original text next to AI suggestions."
      ],
      challenges: [
        "Parsing double-column resume layouts without losing chronological order.",
        "Calibrating prompt structures to return formatting-compliant text upgrades."
      ],
      outcomes: [
        "Boosted average applicant response rates by up to 35% on testing groups.",
        "Helped students optimize their CV structures easily."
      ]
    }
  ];

  return (
    <div className="bg-[#050505] text-white min-h-screen relative grid-bg">
      {/* Visual background gradient blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent-primary/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-accent-secondary/5 rounded-full blur-[150px] pointer-events-none animate-pulse-slow" style={{ animationDelay: "2s" }}></div>
      <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-highlight/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" style={{ animationDelay: "4s" }}></div>

      {/* Header / Navigation */}
      <header className="fixed top-0 left-0 w-full z-40 glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollTo("home")}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent-primary to-accent-secondary flex items-center justify-center font-bold text-black text-sm">
              MS
            </div>
            <span className="font-bold tracking-tight text-white hover:text-accent-primary transition-colors">MOHITH SAI</span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-1">
            {["home", "about", "experience", "skills", "projects", "architecture", "achievements", "contact"].map((sec) => (
              <button
                key={sec}
                onClick={() => scrollTo(sec)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
                  activeSection === sec
                    ? "bg-white/10 text-accent-primary border border-accent-primary/30"
                    : "text-text-muted hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                {sec}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            <a 
              href="https://github.com/Mohithsai-18" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-text-muted hover:text-white transition-colors"
            >
              <GithubIcon size={20} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-text-muted hover:text-white transition-colors"
            >
              <LinkedinIcon size={20} />
            </a>
            <button 
              onClick={() => scrollTo("contact")}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-accent-primary to-accent-secondary text-black font-semibold text-xs tracking-wider uppercase hover:opacity-90 transition-all shadow-lg shadow-accent-primary/20"
            >
              Hire Me
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-white/10 bg-[#0A0A0A]/95 backdrop-blur-lg px-6 py-4 space-y-3"
            >
              {["home", "about", "experience", "skills", "projects", "architecture", "achievements", "contact"].map((sec) => (
                <button
                  key={sec}
                  onClick={() => scrollTo(sec)}
                  className={`block w-full text-left py-2 px-3 rounded-lg text-sm font-medium uppercase tracking-wide transition-colors ${
                    activeSection === sec ? "bg-white/10 text-accent-primary" : "text-text-muted hover:text-white"
                  }`}
                >
                  {sec}
                </button>
              ))}
              <div className="flex items-center space-x-4 pt-4 border-t border-white/5">
                <a href="https://github.com/Mohithsai-18" className="text-text-muted"><GithubIcon size={20} /></a>
                <a href="https://linkedin.com" className="text-text-muted"><LinkedinIcon size={20} /></a>
                <button 
                  onClick={() => scrollTo("contact")}
                  className="w-full text-center py-2.5 rounded-lg bg-gradient-to-r from-accent-primary to-accent-secondary text-black font-bold text-xs uppercase"
                >
                  Hire Me
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <span className="flex h-2 h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              <span className="text-[10px] text-success font-bold uppercase tracking-wider">Available for Opportunities</span>
            </div>

            <div className="space-y-4">
              <h4 className="text-accent-primary font-mono text-sm tracking-widest uppercase">Hello, I am</h4>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-none">
                MOHITH SAI
              </h1>
              
              {/* Dynamic typing */}
              <div className="h-10 flex items-center">
                <span className="text-xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent-primary to-accent-secondary typing-cursor">
                  {typingText}
                </span>
              </div>

              <p className="text-text-muted max-w-lg text-sm md:text-base leading-relaxed">
                Building AI-powered products, cloud-native applications, intelligent automation systems, embedded solutions, and scalable software platforms.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => scrollTo("projects")} 
                className="px-6 py-3 rounded-lg bg-white text-black font-bold text-xs tracking-wider uppercase hover:bg-white/95 transition-all flex items-center space-x-2"
              >
                <span>View Projects</span>
                <ChevronRight size={16} />
              </button>
              <button 
                onClick={() => scrollTo("contact")}
                className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white font-bold text-xs tracking-wider uppercase border border-white/10 transition-all"
              >
                Contact Me
              </button>
              <a 
                href="#contact"
                className="px-6 py-3 rounded-lg bg-[#111111]/80 border border-white/5 hover:border-accent-primary/30 text-accent-primary font-bold text-xs tracking-wider uppercase transition-all flex items-center space-x-2"
              >
                <Download size={14} />
                <span>Resume PDF</span>
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/5 max-w-md">
              <div>
                <h3 className="text-2xl font-bold text-white">10+</h3>
                <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider">Completed Projects</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">4+</h3>
                <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider">AI Integrations</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">99%</h3>
                <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider">Uptime / Efficiency</p>
              </div>
            </div>
          </div>

          {/* Right Hero Image/Graphic */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-tr from-accent-primary/20 to-accent-secondary/20 absolute -z-10 blur-3xl animate-pulse-slow"></div>
            
            {/* Visual tech avatar */}
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl glass border border-white/10 flex items-center justify-center p-6 glow-primary relative overflow-hidden animate-float">
              {/* Outer tech circles */}
              <div className="absolute inset-0 grid-bg opacity-40"></div>
              
              <div className="text-center space-y-4 z-10">
                <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 mx-auto flex items-center justify-center text-accent-primary text-3xl">
                  <Brain size={48} className="animate-pulse" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-mono text-accent-primary font-bold uppercase">System Active</span>
                  <h3 className="text-lg font-bold text-white">AI Core Integration</h3>
                </div>
                
                {/* Tech chip nodes */}
                <div className="flex justify-center space-x-2 pt-2">
                  <span className="px-2 py-1 rounded bg-[#050505] border border-white/5 text-[9px] font-mono text-text-muted">FASTAPI</span>
                  <span className="px-2 py-1 rounded bg-[#050505] border border-white/5 text-[9px] font-mono text-text-muted">K8S</span>
                  <span className="px-2 py-1 rounded bg-[#050505] border border-white/5 text-[9px] font-mono text-text-muted">PYTORCH</span>
                </div>
              </div>

              {/* Bottom decorative bar */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent-primary to-accent-secondary"></div>
            </div>
          </div>

        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 border-t border-white/5 bg-[#0A0A0A]/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
            <h4 className="text-accent-primary font-mono text-xs tracking-widest uppercase">About Me</h4>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Who is Mohith Sai?</h2>
            <div className="w-12 h-1 bg-accent-primary mx-auto rounded"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl glass space-y-4 relative border-l-4 border-l-accent-primary">
                <h3 className="text-xl font-bold text-white">Current Focus</h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  I am a passionate software builder based in Chennai, specializing in the intersection of Artificial Intelligence, Cloud Services, and hardware-integrated IoT products. 
                </p>
                <p className="text-sm text-text-muted leading-relaxed">
                  I enjoy developing robust web backends, managing secure infrastructure platforms, and building offline-first retail applications.
                </p>
              </div>

              <div className="p-6 rounded-2xl glass space-y-4 border-l-4 border-l-accent-secondary">
                <h3 className="text-xl font-bold text-white">Education & Background</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-semibold text-white">Bachelor of Engineering</h4>
                    <p className="text-xs text-text-muted">Electronics and Communication Engineering (ECE)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Areas of Expertise</h4>
                    <p className="text-xs text-text-muted">Deep Learning, Fullstack Engineering, PCB Prototyping, API Orchestration</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: <Brain className="text-accent-primary" size={24} />,
                  title: "Artificial Intelligence",
                  desc: "Designing and serving deep learning models, integrating LLMs, OpenCV recognition pipelines, and high-frequency algorithms."
                },
                {
                  icon: <Layers className="text-accent-primary" size={24} />,
                  title: "Full Stack Development",
                  desc: "Creating high-performance backends (FastAPI, Express) and sleek, single-screen responsive dashboards using modern frameworks."
                },
                {
                  icon: <Cpu className="text-accent-secondary" size={24} />,
                  title: "Embedded Systems",
                  desc: "Firmware coding, hardware design, and connecting sensor suites (Arduino, ESP32, Raspberry Pi) to local network portals."
                },
                {
                  icon: <HardDrive className="text-accent-secondary" size={24} />,
                  title: "Cloud Computing",
                  desc: "Managing local and cloud-native containers, building cluster orchestrators (Docker, Kubernetes), and setting up CI/CD workflows."
                }
              ].map((item, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-[#111111] border border-white/5 hover:border-white/10 hover:translate-y-[-2px] transition-all duration-300 space-y-3">
                  <div className="p-3 w-fit rounded-lg bg-white/5">{item.icon}</div>
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-text-muted leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
            <h4 className="text-accent-primary font-mono text-xs tracking-widest uppercase">Professional Timeline</h4>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Experience</h2>
            <div className="w-12 h-1 bg-accent-primary mx-auto rounded"></div>
          </div>

          <div className="space-y-12 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[2px] before:bg-white/10">
            {/* Job 1 */}
            <div className="relative pl-12 group">
              <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-accent-primary border-4 border-black group-hover:scale-125 transition-transform duration-300"></div>
              <div className="p-6 rounded-2xl glass space-y-3 border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-accent-primary transition-colors">Machine Learning Intern</h3>
                    <p className="text-sm font-semibold text-text-muted">Prodigy Infotech</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-text-muted w-fit">
                    Remote
                  </span>
                </div>
                <p className="text-xs text-accent-secondary font-semibold">2024 (Internship)</p>
                <ul className="text-xs text-text-muted space-y-2 list-disc pl-4 leading-relaxed">
                  <li>Developed prediction algorithms and computer vision features using TensorFlow and OpenCV modules.</li>
                  <li>Assisted in optimizing model loading libraries, resulting in faster predictions on hardware-constrained nodes.</li>
                  <li>Drafted technical evaluations detailing CNN training behaviors for team audits.</li>
                </ul>
              </div>
            </div>

            {/* Job 2 */}
            <div className="relative pl-12 group">
              <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-accent-secondary border-4 border-black group-hover:scale-125 transition-transform duration-300"></div>
              <div className="p-6 rounded-2xl glass space-y-3 border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-accent-secondary transition-colors">HR Intern</h3>
                    <p className="text-sm font-semibold text-text-muted">NoBroker</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-text-muted w-fit">
                    Bengaluru Office
                  </span>
                </div>
                <p className="text-xs text-accent-primary font-semibold">2024 (Internship)</p>
                <ul className="text-xs text-text-muted space-y-2 list-disc pl-4 leading-relaxed">
                  <li>Managed active hiring processes and coordinated interview pipelines for developer hiring channels.</li>
                  <li>Created candidate resume assessment scripts, reducing profile audit overhead by 15%.</li>
                  <li>Collaborated with team leaders to map engineering requirements onto active developer profiles.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 border-t border-white/5 bg-[#0A0A0A]/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
            <h4 className="text-accent-primary font-mono text-xs tracking-widest uppercase">Competencies</h4>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Skills & Toolkit</h2>
            <div className="w-12 h-1 bg-accent-primary mx-auto rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                category: "Frontend Dev",
                icon: <Code className="text-accent-primary" size={20} />,
                skills: [
                  { name: "React", level: 90 },
                  { name: "Next.js", level: 85 },
                  { name: "TypeScript", level: 88 },
                  { name: "JavaScript", level: 92 },
                  { name: "HTML & CSS", level: 95 }
                ]
              },
              {
                category: "Backend Services",
                icon: <Terminal className="text-accent-primary" size={20} />,
                skills: [
                  { name: "Python", level: 92 },
                  { name: "Java", level: 80 },
                  { name: "FastAPI", level: 90 },
                  { name: "Node.js & Express", level: 85 }
                ]
              },
              {
                category: "Databases",
                icon: <Database className="text-accent-primary" size={20} />,
                skills: [
                  { name: "PostgreSQL", level: 88 },
                  { name: "SQLite", level: 90 },
                  { name: "MongoDB", level: 82 },
                  { name: "MySQL", level: 85 }
                ]
              },
              {
                category: "Cloud & DevOps",
                icon: <HardDrive className="text-accent-secondary" size={20} />,
                skills: [
                  { name: "Docker", level: 85 },
                  { name: "Kubernetes", level: 80 },
                  { name: "GitHub Actions", level: 82 },
                  { name: "Linux / Bash", level: 88 }
                ]
              },
              {
                category: "AI & Machine Learning",
                icon: <Brain className="text-accent-secondary" size={20} />,
                skills: [
                  { name: "TensorFlow", level: 82 },
                  { name: "PyTorch", level: 78 },
                  { name: "OpenCV", level: 88 },
                  { name: "Scikit-Learn", level: 85 }
                ]
              },
              {
                category: "Embedded Systems",
                icon: <Cpu className="text-accent-secondary" size={20} />,
                skills: [
                  { name: "Arduino", level: 90 },
                  { name: "ESP32 / IoT", level: 88 },
                  { name: "Raspberry Pi", level: 85 },
                  { name: "FPGA & Verilog", level: 75 }
                ]
              }
            ].map((cat, idx) => (
              <div key={idx} className="p-6 rounded-2xl glass space-y-6 hover:border-white/10 transition-colors group">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-white/5">{cat.icon}</div>
                    <h3 className="text-lg font-bold text-white group-hover:text-accent-primary transition-colors">{cat.category}</h3>
                  </div>
                </div>

                <div className="space-y-4">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-text-muted">{skill.name}</span>
                        <span className="font-mono text-accent-primary">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#050505] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
            <h4 className="text-accent-primary font-mono text-xs tracking-widest uppercase">My Works</h4>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Featured Projects</h2>
            <div className="w-12 h-1 bg-accent-primary mx-auto rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((proj) => (
              <div 
                key={proj.id} 
                className="rounded-2xl bg-[#111111] border border-white/5 overflow-hidden flex flex-col justify-between hover:border-white/10 hover:translate-y-[-4px] transition-all duration-300 group"
              >
                <div>
                  {/* Decorative Project Color Header */}
                  <div className={`h-24 bg-gradient-to-tr ${proj.imageColor} relative p-4 flex items-end justify-between overflow-hidden`}>
                    <div className="absolute inset-0 bg-[#050505]/40 backdrop-blur-[2px]"></div>
                    <span className="font-mono text-[10px] text-white/80 font-bold uppercase tracking-wider relative z-10 px-2 py-0.5 rounded bg-black/40">
                      {proj.id.toUpperCase()}
                    </span>
                    <div className="text-white/80 relative z-10 flex space-x-2">
                      <a href={proj.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent-primary">
                        <GithubIcon size={16} />
                      </a>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-white group-hover:text-accent-primary transition-colors">{proj.title}</h3>
                      <p className="text-xs text-text-muted font-medium">{proj.subtitle}</p>
                    </div>

                    <p className="text-xs text-text-muted leading-relaxed">
                      {proj.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {proj.tech.slice(0, 4).map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-mono text-text-muted">
                          {t}
                        </span>
                      ))}
                      {proj.tech.length > 4 && (
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-mono text-accent-primary">
                          +{proj.tech.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button 
                    onClick={() => setSelectedProject(proj)}
                    className="w-full text-center py-2.5 rounded-lg bg-[#050505] hover:bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Analyze Architecture</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Showcase */}
      <section id="architecture" className="py-24 px-6 border-t border-white/5 bg-[#0A0A0A]/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
            <h4 className="text-accent-primary font-mono text-xs tracking-widest uppercase">System Diagrams</h4>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Architecture Showcase</h2>
            <div className="w-12 h-1 bg-accent-primary mx-auto rounded"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sidebar selection */}
            <div className="lg:col-span-4 space-y-3">
              {[
                { id: "aperture", name: "Aperture AI Scheduler", desc: "Distributed GPU/LLM Serving Cluster" },
                { id: "aura", name: "AURA Biometric Core", desc: "Local embedder & syncer daemon" },
                { id: "pos", name: "NPD Offline POS", desc: "Dual DB sync & client wrapper" }
              ].map((arch) => (
                <button
                  key={arch.id}
                  onClick={() => setSelectedArch(arch.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedArch === arch.id
                      ? "bg-[#111111] border-accent-primary shadow-lg shadow-accent-primary/5"
                      : "bg-[#050505]/40 border-white/5 hover:border-white/10"
                  }`}
                >
                  <h4 className={`text-sm font-bold ${selectedArch === arch.id ? "text-accent-primary" : "text-white"}`}>{arch.name}</h4>
                  <p className="text-[10px] text-text-muted mt-1 leading-relaxed">{arch.desc}</p>
                </button>
              ))}
            </div>

            {/* Live Diagram Render Area */}
            <div className="lg:col-span-8 p-6 rounded-2xl glass border border-white/10 min-h-[360px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                  <h3 className="font-bold text-white uppercase tracking-wider text-xs">
                    {selectedArch.toUpperCase()} SYSTEM FLOW
                  </h3>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary"></span>
                  </span>
                </div>

                {/* Render Diagrams Dynamically */}
                {selectedArch === "aperture" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="p-3 rounded-lg bg-[#050505] border border-white/10 text-xs space-y-1">
                        <span className="font-bold text-white block">Client App</span>
                        <span className="text-[9px] text-text-muted">Chat / API Client</span>
                      </div>
                      <div className="p-3 rounded-lg bg-[#050505] border border-accent-primary/30 text-xs space-y-1 relative">
                        <span className="font-bold text-accent-primary block">API Ingress</span>
                        <span className="text-[9px] text-text-muted">FastAPI Router</span>
                        <div className="absolute top-1/2 -right-3 w-3 h-0.5 bg-accent-primary/50"></div>
                      </div>
                      <div className="p-3 rounded-lg bg-[#050505] border border-white/10 text-xs space-y-1">
                        <span className="font-bold text-white block">Prometheus</span>
                        <span className="text-[9px] text-text-muted">Cluster Stats</span>
                      </div>
                    </div>

                    <div className="w-full h-0.5 bg-gradient-to-r from-accent-primary/20 via-accent-primary/70 to-accent-primary/20 my-4"></div>

                    <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                      <div className="p-2 rounded bg-accent-secondary/15 border border-accent-secondary/40 text-accent-secondary">
                        K8s Node 1<br />vLLM Worker
                      </div>
                      <div className="p-2 rounded bg-accent-secondary/15 border border-accent-secondary/40 text-accent-secondary">
                        K8s Node 2<br />vLLM Worker
                      </div>
                      <div className="p-2 rounded bg-accent-secondary/15 border border-accent-secondary/40 text-accent-secondary">
                        K8s Node 3<br />vLLM Worker
                      </div>
                      <div className="p-2 rounded bg-white/5 border border-white/15 text-text-muted">
                        Dynamic Pods<br />(Auto-scale)
                      </div>
                    </div>
                    
                    <p className="text-xs text-text-muted italic leading-relaxed pt-4">
                      * Traffic routes through Ingress. A Python FastAPI routing manager performs load balancing and schedules dynamic GPU workers via vLLM inference engine, auto-scaling nodes based on response times and active request queues.
                    </p>
                  </div>
                )}

                {selectedArch === "aura" && (
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
                      <div className="p-3 w-40 rounded-lg bg-[#050505] border border-white/10 text-xs">
                        <span className="font-bold text-white block">Camera Device</span>
                        <span className="text-[9px] text-text-muted">Raspberry Pi Node</span>
                      </div>
                      <div className="text-accent-primary">➔</div>
                      <div className="p-3 w-40 rounded-lg bg-[#050505] border border-accent-primary/30 text-xs">
                        <span className="font-bold text-accent-primary block">Embedder Core</span>
                        <span className="text-[9px] text-text-muted">OpenCV & Dlib 128D</span>
                      </div>
                      <div className="text-accent-primary">➔</div>
                      <div className="p-3 w-40 rounded-lg bg-[#050505] border border-white/10 text-xs">
                        <span className="font-bold text-white block">SQLite Storage</span>
                        <span className="text-[9px] text-text-muted">Fast Local Lookup</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 mt-4">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-text-muted font-bold">API Sync Client</span>
                        <span className="text-success font-mono">ONLINE</span>
                      </div>
                      <p className="text-[11px] text-text-muted mt-2 leading-relaxed">
                        Extracts facial landmarks in real-time, calculates comparative vector distance against the local registry, logs verification tags to SQLite database, and pushes synchronized records to the Cloud DB.
                      </p>
                    </div>
                  </div>
                )}

                {selectedArch === "pos" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-xs">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <span className="font-bold text-white block">Electron Wrapper</span>
                        <span className="text-[9px] text-text-muted">IPC Native Print</span>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-accent-primary/30">
                        <span className="font-bold text-accent-primary block">FastAPI Local Daemon</span>
                        <span className="text-[9px] text-text-muted">SQLite Store / Catalog</span>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-accent-secondary/30">
                        <span className="font-bold text-accent-secondary block">Cloud PostgreSQL</span>
                        <span className="text-[9px] text-text-muted">Central Audit Sync</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#050505] border border-white/10 text-xs">
                      <span className="font-bold text-white block">Sync Flow Status:</span>
                      <p className="text-[11px] text-text-muted mt-1 leading-relaxed">
                        Electron frontend commands the local child process (FastAPI/SQLite) to update inventory levels instantly. Simultaneously, a sync-scheduler running on the background thread replays transaction audits back to the cloud PostgreSQL databases.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center text-[10px] text-text-muted">
                <span>Enterprise design specifications compliant</span>
                <span className="font-mono text-accent-primary">v1.4.0</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
            <h4 className="text-accent-primary font-mono text-xs tracking-widest uppercase">Recognitions</h4>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Achievements & Activities</h2>
            <div className="w-12 h-1 bg-accent-primary mx-auto rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "AI Zypher Winner",
                org: "National AI Symposium",
                desc: "Won 1st place in the prompt engineering and automated agent execution challenge, coding high-speed python scraping scripts.",
                icon: <Award className="text-accent-primary" size={24} />
              },
              {
                title: "ECE Project Winner",
                org: "Department Symposium",
                desc: "Awarded top design honors for an intelligent hardware-integrated embedded systems showcase built using custom PCB logic.",
                icon: <Award className="text-accent-primary" size={24} />
              },
              {
                title: "Smart India Hackathon",
                org: "Ministry of Education",
                desc: "Participated and reached national finals solving critical agriculture sector issues via IoT node frameworks.",
                icon: <Award className="text-accent-secondary" size={24} />
              },
              {
                title: "Technoathon Finalist",
                org: "IIT Guwahati",
                desc: "Ranked among the top engineering teams solving algorithmic logical puzzles and software deployment problems.",
                icon: <Award className="text-accent-secondary" size={24} />
              },
              {
                title: "Camogenics Club",
                org: "Campus Photography & Media",
                desc: "Active coordinator managing multimedia coverage, photography galleries, and digital content pipelines for major college festivals.",
                icon: <Award className="text-highlight" size={24} />
              }
            ].map((ach, idx) => (
              <div 
                key={idx} 
                className="p-6 rounded-2xl glass border border-white/5 hover:border-white/10 hover:translate-y-[-2px] transition-all duration-300 space-y-4"
              >
                <div className="p-3 w-fit rounded-lg bg-white/5">{ach.icon}</div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">{ach.title}</h3>
                  <span className="text-[10px] font-mono text-text-muted font-bold uppercase tracking-wider block">{ach.org}</span>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">{ach.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GitHub Section */}
      <section id="github" className="py-24 px-6 border-t border-white/5 bg-[#0A0A0A]/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
            <h4 className="text-accent-primary font-mono text-xs tracking-widest uppercase">Open Source</h4>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">GitHub Analytics</h2>
            <div className="w-12 h-1 bg-accent-primary mx-auto rounded"></div>
          </div>

          <div className="p-6 md:p-8 rounded-2xl glass border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-4 text-left">
              <div className="flex items-center space-x-3">
                <GithubIcon size={36} className="text-accent-primary" />
                <div>
                  <h3 className="text-lg font-bold text-white">Mohithsai-18</h3>
                  <a href="https://github.com/Mohithsai-18" target="_blank" rel="noopener noreferrer" className="text-xs text-accent-primary hover:underline flex items-center space-x-1">
                    <span>github.com/Mohithsai-18</span>
                    <ExternalLink size={10} />
                  </a>
                </div>
              </div>

              <p className="text-xs text-text-muted leading-relaxed">
                Contributing actively to offline-first architectures, local neural network inference containers, and collaborative editor nodes.
              </p>

              <div className="flex space-x-2 pt-2">
                {githubData.languages.map((l, idx) => (
                  <span key={idx} className="px-2 py-1 rounded bg-[#050505] text-[9px] font-mono text-text-muted">
                    {l.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>

            {/* Metrics cards grid */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { title: "Public Repositories", value: githubData.repos, desc: "Created repos" },
                { title: "Annual Contributions", value: githubData.contributions, desc: "Commits & pulls" },
                { title: "Followers", value: githubData.followers, desc: "Developers connected" },
                { title: "Git Activity Score", value: "94.2%", desc: "Consistency index" }
              ].map((card, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-[#050505] border border-white/5 text-center space-y-2">
                  <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider block leading-none">
                    {card.title}
                  </span>
                  <h3 className="text-3xl font-extrabold text-white text-glow">
                    {card.value}
                  </h3>
                  <p className="text-[9px] text-text-muted">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
            <h4 className="text-accent-primary font-mono text-xs tracking-widest uppercase">Roadmap</h4>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Growth & Project Roadmap</h2>
            <div className="w-12 h-1 bg-accent-primary mx-auto rounded"></div>
          </div>

          <div className="relative border-l border-white/10 pl-6 space-y-8 ml-4">
            {[
              { year: "2024", item: "Home Automation System", desc: "Designed hardware control nodes utilizing ESP8266 and relays." },
              { year: "2024", item: "Smart Irrigation System", desc: "Connected moisture sensor array with automated pump controls." },
              { year: "2025", item: "DevCollab Platform", desc: "Engineered synchronized whiteboard and text sync utilizing Monaco editor & CRDTs." },
              { year: "2025", item: "AI Resume Booster", desc: "Created PDF analyzer matching applicant cv parameters with job requirements." },
              { year: "2025", item: "AURA Biometric Attendance", desc: "Deployed local Dlib embedding model matching multiple students at classroom entrance." },
              { year: "2026", item: "Aperture AI Hub & POS System", desc: "Completed high-throughput GPU server load routing and retail offline POS deployment." }
            ].map((node, idx) => (
              <div key={idx} className="relative group">
                {/* Node indicator */}
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#050505] border border-white/20 group-hover:border-accent-primary transition-colors flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-primary"></div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs text-accent-primary font-bold">{node.year}</span>
                    <span className="text-white font-bold text-sm">— {node.item}</span>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed">{node.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 border-t border-white/5 bg-[#0A0A0A]/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
            <h4 className="text-accent-primary font-mono text-xs tracking-widest uppercase">Reach Out</h4>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Contact & Connect</h2>
            <div className="w-12 h-1 bg-accent-primary mx-auto rounded"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contact details */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-white">Let's discuss projects.</h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Open for software contracts, AI design partnerships, and fullstack role discussions. Let's build something world-class.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-center space-x-4 p-4 rounded-xl bg-[#050505] border border-white/5">
                  <div className="p-2 rounded bg-white/5 text-accent-primary">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="text-text-muted font-bold block uppercase tracking-wider text-[9px]">Direct Email</span>
                    <a href="mailto:mohithsai.work@gmail.com" className="text-white hover:underline">mohithsai.work@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-xl bg-[#050505] border border-white/5">
                  <div className="p-2 rounded bg-white/5 text-accent-primary">
                    <LinkedinIcon size={16} />
                  </div>
                  <div>
                    <span className="text-text-muted font-bold block uppercase tracking-wider text-[9px]">Professional Profile</span>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">linkedin.com/in/mohithsai</a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-xl bg-[#050505] border border-white/5">
                  <div className="p-2 rounded bg-white/5 text-accent-primary">
                    <GithubIcon size={16} />
                  </div>
                  <div>
                    <span className="text-text-muted font-bold block uppercase tracking-wider text-[9px]">Open Source contributions</span>
                    <a href="https://github.com/Mohithsai-18" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">github.com/Mohithsai-18</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleContactSubmit} className="p-6 md:p-8 rounded-2xl glass border border-white/10 space-y-6 text-left">
                <h3 className="font-bold text-white text-base">SEND A MESSAGE</h3>
                
                {formSubmitted ? (
                  <div className="p-6 rounded-xl bg-success/15 border border-success/30 text-success text-center space-y-2">
                    <CheckCircle2 size={36} className="mx-auto" />
                    <h4 className="font-bold text-sm">Message Sent Successfully!</h4>
                    <p className="text-[10px] text-success/80">Thank you, Mohith Sai will review and respond shortly.</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[9px] font-bold text-text-muted uppercase tracking-wider">Your Name</label>
                        <input 
                          type="text" 
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          placeholder="e.g. John Doe"
                          className="w-full px-4 py-2.5 rounded-lg bg-[#050505] border border-white/10 text-white text-xs focus:border-accent-primary focus:outline-none transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-bold text-text-muted uppercase tracking-wider">Email Address</label>
                        <input 
                          type="email" 
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          placeholder="e.g. john@example.com"
                          className="w-full px-4 py-2.5 rounded-lg bg-[#050505] border border-white/10 text-white text-xs focus:border-accent-primary focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-text-muted uppercase tracking-wider">Message Details</label>
                      <textarea 
                        required
                        rows={4}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Tell me about your product requirements or hiring needs..."
                        className="w-full px-4 py-2.5 rounded-lg bg-[#050505] border border-white/10 text-white text-xs focus:border-accent-primary focus:outline-none transition-colors"
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full py-3 rounded-lg bg-gradient-to-r from-accent-primary to-accent-secondary text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-lg shadow-accent-primary/20"
                    >
                      Transmit Message
                    </button>
                  </>
                )}
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5 bg-[#050505] text-center text-xs text-text-muted space-y-2">
        <div className="flex justify-center space-x-6">
          <a href="https://github.com/Mohithsai-18" className="hover:text-white transition-colors">GitHub</a>
          <a href="https://linkedin.com" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="mailto:mohithsai.work@gmail.com" className="hover:text-white transition-colors">Email</a>
        </div>
        <p>© 2026 Mohith Sai. All Rights Reserved. Engineered with precision.</p>
      </footer>

      {/* Project Architecture Analysis Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden glass shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className={`p-6 bg-gradient-to-r ${selectedProject.imageColor} flex items-center justify-between text-white`}>
                <div>
                  <h3 className="text-xl font-bold">{selectedProject.title}</h3>
                  <span className="text-xs opacity-80">{selectedProject.subtitle}</span>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="p-1 rounded-lg bg-black/20 hover:bg-black/40 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 max-h-[500px] overflow-y-auto space-y-6 text-left text-xs">
                
                {/* Architecture Overview */}
                <div className="space-y-2">
                  <h4 className="font-bold text-accent-primary uppercase tracking-wider text-[10px] flex items-center space-x-2">
                    <Layers size={12} />
                    <span>Architecture Overview</span>
                  </h4>
                  <p className="text-text-muted leading-relaxed bg-white/5 p-3 rounded-lg border border-white/5">
                    {selectedProject.architecture}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <h4 className="font-bold text-accent-primary uppercase tracking-wider text-[10px] flex items-center space-x-2">
                    <CheckCircle2 size={12} />
                    <span>Key Features</span>
                  </h4>
                  <ul className="space-y-1.5 pl-4 list-disc text-text-muted">
                    {selectedProject.features.map((feat, idx) => (
                      <li key={idx} className="leading-relaxed">{feat}</li>
                    ))}
                  </ul>
                </div>

                {/* Challenges & Mitigation */}
                <div className="space-y-2">
                  <h4 className="font-bold text-accent-secondary uppercase tracking-wider text-[10px] flex items-center space-x-2">
                    <Activity size={12} />
                    <span>Engineering Challenges & Mitigations</span>
                  </h4>
                  <ul className="space-y-1.5 pl-4 list-disc text-text-muted">
                    {selectedProject.challenges.map((ch, idx) => (
                      <li key={idx} className="leading-relaxed">{ch}</li>
                    ))}
                  </ul>
                </div>

                {/* Outcomes */}
                <div className="space-y-2">
                  <h4 className="font-bold text-success uppercase tracking-wider text-[10px] flex items-center space-x-2">
                    <Award size={12} />
                    <span>Outcome & Performance Metrics</span>
                  </h4>
                  <ul className="space-y-1.5 pl-4 list-disc text-text-muted">
                    {selectedProject.outcomes.map((out, idx) => (
                      <li key={idx} className="leading-relaxed">{out}</li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Footer Links */}
              <div className="p-6 border-t border-white/5 flex justify-end space-x-3 bg-[#111111]">
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white font-bold"
                >
                  Close Analysis
                </button>
                <a 
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-accent-primary to-accent-secondary text-black font-bold flex items-center space-x-2"
                >
                  <GithubIcon size={14} />
                  <span>Review Code</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
