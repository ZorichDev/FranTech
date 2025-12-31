import { useState, useEffect } from 'react';
import { 
  FaGithub, 
  FaLinkedinIn, 
  FaExternalLinkSquareAlt, 
  FaDownload,
  FaChartLine,
  FaUsers,
  FaCode,
  FaServer,
  FaCheckCircle,
  FaReact,
  FaJs,
  FaCss3Alt,
  FaWhatsapp // Added WhatsApp icon
} from 'react-icons/fa';
import { BsMenuUp, BsArrowUp } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { 
  IoMailUnread, 
  IoStatsChart, 
  IoAnalytics, 
  IoMail,
  IoLogoJavascript,
  IoColorPalette
} from "react-icons/io5";
import { 
  MdDashboard, 
  MdShowChart, 
  MdTrendingUp, 
  MdVerifiedUser,
  MdDesignServices
} from "react-icons/md";
import emailjs from 'emailjs-com';
import profileIMG from "./img/techboy.jpg"; 
import Resume from "./img/franzor cv.pdf";
import certificate from "./img/TECHACADEMY.pdf";
import ecommerce from "./img/E-Commerce.PNG";
import pospadi from "./img/pospadi.PNG";
import betahomes from "./img/betahomes.PNG";
import freelancer from "./img/franzor.PNG";
import IT from "./img/IT.PNG";
import cyjust from "./img/cyjust.PNG";
import rprogropmycer from "./img/rprogropmycer.pdf";
import internpulsecer from "./img/internpulsecer.png";

// Production Dashboard Component
export default function FrontendDeveloperPortfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState([]);
  
  // Handle scroll to update active navigation section
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      
      const sections = ['home', 'dashboard', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulate API data fetch
  useEffect(() => {
    // Mock analytics data
    const mockData = [
      { month: 'Jan', projects: 12, clients: 8, satisfaction: 85 },
      { month: 'Feb', projects: 15, clients: 12, satisfaction: 88 },
      { month: 'Mar', projects: 18, clients: 15, satisfaction: 92 },
      { month: 'Apr', projects: 22, clients: 18, satisfaction: 89 },
      { month: 'May', projects: 28, clients: 24, satisfaction: 94 },
      { month: 'Jun', projects: 32, clients: 28, satisfaction: 96 }
    ];
    setAnalyticsData(mockData);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (!element) return;
    
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUser({ name: "Demo User", email: "demo@example.com" });
      setShowAuth(false);
      setLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-200 font-sans">
      {/* Header/Navigation */}
      <header className="fixed w-full bg-black/95 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter">
            <span className="text-red-600">Fran</span>Tech<span className="text-red-600">Dev</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {['home', 'dashboard', 'projects', 'skills', 'contact'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item)}
                className={`capitalize text-sm font-medium transition-colors hover:text-red-500 ${
                  activeSection === item ? 'text-red-500' : 'text-gray-300'
                }`}
              >
                {item}
              </button>
            ))}
            
            {user ? (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-sm font-bold">
                  {user.name.charAt(0)}
                </div>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-semibold transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowAuth(true)}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg text-sm font-semibold transition-colors"
              >
                Sign In
              </button>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden focus:outline-none text-gray-300"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaXTwitter size={24} /> : <BsMenuUp size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden bg-gray-900/95 backdrop-blur-sm py-4 px-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              {['home', 'dashboard', 'projects', 'skills', 'contact'].map((item) => (
                <button 
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize text-sm font-medium transition-colors hover:text-red-600 ${
                    activeSection === item ? 'text-red-600' : 'text-gray-300'
                  }`}
                >
                  {item}
                </button>
              ))}
              
              {user ? (
                <>
                  <div className="pt-4 border-t border-gray-800">
                    <div className="py-2 text-gray-400">Logged in as {user.name}</div>
                    <button 
                      onClick={handleLogout}
                      className="w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-semibold transition-colors mt-2"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <button 
                  onClick={() => setShowAuth(true)}
                  className="w-full px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg text-sm font-semibold transition-colors mt-2"
                >
                  Sign In
                </button>
              )}
            </div>
          </nav>
        )}
      </header>

      {/* Auth Modal */}
      {showAuth && (
        <AuthModal onClose={() => setShowAuth(false)} onLogin={handleLogin} loading={loading} />
      )}

      {/* Hero Section - Frontend Focus */}
      <section 
        id="home" 
        className="min-h-screen flex items-center pt-20 pb-16 px-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-blue-500/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left Content */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Open for Frontend Opportunities
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="block text-white mb-2">Crafting Digital</span>
                  <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                    Experiences
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-300 max-w-lg">
                  I'm <span className="text-red-400 font-semibold">Francis Chinazor</span>, a passionate Frontend Developer specializing in 
                  <span className="text-blue-400 font-semibold"> React</span>, 
                  <span className="text-yellow-400 font-semibold"> JavaScript</span>, and creating
                  <span className="text-green-400 font-semibold"> pixel-perfect UIs</span>.
                </p>
                
                {/* Frontend KPIs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
                  <KPICard 
                    icon={<FaReact className="text-cyan-400" size={24} />}
                    value="45+"
                    label="React Projects"
                    trend="+12%"
                  />
                  <KPICard 
                    icon={<IoLogoJavascript className="text-yellow-400" size={24} />}
                    value="98%"
                    label="Code Quality"
                    trend="+5%"
                  />
                  <KPICard 
                    icon={<MdDesignServices className="text-purple-400" size={24} />}
                    value="50+"
                    label="UI Designs"
                    trend="+8%"
                  />
                  <KPICard 
                    icon={<FaUsers className="text-green-400" size={24} />}
                    value="32"
                    label="Happy Clients"
                    trend="+3"
                  />
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                  <button 
                    onClick={() => scrollToSection('projects')}
                    className="group px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-semibold
                              hover:from-red-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300
                              shadow-lg hover:shadow-xl hover:shadow-red-500/25"
                  >
                    <span className="flex items-center gap-2">
                      View My Work
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </span>
                  </button>
                  
                  <a
                    href={Resume} 
                    download
                    className="group px-8 py-4 border-2 border-gray-700 text-gray-300 rounded-xl font-semibold
                              hover:border-red-500 hover:text-white transition-all duration-300 flex items-center gap-3"
                  >
                    <FaDownload size={18} className="group-hover:animate-bounce" />
                    Download CV
                  </a>
                </div>
                
                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-3 pt-4">
                  {[
                    { name: "React", color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
                    { name: "JavaScript", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
                    { name: "TypeScript", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
                    { name: "Tailwind CSS", color: "bg-teal-500/10 text-teal-400 border-teal-500/20" },
                    { name: "Next.js", color: "bg-gray-500/10 text-gray-300 border-gray-500/20" },
                  ].map((tech, index) => (
                    <span 
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${tech.color}`}
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Content - Profile */}
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative">
                {/* Main Profile Image */}
                <div className="relative w-72 h-72 md:w-96 md:h-96">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-blue-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-red-500 shadow-2xl">
                    <img 
                      src={profileIMG}
                      alt="Francis Chinazor - Frontend Developer" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Status Card */}
                <div className="absolute -bottom-6 -right-6 bg-gray-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-700 max-w-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <p className="text-sm font-medium text-gray-300">Currently Building</p>
                  </div>
                  <a 
                    href="https://tekkbridge.vercel.app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-red-400 font-bold text-lg hover:text-red-300 transition-colors duration-300 hover:underline"
                  >
                    Interactive Dashboard
                  </a>
                  <p className="text-sm text-gray-400 mt-2">
                    React • Tailwind • Recharts • API Integration
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Section - Frontend Analytics */}
      <section 
        id="dashboard" 
        className="py-24 bg-gradient-to-b from-gray-900 to-slate-900"
      >
        <div className="container mx-auto px-6">
          <SectionHeader 
            title="Development Analytics" 
            subtitle="Track my frontend development progress"
            className="text-center mb-16" 
          />
          
          {/* Dashboard Stats */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard 
              title="Completed Projects"
              value="45"
              change="+12"
              icon={<MdShowChart className="text-green-400" size={24} />}
              color="green"
            />
            <StatCard 
              title="Client Satisfaction"
              value="98%"
              change="+2%"
              icon={<FaUsers className="text-blue-400" size={24} />}
              color="blue"
            />
            <StatCard 
              title="Code Quality"
              value="96/100"
              change="+4"
              icon={<FaCode className="text-purple-400" size={24} />}
              color="purple"
            />
            <StatCard 
              title="Response Time"
              value="< 24h"
              change="-2h"
              icon={<IoAnalytics className="text-red-400" size={24} />}
              color="red"
            />
          </div>
          
          {/* Charts Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                <FaChartLine className="text-red-400" />
                Project Timeline
              </h3>
              <div className="h-64">
                <SimpleChart data={analyticsData} dataKey="projects" color="#ef4444" />
              </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                <IoStatsChart className="text-blue-400" />
                Client Satisfaction
              </h3>
              <div className="h-64">
                <SimpleChart data={analyticsData} dataKey="satisfaction" color="#3b82f6" />
              </div>
            </div>
          </div>
          
          {/* Frontend Skills Metrics */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6 text-white text-center">Frontend Expertise</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "React Development", level: 95, description: "Hooks, Context, Custom Hooks" },
                { name: "JavaScript/TypeScript", level: 90, description: "ES6+, Modern Patterns" },
                { name: "UI/UX Design", level: 88, description: "Figma, Responsive Design" },
                { name: "CSS/Tailwind", level: 92, description: "Animations, Responsive" },
                { name: "API Integration", level: 85, description: "REST, GraphQL, WebSocket" },
                { name: "Performance", level: 90, description: "Optimization, Lighthouse" }
              ].map((skill, i) => (
                <div key={i} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-white">{skill.name}</h4>
                      <p className="text-sm text-gray-400">{skill.description}</p>
                    </div>
                    <span className="text-2xl font-bold text-red-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section 
        id="projects" 
        className="py-24 bg-gradient-to-b from-black to-gray-900"
      >
        <div className="container mx-auto px-6">
          <SectionHeader 
            title="Frontend Projects" 
            subtitle="Interactive web applications and dashboards"
            className="text-center mb-16" 
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard 
              title="E-Commerce Platform"
              category="React Dashboard"
              image={ecommerce}
              description="Modern e-commerce interface with product filtering and cart functionality"
              techStack={["React", "Context API", "Tailwind", "Stripe"]}
              metrics={{ users: "50K+", rating: "4.8/5", speed: "95%" }}
              liveLink="https://paintlifeltd.com/"
              repoLink="https://github.com/ZorichDev"
            />
            <ProjectCard 
              title="FinTech Dashboard"
              category="Real-time UI"
              image={pospadi}
              description="Interactive financial dashboard with real-time charts and data visualization"
              techStack={["React", "TypeScript", "Chart.js", "WebSocket"]}
              metrics={{ accuracy: "99.9%", speed: "0.2s", users: "25K" }}
              liveLink="https://pospadi.com.ng"
              repoLink="https://github.com/InternPulse-Frontend-March-2025"
            />
            <ProjectCard 
              title="Real Estate Platform"
              category="Responsive Web App"
              image={betahomes}
              description="Property listing platform with interactive maps and virtual tours"
              techStack={["React", "Tailwind", "Google Maps", "3D.js"]}
              metrics={{ properties: "5K+", views: "500K", mobile: "100%" }}
              liveLink="https://betamerchanthomesandmore.com/"
              repoLink="https://github.com/ZorichDev"
            />
            <ProjectCard 
              title="IT Solutions Hub"
              category="Admin Dashboard"
              image={IT}
              description="Service management dashboard with ticket system and analytics"
              techStack={["React", "Node.js", "PostgreSQL", "Redis"]}
              metrics={{ tickets: "100K+", clients: "200+", uptime: "99.9%" }}
              liveLink="https://iprolance-solutions.cyjustdeals.com/"
              repoLink="https://github.com/ZorichDev"
            />
            <ProjectCard 
              title="Finance Dashboard"
              category="Data Visualization"
              image={freelancer}
              description="Personal finance tracker with interactive charts and budgeting tools"
              techStack={["React", "Chakra UI", "Chart.js", "LocalStorage"]}
              metrics={{ users: "10K+", rating: "4.7/5", load: "0.3s" }}
              liveLink="https://freelancer-dashboard5.netlify.app/profile"
              repoLink="https://github.com/ZorichDev/Freelancer-Dashboard5"
            />
            <ProjectCard 
              title="Branding Platform"
              category="E-commerce UI"
              image={cyjust}
              description="Modern e-commerce interface with product catalog and checkout"
              techStack={["HTML", "CSS", "Bootstrap", "JavaScript"]}
              metrics={{ visitors: "100K+", sales: "$500K+", mobile: "95%" }}
              liveLink="https://www.cyjustdeals.com/"
              repoLink="https://github.com/Efezino218/cyjust_deals"
            />
          </div>
          
          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-12">
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  page === 1
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section - Frontend Focus */}
      <section 
        id="skills" 
        className="py-24 bg-gradient-to-b from-gray-900 to-slate-900"
      >
        <div className="container mx-auto px-6">
          <SectionHeader 
            title="Frontend Stack" 
            subtitle="Technologies I use to build modern web applications"
            className="text-center mb-16" 
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <FaReact className="text-cyan-400" size={32} />, name: "React Ecosystem", desc: "Hooks, Context, Redux, Next.js" },
              { icon: <IoLogoJavascript className="text-yellow-400" size={32} />, name: "JavaScript", desc: "ES6+, TypeScript, Modern Patterns" },
              { icon: <FaCss3Alt className="text-blue-400" size={32} />, name: "Styling", desc: "Tailwind, CSS3, SASS, Styled Components" },
              { icon: <IoColorPalette className="text-purple-400" size={32} />, name: "UI/UX Design", desc: "Figma, Responsive Design, Accessibility" },
              { icon: <MdDashboard className="text-green-400" size={32} />, name: "State Management", desc: "Context API, Redux, Zustand" },
              { icon: <FaChartLine className="text-red-400" size={32} />, name: "Data Visualization", desc: "Chart.js, D3.js, Recharts" },
              { icon: <FaServer className="text-orange-400" size={32} />, name: "API Integration", desc: "REST, GraphQL, WebSocket, Axios" },
              { icon: <MdVerifiedUser className="text-teal-400" size={32} />, name: "Performance", desc: "Lighthouse, Bundle Optimization" }
            ].map((skill, i) => (
              <div key={i} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-red-500 transition-all group hover:transform hover:scale-105">
                <div className="mb-4">{skill.icon}</div>
                <h3 className="font-bold text-white mb-2">{skill.name}</h3>
                <p className="text-sm text-gray-400">{skill.desc}</p>
              </div>
            ))}
          </div>
          
          {/* Additional Skills */}
          <div className="mt-12 bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-white">Additional Skills</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Git/GitHub", "Responsive Design", "Web Performance", "SEO", "Testing", "Dev Tools", "CI/CD", "Agile/Scrum"].map((skill, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-gray-800/50 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-300">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        className="py-24 bg-gradient-to-b from-black to-gray-900"
      >
        <div className="container mx-auto px-6">
          <SectionHeader 
            title="Let's Build Together" 
            subtitle="Have a project in mind? Let's create something amazing"
            className="text-center mb-16" 
          />
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">Get In Touch</h3>
              
              <div className="space-y-6 mb-8">
                <ContactInfo 
                  icon={<IoMail className="text-red-400" size={24} />}
                  title="Email"
                  content="francis1chinazor@gmail.com"
                  href="mailto:francis1chinazor@gmail.com"
                />
                
                <ContactInfo 
                  icon={<FaLinkedinIn className="text-blue-400" size={24} />}
                  title="LinkedIn"
                  content="Francis Chinazor"
                  href="https://www.linkedin.com/in/francis-chinazor-081b8933b"
                />
                
                <ContactInfo 
                  icon={<FaGithub className="text-gray-300" size={24} />}
                  title="GitHub"
                  content="@ZorichDev"
                  href="https://github.com/ZorichDev"
                />
              </div>
              
              <div className="bg-gradient-to-r from-red-900/20 to-blue-900/20 border border-red-500/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <h4 className="font-bold text-white">Currently Available</h4>
                </div>
                <p className="text-gray-400 text-sm">
                  Open to frontend developer roles, freelance projects, and collaborations. 
                  I'm passionate about creating beautiful, functional user interfaces.
                </p>
                <div className="flex gap-2 mt-4">
                  <span className="px-3 py-1 bg-red-500/10 text-red-400 text-xs rounded-full">Remote</span>
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full">Full-time</span>
                  <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs rounded-full">Freelance</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-white">Send a Message</h3>
              
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-t from-gray-900 to-black border-t border-gray-800 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold mb-4">
                <span className="text-red-600">Fran</span>Tech<span className="text-red-600">Dev</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Frontend Developer specializing in React, JavaScript, and creating exceptional user experiences.
              </p>
              <div className="flex gap-3">
                <a href="https://github.com/ZorichDev" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <FaGithub size={20} />
                </a>
                <a href="https://www.linkedin.com/in/francis-chinazor-081b8933b" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <FaLinkedinIn size={20} />
                </a>
                <a href="mailto:francis1chinazor@gmail.com" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <IoMailUnread size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-white">Quick Links</h4>
              <div className="space-y-2">
                {['Home', 'Dashboard', 'Projects', 'Skills', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block text-gray-400 hover:text-red-400 transition-colors text-sm text-left"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-white">Resources</h4>
              <div className="space-y-2">
                <a href={Resume} download className="block text-gray-400 hover:text-red-400 transition-colors text-sm flex items-center gap-2">
                  <FaDownload size={14} /> Download Resume
                </a>
                <a href={certificate} download className="block text-gray-400 hover:text-red-400 transition-colors text-sm flex items-center gap-2">
                  <FaDownload size={14} /> View Certificates
                </a>
                <a href="https://github.com/ZorichDev" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-red-400 transition-colors text-sm flex items-center gap-2">
                  <FaGithub size={14} /> GitHub Portfolio
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Francis Chinazor. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Built with ❤️ using React & Tailwind CSS
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/2349069246577"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-4 md:right-8 z-40 group"
        aria-label="Chat on WhatsApp"
      >
        <div className="relative">
          {/* Glowing effect */}
          <div className="absolute -inset-3 bg-green-500 rounded-full blur opacity-70 animate-pulse"></div>
          {/* Main button */}
          <div className="relative w-12 h-12 md:w-14 md:h-14 bg-green-500 rounded-full flex items-center justify-center shadow-xl hover:bg-green-600 hover:scale-110 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-green-500/50">
            <FaWhatsapp size={24} className="md:size-28 text-white" />
          </div>
          {/* Tooltip - hidden on mobile, shown on desktop */}
          <div className="hidden md:block absolute right-16 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-sm py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-gray-700">
            Chat on WhatsApp
            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1 w-2 h-2 bg-gray-800 rotate-45 border-r border-b border-gray-700"></div>
          </div>
        </div>
      </a>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-full shadow-lg transition-all z-40 group"
          aria-label="Scroll to top"
        >
          <BsArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
        </button>
      )}
    </div>
  );
}

// Auth Modal Component
function AuthModal({ onClose, onLogin, loading }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl border border-gray-800 max-w-md w-full p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <FaXTwitter size={24} />
        </button>
        
        <h2 className="text-3xl font-bold mb-6 text-white">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="John Doe"
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="your@email.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-semibold hover:from-red-600 hover:to-orange-600 transition-all disabled:opacity-50"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-red-400 hover:text-red-300 text-sm"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Simple Chart Component
function SimpleChart({ data, dataKey, color }) {
  const maxValue = Math.max(...data.map(item => item[dataKey]));
  const minValue = Math.min(...data.map(item => item[dataKey]));
  const range = maxValue - minValue;
  
  return (
    <div className="relative h-full">
      {/* Grid lines */}
      <div className="absolute inset-0 flex flex-col justify-between">
        {[100, 75, 50, 25, 0].map((percent, i) => (
          <div key={i} className="border-t border-gray-700"></div>
        ))}
      </div>
      
      {/* Chart line */}
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`gradient-${dataKey}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Area */}
        <polyline
          points={data.map((item, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - ((item[dataKey] - minValue) / range) * 80;
            return `${x},${y}`;
          }).join(' ')}
          fill={`url(#gradient-${dataKey})`}
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        
        {/* Dots */}
        {data.map((item, index) => {
          const x = (index / (data.length - 1)) * 100;
          const y = 100 - ((item[dataKey] - minValue) / range) * 80;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="3"
              fill={color}
              className="cursor-pointer"
            />
          );
        })}
      </svg>
      
      {/* Labels */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400">
        {data.map((item, index) => (
          <span key={index}>{item.month}</span>
        ))}
      </div>
    </div>
  );
}

// Project Card Component
function ProjectCard({ title, category, image, description, techStack, metrics, liveLink, repoLink }) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-red-500 transition-all group hover:transform hover:scale-[1.02]">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full text-xs font-semibold">
          {category}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-red-400 transition-colors">{title}</h3>
        <p className="text-gray-400 text-sm mb-4">{description}</p>
        
        <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-700">
          {Object.entries(metrics).map(([key, value]) => (
            <div key={key}>
              <div className="text-sm text-gray-500 capitalize">{key}</div>
              <div className="font-bold text-red-400">{value}</div>
            </div>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.map((tech, i) => (
            <span key={i} className="px-2 py-1 bg-gray-700 rounded text-xs">
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-3">
          <a 
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-lg text-center text-sm font-semibold transition-colors flex items-center justify-center gap-2"
          >
            View Live <FaExternalLinkSquareAlt size={14} />
          </a>
          <a 
            href={repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-gray-700 hover:border-red-500 rounded-lg transition-colors flex items-center justify-center"
          >
            <FaGithub size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}

// Reusable Components
function SectionHeader({ title, subtitle, className }) {
  return (
    <div className={className}>
      <h2 className="text-4xl font-bold mb-4 text-white">{title}</h2>
      <p className="text-gray-400">{subtitle}</p>
      <div className="mt-4 flex justify-center">
        <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded"></div>
      </div>
    </div>
  );
}

function KPICard({ icon, value, label, trend }) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 hover:border-red-500 transition-colors">
      <div className="flex items-center justify-between mb-2">
        {icon}
        <span className="text-sm font-medium text-green-400">{trend}</span>
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
}

function StatCard({ title, value, change, icon, color }) {
  const colorClasses = {
    green: 'bg-green-900/20 border-green-500/20 text-green-400',
    blue: 'bg-blue-900/20 border-blue-500/20 text-blue-400',
    red: 'bg-red-900/20 border-red-500/20 text-red-400',
    purple: 'bg-purple-900/20 border-purple-500/20 text-purple-400'
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-red-500 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg border ${colorClasses[color]}`}>
          {icon}
        </div>
        <span className="text-sm font-medium text-green-400">{change}</span>
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-gray-400">{title}</div>
    </div>
  );
}

function ContactInfo({ icon, title, content, href }) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-3 bg-red-900/20 border border-red-500/20 rounded-lg">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold mb-1 text-white">{title}</h4>
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-red-400 transition-colors"
        >
          {content}
        </a>
      </div>
    </div>
  );
}

// Fixed EmailJS Contact Form
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState({ show: false, success: false, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setSubmitResult({ show: true, success: false, message: 'Sending message...' });

    try {
      const now = new Date();
      const date = now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      const time = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });

      const templateParams = {
        to_email: 'francis1chinazor@gmail.com',
        to_name: 'Francis Chinazor',
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject || 'Portfolio Inquiry',
        message: formData.message,
        date: date,
        time: time
      };

      const response = await emailjs.send(
        'service_ptzp7rd',
        'template_uvkbxrd',
        templateParams,
        '3PD5AyCly9DCyS4u1'
      );

      if (response.status === 200) {
        setSubmitResult({ 
          show: true, 
          success: true, 
          message: '✓ Message sent successfully!' 
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      setSubmitResult({ 
        show: true, 
        success: false, 
        message: '✗ Failed to send. Please email: francis1chinazor@gmail.com' 
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitResult({ show: false, success: false, message: '' }), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:outline-none"
            placeholder="Your name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:outline-none"
            placeholder="your@email.com"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-300">Subject</label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:outline-none"
          placeholder="Project inquiry"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-300">Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:outline-none resize-none"
          placeholder="Tell me about your project..."
        ></textarea>
      </div>
      
      {submitResult.show && (
        <div className={`p-4 rounded-lg ${submitResult.success ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'}`}>
          <div className="flex items-center gap-2">
            {submitResult.success ? <FaCheckCircle size={20} /> : <FaXTwitter size={20} />}
            <span>{submitResult.message}</span>
          </div>
        </div>
      )}
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}