import { useState, useEffect } from 'react';
import { FaGithub , FaLinkedinIn, FaExternalLinkSquareAlt, FaDownload } from 'react-icons/fa';
import { BsMenuUp } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { IoMailUnread } from "react-icons/io5";
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

// Main App Component
export default function PortfolioWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  // Handle scroll to update active navigation section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };
  
  return (
    <div className="min-h-screen bg-black text-gray-200 font-sans">
      {/* Header/Navigation */}
      <header className="fixed w-full bg-black border-b border-gray-800 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter">
            <span className="text-red-600">Fran</span>Tech
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {['home', 'about', 'projects', 'skills', 'contact'].map((item) => (
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
          <nav className="md:hidden bg-gray-900 py-4 px-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              {['home', 'about', 'projects', 'skills', 'contact'].map((item) => (
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
            </div>
          </nav>
        )}
      </header>
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        {/* Hero Section */}
<section 
  id="home" 
  className="min-h-screen flex items-center pt-20 pb-16 px-6 bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden"
>
  {/* Background Elements */}
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent"></div>
  <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
  
  <div className="container mx-auto relative z-10">
    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
      {/* Left Content */}
      <div className="lg:w-1/2 text-center lg:text-left">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
            <span className="block text-white mb-2">Hi, I'm</span>
            <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              Francis Chinazor
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-lg">
            Frontend Developer specializing in building 
            <span className="text-red-400 font-semibold"> user's happiness</span> digitally.
          </p>
          
          {/* Social Links */}
          <div className="flex justify-center lg:justify-start gap-4 py-4">
            <SocialButton 
              icon={<FaGithub size={22} />} 
              href="https://github.com/ZorichDev"
              className="hover:bg-gray-800 hover:scale-110 transition-all duration-300" 
            />
            <SocialButton 
              icon={<FaLinkedinIn size={22} />} 
              href="https://www.linkedin.com/in/francis-chinazor-081b8933b"
              className="hover:bg-blue-600 hover:scale-110 transition-all duration-300" 
            />
            <SocialButton 
              icon={<IoMailUnread size={22} />} 
              href="mailto:francis1chinazor@gmail.com"
              className="hover:bg-red-600 hover:scale-110 transition-all duration-300" 
            />
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
            <button 
              onClick={() => window.open('https://wa.me/2349069246577', '_blank')}
              className="group px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold
                         hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300
                         shadow-lg hover:shadow-xl hover:shadow-red-500/25 focus:outline-none focus:ring-4 focus:ring-red-500/50"
            >
              <span className="flex items-center gap-2">
                Contact Me
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </button>
            
            <a
              href={Resume} 
              download
              className="group px-8 py-4 border-2 border-red-500 text-red-500 rounded-xl font-semibold
                         hover:bg-red-500 hover:text-white transition-all duration-300
                         flex items-center gap-3 shadow-sm hover:shadow-lg"
            >
              <FaDownload size={18} className="group-hover:animate-bounce" />
              Resume
            </a>
            
            <a
              href={certificate} 
              download
              className="group px-8 py-4 border-2 border-gray-600 text-gray-300 rounded-xl font-semibold
                         hover:bg-gray-600 hover:text-white transition-all duration-300
                         flex items-center gap-3 shadow-sm hover:shadow-lg"
            >
              <FaDownload size={18} className="group-hover:animate-bounce" />
              Certificate
            </a>
          </div>
        </div>
      </div>
      
      {/* Right Content - Profile */}
      <div className="lg:w-1/2 flex justify-center">
        <div className="relative">
          {/* Main Profile Image */}
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-full blur-xl opacity-20 animate-pulse"></div>
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-red-500 shadow-2xl">
              <img 
                src={profileIMG}
                alt="Francis Chinazor - Frontend Developer" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Status Card */}
          <div className="absolute -bottom-6 -right-6 bg-gray-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-sm font-medium text-gray-300">Currently working on</p>
            </div>
            <a 
              href="https://tekkbridge.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-red-400 font-bold text-lg hover:text-red-300 transition-colors duration-300 hover:underline cursor-pointer"
            >
              Portfolio Website
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* About Section */}
<section 
  id="about" 
  className="py-24 bg-gradient-to-b from-gray-900 to-slate-900 relative"
>
  <div className="container mx-auto px-6">
    <SectionHeader 
      title="About Me" 
      subtitle="Get to know me better"
      className="text-center mb-16" 
    />
    
    <div className="grid lg:grid-cols-2 gap-16 items-start">
      {/* Background Story */}
      <div className="space-y-8">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
          <h3 className="text-3xl font-bold mb-6 text-red-400 flex items-center gap-3">
            <span className="w-2 h-8 bg-red-500 rounded-full"></span>
            My Background
          </h3>
          
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p>
              I'm a passionate Frontend Developer with over <strong className="text-white">3 years</strong> of hands-on experience crafting responsive, user-friendly, and scalable web applications. My journey into tech began shortly after school, when I built my very first website out of curiosity.
            </p>
            
            <p>
              I hold a <strong className="text-red-400">Bachelor's degree in Philosophy</strong> from Imo State University, but my heart has always been drawn to technology. After completing my university studies, I enrolled in a reputable tech academy where I honed my skills in modern web development.
            </p>
            
            <p>
              Throughout my career, I've been involved in building <strong className="text-white">dashboards, e-commerce interfaces, NGO websites, and portfolio platforms</strong> — all focused on delivering intuitive digital experiences.
            </p>
            
            <p>
              Beyond the screen, I enjoy staying active and inspired. When I'm not coding, you'll likely find me hiking in nature, exploring the latest tech trends, or experimenting with new tools and libraries.
            </p>
          </div>
        </div>
      </div>
      
      {/* Experience Timeline */}
      <div className="space-y-8">
        <h3 className="text-3xl font-bold text-red-400 flex items-center gap-3">
          <span className="w-2 h-8 bg-red-500 rounded-full"></span>
          Education & Experience
        </h3>
        
        <div className="space-y-6">
          {/* Current Position */}
          <div className="bg-gradient-to-r from-red-500/10 to-transparent rounded-2xl p-6 border border-red-500/20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-semibold rounded-full">
                    2025 - Present
                  </span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <h4 className="text-xl font-bold text-white mb-1">Senior Frontend Developer</h4>
                <p className="text-red-400 font-medium">Rpro-Group Limited</p>
              </div>
              <a
                href={rprogropmycer} 
                download
                className="group px-4 py-2 border border-red-500 text-red-500 rounded-lg text-sm font-medium
                           hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center gap-2"
              >
                <FaDownload size={14} className="group-hover:animate-bounce" />
                Certificate
              </a>
            </div>
            <p className="text-gray-300">Leading frontend development for enterprise applications.</p>
          </div>
          
          {/* Other Experiences */}
          <div className="space-y-4">
            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-sm text-gray-400 font-medium">2025</span>
                  <h4 className="font-bold text-white">Frontend Developer (Internship)</h4>
                  <p className="text-red-400">Internpulse Cohort 7</p>
                </div>
                <a href={internpulsecer} download className="text-red-500 hover:text-red-400 p-2">
                  <FaDownload size={16} />
                </a>
              </div>
              <p className="text-gray-300 text-sm">Building and meeting targets set for each stage.</p>
            </div>
            
            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-sm text-gray-400 font-medium">2024 - 2025</span>
                  <h4 className="font-bold text-white">Frontend Developer</h4>
                  <p className="text-red-400">Metro-shelter Limited (PPA)</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">Leading frontend development for web applications and managed social media.</p>
            </div>
            
            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-sm text-gray-400 font-medium">2021 - 2022</span>
                  <h4 className="font-bold text-white">Frontend Developer Training</h4>
                  <p className="text-red-400">Tech Academy</p>
                </div>
                <a href={certificate} download className="text-red-500 hover:text-red-400 p-2">
                  <FaDownload size={16} />
                </a>
              </div>
              <p className="text-gray-300 text-sm">Learned frontend development and web application maintenance.</p>
            </div>
            
            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-sm text-gray-400 font-medium">2018 - 2021</span>
                  <h4 className="font-bold text-white">B.A Philosophy</h4>
                  <p className="text-red-400">Imo State University</p>
                </div>
                <a href={certificate} download className="text-red-500 hover:text-red-400 p-2">
                  <FaDownload size={16} />
                </a>
              </div>
              <p className="text-gray-300 text-sm">Graduated with 2nd class upper, specialized in Rights and Freedom.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
        
        {/* Projects Section */}
        <section 
          id="projects" 
          className="py-20 bg-black"
        >
          <div className="container mx-auto px-4">
            <SectionHeader 
              title="My Projects" 
              subtitle="Check out some of my recent work" 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <ProjectCard 
                title="E-Commerce Platform"
                category="Full Stack"
                image={ecommerce}
                description="A full-featured e-commerce platform built with React, Node.js, and MongoDB."
                techStack={["React", "Node.js", "MongoDB", "Express"]}
                liveLink="https://paintlifeltd.com/"
                repoLink="https://paintlifeltd.com/"
              />
              <ProjectCard 
                title="FinTech"
                category="Full Stack"
                image={pospadi}
                description="A responsive Pos FinTech project."
                techStack={["React", "Chakra ui",]}
                liveLink="https://pospadi.com.ng"
                repoLink="https://github.com/InternPulse-Frontend-March-2025/bankdash"
              />
              <ProjectCard 
                title="Real Estate"
                category="full Stack"
                image={betahomes}
                description="A Real Estate company website ."
                techStack={["React ", "Tailwind", ]}
                liveLink="https://betamerchanthomesandmore.com/"
                repoLink="https://betamerchanthomesandmore.com/"
              />
              <ProjectCard 
                title="Personal Finance Dashboard"
                category="Web Application"
                image={freelancer}
                description="A dashboard for tracking personal finances with data visualization."
                techStack={["React", "Chakra ui", "Chart.js"]}
                liveLink="https://freelancer-dashboard5.netlify.app/profile"
                repoLink="https://github.com/ZorichDev/Freelancer-Dashboard5"
              />
              <ProjectCard 
                title="IT solution"
                category="web Application"
                image={IT}
                description="A IT solution for Rpro Group of company."
                techStack={["Html", "CSS", "EmailJS", ]}
                liveLink="https://iprolance-solutions.cyjustdeals.com/"
                repoLink="https://github.com/ZorichDev/Iprolance-Solutions-LLC"
              />
              <ProjectCard 
                title="Branding"
                category="Web Application"
                image={cyjust}
                description="A Branding web application for cyjust deals company."
                techStack={["HTML", "CSS", "Bootstrap"]}
                liveLink="https://www.cyjustdeals.com/"
                repoLink="https://github.com/Efezino218/cyjust_deals"
              />
            </div>
          </div>
        </section>
        
        {/* Skills Section */}
        <section 
          id="skills" 
          className="py-20 bg-gray-900"
        >
          <div className="container mx-auto px-4">
            <SectionHeader 
              title="My Skills" 
              subtitle="Technologies I work with" 
            />
            
            <div className="mt-12">
              <div className="flex flex-col md:flex-row gap-10">
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold mb-6 text-red-600">Technical Skills</h3>
                  
                  <div className="space-y-6">
                    <SkillCategory 
                      title="Frontend Development."
                      skills={[
                        { name: "HTML5/CSS3", level: 90 },
                        { name: "JavaScript (ES6+)", level: 85 },
                        { name: "React", level: 90 },
                        { name: "Vue.js", level: 75 },
                         { name: "chakra ui", level: 50},
                        { name: "Tailwind CSS", level: 80 }
                      ]}
                    />
                    
                    {/* <SkillCategory 
                      title="Backend Development"
                      skills={[
                        { name: "Node.js", level: 80 },
                        { name: "Express", level: 85 },
                        { name: "Python", level: 70 },
                        { name: "PHP", level: 65 }
                      ]}
                    /> */}
                    
                    {/* <SkillCategory 
                      title="Database"
                      skills={[
                        { name: "MongoDB", level: 85 },
                        { name: "MySQL", level: 80 },
                        { name: "PostgreSQL", level: 75 }
                      ]}
                    /> */}
                  </div>
                </div>
                
                <div className="md:w-1/2 mt-10 md:mt-0">
                  <h3 className="text-2xl font-bold mb-6 text-red-600">Other Skills</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      "Git/GitHub", "APIs", "Canval", "Responsive Design", 
                      "UI/UX Design", "Linear", "Chakra UI",
                      "Ads", "Figma", "Worldpress","EmailJS", "Bootstrap"
                    ].map((skill, index) => (
                      <div 
                        key={index}
                        className="bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-center"
                      >
                        <span className="text-sm font-medium text-gray-300">{skill}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-10">
                    <h3 className="text-2xl font-bold mb-6 text-red-600">Languages</h3>
                    <div className="flex flex-wrap gap-4">
                      <LanguageBadge language="Igbo" level="Native" />
                      <LanguageBadge language="English" level="Fluent" />
                      <LanguageBadge language="Latin" level="Intermediate" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section 
          id="contact" 
          className="py-20 bg-black"
        >
          <div className="container mx-auto px-4">
            <SectionHeader 
              title="Get In Touch" 
              subtitle="Let's work together" 
            />
            
            <div className="flex flex-col md:flex-row gap-12 mt-12">
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-6 text-red-600">Contact Information</h3>
                <div className="space-y-6">
                  <ContactInfo 
                    icon={<IoMailUnread size={24} />}
                    title="Email"
                    content="francis1chinazor@gmail.com"
                    href="francis1chinazor@example.com"
                  />
                  <ContactInfo 
                    icon={<FaLinkedinIn size={24} />}
                    title="LinkedIn"
                    content="www.linkedin.com/in/francis-chinazor-081b8933b"
                    href="www.linkedin.com/in/francis-chinazor-081b8933b"
                  />
                  <ContactInfo 
                    icon={<FaGithub size={24} />}
                    title="GitHub"
                    content="https://github.com/ZorichDev"
                    href="https://github.com/ZorichDev"
                  />
                </div>
                
                <div className="mt-10">
                  <h3 className="text-xl font-bold mb-4 text-red-600">Current Status</h3>
                  <p className="text-gray-300 mb-4">
                    I'm currently open to freelance projects and full-time opportunities.
                    Feel free to reach out if you have an interesting project or job opportunity!
                  </p>
                  <div className="inline-block rounded-full bg-red-900 border border-red-600 px-3 py-1 text-sm font-medium text-white">
                    Available for work
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-6 text-red-600">Send Me a Message</h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <div className="font-bold text-xl mb-2">
                <span className="text-red-600">Fran</span>Tech
              </div>
              <p className="text-gray-400 text-sm">
                © 2025 Francis chinazor. All rights reserved.
              </p>
            </div>
            
            <div className="flex space-x-4">
              <SocialButton 
                icon={<FaGithub size={20} />} 
                href="https://github.com/ZorichDev" 
                variant="footer"
              />
              <SocialButton 
                icon={<FaLinkedinIn size={20} />} 
                href="www.linkedin.com/in/francis-chinazor-081b8933b" 
                variant="footer"
              />
              <SocialButton 
                icon={<IoMailUnread size={20} />} 
                href="francis1chinazor@gmail.com" 
                variant="footer"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Reusable Components
function SectionHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-8">
      <h2 className="text-3xl md:text-4xl font-bold mb-2">{title}</h2>
      <p className="text-gray-400">{subtitle}</p>
      <div className="mt-4 flex justify-center">
        <div className="w-16 h-1 bg-red-600 rounded"></div>
      </div>
    </div>
  );
}

function SocialButton({ icon, href, variant = 'primary' }) {
  const baseStyles = "flex items-center justify-center rounded-full transition-colors";
  const styles = variant === 'footer' 
    ? `${baseStyles} w-10 h-10 bg-gray-800 hover:bg-gray-700 text-white` 
    : `${baseStyles} w-10 h-10 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white`;
  
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={styles}
    >
      {icon}
    </a>
  );
}

function TimelineItem({ year, title, company, description }) {
  return (
    <div className="relative pl-8 border-l-2 border-gray-700 pb-2">
      <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border-2 border-red-600 bg-gray-900"></div>
      <span className="text-sm text-gray-400 font-medium">{year}</span>
      <h4 className="font-bold mt-1 text-white">{title}</h4>
      <p className="text-gray-300">{company}</p>
      <p className="text-sm text-gray-400 mt-1">{description}</p>
    </div>
  );
}

function ProjectCard({ title, category, image, description, techStack, liveLink, repoLink }) {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-800 transition-transform hover:-translate-y-2">
      <div className="relative h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded">
          {category}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-300 text-sm mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.map((tech, index) => (
            <span 
              key={index}
              className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex space-x-3 mt-4">
          <a 
            href={liveLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-red-500 hover:text-red-400 flex items-center"
          >
            Live Demo <FaExternalLinkSquareAlt size={14} className="ml-1" />
          </a>
          <a 
            href={repoLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-red-500 hover:text-red-400 flex items-center"
          >
            Source Code <FaGithub size={14} className="ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
}

function SkillCategory({ title, skills }) {
  return (
    <div>
      <h4 className="font-bold mb-4 text-white">{title}</h4>
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-300">{skill.name}</span>
              <span className="text-sm text-gray-400">{skill.level}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div 
                className="bg-red-600 h-2 rounded-full" 
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LanguageBadge({ language, level }) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2">
      <p className="font-medium text-white">{language}</p>
      <p className="text-xs text-gray-400">{level}</p>
    </div>
  );
}
import { MdOutlineRealEstateAgent } from "react-icons/md";
import emailjs from 'emailjs-com';

function ContactInfo({ icon, title, content, href }) {
  return (
    <div className="flex items-start">
      <div className="bg-red-900 border border-red-600 p-3 rounded-lg text-white mr-4">
        {icon}
      </div>
      <div>
        <h4 className="font-medium text-white">{title}</h4>
        <a 
          href={href}
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-red-500"
        >
          {content}
        </a>
      </div>
    </div>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState({ success: false, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs.send('service_ptzp7rd', 'template_uvkbxrd', {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
    }, '3PD5AyCly9DCyS4u1')
      .then(() => {
        setSubmitResult({
          success: true,
          message: 'Thank you! Your message has been sent successfully.'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsSubmitting(false);
        setTimeout(() => setSubmitResult({ success: false, message: '' }), 5000);
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        setSubmitResult({
          success: false,
          message: 'Oops! Something went wrong. Please try again.'
        });
        setIsSubmitting(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-300">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-300">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-1 text-gray-300">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1 text-gray-300">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:bg-red-800 disabled:opacity-70"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>

      {submitResult.message && (
        <div className={`mt-4 p-3 rounded-md ${submitResult.success ? 'bg-green-900 text-green-200 border border-green-700' : 'bg-red-900 text-red-200 border border-red-700'}`}>
          {submitResult.message}
        </div>
      )}
    </form>
  );
}

export { ContactInfo, ContactForm };
