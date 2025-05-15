import { useState, useEffect } from 'react';
import { FaGithub , FaLinkedinIn, FaExternalLinkSquareAlt, FaDownload } from 'react-icons/fa';
import { BsMenuUp } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { IoMailUnread } from "react-icons/io5";
import profileIMG from "./img/techboy.jpg"; 
import Resume from "./img/franzor cv.pdf";
import certificate from "./img/TECH ACADEMY CERTIFICATE.pdf";
import ecommerce from "./img/E-Commerce.PNG";
import pospadi from "./img/pospadi.PNG";
import betahomes from "./img/betahomes.PNG";
import freelancer from "./img/franzor.PNG";
import IT from "./img/IT.PNG";
import cyjust from "./img/cyjust.PNG";

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
        <section 
          id="home" 
          className="min-h-screen flex items-center pt-16 pb-12 px-4 bg-gradient-to-b from-black to-gray-900"
        >
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                  <span className="block">Hi, I'm</span>
                  <span className="text-red-600">Francis Chinazor</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-400 mb-8">
                  Front-end Developer specializing in building user's happiness digitally.
                </p>
                <div className="flex space-x-4 mb-8">
                  <SocialButton icon={<FaGithub  size={20} />} href="https://github.com/ZorichDev" />
                  <SocialButton icon={< FaLinkedinIn size={20} />} href="www.linkedin.com/in/francis-chinazor-081b8933b" />
                  <SocialButton icon={<IoMailUnread size={20} />} href="francis1chinazor@gmail.com" />
                </div>
                <div className="flex flex-wrap gap-4">
                <button 
                 onClick={() => window.open('https://wa.me/2349069246577', '_blank')}
                  className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                   Contact Me
                    </button>
                  <a
                    href={Resume} 
                    download // forces download instead of opening in browser
                    className="px-6 py-3 border border-red-600 text-red-600 rounded-md hover:bg-red-900 hover:bg-opacity-20 transition-colors flex items-center gap-2">
                   <FaDownload size={18} />
                   Resume
                    </a>
                   <a
                    href={certificate} 
                    download // forces download instead of opening in browser
                    className="px-6 py-3 border border-red-600 text-red-600 rounded-md hover:bg-red-900 hover:bg-opacity-20 transition-colors flex items-center gap-2">
                   <FaDownload size={18} />
                   Certificate
                    </a>
                </div>
              </div>
              <div className="md:w-1/2 mt-12 md:mt-0">
                <div className="relative">
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-red-600 shadow-xl mx-auto">
                    <img 
                      src={profileIMG}
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-gray-900 p-4 rounded-lg shadow-lg border border-gray-800">
                    <p className="text-sm font-medium text-gray-400">Currently working on</p>
                    <p className="text-red-600 font-bold">Portfolio Website</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <section 
          id="about" 
          className="py-20 bg-gray-900"
        >
          <div className="container mx-auto px-4">
            <SectionHeader title="About Me" subtitle="Get to know me better" />
            
            <div className="flex flex-col md:flex-row gap-8 mt-12">
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-4 text-red-600">My Background</h3>
                <p className="text-gray-300 mb-4">
                 I'm a passionate Front-end Developer with over 3 years of hands-on experience crafting responsive, user-friendly, and scalable web applications. 
                 My journey into tech began shortly after school, when I built my very first website out of curiosity. That moment sparked a deep fascination with the web, 
                 and I’ve been hooked ever since.
                  I hold a Bachelor's degree in Philosophy from Imo State University, but my heart has always been drawn to technology. After completing my university studies,
                 I enrolled in a reputable tech academy where I honed my skills in HTML, CSS, JavaScript, and modern frameworks like React. Since then, I’ve had the privilege 
                 of working with both startups and established organizations, contributing to projects that require thoughtful UI design, responsive layouts, and clean, maintainable code.
                </p>
                <p className="text-gray-300 mb-4">
                  Throughout my career, I’ve been involved in building dashboards, e-commerce interfaces, NGO websites, and portfolio platforms — all focused on delivering intuitive 
                  digital experiences. I take pride in translating design mockups into polished, interactive user interfaces that not only look great but also perform smoothly across 
                  all devices.
                </p>
                <p className="text-gray-300">
                 Beyond the screen, I enjoy staying active and inspired. When I’m not coding, you’ll likely find me hiking in nature, exploring the latest tech trends, reading articles on 
                 frontend innovation, or experimenting with new tools and libraries to stay ahead in the ever-evolving web ecosystem.
                 I’m always open to exciting challenges, collaborative projects, and opportunities that push me to grow — both as a developer and as a 
                 creative thinker. Let’s build something amazing together.
                </p>
              </div>
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-4 text-red-600">Education & Experience</h3>
                <div className="space-y-6">
                  <TimelineItem 
                    year="2025presert"
                    title="Senior Frontend Developer"
                    company="Rpro-Group limited."
                    description="Leading frontend development for enterprise applications."
                  />
                   <TimelineItem 
                    year="2025"
                    title="Frontend Developer (internship)"
                    company="Internpulse cohort7."
                    description="Building and meeting targets set for each stage."
                  />
                   <TimelineItem 
                    year="2024 - 2025"
                    title=" Frontend Developer"
                    company="Metro-shelter limited for PPA."
                    description="Leading and managing frontend development for web-applications and handled all their social medial."
                  />
                  <TimelineItem 
                    year="2021 - 2022"
                    title="Front-end Developer"
                    company="Tech Academy."
                    description="learnt front-end development and how to handle and maintain web applications."
                  />
                  <TimelineItem 
                    year="2018 - 2021"
                    title="B A Philosophy"
                    company="Imo state University."
                    description="Graduated with 2nd class upper, specialized in Rights and Freedom."
                  />
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
