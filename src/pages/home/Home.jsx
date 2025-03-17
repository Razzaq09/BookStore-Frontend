import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import Banner from './Banner';
import TopSellers from './TopSellers';
import Recommened from './Recommened';
import CanvasAnimation from './CanvasAnimation';
import ImageSlider from './ImageSlider';
import Homey from './Homey';
import Craft from './Craft';
import Real from './Real';
import Para from './Para';
import Capsules from './Capsules';
import Footer from '../../n.components/Footer';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const cursorRef = useRef(null);
  const cursorBlurRef = useRef(null);
  const mainRef = useRef(null);
  const page3Ref = useRef(null);

  useEffect(() => {
    // Add smooth scroll behavior to html element
    document.documentElement.style.scrollBehavior = 'smooth';
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', checkMobile);

    // Handle mouse move for cursor effect
    const handleMouseMove = (e) => {
      if (isMobile) return;
      
      setCursorPos({ x: e.clientX, y: e.clientY });
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
      if (cursorBlurRef.current) {
        cursorBlurRef.current.style.left = e.clientX - 250 + 'px';
        cursorBlurRef.current.style.top = e.clientY - 250 + 'px';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    // GSAP Animations with slower scrub
    gsap.to(mainRef.current, {
      backgroundColor: '#000',
      scrollTrigger: {
        trigger: mainRef.current,
        scroller: "body",
        start: 'top -25%',
        end: 'top -70%',
        scrub: 2, // Increased scrub value for slower animation
      },
    });

    const cards = gsap.utils.toArray('.about-card');
    cards.forEach((card) => {
      gsap.from(card, {
        y: isMobile ? 50 : 100,
        opacity: 0,
        duration: isMobile ? 0.6 : 1, // Increased duration
        ease: "power2.out", // Changed to smoother ease
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "top 15%",
          toggleActions: "play none none reverse",
          scrub: 1.5 // Added slower scrub
        }
      });
    });

    gsap.set("#colon1", { x: isMobile ? -35 : -70, y: isMobile ? -35 : -70, opacity: 0 });
    gsap.set("#colon2", { x: isMobile ? 35 : 70, y: isMobile ? 35 : 70, opacity: 0 });

    // Enhanced about section animations
    const aboutImages = document.querySelectorAll('#about-us img');
    const aboutContent = document.querySelector('#about-us-in');

    // Set initial states
    gsap.set(aboutImages[0], { x: '-100%', opacity: 0 });
    gsap.set(aboutContent, { y: '100', opacity: 0 });
    gsap.set(aboutImages[1], { x: '100%', opacity: 0 });

    // Create overlapping animation timeline
    const aboutTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#about-us",
        start: "top center",
        end: "bottom center",
        scrub: 1.5,
        markers: false,
      }
    });

    aboutTl
      .to(aboutImages[0], {
        x: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out"
      })
      .to(aboutContent, {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out"
      }, "-=1")
      .to(aboutImages[1], {
        x: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out"
      }, "-=1");

    // Add parallax effect to about images
    aboutImages.forEach(img => {
      gsap.to(img, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: img,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#page3",
        start: "top center",
        end: "top 20%",
        scrub: 1.5, // Increased scrub value
      }
    });

    tl.to("#colon1", {
      x: 0,
      y: 0,
      opacity: 1,
      duration: isMobile ? 0.6 : 1, // Increased duration
      ease: "power2.inOut" // Changed to smoother ease
    })
    .to("#colon2", {
      x: 0,
      y: 0,
      opacity: 1,
      duration: isMobile ? 0.6 : 1, // Increased duration
      ease: "power2.inOut" // Changed to smoother ease
    }, "<");

    const updateBodyTheme = () => {
      document.querySelectorAll(".section").forEach((section) => {
        const rect = section.getBoundingClientRect();
        const midpoint = window.innerHeight / 2;

        if (rect.top <= midpoint && rect.bottom >= midpoint) {
          const color = section.dataset.color;
          document.body.setAttribute("theme", color || "black");
        }
      });
    };

    window.addEventListener('scroll', updateBodyTheme);
    updateBodyTheme();

    gsap.to("#about-us", {
      opacity: 1,
      y: 0,
      duration: isMobile ? 0.6 : 1, // Increased duration
      ease: "power2.out", // Changed to smoother ease
      scrollTrigger: {
        trigger: "#about-us",
        start: "top 85%",
        end: "top 15%",
        toggleActions: "play none none reverse",
        scrub: 1.5 // Added slower scrub
      }
    });

    gsap.utils.toArray(".card").forEach((card, index) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: isMobile ? 0.6 : 1, // Increased duration
        ease: "power2.out", // Changed to smoother ease
        delay: isMobile ? index * 0.1 : index * 0.2, // Increased delay between cards
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "top 15%",
          toggleActions: "play none none reverse",
          scrub: 1.5 // Added slower scrub
        }
      });
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('scroll', updateBodyTheme);
      // Reset scroll behavior
      document.documentElement.style.scrollBehavior = '';
    };
  }, [isMobile]);

  // Add smooth scroll behavior to anchor links with slower duration
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
          const startPosition = window.pageYOffset;
          const distance = targetPosition - startPosition;
          
          // Smooth scroll with custom timing function
          const duration = 2000; // 2 seconds duration
          const start = performance.now();
          
          function animate(currentTime) {
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Easing function for smoother animation
            const easing = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            
            window.scrollTo(0, startPosition + distance * easing(progress));
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          }
          
          requestAnimationFrame(animate);
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  return (
    <>
     
      
      {!isMobile && (
        <>
          <div ref={cursorRef} id="cursor" className="hidden md:block"></div>
          <div ref={cursorBlurRef} id="cursor-blur" className="hidden md:block"></div>
        </>
      )}
      <div ref={mainRef} id="main">
        <div id="page1">
          <h1>Pages. Stories. Legacy.</h1>
          <h2>Unfold Stories, Rewrite Destinies</h2>
         
          <div id="arrow">
            <ArrowDown size={50} />
          </div>
        </div>

        <CanvasAnimation />

        <div id="page2">
          <div id="scroller">
            <div id="scroller-in">
              {['•RAZZAQ•', '•ASHMIN•', '•PRIYANSHU•'].map(
                (text) => (
                  <h4 key={text}>{text}</h4>
                )
              )}
            </div>
            <div id="scroller-in">
              {['•RAZZAQ•', '•ASHMIN•', '•PRIYANSHU•'].map(
                (text) => (
                  <h4 key={text}>{text}</h4>
                )
              )}
            </div>
          </div>

          <div id="about-us" className="relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070"
              alt="Students Studying Together"
              className="transform transition-transform duration-700"
            />
            <div id="about-us-in" className="transform transition-all duration-700">
              <h3>About Us – Built by Passion, </h3>
              <h3>Fueled by Code</h3>
              <p>
                Three students, one dream—born from a love for books and an obsession with coding. What started as late-night brainstorming turned into a digital haven for readers and writers alike. We built this platform with passion, blending technology and storytelling to create a space where books find new homes and ideas never fade. This isn't just a marketplace—it's our tribute to knowledge, creativity, and the magic of words. Welcome to our journey. Welcome to LUMELEAF
              </p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070"
              alt="Coding and Development"
              className="transform transition-transform duration-700"
            />
          </div>

          <div id="cards-container">
            <div className="card" id="card1">
              <h4>A Library That Never Ends 📚</h4>
              <p>
                Discover, trade, and treasure books that whisper wisdom through time.
              </p>
            </div>
            <div className="card" id="card2">
              <h4>Ink That Writes the Future ✍️</h4>
              <p>
                From pens that glide to notebooks that listen—find tools that spark creativity.
              </p>
            </div>
            <div className="card" id="card3">
              <h4>A Marketplace for Thinkers & Dreamers 🌿</h4>
              <p>
                Curated for readers, writers, and visionaries—shop with purpose, sell with pride.
              </p>
            </div>
            <div className="card" id="card4">
              <h4>Your Stories, Your Marketplace 🔄</h4>
              <p>
                Access premium study resources, from textbooks to digital notes.
                Get everything you need for academic success in one place, with
                expert-curated content and practical guides.
              </p>
            </div>
          </div>

          <ImageSlider />
        </div>

        <div id="page3" ref={page3Ref}>
          <p>
            Upon this page, where tales entwine,<br />
            Built with toil, by hands divine.<br />
            Three minds did weave, with code so bright,<br />
            A realm where stories take their flight.<br /><br />

            Books once loved, now seek their fate,<br />
            To find new hands, 'ere it's too late.<br />
            And pens do dance on paper bare,<br />
            With dreams to sketch and thoughts to share.<br /><br />

            So step ye forth, O seeker wise,<br />
            Where wisdom's glow shall light thine eyes.<br />
            A world of words, both old and new,<br />
            Awaits thy heart—awaits but you.
          </p>
          <img
            id="colon1"
            src="https://eiwgew27fhz.exactdn.com/wp-content/themes/puttosaurus/img/quote-left.svg"
            alt="Quote left"
          />
          <img
            id="colon2"
            src="https://eiwgew27fhz.exactdn.com/wp-content/themes/puttosaurus/img/quote-right.svg"
            alt="Quote right"
          />
        </div>

        <div className="animation-123-container">
          <div className="main w-full">
            <Homey />
            <Craft />
            <Real />
            <Banner />
            <Recommened />
            <TopSellers />
            <Para />
            <Capsules />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Home;